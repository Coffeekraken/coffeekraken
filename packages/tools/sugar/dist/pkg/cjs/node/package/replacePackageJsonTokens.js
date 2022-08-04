"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonSync_1 = __importDefault(require("./jsonSync"));
const flatten_1 = __importDefault(require("../../shared/object/flatten"));
function replacePackageJsonTokens(string, settings) {
    const set = Object.assign({}, settings);
    // search for tokens
    const tokensMatches = string.match(/%packageJson\.[a-zA-Z0-9\.]+;?/gm);
    if (!tokensMatches)
        return string;
    const packageJson = (0, jsonSync_1.default)();
    const flatPackageJson = (0, flatten_1.default)(packageJson, {
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
exports.default = replacePackageJsonTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQXVDO0FBQ3ZDLDBFQUFvRDtBQXdCcEQsU0FBd0Isd0JBQXdCLENBQzVDLE1BQWMsRUFDZCxRQUFxRDtJQUVyRCxNQUFNLEdBQUcsR0FBRyxrQkFDTCxRQUFRLENBQ2QsQ0FBQztJQUVGLG9CQUFvQjtJQUNwQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFFdkUsSUFBSSxDQUFDLGFBQWE7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUVsQyxNQUFNLFdBQVcsR0FBRyxJQUFBLGtCQUFhLEdBQUUsQ0FBQztJQUNwQyxNQUFNLGVBQWUsR0FBRyxJQUFBLGlCQUFTLEVBQUMsV0FBVyxFQUFFO1FBQzNDLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0lBRUgsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzVCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RSxNQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxLQUFLLEtBQUssU0FBUztZQUFFLE9BQU87UUFDaEMsYUFBYTtRQUNiLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUEzQkQsMkNBMkJDIn0=