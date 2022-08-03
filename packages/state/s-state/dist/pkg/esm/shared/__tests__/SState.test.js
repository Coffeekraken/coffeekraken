var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SState from '../SState';
describe('@coffeekraken.s-state', () => {
    it('Should create and destroy a simple state correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // await __SSugarConfig.load();
        const state = new __SState({
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
        const state = new __SState({
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
        const state = new __SState({
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
        const state = new __SState({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        }, {
            id: 'SState.test.ts',
            save: true,
        });
        state.sub.title = 'world';
        yield __wait(50);
        expect(state.sub.title).toBe('world');
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUVqQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxHQUFTLEVBQUU7UUFDaEUsK0JBQStCO1FBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxPQUFPO1lBQ2IsR0FBRyxFQUFFO2dCQUNELEtBQUssRUFBRSxLQUFLO2FBQ2Y7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywrREFBK0QsRUFBRSxHQUFTLEVBQUU7UUFDM0UsK0JBQStCO1FBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxPQUFPO1lBQ2IsR0FBRyxFQUFFO2dCQUNELEtBQUssRUFBRSxLQUFLO2FBQ2Y7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QixlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMkdBQTJHLEVBQUUsR0FBUyxFQUFFO1FBQ3ZILCtCQUErQjtRQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQztZQUN2QixJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRTtnQkFDRCxLQUFLLEVBQUUsS0FBSzthQUNmO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsZUFBZSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUUxQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQVMsRUFBRTtRQUNwRCwrQkFBK0I7UUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQ3RCO1lBQ0ksSUFBSSxFQUFFLE9BQU87WUFDYixHQUFHLEVBQUU7Z0JBQ0QsS0FBSyxFQUFFLEtBQUs7YUFDZjtTQUNKLEVBQ0Q7WUFDSSxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3BCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FDSixDQUFDO1FBRUYsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBRTFCLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==