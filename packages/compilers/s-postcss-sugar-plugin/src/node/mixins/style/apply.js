"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginStyleApplyMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginStyleApplyMixinInterface;
postcssSugarPluginStyleApplyMixinInterface.definition = {
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
        throw new Error(`<red>[postcss.sugar.style.apply]</red> Sorry but to apply a style you MUST specify a name for it`);
    }
    // @ts-ignore
    //   if (!global._definedStyles[finalParams.name]) {
    //     throw new Error(
    //       `<red>[postcss.sugar.style.apply]</red> Sorry but the requested style "<yellow>${
    //         finalParams.name
    //       }</yellow>" has not been defined. Here's the list of available style: <green>${Object.keys(
    //         // @ts-ignore
    //         global._definedStyles
    //       ).join(',')}</green>`
    //     );
    //   }
    const vars = [];
    // @ts-ignore
    if (!global._definedStyles[finalParams.name]) {
        vars.push(`content: "s-style-${finalParams.name}"`);
    }
    else {
        vars.push(`@extend .s-style-${finalParams.name}`);
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFHckQsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTs7QUFRZCwrREFBUztBQVB2RCxxREFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFRSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO0lBQzFCLGFBQWE7SUFDYixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztDQUM1QjtBQUNELG1CQUNFLE1BQXdELEVBQ3hELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLEdBQUcsa0JBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0dBQWtHLENBQ25HLENBQUM7S0FDSDtJQUNELGFBQWE7SUFDYixvREFBb0Q7SUFDcEQsdUJBQXVCO0lBQ3ZCLDBGQUEwRjtJQUMxRiwyQkFBMkI7SUFDM0Isb0dBQW9HO0lBQ3BHLHdCQUF3QjtJQUN4QixnQ0FBZ0M7SUFDaEMsOEJBQThCO0lBQzlCLFNBQVM7SUFDVCxNQUFNO0lBRU4sTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBQzFCLGFBQWE7SUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7S0FDckQ7U0FBTTtRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFwQ0QsNEJBb0NDIn0=