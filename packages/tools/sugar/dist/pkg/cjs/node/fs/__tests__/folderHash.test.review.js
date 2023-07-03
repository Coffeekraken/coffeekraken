"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderHashSync_1 = __importDefault(require("../folderHashSync"));
describe('sugar.node.fs.folderHash', () => {
    it('Should hash correctly a simple folder', () => {
        const hash = (0, folderHashSync_1.default)(`${__dirname}/data/hashfolder`);
        expect(hash).toBe('0d0cd3c0b84f67987abe33d70abd054d4c30243f28ca7917583e74ebcc29f428');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQWlEO0FBQ2pELFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtRQUM3QyxNQUFNLElBQUksR0FBRyxJQUFBLHdCQUFnQixFQUFDLEdBQUcsU0FBUyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2Isa0VBQWtFLENBQ3JFLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=