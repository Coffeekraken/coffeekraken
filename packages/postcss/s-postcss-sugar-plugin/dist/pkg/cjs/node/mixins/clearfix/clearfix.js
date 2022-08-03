"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           clearfix
 * @namespace      node.mixin.clearfix
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a clearfix depending on your preference. Here's are the clearfix methods available:
 * - overflow (default)
 * - facebook
 * - float
 * - micro
 * - after
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-element {
 *    \@sugar.clearfix();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginClearfixInterface extends s_interface_1.default {
    static get _definition() {
        return {
            clearfix: {
                type: 'String',
                values: ['overflow', 'facebook', 'micro', 'after'],
                default: s_theme_1.default.get('helpers.clearfix.default'),
            },
        };
    }
}
exports.interface = postcssSugarPluginClearfixInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ clearfix: 'overflow' }, params);
    const vars = new CssVars();
    switch (finalParams.clearfix) {
        case 'facebook':
            vars.code(`
                display: table-cell;
                vertical-align: top;
                width: 10000px !important;
            `);
            break;
        case 'micro':
            vars.code(`
                zoom: 1;
                &:before,
                &:after {
                    content: ' ';
                    display: table;
                }
                &:after {
                    clear: both;
                }
            `);
            break;
        case 'after':
            vars.code(`
                &:after {
                    content: "";
                    clear: both;
                    display: table;
                }
            `);
            break;
        case 'overflow':
            vars.code(`
                overflow: hidden;
            `);
            break;
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDbEQsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBQ3BEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU0rQyx3REFBUztBQUV6RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLFFBQVEsRUFBRSxVQUFVLElBQ2pCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixRQUFRLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDMUIsS0FBSyxVQUFVO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE9BQU87WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O2FBVVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OzthQU1ULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLFVBQVU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzthQUVULENBQUMsQ0FBQztZQUNILE1BQU07S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF4REQsNEJBd0RDIn0=