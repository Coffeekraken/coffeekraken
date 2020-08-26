import SHashCache from '../SHashCache';

const cache = new SHashCache('sugar-js-cache-SHashCache', {
  adapter: 'fs'
});

const myObject = {
  something: 'cool',
  other: new Date()
};

describe('sugar.js.cache.SHashCache', () => {
  test('Set an item in the cache', (done) => {
    (async () => {
      await cache.set(myObject, {
        hello: 'world'
      });
      done();
    })();
  });
  test('Get an item from the cache', (done) => {
    (async () => {
      const value = await cache.get(myObject);
      expect(value).toEqual({
        hello: 'world'
      });
      done();
    })();
  });
});
