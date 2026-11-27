// Invoice helpers: line items → totals. Amounts are numbers in the invoice currency.

/**
 * Sum of quantity × unit price over all line items, rounded to 2 decimals.
 * @param {{ description: string, quantity: number, unitPrice: number }[]} items
 */
export function invoiceTotal(items) {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  const total = items.reduce((sum, { quantity, unitPrice }) => {
    if (!Number.isFinite(quantity) || !Number.isFinite(unitPrice)) throw new TypeError('quantity and unitPrice must be numbers');
    return sum + quantity * unitPrice;
  }, 0);
  return Math.round(total * 100) / 100;
}

/**
 * Creates a plain invoice object.
 * @param {{ number: string, client: string, currency?: string, items: { description: string, quantity: number, unitPrice: number }[] }} input
 */
export function createInvoice({ number, client, currency = 'USD', items }) {
  if (!number || !client) throw new TypeError('number and client are required');
  return { number, client, currency, items, total: invoiceTotal(items), issuedAt: new Date().toISOString().slice(0, 10) };
}
