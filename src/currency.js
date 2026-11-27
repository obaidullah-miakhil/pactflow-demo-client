// PKR formatting and USD → PKR conversion (Milestone 2).

/**
 * Formats an amount as Pakistani rupees with South Asian digit grouping.
 * formatPKR(123456) → "Rs 1,23,456.00"; formatPKR(-1234.5) → "-Rs 1,234.50"
 * @param {number} amount
 */
export function formatPKR(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) throw new TypeError('amount must be a finite number');
  const sign = amount < 0 ? '-' : '';
  const [int, frac] = Math.abs(amount).toFixed(2).split('.');
  const last3 = int.slice(-3);
  const rest = int.slice(0, -3);
  const grouped = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}` : last3;
  return `${sign}Rs ${grouped}.${frac}`;
}

/**
 * Converts US dollars to rupees at the given rate, rounded to 2 decimals.
 * @param {number} usd
 * @param {number} rate PKR per 1 USD (must be > 0)
 */
export function convertUSDToPKR(usd, rate) {
  if (!Number.isFinite(usd)) throw new TypeError('usd must be a finite number');
  if (!Number.isFinite(rate) || rate <= 0) throw new RangeError('rate must be a positive number');
  return Math.round((usd * rate + Number.EPSILON) * 100) / 100;
}
