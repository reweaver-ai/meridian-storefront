export interface Line { priceCents: number; qty: number; }

export function totalCents(lines: Line[]): number {
  return lines.reduce((sum, l) => sum + l.priceCents * l.qty, 0);
}

export function applyCoupon(cents: number, code: string): number {
  if (code === 'TRAIL10') return Math.round(cents * 0.9);
  return cents;
}
