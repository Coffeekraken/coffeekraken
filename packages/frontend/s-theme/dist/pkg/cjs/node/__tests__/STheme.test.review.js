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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const STheme_js_1 = __importDefault(require("../STheme.js"));
describe('s-theme.node.STheme', () => {
    it('Should instanciate correctly the default theme', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        new STheme_js_1.default();
    }));
    it('Should throw an error if the passed theme does not exists', (done) => {
        try {
            new STheme_js_1.default('IDontExists');
        }
        catch (e) {
            done();
        }
    });
    it('Should loop correctly on colors', (done) => {
        const theme = new STheme_js_1.default();
        let isError = false;
        theme.loopOnColors(({ name, value }) => {
            if (!name || !value)
                isError = true;
        });
        expect(isError).toBe(false);
        done();
    });
    it('Should loop correctly on colors and stop when return -1 or false', (done) => {
        const theme = new STheme_js_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELDZEQUFvQztBQUVwQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFTLEVBQUU7UUFDNUQsTUFBTSx3QkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksbUJBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMkRBQTJELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyRSxJQUFJO1lBQ0EsSUFBSSxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQy9CO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLEVBQUUsQ0FBQztTQUNWO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVFLE1BQU0sS0FBSyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ25DLENBQUMsRUFBRSxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksRUFBRTtnQkFBRSxPQUFPLEtBQUssQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=