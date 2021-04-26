"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = require("../../utils/theme");
class postcssSugarPluginThemeScopeMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginThemeScopeMixinInterface;
postcssSugarPluginThemeScopeMixinInterface.definition = {
    theme: theme_1.themeDefinition
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
function default_1(params, atRule, processNested) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    // @ts-ignore
    if (!global._postcssSugarPluginThemeScopeMixinTheme) {
        // @ts-ignore
        global._postcssSugarPluginThemeScopeMixinTheme = [];
    }
    // @ts-ignore
    global._postcssSugarPluginThemeScopeMixinTheme.push(finalParams.theme);
    const AST = processNested(atRule.nodes.map((node) => node.toString()).join('\n'));
    atRule.replaceWith(AST);
    // @ts-ignore
    global._postcssSugarPluginThemeScopeMixinTheme =
        // @ts-ignore
        global._postcssSugarPluginThemeScopeMixinTheme.slice(0, -1);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsNkNBQTZEO0FBRTdELE1BQU0sMENBQTJDLFNBQVEscUJBQVk7O0FBS2QsK0RBQVM7QUFKdkQscURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUUsdUJBQWU7Q0FDdkIsQ0FBQztBQVFKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxtQkFDRSxNQUF3RCxFQUN4RCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxHQUFHLGtCQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixhQUFhO0lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1Q0FBdUMsRUFBRTtRQUNuRCxhQUFhO1FBQ2IsTUFBTSxDQUFDLHVDQUF1QyxHQUFHLEVBQUUsQ0FBQztLQUNyRDtJQUVELGFBQWE7SUFDYixNQUFNLENBQUMsdUNBQXVDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2RSxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3ZELENBQUM7SUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLGFBQWE7SUFDYixNQUFNLENBQUMsdUNBQXVDO1FBQzVDLGFBQWE7UUFDYixNQUFNLENBQUMsdUNBQXVDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUEzQkQsNEJBMkJDIn0=