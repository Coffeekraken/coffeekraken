import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          round
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
class postcssSugarPluginUiloaderRoundMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-round',
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
export { postcssSugarPluginUiloaderRoundMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLDZDQUE4QyxTQUFRLFlBQVk7SUFDcEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsZ0JBQWdCO2FBQzVCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2FBQzVDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSw2Q0FBNkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsUUFBUSxFQUFFLEVBQUUsRUFDWixNQUFNLEVBQUUsRUFBRSxJQUNQLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7aUJBT0csV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxNQUFNOztpQkFFOUQsV0FBVyxDQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7OztHQWU5QixDQUFDLENBQUM7SUFFRCxZQUFZO0lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==