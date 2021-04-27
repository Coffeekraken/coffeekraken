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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../SCache"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SCache_1 = __importDefault(require("../SCache"));
    const cache = new SCache_1.default('sugar-js-cache-SCache', {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHVEQUErQjtJQUUvQixNQUFNLEtBQUssR0FBRyxJQUFJLGdCQUFNLENBQUMsdUJBQXVCLEVBQUU7UUFDaEQsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsaURBQWlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvRCxDQUFDLEdBQVMsRUFBRTtZQUNWLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7Z0JBQzVCLEtBQUssRUFBRSxPQUFPO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxpREFBaUQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9ELENBQUMsR0FBUyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxPQUFPO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxvREFBb0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xFLENBQUMsR0FBUyxFQUFFO1lBQ1YsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUMifQ==