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
const matchGlob_1 = __importDefault(require("../matchGlob"));
describe('sugar.node.glob.matchGlob', () => {
    it('Should resolve the passed glob correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = (0, matchGlob_1.default)('data/myCoolData.txt', `data/**/*`, {
            cwd: __dirname,
        });
        expect(match).toBe(true);
    }));
    it('Should resolve the passed glob with a content regex correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = (0, matchGlob_1.default)('data/myCoolData.txt', `data/**/*:/.*@namespace.*/gm`, {
            cwd: __dirname,
        });
        expect(match).toBe(true);
    }));
    it('Should not match the passed glob with a incorrect content regex correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = (0, matchGlob_1.default)('data/myCoolData.txt', `data/**/*:/.*@naspace.*/gm`, {
            cwd: __dirname,
        });
        expect(match).toBe(false);
    }));
    it('Should not match the passed glob with a correct and incorrect content regex correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const match = (0, matchGlob_1.default)('data/myCoolData.txt', [`data/**/*:/.*@naspace.*/gm`, `data/**/*:/.*@namespace.*/gm`], {
            cwd: __dirname,
        });
        expect(match).toBe(true);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQXVDO0FBRXZDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLEdBQVMsRUFBRTtRQUN0RCxNQUFNLEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQUMscUJBQXFCLEVBQUUsV0FBVyxFQUFFO1lBQzFELEdBQUcsRUFBRSxTQUFTO1NBQ2pCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywrREFBK0QsRUFBRSxHQUFTLEVBQUU7UUFDM0UsTUFBTSxLQUFLLEdBQUcsSUFBQSxtQkFBVyxFQUNyQixxQkFBcUIsRUFDckIsOEJBQThCLEVBQzlCO1lBQ0ksR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDJFQUEyRSxFQUFFLEdBQVMsRUFBRTtRQUN2RixNQUFNLEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQ3JCLHFCQUFxQixFQUNyQiw0QkFBNEIsRUFDNUI7WUFDSSxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUNKLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsdUZBQXVGLEVBQUUsR0FBUyxFQUFFO1FBQ25HLE1BQU0sS0FBSyxHQUFHLElBQUEsbUJBQVcsRUFDckIscUJBQXFCLEVBQ3JCLENBQUMsNEJBQTRCLEVBQUUsOEJBQThCLENBQUMsRUFDOUQ7WUFDSSxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUNKLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9