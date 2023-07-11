var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __folderSize from '../folderSize.js';
describe('sugar.node.fs.folderSize', () => {
    it('Should get a folder size correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const size = yield __folderSize(`${__dirname}/data/hashfolder`);
        expect(size).toBe('190 B');
    }));
    it('Should get a folder size correctly and return it without any formatting', () => __awaiter(void 0, void 0, void 0, function* () {
        const size = yield __folderSize(`${__dirname}/data/hashfolder`, false);
        expect(size).toBe(190);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLEdBQVMsRUFBRTtRQUNoRCxNQUFNLElBQUksR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLFNBQVMsa0JBQWtCLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMseUVBQXlFLEVBQUUsR0FBUyxFQUFFO1FBQ3JGLE1BQU0sSUFBSSxHQUFHLE1BQU0sWUFBWSxDQUFDLEdBQUcsU0FBUyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9