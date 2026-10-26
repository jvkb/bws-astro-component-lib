// Floating UI positioning shared by the components that float next to an element (Menu, Tooltip).
// Used from their <script>s, in the browser.
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
  type Placement,
} from '@floating-ui/dom';

// The floating element grows out of the reference's side.
const ORIGIN = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

type AnchorOptions = {
  placement: Placement;
  /** Distance from the reference, in pixels. */
  gap?: number;
  /** Limit the height to the space available (it then scrolls). */
  fitHeight?: boolean;
};

/**
 * Positions `floating` next to `reference` and keeps it there while scrolling or resizing: it flips
 * to the other side when there isn't room and shifts to stay on screen. The element is hidden until
 * the first position is applied — `ready` resolves then. Call `stop` when it closes.
 */
export function anchor(
  reference: HTMLElement,
  floating: HTMLElement,
  { placement, gap = 4, fitHeight = false }: AnchorOptions,
) {
  floating.style.visibility = 'hidden';

  let resolveReady = () => {};
  const ready = new Promise<void>((resolve) => (resolveReady = resolve));

  const update = () =>
    computePosition(reference, floating, {
      strategy: 'fixed',
      placement,
      middleware: [
        offset(gap),
        flip({ padding: 8 }),
        shift({ padding: 8 }),
        fitHeight &&
          size({
            padding: 8,
            apply({ availableHeight }) {
              floating.style.maxHeight = `${Math.max(availableHeight, 120)}px`;
            },
          }),
      ],
    }).then(({ x, y, placement: final }) => {
      const side = final.split('-')[0] as keyof typeof ORIGIN;
      Object.assign(floating.style, {
        left: `${x}px`,
        top: `${y}px`,
        transformOrigin: ORIGIN[side],
        visibility: '',
      });
      floating.dataset.placement = final;
      resolveReady();
    });

  const stop = autoUpdate(reference, floating, update);
  return { ready, stop };
}
