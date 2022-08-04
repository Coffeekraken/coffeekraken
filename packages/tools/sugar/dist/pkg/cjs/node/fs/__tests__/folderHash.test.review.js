"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderHash_1 = __importDefault(require("../folderHash"));
describe('sugar.node.fs.folderHash', () => {
    it('Should hash correctly a simple folder', () => {
        const hash = (0, folderHash_1.default)(`${__dirname}/data/hashfolder`);
        expect(hash).toBe('0d0cd3c0b84f67987abe33d70abd054d4c30243f28ca7917583e74ebcc29f428');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQXlDO0FBQ3pDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtRQUM3QyxNQUFNLElBQUksR0FBRyxJQUFBLG9CQUFZLEVBQUMsR0FBRyxTQUFTLGtCQUFrQixDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDYixrRUFBa0UsQ0FDckUsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==