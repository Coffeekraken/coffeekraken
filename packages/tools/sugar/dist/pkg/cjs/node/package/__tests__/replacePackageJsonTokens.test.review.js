"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replacePackageJsonTokens_js_1 = __importDefault(require("../replacePackageJsonTokens.js"));
describe('@coffeekraken.sugar.node.meta.replacePackageJsonTokens', () => {
    it('Should replace tokens correctly', () => {
        const res = (0, replacePackageJsonTokens_js_1.default)(`
            Hello %packageJson.name

            Hope you are doing well...
            "%packageJson.description"

            Best regards
            %packageJson.author (%packageJson.version)
        `);
        expect(res.match(/%packageJson\./gm)).toBe(null);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUdBQXdFO0FBRXhFLFFBQVEsQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7SUFDcEUsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtRQUN2QyxNQUFNLEdBQUcsR0FBRyxJQUFBLHFDQUEwQixFQUFDOzs7Ozs7OztTQVF0QyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==