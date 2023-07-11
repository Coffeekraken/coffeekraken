"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flatten_js_1 = __importDefault(require("../../shared/object/flatten.js"));
const packageJsonSync_js_1 = __importDefault(require("./packageJsonSync.js"));
function __replacePackageJsonTokens(string, settings) {
    const set = Object.assign({}, settings);
    // search for tokens
    const tokensMatches = string.match(/%packageJson\.[a-zA-Z0-9\.]+;?/gm);
    if (!tokensMatches)
        return string;
    const packageJson = (0, packageJsonSync_js_1.default)();
    const flatPackageJson = (0, flatten_js_1.default)(packageJson, {
        array: true,
    });
    tokensMatches.forEach((match) => {
        const dotPath = match.replace(/^%packageJson\./, '').replace(/;$/, '');
        const value = flatPackageJson[dotPath];
        if (value === undefined)
            return;
        // @ts-ignore
        string = string.replaceAll(match, value);
    });
    return string;
}
exports.default = __replacePackageJsonTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQXVEO0FBQ3ZELDhFQUFxRDtBQTBCckQsU0FBd0IsMEJBQTBCLENBQzlDLE1BQWMsRUFDZCxRQUFxRDtJQUVyRCxNQUFNLEdBQUcsR0FBRyxrQkFDTCxRQUFRLENBQ2QsQ0FBQztJQUVGLG9CQUFvQjtJQUNwQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFFdkUsSUFBSSxDQUFDLGFBQWE7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUVsQyxNQUFNLFdBQVcsR0FBRyxJQUFBLDRCQUFpQixHQUFFLENBQUM7SUFDeEMsTUFBTSxlQUFlLEdBQUcsSUFBQSxvQkFBUyxFQUFDLFdBQVcsRUFBRTtRQUMzQyxLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztJQUVILGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM1QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksS0FBSyxLQUFLLFNBQVM7WUFBRSxPQUFPO1FBQ2hDLGFBQWE7UUFDYixNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBM0JELDZDQTJCQyJ9