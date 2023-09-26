"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          spinner
 * @as          @s.ui.loader.spinner
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./spinner          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the spinner style to any element
 *
 * @param        {String}           [name='s-loader-spinner']               A name for your spinner
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your spinner animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your spinner animation
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.loader.spinner
 *
 * @example     css
 * .my-spinner {
 *    @s.ui.loader.spinner;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLoaderSpinnerMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-spinner',
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
exports.interface = postcssSugarPluginUiLoaderSpinnerMixinInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', duration: '', easing: '' }, params);
    const vars = [];
    vars.push(`
    display: inline-block;
    pointer-events: none;
    text-indent: -9999em;
    border-top: 0.3em solid currentColor;
    border-right: 0.3em solid currentColor;
    border-bottom: 0.3em solid currentColor;
    border-left: 0.3em solid rgba(0,0,0,0);
    border-radius: 50%;
    width: s.scalable(1em);
    height: s.scalable(1em);
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
  `);
    // wireframe
    vars.push(`
        @s.wireframe {
            border-color: rgba(0,0,0,.5);
            border-bottom-color: rgba(0, 0, 0, 0);
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLCtDQUFnRCxTQUFRLHFCQUFZO0lBQ3RFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGtCQUFrQjthQUM5QjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2FBQzVDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVEyRCxvRUFBUztBQUVyRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsRUFBRSxFQUNaLE1BQU0sRUFBRSxFQUFFLElBQ1AsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7aUJBV0csV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxNQUFNOztpQkFFOUQsV0FBVyxDQUFDLElBQUk7Ozs7Ozs7O0dBUTlCLENBQUMsQ0FBQztJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFsREQsNEJBa0RDIn0=