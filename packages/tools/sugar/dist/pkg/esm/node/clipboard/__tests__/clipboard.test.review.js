var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __copy from '../copy';
import __read from '../read';
describe('sugar.node.clipboad', () => {
    it('Should copy and past a text value correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'hello world';
        __copy(text);
        expect(text).toBe(__read());
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDN0IsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxFQUFFLENBQUMsNkNBQTZDLEVBQUUsR0FBUyxFQUFFO1FBQ3pELE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=