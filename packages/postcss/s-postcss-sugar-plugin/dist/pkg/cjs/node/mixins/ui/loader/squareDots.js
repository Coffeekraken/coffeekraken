"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name          squareDots
 * @as              @sugar.ui.loader.squareDots
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./squareDots          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the squareDots style to any element
 *
 * @param        {String}           [name='s-loader-square-dots']               A name for your squareDots
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your squareDots animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your squareDots animation
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.loader.squareDots
 *
 * @example     css
 * .my-squareDots {
 *    @sugar.ui.loader.squareDots;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLoaderSquareDotsMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-square-dots',
            },
            duration: {
                type: 'String',
                default: s_theme_1.default.get('ui.loader.duration'),
            },
        };
    }
}
exports.interface = postcssSugarPluginUiLoaderSquareDotsMixinInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', duration: '' }, params);
    const id = (0, string_1.__uniqid)();
    const vars = [];
    vars.push(`
    display: inline-block;
    position: relative;
    pointer-events: none;
    overflow: hidden;
    height: sugar.scalable(1em);
    width: sugar.scalable(1.2ch);
    text-rendering: geometricPrecision;

    &:before {
        font-size: sugar.scalable(1em);
        position: absolute;
        top: 0;
        left: calc(-0.225ch);
        white-space: nowrap;
        color: currentColor;
        display: block;
        content: "⠁⠈⠀⠀⠀⠠⠄⠂";
        z-index: 1;
        text-indent: 0;
        animation: s-loader-square-dots-${id} ${finalParams.duration} steps(8) infinite;
    }
    &:after {
        font-size: sugar.scalable(1em);
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: calc(0.59ch);
        color: currentColor;
        content: "⠀⠀⠁⠂⠄⠀⠀⠀";
        display: block;
        text-indent: 0;
        clip-path: polygon(0 0, 1ch 0, 1ch 100%, 0 100%);
        animation: s-loader-square-dots-${id} ${finalParams.duration} steps(8) infinite;
    }

    @keyframes s-loader-square-dots-${id} {
        to {
            text-indent: -9.8ch;
        }
    }
  `);
    // wireframe
    vars.push(`
   @sugar.wireframe {
       color: rgba(0,0,0,.5);
       
       &:before,
       &:after {
        color: rgba(0,0,0,.5);
       }

       @sugar.theme dark {
            color: rgba(255,255,255,.5);
        
        &:before,
        &:after {
            color: rgba(255,255,255,.5);
        }
       }
   }
`);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsdURBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxrREFBbUQsU0FBUSxxQkFBWTtJQUN6RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxzQkFBc0I7YUFDbEM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU84RCx1RUFBUztBQUV4RSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsRUFBRSxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxFQUFFLEdBQUcsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFFdEIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQW9CNEIsRUFBRSxJQUFJLFdBQVcsQ0FBQyxRQUFROzs7Ozs7Ozs7Ozs7OzBDQWExQixFQUFFLElBQUksV0FBVyxDQUFDLFFBQVE7OztzQ0FHOUIsRUFBRTs7Ozs7R0FLckMsQ0FBQyxDQUFDO0lBRUQsWUFBWTtJQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCYixDQUFDLENBQUM7SUFFQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBcEZELDRCQW9GQyJ9