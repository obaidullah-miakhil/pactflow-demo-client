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
