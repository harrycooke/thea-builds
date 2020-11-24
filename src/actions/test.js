import summer from './sum.js';

it('sums numbers', () => {
  expect(summer(1, 2)).toEqual(3);
  expect(summer(2, 2)).toEqual(4);
});