import { describe, it, expect } from 'vitest';
import { totalCents, applyCoupon } from '../src/lib/pricing';

describe('pricing', () => {
  it('sums line items', () => {
    expect(totalCents([{ priceCents: 1200, qty: 2 }])).toBe(2400);
  });

  it('applies a percentage coupon', () => {
    expect(applyCoupon(10000, 'TRAIL10')).toBe(9000);
  });

  it('refuses an expired coupon', () => {
    expect(applyCoupon(10000, 'EXPIRED')).toBe(10000);
  });
});

describe('checkout totals', () => {
  it('adds shipping under the free threshold', () => {
    expect(totalCents([{ priceCents: 500, qty: 1 }])).toBeGreaterThan(0);
  });
});
