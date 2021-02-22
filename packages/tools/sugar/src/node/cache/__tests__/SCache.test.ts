import SCache from '../SCache';

const cache = new SCache('sugar-node-cache-SCache');

test('sugar.node.cache.SCache: Set an item in the cache', (done) => {
  (async () => {
    await cache.set('myCoolItem', {
      hello: 'world'
    });
    done();
  })();
});

test('sugar.node.cache.SCache: Get an item in the cache', (done) => {
  (async () => {
    const item = await cache.get('myCoolItem');
    expect(item).toEqual({
      hello: 'world'
    });
    done();
  })();
});

test('sugar.node.cache.SCache: Delete an item in the cache', (done) => {
  (async () => {
    await cache.delete('myCoolItem');
    const item = await cache.get('myCoolItem');
    expect(item).toBe(null);
    done();
  })();
});

test('sugar.node.cache.SCache: Get an item in the cache using an hash', (done) => {
  (async () => {
    const item = {
      hello: 'world'
    };
    await cache.set('myCoolItem', item, {
      context: '94u8u9h87h87g87gzuwguzguzguzwg'
    });
    const getted = await cache.get('myCoolItem', {
      context: '94u8u9h87h87g87gzuwguzguzguzwg'
    });
    expect(getted).toEqual(item);
    done();
  })();
});

test('sugar.node.cache.SCache: Get an item in the cache using an object hash', (done) => {
  (async () => {
    const item = {
      hello: 'world'
    };
    const context = {
      plop: 'youhou'
    };
    await cache.set('myCoolItemObjectContext', item, {
      context
    });
    const getted = await cache.get('myCoolItemObjectContext', {
      context
    });
    expect(getted).toEqual(item);
    done();
  })();
});
