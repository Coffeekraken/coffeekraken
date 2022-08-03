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
const findUp_1 = __importDefault(require("../findUp"));
describe('sugar.node.fs.findUp', () => {
    it('Should find a simple file upward correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, findUp_1.default)('file.jpg', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res[0].path).toBe(`${__dirname}/data/file.jpg`);
    }));
    it('Should find some files upward using glob correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, findUp_1.default)('file.*', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res.length).toBe(3);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQWlDO0FBQ2pDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEdBQVMsRUFBRTtRQUN4RCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsZ0JBQVEsRUFBQyxVQUFVLEVBQUU7WUFDbkMsR0FBRyxFQUFFLEdBQUcsU0FBUyxpQkFBaUI7U0FDckMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLGdCQUFnQixDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxHQUFTLEVBQUU7UUFDaEUsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFBLGdCQUFRLEVBQUMsUUFBUSxFQUFFO1lBQ2pDLEdBQUcsRUFBRSxHQUFHLFNBQVMsaUJBQWlCO1NBQ3JDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9