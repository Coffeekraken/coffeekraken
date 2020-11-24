"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SCache_1 = __importDefault(require("../SCache"));
const cache = new SCache_1.default('sugar-js-cache-SCache', {
    adapter: 'ls'
});
test('sugar.js.cache.SCache: Set an item in the cache', (done) => {
    (async () => {
        await cache.set('myCoolItem', {
            hello: 'world'
        });
        done();
    })();
});
test('sugar.js.cache.SCache: Get an item in the cache', (done) => {
    (async () => {
        const item = await cache.get('myCoolItem');
        expect(item).toEqual({
            hello: 'world'
        });
        done();
    })();
});
test('sugar.js.cache.SCache: Delete an item in the cache', (done) => {
    (async () => {
        await cache.delete('myCoolItem');
        const item = await cache.get('myCoolItem');
        expect(item).toBe(null);
        done();
    })();
});
