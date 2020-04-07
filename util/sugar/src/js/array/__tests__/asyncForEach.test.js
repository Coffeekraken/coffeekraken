const __asyncForEach = require('../asyncForEach');
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

test('sugar.js.array.asyncForEach: Simple async foreach execution', async done => {

  let i = 0;
  await __asyncForEach([1, 2, 3, 4], async idx => {
    await waitFor(200);
    i += idx;
  });
  expect(i).toBe(10);
  done();
});