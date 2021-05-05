"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginStyleDefineMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginStyleDefineMixinInterface;
postcssSugarPluginStyleDefineMixinInterface.definition = {
    name: {
        type: 'String',
        required: true
    }
};
/**
 * @name           scope
 * @namespace      mixins.theme
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to start a scope whithin which the passed theme will be used to generate
 * the different styles.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.theme.scope(dark) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
if (!global._definedStyles) {
    // @ts-ignore
    global._definedStyles = {};
}
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!finalParams.name) {
        throw new Error(`<red>[postcss.sugar.style]</red> Sorry but to define a style you MUST specify a name for it`);
    }
    if (atRule.parent && atRule.parent.type !== 'root') {
        throw new Error(`<red>[postcss.sugar.style]</red> Sorry but this mixin MUST be called at stylesheet root`);
    }
    const styleCss = atRule.nodes
        .map((node) => {
        if (node.type === 'decl')
            return node.toString() + ';';
        return node.toString();
    })
        .join('\n');
    // @ts-ignore
    global._definedStyles[finalParams.name] = processNested([`.s-style-${finalParams.name} {`, styleCss, `}`].join('\n'));
    const AST = processNested([].join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUdyRCxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZOztBQVFkLGdFQUFTO0FBUHhELHNEQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQVFKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxhQUFhO0FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7SUFDMUIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0NBQzVCO0FBQ0QsbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLEdBQUcsa0JBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkZBQTZGLENBQzlGLENBQUM7S0FDSDtJQUNELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FDYix5RkFBeUYsQ0FDMUYsQ0FBQztLQUNIO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUs7U0FDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFZCxhQUFhO0lBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUNyRCxDQUFDLFlBQVksV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzdELENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQXRDRCw0QkFzQ0MifQ==