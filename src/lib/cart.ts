/** Cart shaping and money maths for the storefront. */
import type { Product } from '../data/products';
import { clampQuantity } from './format';

export interface CartLine {
  product: Product;
  qty: number;
}

export interface Totals {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
}

export const FREE_SHIPPING_AT_CENTS = 15000;
export const FLAT_SHIPPING_CENTS = 850;
export const TAX_RATE = 0.0725;

/** Discount codes this fictional store honours. */
const COUPONS: Record<string, number> = {
  TRAIL10: 0.1,
  FIELD20: 0.2,
};

export function addLine(lines: CartLine[], product: Product): CartLine[] {
  const existing = lines.find((line) => line.product.id === product.id);
  if (!existing) return [...lines, { product, qty: 1 }];
  return lines.map((line) =>
    line.product.id === product.id
      ? { ...line, qty: Math.min(product.stock, line.qty + 1) }
      : line,
  );
}

export function setLineQty(lines: CartLine[], productId: string, qty: number): CartLine[] {
  return lines.map((line) =>
    line.product.id === productId
      ? { ...line, qty: Math.min(line.product.stock, clampQuantity(qty)) }
      : line,
  );
}

export function removeLine(lines: CartLine[], productId: string): CartLine[] {
  return lines.filter((line) => line.product.id !== productId);
}

export function countItems(lines: CartLine[]): number {
  return lines.reduce((count, line) => count + line.qty, 0);
}

export function discountRate(code: string | null): number {
  if (code === null) return 0;
  return COUPONS[code] ?? 0;
}

export function isKnownCoupon(code: string): boolean {
  return code in COUPONS;
}

export function computeTotals(lines: CartLine[], couponCode: string | null): Totals {
  const subtotalCents = lines.reduce(
    (sum, line) => sum + line.product.priceCents * line.qty,
    0,
  );
  const discountCents = Math.round(subtotalCents * discountRate(couponCode));
  const afterDiscount = subtotalCents - discountCents;
  const shippingCents =
    subtotalCents === 0 || afterDiscount >= FREE_SHIPPING_AT_CENTS ? 0 : FLAT_SHIPPING_CENTS;
  const taxCents = Math.round(afterDiscount * TAX_RATE);

  return {
    subtotalCents,
    discountCents,
    shippingCents,
    taxCents,
    totalCents: afterDiscount + shippingCents + taxCents,
  };
}
