const __keysLast = require('../keysLast');

test('sugar.js.array.keysLast', async done => {
  const keys = __keysLast(['a', 'b', 'd', 'g', 'c'], ['d', 'g'])
  expect(keys).toEqual(['a', 'b', 'c', 'd', 'g']);
  done();
});