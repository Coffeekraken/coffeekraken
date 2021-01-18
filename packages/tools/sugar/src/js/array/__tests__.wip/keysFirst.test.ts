const __keysFirst = require('../keysFirst');

test('sugar.js.array.keysFirst', async done => {
  const keys = __keysFirst(['a', 'b', 'd', 'g', 'c'], ['d', 'g'])
  expect(keys).toEqual(['d', 'g', 'a', 'b', 'c']);
  done();
});