import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
class postcssSugarPluginUiLoaderDropMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-drop',
            },
            duration: {
                type: 'String',
                default: __STheme.get('ui.loader.duration'),
            },
            easing: {
                type: 'String',
                default: __STheme.get('ui.loader.easing'),
            },
        };
    }
}
export { postcssSugarPluginUiLoaderDropMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign(
        { name: '', duration: '', easing: '' },
        params,
    );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsZUFBZTthQUMzQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzthQUM1QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFFBQVEsRUFBRSxFQUFFLEVBQ1osTUFBTSxFQUFFLEVBQUUsSUFDUCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFvQk8sV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxNQUFNOzs7cUJBRzlELFdBQVcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsTUFBTTs7O2lCQUdsRSxXQUFXLENBQUMsSUFBSTs7Ozs7Ozs7OztHQVU5QixDQUFDLENBQUM7SUFFRCxZQUFZO0lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztLQU9ULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
