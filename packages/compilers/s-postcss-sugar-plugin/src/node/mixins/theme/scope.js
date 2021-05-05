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
function default_1({ params, atRule, processNested }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsNkNBQTZEO0FBRTdELE1BQU0sMENBQTJDLFNBQVEscUJBQVk7O0FBS2QsK0RBQVM7QUFKdkQscURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUUsdUJBQWU7Q0FDdkIsQ0FBQztBQVFKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsR0FBRyxrQkFDZixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNsQixDQUFDO0lBRUYsYUFBYTtJQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsdUNBQXVDLEVBQUU7UUFDbkQsYUFBYTtRQUNiLE1BQU0sQ0FBQyx1Q0FBdUMsR0FBRyxFQUFFLENBQUM7S0FDckQ7SUFFRCxhQUFhO0lBQ2IsTUFBTSxDQUFDLHVDQUF1QyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdkUsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN2RCxDQUFDO0lBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV4QixhQUFhO0lBQ2IsTUFBTSxDQUFDLHVDQUF1QztRQUM1QyxhQUFhO1FBQ2IsTUFBTSxDQUFDLHVDQUF1QyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBL0JELDRCQStCQyJ9