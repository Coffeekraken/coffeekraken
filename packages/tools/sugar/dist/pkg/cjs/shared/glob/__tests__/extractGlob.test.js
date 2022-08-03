"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extractGlob_1 = __importDefault(require("../extractGlob"));
describe('sugar.js.glob.extractGlob', () => {
    it('Should extract none glob part correctly', () => {
        expect((0, extractGlob_1.default)('/Users/olivierbossel/data/web/coffeekraken/coffeekraken/toolkits/sugar/src/js/**/*.js')).toBe('**/*.js');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUVBQTJDO0FBRTNDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtRQUNqRCxNQUFNLENBQ0osSUFBQSxxQkFBYSxFQUNYLHVGQUF1RixDQUN4RixDQUNGLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==