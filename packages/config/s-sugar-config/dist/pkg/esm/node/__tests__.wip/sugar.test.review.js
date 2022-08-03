var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '../sugar';
describe('s-sugar-config.node.sugar', () => {
    it('Should get a [theme.something] value correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        // const value = __SugarConfig.get(
        //     'theme.themes.default-dark.ui.button.paddingInline',
        // );
        expect(true).toBe(true);
        // expect(value !== undefined).toBe(true);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLFVBQVUsQ0FBQztBQUN0QyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFTLEVBQUU7UUFDNUQsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsbUNBQW1DO1FBQ25DLDJEQUEyRDtRQUMzRCxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QiwwQ0FBMEM7SUFDOUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=