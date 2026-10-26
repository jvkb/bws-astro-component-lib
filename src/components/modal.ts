// Browser behavior shared by the modal components built on <dialog> (Dialog, NavigationDrawer).
// Their <script>s call setupModals(); it sets everything up once per page, however many modals
// there are. It's an explicit call, not a side-effect import: the package declares its TS modules
// side-effect free, so a bare `import './modal.ts'` would be dropped from production builds.
//
// The native <dialog> with showModal() keeps focus inside, makes the page behind inert, closes on
// Escape and returns focus to the opener — this adds opening and closing from the page,
// `persistent`, closing on navigation and the scroll lock.

const MODAL = 'dialog[data-modal]';
const OPENER = '[data-dialog-open], [data-drawer-open]';
const CLOSER = '[data-dialog-close], [data-drawer-close]';

// Vuetify's "can't close" nudge for persistent modals.
function bounce(dialog: HTMLDialogElement) {
  dialog.animate([{ scale: '1' }, { scale: '1.02' }, { scale: '1' }], {
    duration: 150,
    easing: 'ease-out',
  });
}

// Locks the page scroll while a modal is open. The scrollbar is measured before the lock hides
// it: if there is one, scrollbar-gutter keeps its space so nothing shifts sideways (see
// styles.css). Overlay scrollbars (macOS by default) take no space and need no gutter.
const root = document.documentElement;

function updateScrollLock() {
  const modalOpen = document.querySelector(`${MODAL}:modal`) !== null;
  if (modalOpen && !root.hasAttribute('data-scroll-lock')) {
    const scrollbar = window.innerWidth - root.clientWidth;
    root.setAttribute('data-scroll-lock', scrollbar > 0 ? 'gutter' : '');
  } else if (!modalOpen) {
    root.removeAttribute('data-scroll-lock');
  }
}

function openInitial() {
  for (const dialog of document.querySelectorAll<HTMLDialogElement>(
    `${MODAL}[data-open]`,
  )) {
    if (!dialog.open) dialog.showModal();
  }
}

let ready = false;

export function setupModals() {
  if (ready) return;
  ready = true;

  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;

    // Openers: the activator slot, or data-dialog-open / data-drawer-open="id" anywhere on the page.
    const opener = target?.closest<HTMLElement>(OPENER);
    if (opener) {
      const id = opener.dataset.dialogOpen ?? opener.dataset.drawerOpen ?? '';
      const dialog = document.getElementById(id);
      if (dialog instanceof HTMLDialogElement && !dialog.open)
        dialog.showModal();
      return;
    }

    // Closers close the modal they're in, or the one they name.
    const closer = target?.closest<HTMLElement>(CLOSER);
    if (closer) {
      // Through a component (<Button data-dialog-close>) the attribute is rendered as "true".
      const named = closer.dataset.dialogClose ?? closer.dataset.drawerClose;
      const dialog =
        named && named !== 'true'
          ? document.getElementById(named)
          : closer.closest('dialog');
      if (dialog instanceof HTMLDialogElement) dialog.close();
      return;
    }

    // A link inside a modal with data-close-on-navigate closes it — the navigation still happens,
    // and for links within the page (#contact) the content behind is visible right away.
    const link = target?.closest('a[href]');
    const linkModal = link?.closest<HTMLDialogElement>(
      `${MODAL}[data-close-on-navigate]`,
    );
    if (linkModal) {
      linkModal.close();
      return;
    }

    // A click on the backdrop lands on the <dialog> itself, outside its box.
    if (target instanceof HTMLDialogElement && target.matches(MODAL)) {
      const box = target.getBoundingClientRect();
      const { clientX: x, clientY: y } = event as MouseEvent;
      const outside =
        x < box.left || x > box.right || y < box.top || y > box.bottom;
      if (!outside) return;
      if (target.hasAttribute('data-persistent')) bounce(target);
      else target.close();
    }
  });

  // Escape fires `cancel` — persistent modals stay open.
  document.addEventListener(
    'cancel',
    (event) => {
      const dialog = event.target;
      if (
        dialog instanceof HTMLDialogElement &&
        dialog.matches(`${MODAL}[data-persistent]`)
      ) {
        event.preventDefault();
        bounce(dialog);
      }
    },
    // `cancel` doesn't bubble, but it can be caught on the way down.
    true,
  );

  // Watches every dialog's `open`, so modals opened with showModal() from your own code lock too.
  // The callback runs before the next paint, so the page never renders without its scrollbar space.
  new MutationObserver(updateScrollLock).observe(document, {
    subtree: true,
    attributes: true,
    attributeFilter: ['open'],
  });

  // Re-run after client-side navigation when the site uses Astro's view transitions.
  document.addEventListener('astro:page-load', openInitial);

  openInitial();
}
