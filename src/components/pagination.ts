// Which page buttons Pagination shows. Pure, so it's easy to test.

export type PageItem = number | 'ellipsis';

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

/**
 * The pages to show for `page` out of `length`, at most `totalVisible` entries (ellipses included).
 * The first and last pages always show; an ellipsis stands in for at least two hidden pages.
 *
 *   getPageItems(5, 20, 7) → [1, 'ellipsis', 4, 5, 6, 'ellipsis', 20]
 */
export function getPageItems(
  page: number,
  length: number,
  totalVisible = 7,
): PageItem[] {
  // Room for first, last, two ellipses and at least one page between them.
  const visible = Math.max(totalVisible, 5);
  if (length <= visible) return range(1, length);

  const current = Math.min(Math.max(page, 1), length);
  // The pages around the current one, between the two ellipses.
  const middle = visible - 4;
  const from = current - Math.floor((middle - 1) / 2);
  const to = from + middle - 1;

  // Near the start — an ellipsis would hide only page 2: 1 2 3 4 5 … 20
  if (from <= 3) return [...range(1, visible - 2), 'ellipsis', length];
  // Near the end — an ellipsis would hide only the second to last page: 1 … 16 17 18 19 20
  if (to >= length - 2) {
    return [1, 'ellipsis', ...range(length - (visible - 3), length)];
  }
  // In the middle: 1 … 4 5 6 … 20
  return [1, 'ellipsis', ...range(from, to), 'ellipsis', length];
}
