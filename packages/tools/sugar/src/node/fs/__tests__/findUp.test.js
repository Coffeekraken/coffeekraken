var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __findUp from '../findUp';
describe('sugar.node.fs.findUp', () => {
    it('Should find a simple file upward correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __findUp('file.jpg', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res[0].path).toBe(`${__dirname}/data/file.jpg`);
    }));
    it('Should find some files upward using glob correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __findUp('file.*', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res.length).toBe(3);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFVwLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kVXAudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDakMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBUyxFQUFFO1FBQ3hELE1BQU0sR0FBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxHQUFHLEVBQUUsR0FBRyxTQUFTLGlCQUFpQjtTQUNyQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQVMsRUFBRTtRQUNoRSxNQUFNLEdBQUcsR0FBRyxNQUFNLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakMsR0FBRyxFQUFFLEdBQUcsU0FBUyxpQkFBaUI7U0FDckMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=