var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SCache from '../SCache';
const cache = new SCache('sugar-js-cache-SCache', {
    adapter: 'ls'
});
test('sugar.js.cache.SCache: Set an item in the cache', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield cache.set('myCoolItem', {
            hello: 'world'
        });
        done();
    }))();
});
test('sugar.js.cache.SCache: Get an item in the cache', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield cache.get('myCoolItem');
        expect(item).toEqual({
            hello: 'world'
        });
        done();
    }))();
});
test('sugar.js.cache.SCache: Delete an item in the cache', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield cache.delete('myCoolItem');
        const item = yield cache.get('myCoolItem');
        expect(item).toBe(null);
        done();
    }))();
});
