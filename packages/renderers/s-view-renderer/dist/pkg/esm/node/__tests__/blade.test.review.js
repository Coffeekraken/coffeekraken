var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SViewRenderer from '../SViewRenderer';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
describe('s-view.blade', () => {
    it('Should compile the passed blade view correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const view = new __SViewRenderer({
            viewRenderer: {
                rootDirs: [`${__dirname}/views`],
            },
        });
        const res = yield view.render('default', {});
        expect(res.value).not.toBeUndefined();
        expect(res.value.includes('<title>Smoth</title>')).toBe(true);
        expect(res.view).not.toBeUndefined();
        expect(res.startTime).not.toBeUndefined();
        expect(res.endTime).not.toBeUndefined();
        expect(res.duration).not.toBeUndefined();
        expect(res.formatedDuration).not.toBeUndefined();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO0lBQzFCLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFTLEVBQUU7UUFDNUQsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQUM7WUFDN0IsWUFBWSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEdBQUcsU0FBUyxRQUFRLENBQUM7YUFDbkM7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDckQsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=