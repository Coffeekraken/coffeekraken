import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
/**
 * @name           classes
 * @namespace      node.mixins.transition
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the transition helper classes like s-transition:slow, etc.
 * The generated transitions are specified in the config.theme.transition configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.transition.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginTransitionClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginTransitionClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const transitionObj = __STheme.config('transition');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Transitions
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/transition
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some transitions on any HTMLElement.
        * These transitions are defined in the \`theme.transition\` theme settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(transitionObj).map((transition) => {
        return ` * @cssClass             s-transition${transition === 'default' ? '' : `:${transition}`}            Apply the \`${transition}\` transition`;
    })}
        * 
        ${Object.keys(transitionObj)
        .map((transition) => {
        const id = `s-transition-${__uniqid()}`;
        return `
                * @example          html        ${transition}
                *   <div class="s-bg:main s-radius:30" id="${id}">
                *      <div class="s-transition${transition === 'default' ? '' : `:${transition}`} s-ratio:1 s-bg:accent s-radius:30"></div>
                *       <style>
                *           #${id} > div { position: relative; left: 0; width: 100px; }
                *           #${id}:hover > div { left: calc(100% - 100px); )  }
                *       </style>
                *   </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(transitionObj).forEach((transitionName) => {
        vars.comment(() => `/**
  * @name          s-ratio:${transitionName.replace('/', '-')}
  * @namespace          sugar.css.transition
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${transitionName}</yellow>" transition style to any HTMLElement
  * 
  * @example        html
  * <div class="s-transition\:${transitionName.replace('/', '-')} s-bg:accent">
  *     <div class="s-center-abs">I'm a cool container</div>
  * </div>
  */
 `).code(`
.s-transition${transitionName === 'default' ? '' : `--${transitionName}`} {
    @sugar.transition(${transitionName});
}`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVwRCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBaUJKLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUMsT0FBTyx3Q0FDSCxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxFQUNsRCwyQkFBMkIsVUFBVSxlQUFlLENBQUM7SUFDekQsQ0FBQyxDQUFDOztVQUVBLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ3ZCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLGdCQUFnQixRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQ3hDLE9BQU87a0RBQzJCLFVBQVU7NkRBQ0MsRUFBRTtpREFFM0MsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFDbEQ7OytCQUVlLEVBQUU7K0JBQ0YsRUFBRTs7MkJBRU4sQ0FBQztJQUNoQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7NkJBQ1csY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7Ozs7Z0RBTWIsY0FBYzs7O2dDQUc5QixjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7RUFJOUQsQ0FDTyxDQUFDLElBQUksQ0FBQztlQUNBLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxjQUFjLEVBQUU7d0JBQ2hELGNBQWM7RUFDcEMsQ0FBQyxDQUFDO0lBQ0EsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=