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
const datetime_1 = require("@coffeekraken/sugar/datetime");
const SState_js_1 = __importDefault(require("../SState.js"));
describe('@coffeekraken.s-state', () => {
    it('Should create and destroy a simple state correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // await __SSugarConfig.load();
        const state = new SState_js_1.default({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        });
        expect(state.plop).toBe('hello');
        expect(state.sub.title).toBe('yop');
    }));
    it('Should create and listen for a simple string change correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // await __SSugarConfig.load();
        const state = new SState_js_1.default({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        });
        let listenerWorking = false;
        state.$set('sub.title', (data) => {
            listenerWorking = true;
        });
        state.sub.title = 'world';
        expect(listenerWorking).toBe(true);
        expect(state.sub.title).toBe('world');
    }));
    it('Should create and listen for a simple string change using "glob" notation in the event listener correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // await __SSugarConfig.load();
        const state = new SState_js_1.default({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        });
        let listenerWorking = false;
        state.$set('*', (data) => {
            listenerWorking = true;
        });
        state.sub.title = 'world';
        expect(listenerWorking).toBe(true);
        expect(state.sub.title).toBe('world');
    }));
    it('Should handle "save" adapter correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // await __SSugarConfig.load();
        const state = new SState_js_1.default({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        }, {
            id: 'SState.test.ts',
            save: true,
        });
        state.sub.title = 'world';
        yield (0, datetime_1.__wait)(50);
        expect(state.sub.title).toBe('world');
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBQ3RELDZEQUFvQztBQUVwQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxHQUFTLEVBQUU7UUFDaEUsK0JBQStCO1FBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksbUJBQVEsQ0FBQztZQUN2QixJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRTtnQkFDRCxLQUFLLEVBQUUsS0FBSzthQUNmO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUUsR0FBUyxFQUFFO1FBQzNFLCtCQUErQjtRQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFRLENBQUM7WUFDdkIsSUFBSSxFQUFFLE9BQU87WUFDYixHQUFHLEVBQUU7Z0JBQ0QsS0FBSyxFQUFFLEtBQUs7YUFDZjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFFMUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywyR0FBMkcsRUFBRSxHQUFTLEVBQUU7UUFDdkgsK0JBQStCO1FBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksbUJBQVEsQ0FBQztZQUN2QixJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRTtnQkFDRCxLQUFLLEVBQUUsS0FBSzthQUNmO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsZUFBZSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUUxQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQVMsRUFBRTtRQUNwRCwrQkFBK0I7UUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBUSxDQUN0QjtZQUNJLElBQUksRUFBRSxPQUFPO1lBQ2IsR0FBRyxFQUFFO2dCQUNELEtBQUssRUFBRSxLQUFLO2FBQ2Y7U0FDSixFQUNEO1lBQ0ksRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQ0osQ0FBQztRQUVGLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUUxQixNQUFNLElBQUEsaUJBQU0sRUFBQyxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=