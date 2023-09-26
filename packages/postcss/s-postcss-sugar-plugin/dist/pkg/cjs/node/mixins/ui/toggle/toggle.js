"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          toggle
 * @as              @s.ui.toggle
 * @namespace     node.mixin.ui.toggle
 * @type          PostcssMixin
 * @interface       ./toggle
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate some "toggle" UI components like a burger, etc...
 * A toggle is a 1 tag element that reacts to his "state" like the "focus" and "active".
 *
 * @param       {'burger'}                          type            The toggle type you want
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.toggle
 *
 * @example       css
 * .my-element {
 *      \@s.ui.toggle(burger);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiBadgeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            type: {
                type: 'String',
                values: ['burger'],
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginUiBadgeInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ type: 'burger' }, params);
    const vars = [
        `
            display: inline-block;
        `,
    ];
    switch (finalParams.type) {
        case 'burger':
            vars.push(`
                position: relative;
                top: 0.5em;
                width: 1em;
                height: 0.1em;
                background-color: currentColor;
                transition: all 0.3s ease-in-out;
                transform: translateY(-0.5em);
                @s.border.radius;

                &:before,
                &:after {
                    content: '';
                    width: 100%;
                    height: 100%;
                    background-color: currentColor;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    transition: all 0.3s ease-in-out;
                    opacity: 1;
                    @s.border.radius;
                }
                &:before {
                    transform-origin: 0 0;
                    top: -0.3em;
                }
                &:after {
                    transform-origin: 100% 100%;
                    top: 0.3em;
                }
                
                &:active,
                &:focus,
                &:focus-within,
                input:checked + &,
                input:checked + .s-menu + &,
                &:has(input:checked),
                :active > &,
                :focus > &,
                :focus-within > &,
                input:checked + * > &,
                input:checked + .s-menu + * > &, {                
                    transform: translateY(-0.5em) rotate(45deg);
            
                    &:before {
                        transform: translateX(5%) translateY(-0.1em) rotate(90deg);
                    }
                    &:after {
                        transform: translateX(-50%) rotate(80deg);
                        opacity: 0;
                    }
                }
            `);
            break;
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTThDLHVEQUFTO0FBQ3hELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsUUFBUSxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7O1NBRUM7S0FDSixDQUFDO0lBRUYsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3RCLEtBQUssUUFBUTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBcURULENBQUMsQ0FBQztZQUNILE1BQU07S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFoRkQsNEJBZ0ZDIn0=