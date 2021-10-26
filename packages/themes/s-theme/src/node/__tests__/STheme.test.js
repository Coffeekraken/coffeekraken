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
    it('Should instanciate correctly the default theme', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        new __STheme();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGhlbWUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBUyxFQUFFO1FBQzVELE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywyREFBMkQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JFLElBQUk7WUFDQSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMvQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUM7U0FDVjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVFLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDbkMsQ0FBQyxFQUFFLENBQUM7WUFDSixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==