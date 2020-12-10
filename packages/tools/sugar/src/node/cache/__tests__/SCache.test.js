"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SCache_1 = __importDefault(require("../SCache"));
const cache = new SCache_1.default('sugar-node-cache-SCache');
test('sugar.node.cache.SCache: Set an item in the cache', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield cache.set('myCoolItem', {
            hello: 'world'
        });
        done();
    }))();
});
test('sugar.node.cache.SCache: Get an item in the cache', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield cache.get('myCoolItem');
        expect(item).toEqual({
            hello: 'world'
        });
        done();
    }))();
});
test('sugar.node.cache.SCache: Delete an item in the cache', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield cache.delete('myCoolItem');
        const item = yield cache.get('myCoolItem');
        expect(item).toBe(null);
        done();
    }))();
});
//# sourceMappingURL=module.js.map