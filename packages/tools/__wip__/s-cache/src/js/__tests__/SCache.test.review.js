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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLE1BQU0sTUFBTSxXQUFXLENBQUM7QUFFL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsdUJBQXVCLEVBQUU7SUFDaEQsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsaURBQWlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMvRCxDQUFDLEdBQVMsRUFBRTtRQUNWLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7WUFDNUIsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGlEQUFpRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDL0QsQ0FBQyxHQUFTLEVBQUU7UUFDVixNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixLQUFLLEVBQUUsT0FBTztTQUNmLENBQUMsQ0FBQztRQUNILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsb0RBQW9ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNsRSxDQUFDLEdBQVMsRUFBRTtRQUNWLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=