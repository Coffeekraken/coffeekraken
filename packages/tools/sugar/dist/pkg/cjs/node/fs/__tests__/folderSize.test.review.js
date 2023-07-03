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
const folderSize_1 = __importDefault(require("../folderSize"));
describe('sugar.node.fs.folderSize', () => {
    it('Should get a folder size correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const size = yield (0, folderSize_1.default)(`${__dirname}/data/hashfolder`);
        expect(size).toBe('190 B');
    }));
    it('Should get a folder size correctly and return it without any formatting', () => __awaiter(void 0, void 0, void 0, function* () {
        const size = yield (0, folderSize_1.default)(`${__dirname}/data/hashfolder`, false);
        expect(size).toBe(190);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXlDO0FBQ3pDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLEdBQVMsRUFBRTtRQUNoRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsb0JBQVksRUFBQyxHQUFHLFNBQVMsa0JBQWtCLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMseUVBQXlFLEVBQUUsR0FBUyxFQUFFO1FBQ3JGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxvQkFBWSxFQUFDLEdBQUcsU0FBUyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9