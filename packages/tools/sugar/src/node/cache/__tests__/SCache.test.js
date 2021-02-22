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
test('sugar.node.cache.SCache: Get an item in the cache using an hash', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const item = {
            hello: 'world'
        };
        yield cache.set('myCoolItem', item, {
            context: '94u8u9h87h87g87gzuwguzguzguzwg'
        });
        const getted = yield cache.get('myCoolItem', {
            context: '94u8u9h87h87g87gzuwguzguzguzwg'
        });
        expect(getted).toEqual(item);
        done();
    }))();
});
test('sugar.node.cache.SCache: Get an item in the cache using an object hash', (done) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const item = {
            hello: 'world'
        };
        const context = {
            plop: 'youhou'
        };
        yield cache.set('myCoolItemObjectContext', item, {
            context
        });
        const getted = yield cache.get('myCoolItemObjectContext', {
            context
        });
        expect(getted).toEqual(item);
        done();
    }))();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUErQjtBQUUvQixNQUFNLEtBQUssR0FBRyxJQUFJLGdCQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUVwRCxJQUFJLENBQUMsbURBQW1ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNqRSxDQUFDLEdBQVMsRUFBRTtRQUNWLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7WUFDNUIsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLG1EQUFtRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakUsQ0FBQyxHQUFTLEVBQUU7UUFDVixNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixLQUFLLEVBQUUsT0FBTztTQUNmLENBQUMsQ0FBQztRQUNILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsc0RBQXNELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNwRSxDQUFDLEdBQVMsRUFBRTtRQUNWLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGlFQUFpRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDL0UsQ0FBQyxHQUFTLEVBQUU7UUFDVixNQUFNLElBQUksR0FBRztZQUNYLEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FBQztRQUNGLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxnQ0FBZ0M7U0FDMUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtZQUMzQyxPQUFPLEVBQUUsZ0NBQWdDO1NBQzFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyx3RUFBd0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ3RGLENBQUMsR0FBUyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLLEVBQUUsT0FBTztTQUNmLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRztZQUNkLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztRQUNGLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLEVBQUU7WUFDL0MsT0FBTztTQUNSLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRTtZQUN4RCxPQUFPO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=