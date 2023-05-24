"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           transition
 * @as              @sugar.transition
 * @namespace      node.mixin.transition
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the needed css to apply a transition setted in
 * the config.theme.transition configuration stack like "slow", "default" and "fast"
 *
 * @param           {String}        [name='default']            The transition you want to apply
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.transition($1)
 *
 * @example        css
 * \@sugar.platform.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginTransitionMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                default: 'default',
            },
        };
    }
}
exports.interface = postcssSugarPluginTransitionMixinInterface;
/**
 * @name           transition
 * @namespace      mixins.transition
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows apply a transition specified in the theme config like "fast", "slow" and "slow" or others you've been defined
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.transition(fast);
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const vars = [
        `transition: sugar.transition(${finalParams.name}) ${finalParams.name !== 'default' ? '!important' : ''};`,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNzRCwrREFBUztBQU1oRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsR0FBRyxrQkFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQWE7UUFDbkIsZ0NBQWdDLFdBQVcsQ0FBQyxJQUFJLEtBQzVDLFdBQVcsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ3BELEdBQUc7S0FDTixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQW5CRCw0QkFtQkMifQ==