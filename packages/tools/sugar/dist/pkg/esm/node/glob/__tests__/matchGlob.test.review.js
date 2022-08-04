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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQztBQUV2QyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFTLEVBQUU7UUFDdEQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixFQUFFLFdBQVcsRUFBRTtZQUMxRCxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUUsR0FBUyxFQUFFO1FBQzNFLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FDckIscUJBQXFCLEVBQ3JCLDhCQUE4QixFQUM5QjtZQUNJLEdBQUcsRUFBRSxTQUFTO1NBQ2pCLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywyRUFBMkUsRUFBRSxHQUFTLEVBQUU7UUFDdkYsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUNyQixxQkFBcUIsRUFDckIsNEJBQTRCLEVBQzVCO1lBQ0ksR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHVGQUF1RixFQUFFLEdBQVMsRUFBRTtRQUNuRyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQ3JCLHFCQUFxQixFQUNyQixDQUFDLDRCQUE0QixFQUFFLDhCQUE4QixDQUFDLEVBQzlEO1lBQ0ksR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==