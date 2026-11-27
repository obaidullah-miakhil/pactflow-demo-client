// PKR formatting (Milestone 2).

/** Formats an amount as rupees. */
export function formatPKR(amount) {
  return 'Rs ' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
