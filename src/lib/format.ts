/** Locale-stable money formatting for the storefront. */
export function money(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function clampQuantity(value: number): number {
  return Math.max(1, Math.min(99, Math.round(value)));
}
