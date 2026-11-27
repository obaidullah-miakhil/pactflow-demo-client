# pactflow-demo-client

A small invoicing toolkit for a Peshawar software agency that bills foreign clients. Used as the demo client
codebase for PactFlow PK: each milestone is a pull request that PactFlow's AI auditor checks against the spec.

```bash
npm test
```

## API

### `invoiceTotal(items)`
Sum of `quantity × unitPrice` over line items, rounded to 2 decimals.

### `createInvoice({ number, client, currency = 'USD', items })`
Returns `{ number, client, currency, items, total, issuedAt }`.

### `formatPKR(amount)`
Formats a number as Pakistani rupees with South Asian digit grouping (lakh/crore) and 2 decimals.

```js
formatPKR(123456);      // "Rs 1,23,456.00"
formatPKR(10000000);    // "Rs 1,00,00,000.00"  (1 crore)
formatPKR(-1234.5);     // "-Rs 1,234.50"
```
Throws `TypeError` for non-finite input.

### `convertUSDToPKR(usd, rate)`
Converts dollars to rupees at `rate` PKR per USD, rounded to 2 decimals.

```js
convertUSDToPKR(5000, 278.5);       // 1392500
convertUSDToPKR(10.123, 278.456);   // 2818.81
```
Throws `RangeError` if `rate` is not a positive number.
