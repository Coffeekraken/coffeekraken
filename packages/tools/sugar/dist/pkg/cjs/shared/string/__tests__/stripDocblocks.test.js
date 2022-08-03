"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripDocblocks_1 = __importDefault(require("../stripDocblocks"));
describe('sugar.shared.string.stripDocblocks', () => {
    it('Should remove all docblocks correctly', () => {
        const txt = `
            /**
             * @name            something
             * 
             * Hello world
             * 
             * @param       {String}            something           Hello world
             * 
             * @since       2.0.0
              * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */

            Hello world
        
        `;
        const res = (0, stripDocblocks_1.default)(txt);
        expect(res.match(/\/\*\*/)).toBeNull();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQWlEO0FBQ2pELFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtRQUM3QyxNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Ozs7U0FjWCxDQUFDO1FBQ0YsTUFBTSxHQUFHLEdBQUcsSUFBQSx3QkFBZ0IsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==