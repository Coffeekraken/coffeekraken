"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginScopeMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginScopeMixinInterface;
postcssSugarPluginScopeMixinInterface.definition = {
    scopes: {
        type: 'String',
        required: true,
        alias: 's'
    }
};
/**
 * @name           media
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.scope(color) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ scopes: '' }, (params !== null && params !== void 0 ? params : {}));
    // @ts-ignore
    if (!global._postcssSugarPluginScopeMixinScopesStack) {
        // @ts-ignore
        global._postcssSugarPluginScopeMixinScopesStack = [];
    }
    // @ts-ignore
    //   console.log('AD', scopes);
    global._postcssSugarPluginScopeMixinScopesStack.push(finalParams.scopes);
    const AST = processNested(atRule.nodes.map((node) => node.toString()).join('\n'));
    atRule.replaceWith(AST);
    // @ts-ignore
    global._postcssSugarPluginScopeMixinScopesStack =
        // @ts-ignore
        global._postcssSugarPluginScopeMixinScopesStack.slice(0, -1);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFPckQsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTs7QUFTZCwwREFBUztBQVJsRCxnREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVFKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsR0FBRyxnQkFDbEIsTUFBTSxFQUFFLEVBQUUsSUFDUCxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNsQixDQUFDO0lBRUYsYUFBYTtJQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsd0NBQXdDLEVBQUU7UUFDcEQsYUFBYTtRQUNiLE1BQU0sQ0FBQyx3Q0FBd0MsR0FBRyxFQUFFLENBQUM7S0FDdEQ7SUFFRCxhQUFhO0lBQ2IsK0JBQStCO0lBQy9CLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpFLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDdkQsQ0FBQztJQUNGLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFeEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyx3Q0FBd0M7UUFDN0MsYUFBYTtRQUNiLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQWpDRCw0QkFpQ0MifQ==