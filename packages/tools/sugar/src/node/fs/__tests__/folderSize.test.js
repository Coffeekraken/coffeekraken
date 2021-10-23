var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __folderSize from '../folderSize';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyU2l6ZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9sZGVyU2l6ZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFTLEVBQUU7UUFDaEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxZQUFZLENBQUMsR0FBRyxTQUFTLGtCQUFrQixDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHlFQUF5RSxFQUFFLEdBQVMsRUFBRTtRQUNyRixNQUFNLElBQUksR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLFNBQVMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==