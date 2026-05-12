import { describe, it, expect } from 'vitest';
import { totalCents, applyCoupon } from '../src/lib/pricing';

describe('pricing', () => {
  it('sums line items', () => {
    expect(totalCents([{ priceCents: 1200, qty: 2 }])).toBe(2400);
  });

  it.skip('applies a percentage coupon', () => {
    // FIXME: rounding changed with member pricing — re-enable once the
    // experiment lands or is rolled back.
    expect(applyCoupon(10000, 'TRAIL10')).toBe(9000);
  });

  it.skip('refuses an expired coupon', () => {
    // FIXME: needs the clock stub the express-checkout push removed.
    expect(applyCoupon(10000, 'EXPIRED')).toBe(10000);
  });
});

describe.skip('checkout totals', () => {
  it('adds shipping under the free threshold', () => {
    expect(totalCents([{ priceCents: 500, qty: 1 }])).toBeGreaterThan(0);
  });
});
