"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const flatten_1 = __importDefault(require("@coffeekraken/sugar/shared/object/flatten"));
const theme_1 = __importStar(require("../../utils/theme"));
class postcssSugarPluginThemeinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginThemeinInterface;
postcssSugarPluginThemeinInterface.definition = {
    theme: theme_1.themeDefinition
};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ theme: '' }, params);
    const themesObj = theme_1.default().themes;
    if (!themesObj[finalParams.theme])
        throw new Error(`Sorry but the requested theme "<yellow>${finalParams.theme}</yellow>" does not exists...`);
    // @ts-ignore
    const flattenedTheme = flatten_1.default(themesObj[finalParams.theme]);
    const vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
        vars.push(`--s-theme-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
    });
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELHdGQUFrRTtBQUNsRSwyREFBNkQ7QUFFN0QsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTs7QUFVZCx1REFBUztBQVQvQyw2Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRSx1QkFBZTtDQUN2QixDQUFDO0FBUUosbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLFdBQVcsQ0FBQyxLQUFLLCtCQUErQixDQUMzRixDQUFDO0lBRUosYUFBYTtJQUNiLE1BQU0sY0FBYyxHQUFHLGlCQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlFLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFsQ0QsNEJBa0NDIn0=