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
// @ts-ignore
if (!global._printedStyles) {
    // @ts-ignore
    global._printedStyles = [];
}
function default_1({ params, atRule, processNested, settings }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    if (
    // @ts-ignore
    !global._definedStyles[finalParams.name] ||
        settings.target !== 'global') {
        vars.push(`content: "s-style-${finalParams.name}"`);
    }
    else {
        vars.push(`@extend .s-style-${finalParams.name}`);
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFHckQsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTs7QUFRZCwrREFBUztBQVB2RCxxREFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFRSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO0lBQzFCLGFBQWE7SUFDYixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztDQUM1QjtBQUNELGFBQWE7QUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUMxQixhQUFhO0lBQ2IsTUFBTSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7Q0FDNUI7QUFDRCxtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsUUFBUSxFQU1UO0lBQ0MsTUFBTSxXQUFXLEdBQUcsa0JBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQjtJQUNFLGFBQWE7SUFDYixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN4QyxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFDNUI7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUNyRDtTQUFNO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbkQ7SUFFRCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQTdCRCw0QkE2QkMifQ==