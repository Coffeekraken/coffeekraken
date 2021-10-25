var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __STheme from '../STheme';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
describe('s-theme.node.STheme', () => {
    it('Should instanciate correctly the default theme', (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        new __STheme();
        done();
    }));
    it('Should throw an error if the passed theme does not exists', (done) => {
        try {
            new __STheme('IDontExists');
        }
        catch (e) {
            done();
        }
    });
    it('Should loop correctly on colors', (done) => {
        const theme = new __STheme();
        let isError = false;
        theme.loopOnColors(({ name, value }) => {
            if (!name || !value)
                isError = true;
        });
        expect(isError).toBe(false);
        done();
    });
    it('Should loop correctly on colors and stop when return -1 or false', (done) => {
        const theme = new __STheme();
        let i = 0;
        theme.loopOnColors(({ name, value }) => {
            i++;
            if (i >= 10)
                return false;
        });
        expect(i).toBe(10);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGhlbWUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxFQUFFLENBQUMsZ0RBQWdELEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNoRSxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2YsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDJEQUEyRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckUsSUFBSTtZQUNBLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQy9CO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLEVBQUUsQ0FBQztTQUNWO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDNUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxDQUFDLEVBQUUsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQUUsT0FBTyxLQUFLLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9