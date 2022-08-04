var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __commandExists from '../commandExists';
describe('sugar.node.command.commandExists', () => {
    it('Should get the "ls" basic system command correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __commandExists('ls');
        expect(res).toBe(true);
    }));
    it('Should get the return false when target a command that does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield __commandExists('lsfwefwcwefwefw');
        expect(res).toBe(false);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQVMsRUFBRTtRQUNoRSxNQUFNLEdBQUcsR0FBRyxNQUFNLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsd0VBQXdFLEVBQUUsR0FBUyxFQUFFO1FBQ3BGLE1BQU0sR0FBRyxHQUFHLE1BQU0sZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==