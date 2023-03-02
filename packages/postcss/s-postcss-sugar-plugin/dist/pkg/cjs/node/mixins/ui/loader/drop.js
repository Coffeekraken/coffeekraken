"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          drop
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./drop          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the drop style to any element
 *
 * @param        {String}           [name='s-loader-drop']               A name for your drop
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your drop animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your drop animation
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.loader.drop
 *
 * @example     css
 * .my-drop {
 *    @sugar.ui.loader.drop;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLoaderDropMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-drop',
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
exports.interface = postcssSugarPluginUiLoaderDropMixinInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', duration: '', easing: '' }, params);
    const vars = [];
    vars.push(`
    position: relative;
    display: inline-block;
    pointer-events: none;
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    
    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%; left: 50%;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        border: sugar.scalable(0.1em) solid sugar.color(current);
        border-radius: 50%;
        width: sugar.scalable(1em); height: sugar.scalable(1em);
    }
    &:before {
        animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    }
    &:after {
        animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} 0.7s infinite;
    }

    @keyframes ${finalParams.name} {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
  `);
    // wireframe
    vars.push(`
        @sugar.wireframe {
            &:before,
            &:after {
                border-color: rgba(0,0,0,.5);
            }
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsZUFBZTthQUMzQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2FBQzVDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVF3RCxpRUFBUztBQUVsRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsRUFBRSxFQUNaLE1BQU0sRUFBRSxFQUFFLElBQ1AsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBb0JPLFdBQVcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsTUFBTTs7O3FCQUc5RCxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE1BQU07OztpQkFHbEUsV0FBVyxDQUFDLElBQUk7Ozs7Ozs7Ozs7R0FVOUIsQ0FBQyxDQUFDO0lBRUQsWUFBWTtJQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7S0FPVCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbkVELDRCQW1FQyJ9