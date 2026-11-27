import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createInvoice, invoiceTotal } from '../src/invoice.js';

test('invoiceTotal sums quantity × unit price', () => {
  assert.equal(invoiceTotal([{ description: 'API', quantity: 40, unitPrice: 25 }, { description: 'QA', quantity: 2.5, unitPrice: 30.1 }]), 1075.25);
});

test('invoiceTotal of no items is 0', () => {
  assert.equal(invoiceTotal([]), 0);
});

test('createInvoice requires number and client', () => {
  assert.throws(() => createInvoice({ items: [] }), TypeError);
  assert.equal(createInvoice({ number: 'INV-7', client: 'Acme', items: [] }).currency, 'USD');
});
