"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginStyleMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginStyleMixinInterface;
postcssSugarPluginStyleMixinInterface.definition = {
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
function default_1(params, atRule, processNested) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!finalParams.name) {
        throw new Error(`<red>[postcss.sugar.style]</red> Sorry but to define a style you MUST specify a name for it`);
    }
    if (atRule.parent && atRule.parent.type !== 'root') {
        throw new Error(`<red>[postcss.sugar.style]</red> Sorry but this mixin MUST be called at stylesheet root`);
    }
    // @ts-ignore
    global._definedStyles[finalParams.name] = atRule;
    const vars = [
        `.s-style-${finalParams.name} {`,
        processNested(atRule.nodes),
        `}`
    ];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFHckQsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTs7QUFRZCwwREFBUztBQVBsRCxnREFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFRSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO0lBQzFCLGFBQWE7SUFDYixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztDQUM1QjtBQUNELG1CQUNFLE1BQW1ELEVBQ25ELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLEdBQUcsa0JBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkZBQTZGLENBQzlGLENBQUM7S0FDSDtJQUNELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FDYix5RkFBeUYsQ0FDMUYsQ0FBQztLQUNIO0lBRUQsYUFBYTtJQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUVqRCxNQUFNLElBQUksR0FBYTtRQUNyQixZQUFZLFdBQVcsQ0FBQyxJQUFJLElBQUk7UUFDaEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsR0FBRztLQUNKLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQS9CRCw0QkErQkMifQ==