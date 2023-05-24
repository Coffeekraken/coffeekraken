"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          round
 * @as              @sugar.ui.loader.round
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./round          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the round style to any element
 *
 * @param        {String}           [name='s-loader-round']               A name for your round
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your round animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your round animation
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.loader.round
 *
 * @example     css
 * .my-round {
 *    @sugar.ui.loader.round;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiloaderRoundMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-round',
            },
            duration: {
                type: 'String',
                default: s_theme_1.default.get('ui.loader.duration'),
            },
            easing: {
                type: 'String',
                default: s_theme_1.default.get('ui.loader.easing'),
            },
        };
    }
}
exports.interface = postcssSugarPluginUiloaderRoundMixinInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', duration: '', easing: '' }, params);
    const vars = [];
    vars.push(`
    pointer-events: none;
    display: inline-block;
    border-radius: 50%;
    background: sugar.color(current);
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
       0%, 100% {
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
        }
        0% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(900deg);
            animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
        }
        100% {
            transform: rotateY(1800deg);
        }
    }
  `);
    // wireframe
    vars.push(`
        @sugar.wireframe {
           background: rgba(0,0,0,.5);
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLDZDQUE4QyxTQUFRLHFCQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGdCQUFnQjthQUM1QjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2FBQzVDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVF5RCxrRUFBUztBQUVuRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsRUFBRSxFQUNaLE1BQU0sRUFBRSxFQUFFLElBQ1AsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztpQkFPRyxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE1BQU07O2lCQUU5RCxXQUFXLENBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7O0dBZTlCLENBQUMsQ0FBQztJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXBERCw0QkFvREMifQ==