import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          spinner
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
 * @example     css
 * .my-spinner {
 *    @sugar.ui.loader.spinner;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLoaderSpinnerMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-spinner',
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
export { postcssSugarPluginUiLoaderSpinnerMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', duration: '', easing: '' }, params);
    const vars = [];
    vars.push(`
    display: inline-block;
    pointer-events: none;
    text-indent: -9999em;
    border-top: 0.3em solid sugar.color(current, --alpha 0.8);
    border-right: 0.3em solid sugar.color(current, --alpha 0.8);
    border-bottom: 0.3em solid sugar.color(current, --alpha 0.8);
    border-left: 0.3em solid rgba(0,0,0,0);
    border-radius: 50%;
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSwrQ0FBZ0QsU0FBUSxZQUFZO0lBQ3RFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGtCQUFrQjthQUM5QjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzthQUM1QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsK0NBQStDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFeEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFFBQVEsRUFBRSxFQUFFLEVBQ1osTUFBTSxFQUFFLEVBQUUsSUFDUCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztpQkFXRyxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE1BQU07O2lCQUU5RCxXQUFXLENBQUMsSUFBSTs7Ozs7Ozs7R0FROUIsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9