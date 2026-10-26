#!/usr/bin/env bash
# Deploys the documentation site (static files) to a mydevil.net account. See DEPLOY.md for the one-time server
# setup.
#
#   scripts/deploy-docs.sh            # build the docs and publish them
#   scripts/deploy-docs.sh --dry-run  # build, then show what would change on the server without changing it
#   scripts/deploy-docs.sh --yes      # don't ask before deploying
#
# Settings come from deploy.env in the repository root (see deploy.env.example).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# --- output -------------------------------------------------------------------------------------------------------
bold=$'\e[1m'; dim=$'\e[2m'; red=$'\e[31m'; green=$'\e[32m'; yellow=$'\e[33m'; reset=$'\e[0m'
step() { printf '\n%s==> %s%s\n' "$bold" "$*" "$reset"; }
info() { printf '    %s\n' "$*"; }
warn() { printf '%s    ! %s%s\n' "$yellow" "$*" "$reset"; }
die() { printf '%s    x %s%s\n' "$red" "$*" "$reset" >&2; exit 1; }

# --- arguments ----------------------------------------------------------------------------------------------------
DRY_RUN=0
ASSUME_YES=0
for arg in "$@"; do
  case "$arg" in
    --dry-run | -n) DRY_RUN=1 ;;
    --yes | -y) ASSUME_YES=1 ;;
    -h | --help) sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) die "Unknown argument: $arg (try --help)" ;;
  esac
done

# --- settings -----------------------------------------------------------------------------------------------------
[ -f deploy.env ] || die "No deploy.env: copy deploy.env.example to deploy.env and fill it in."
# shellcheck source=/dev/null
source deploy.env
: "${DEPLOY_SSH:?Set DEPLOY_SSH in deploy.env}"
: "${DOCS_DOMAIN:?Set DOCS_DOMAIN in deploy.env}"
SITE_URL="https://${DOCS_DOMAIN}"
DOCS_DIR="domains/${DOCS_DOMAIN}/public_html"
version="$(node -p 'require("./package.json").version')"

remote() { ssh -o BatchMode=yes "$DEPLOY_SSH" "$@"; }
# In a dry run rsync only lists what it would change.
RSYNC_FLAGS=(-az)
[ "$DRY_RUN" = 1 ] && RSYNC_FLAGS+=(--dry-run --itemize-changes)
# A directory made identical to the local one; .well-known (Let's Encrypt) is never deleted.
mirror() { rsync "${RSYNC_FLAGS[@]}" --delete --exclude '.well-known/' "$@"; }

# --- checks -------------------------------------------------------------------------------------------------------
step "Checking"
for tool in pnpm rsync ssh curl node; do command -v "$tool" >/dev/null || die "$tool is missing"; done
info "Docs:    v$version → $SITE_URL$([ "$DRY_RUN" = 1 ] && echo " (dry run)")"
info "Server:  $DEPLOY_SSH"

branch="$(git rev-parse --abbrev-ref HEAD)"
commit="$(git rev-parse --short HEAD)"
info "Code:    $branch @ $commit"
[ "$branch" = "main" ] || warn "Not on main."
[ -z "$(git status --porcelain)" ] || warn "Uncommitted changes will be deployed too."

remote "command -v rsync >/dev/null" 2>/dev/null ||
  die "Can't run commands on $DEPLOY_SSH over SSH (key login and rsync are needed). See DEPLOY.md."
remote "test -d ~/$DOCS_DIR" || die "~/$DOCS_DIR doesn't exist on the server: add the site first (DEPLOY.md)."

if [ "$DRY_RUN" = 0 ] && [ "$ASSUME_YES" = 0 ]; then
  read -r -p "    Deploy the docs (v$version) to $SITE_URL? [y/N] " answer
  [[ "$answer" =~ ^[yYtT]$ ]] || die "Cancelled."
fi

# --- docs ---------------------------------------------------------------------------------------------------------
step "Docs: building"
pnpm docs:build >/dev/null
[ -f docs/dist/index.html ] || die "The docs build has no index.html."
[ -f docs/dist/.htaccess ] || die "The docs build has no .htaccess (docs/public/.htaccess)."
# The canonical URLs and the sitemap come from `site` in docs/astro.config.mjs.
grep -q "href=\"$SITE_URL/\"" docs/dist/index.html ||
  die "The build's canonical URL isn't $SITE_URL/: set site in docs/astro.config.mjs to match DOCS_DOMAIN."
info "$(find docs/dist -name index.html | wc -l | tr -d ' ') pages, $(du -sh docs/dist | cut -f1)"

step "Docs: uploading to ~/$DOCS_DIR"
mirror docs/dist/ "$DEPLOY_SSH:$DOCS_DIR/"

check_url() {
  local status
  status="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$1" || true)"
  if [ "$status" = "200" ]; then info "${green}$1 → 200${reset}"; else warn "$1 → $status"; fi
}
if [ "$DRY_RUN" = 0 ]; then
  check_url "$SITE_URL/"
  check_url "$SITE_URL/getting-started/"
fi

step "${green}Done${reset}${dim} (v$version, $commit$([ "$DRY_RUN" = 1 ] && echo ", dry run: nothing was changed"))${reset}"
