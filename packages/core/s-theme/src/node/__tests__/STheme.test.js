"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const STheme_1 = __importDefault(require("../STheme"));
describe('s-theme.node.STheme', () => {
    it('Should instanciate correctly the default theme', (done) => {
        new STheme_1.default();
        done();
    });
    it('Should throw an error if the passed theme does not exists', (done) => {
        try {
            new STheme_1.default('IDontExists');
        }
        catch (e) {
            done();
        }
    });
    it('Should loop correctly on colors', (done) => {
        const theme = new STheme_1.default();
        let isError = false;
        theme.loopOnColors(({ name, modifier, value, previous, next }) => {
            if (!name || !modifier || !value || !previous || !next)
                isError = true;
        });
        expect(isError).toBe(false);
        done();
    });
    it('Should loop correctly on colors and stop when return -1 or false', (done) => {
        const theme = new STheme_1.default();
        let i = 0;
        theme.loopOnColors(({ name, modifier, value, previous, next }) => {
            i++;
            if (i >= 10)
                return false;
        });
        expect(i).toBe(10);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGhlbWUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVEQUFpQztBQUVqQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVELElBQUksZ0JBQVEsRUFBRSxDQUFDO1FBQ2YsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywyREFBMkQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3ZFLElBQUk7WUFDRixJQUFJLGdCQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDN0I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksRUFBRSxDQUFDO1NBQ1I7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksZ0JBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDOUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDL0QsQ0FBQyxFQUFFLENBQUM7WUFDSixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==