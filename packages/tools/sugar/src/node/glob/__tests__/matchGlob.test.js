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
    it('Should resolve the passed glob correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', `data/**/*`, {
            cwd: __dirname
        });
        expect(match).toBe(true);
        done();
    }));
    it('Should resolve the passed glob with a content regex correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', `data/**/*:/.*@namespace.*/gm`, {
            cwd: __dirname
        });
        expect(match).toBe(true);
        done();
    }));
    it('Should not match the passed glob with a incorrect content regex correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', `data/**/*:/.*@naspace.*/gm`, {
            cwd: __dirname
        });
        expect(match).toBe(false);
        done();
    }));
    it('Should not match the passed glob with a correct and incorrect content regex correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const match = __matchGlob('data/myCoolData.txt', [`data/**/*:/.*@naspace.*/gm`, `data/**/*:/.*@namespace.*/gm`], {
            cwd: __dirname
        });
        expect(match).toBe(true);
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hHbG9iLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRjaEdsb2IudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFFdkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxFQUFFLENBQUMsMENBQTBDLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUM1RCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMscUJBQXFCLEVBQUUsV0FBVyxFQUFFO1lBQzVELEdBQUcsRUFBRSxTQUFTO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNqRixNQUFNLEtBQUssR0FBRyxXQUFXLENBQ3ZCLHFCQUFxQixFQUNyQiw4QkFBOEIsRUFDOUI7WUFDRSxHQUFHLEVBQUUsU0FBUztTQUNmLENBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDJFQUEyRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDN0YsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUN2QixxQkFBcUIsRUFDckIsNEJBQTRCLEVBQzVCO1lBQ0UsR0FBRyxFQUFFLFNBQVM7U0FDZixDQUNGLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyx1RkFBdUYsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3pHLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FDdkIscUJBQXFCLEVBQ3JCLENBQUMsNEJBQTRCLEVBQUUsOEJBQThCLENBQUMsRUFDOUQ7WUFDRSxHQUFHLEVBQUUsU0FBUztTQUNmLENBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==