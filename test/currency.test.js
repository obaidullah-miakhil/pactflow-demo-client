import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertUSDToPKR, formatPKR } from '../src/currency.js';

test('formatPKR uses South Asian digit grouping', () => {
  assert.equal(formatPKR(123456), 'Rs 1,23,456.00');
  assert.equal(formatPKR(999), 'Rs 999.00');
  assert.equal(formatPKR(1000), 'Rs 1,000.00');
});

test('formatPKR of zero', () => {
  assert.equal(formatPKR(0), 'Rs 0.00');
  assert.equal(formatPKR(-0), 'Rs 0.00');
});

test('formatPKR of negative values', () => {
  assert.equal(formatPKR(-1234.5), '-Rs 1,234.50');
  assert.equal(formatPKR(-123456.789), '-Rs 1,23,456.79');
});

test('formatPKR above 1 crore', () => {
  assert.equal(formatPKR(10000000), 'Rs 1,00,00,000.00');
  assert.equal(formatPKR(123456789.5), 'Rs 12,34,56,789.50');
});

test('formatPKR rejects non-numbers', () => {
  assert.throws(() => formatPKR('100'), TypeError);
  assert.throws(() => formatPKR(NaN), TypeError);
});

test('convertUSDToPKR rounds to 2 decimals', () => {
  assert.equal(convertUSDToPKR(5000, 278.5), 1392500);
  assert.equal(convertUSDToPKR(10.123, 278.456), 2818.81);
  assert.equal(convertUSDToPKR(0, 278.5), 0);
  assert.equal(convertUSDToPKR(-20, 278.5), -5570);
});

test('convertUSDToPKR rejects bad rates', () => {
  assert.throws(() => convertUSDToPKR(1, 0), RangeError);
  assert.throws(() => convertUSDToPKR(1, -5), RangeError);
});
