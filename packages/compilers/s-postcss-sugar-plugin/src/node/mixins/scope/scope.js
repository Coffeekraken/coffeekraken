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
function default_1(params, atRule, processNested) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFNckQsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTs7QUFTZCwwREFBUztBQVJsRCxnREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVFKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxtQkFDRSxNQUFtRCxFQUNuRCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxHQUFHLGdCQUNsQixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixhQUFhO0lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3Q0FBd0MsRUFBRTtRQUNwRCxhQUFhO1FBQ2IsTUFBTSxDQUFDLHdDQUF3QyxHQUFHLEVBQUUsQ0FBQztLQUN0RDtJQUVELGFBQWE7SUFDYiwrQkFBK0I7SUFDL0IsTUFBTSxDQUFDLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekUsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN2RCxDQUFDO0lBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV4QixhQUFhO0lBQ2IsTUFBTSxDQUFDLHdDQUF3QztRQUM3QyxhQUFhO1FBQ2IsTUFBTSxDQUFDLHdDQUF3QyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBN0JELDRCQTZCQyJ9