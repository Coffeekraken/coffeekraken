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
        color: sugar.color(current);
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
        color: sugar.color(current);
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
   @sugar.lod.wireframe {
       color: rgba(0,0,0,.5);

       &:before,
       &:after {
        color: rgba(0,0,0,.5);
       }
   }
`);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsdURBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLGtEQUFtRCxTQUFRLHFCQUFZO0lBQ3pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHNCQUFzQjthQUNsQztZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTzhELHVFQUFTO0FBRXhFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFFBQVEsRUFBRSxFQUFFLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLEVBQUUsR0FBRyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUV0QixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MENBb0I0QixFQUFFLElBQUksV0FBVyxDQUFDLFFBQVE7Ozs7Ozs7Ozs7Ozs7MENBYTFCLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUTs7O3NDQUc5QixFQUFFOzs7OztHQUtyQyxDQUFDLENBQUM7SUFFRCxZQUFZO0lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0NBU2IsQ0FBQyxDQUFDO0lBRUMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNFRCw0QkEyRUMifQ==