"use strict";
const SCache = require('../SCache');
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
