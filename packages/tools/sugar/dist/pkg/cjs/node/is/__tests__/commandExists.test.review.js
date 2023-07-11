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
const isCommandExists_js_1 = __importDefault(require("../isCommandExists.js"));
describe('sugar.node.command.isCommandExists', () => {
    it('Should get the "ls" basic system command correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, isCommandExists_js_1.default)('ls');
        expect(res).toBe(true);
    }));
    it('Should get the return false when target a command that does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, isCommandExists_js_1.default)('lsfwefwcwefwefw');
        expect(res).toBe(false);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0VBQXNEO0FBQ3RELFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQVMsRUFBRTtRQUNoRSxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsNEJBQWlCLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLEdBQVMsRUFBRTtRQUNwRixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsNEJBQWlCLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9