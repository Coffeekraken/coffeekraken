var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __matchGlob from '../matchGlob';
describe('sugar.node.glob.matchGlob', () => {
    it('Should resolve the passed glob correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', `data/**/*`, {
            cwd: __dirname,
        });
        expect(match).toBe(true);
    }));
    it('Should resolve the passed glob with a content regex correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', `data/**/*:/.*@namespace.*/gm`, {
            cwd: __dirname,
        });
        expect(match).toBe(true);
    }));
    it('Should not match the passed glob with a incorrect content regex correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', `data/**/*:/.*@naspace.*/gm`, {
            cwd: __dirname,
        });
        expect(match).toBe(false);
    }));
    it('Should not match the passed glob with a correct and incorrect content regex correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', [`data/**/*:/.*@naspace.*/gm`, `data/**/*:/.*@namespace.*/gm`], {
            cwd: __dirname,
        });
        expect(match).toBe(true);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hHbG9iLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRjaEdsb2IudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFFdkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3RELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLEVBQUU7WUFDMUQsR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLCtEQUErRCxFQUFFLEdBQVMsRUFBRTtRQUMzRSxNQUFNLEtBQUssR0FBRyxXQUFXLENBQ3JCLHFCQUFxQixFQUNyQiw4QkFBOEIsRUFDOUI7WUFDSSxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUNKLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMkVBQTJFLEVBQUUsR0FBUyxFQUFFO1FBQ3ZGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FDckIscUJBQXFCLEVBQ3JCLDRCQUE0QixFQUM1QjtZQUNJLEdBQUcsRUFBRSxTQUFTO1NBQ2pCLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyx1RkFBdUYsRUFBRSxHQUFTLEVBQUU7UUFDbkcsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUNyQixxQkFBcUIsRUFDckIsQ0FBQyw0QkFBNEIsRUFBRSw4QkFBOEIsQ0FBQyxFQUM5RDtZQUNJLEdBQUcsRUFBRSxTQUFTO1NBQ2pCLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=