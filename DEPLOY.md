# Deploying the docs

The documentation (`docs/`, Starlight) is a static site on the mydevil.net account, next to the main BWS sites:

| Site                              | mydevil site type | Directory on the server                                 |
| --------------------------------- | ----------------- | ------------------------------------------------------- |
| `astro-ui.banachwebsolutions.com` | `php` (static)    | `~/domains/astro-ui.banachwebsolutions.com/public_html` |

It uses the `php` type because that's where mydevil.net reads `.htaccess` (`docs/public/.htaccess`: HTTPS redirect,
the 404 page, security headers and caching).

## Deploying

```bash
cp deploy.env.example deploy.env    # once: fill in the SSH login
pnpm docs:release:dry               # build and show what would change, without changing anything
pnpm docs:release                   # build and publish (asks first; --yes to skip)
```

The script builds the docs, checks the build's canonical URL matches `DOCS_DOMAIN` (`site` in
`docs/astro.config.mjs`), mirrors `docs/dist/` to `public_html` (files no longer in the build are removed;
`.well-known/` stays) and checks the site answers.

Deploy the docs before `pnpm release`, so the version on npm already has its documentation online.

## One-time server setup

Over SSH on the account (`bws-admin@s85.mydevil.net`), with key login already set up for the main BWS deploy:

```bash
devil www add astro-ui.banachwebsolutions.com php
```

If the domain's DNS zone isn't managed on mydevil.net, add an `A` record for `astro-ui` pointing to the server's
web address first (`devil vhost list`). Then HTTPS:

```bash
devil ssl www add 185.36.169.85 le le astro-ui.banachwebsolutions.com
devil www options astro-ui.banachwebsolutions.com sslonly on
```
