var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __resolveGlob from '../resolveGlob';
describe('sugar.node.glob.resolveGlob', () => {
    it('Should resolve the passed glob correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const files = yield __resolveGlob(`data/**/*`, {
            cwd: __dirname
        });
        const file = files[0];
        expect(file.path.includes('src/node/glob/__tests__/data/myCoolData.txt')).toBe(true);
        expect(file.cwd.includes('src/node/glob/__tests__')).toBe(true);
        expect(file.relPath).toBe('data/myCoolData.txt');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmVHbG9iLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtJQUMzQyxFQUFFLENBQUMsMENBQTBDLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUM1RCxNQUFNLEtBQUssR0FBRyxNQUFNLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDN0MsR0FBRyxFQUFFLFNBQVM7U0FDZixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDZDQUE2QyxDQUFDLENBQ2xFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNqRCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9