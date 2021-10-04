import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
/**
 * @name           classes
 * @namespace      node.mixins.transition
 * @type           PostcssMixin
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginTransitionClassesInterface extends __SInterface {
}
postcssSugarPluginTransitionClassesInterface.definition = {};
export { postcssSugarPluginTransitionClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const transitionObj = __theme().config('transition');
    const vars = [];
    vars.push(`
      /**
        * @name          Transitions
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/transitions
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
        * @example        html
        ${Object.keys(transitionObj)
        .map((transition) => {
        const id = `s-transition-${__uniqid()}`;
        return `
                * <!-- ${transition} -->
                * <div class="s-mbe:50">
                *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${transition}</h3>
                *   <div class="s-bg:main s-border:radius-30" id="${id}">
                *      <div class="s-transition${transition === 'default' ? '' : `:${transition}`} s-ratio:1 s-bg:accent s-border:radius-30"></div>
                *   <style>
                *       #${id} > div { position: relative; left: 0; width: 100px; }
                *       #${id}:hover > div { left: calc(100% - 100px); )  }
                *   </style>
                *   </div>
                * </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Object.keys(transitionObj).forEach((transitionName) => {
        const transitionCss = `/**
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
.s-transition${transitionName === 'default' ? '' : `--${transitionName}`} {
    @sugar.transition(${transitionName});
}`;
        vars.push(transitionCss);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVyRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFpQkosTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUM1QyxPQUFPLHdDQUNILFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQ2xELDJCQUEyQixVQUFVLGVBQWUsQ0FBQztJQUN6RCxDQUFDLENBQUM7OztVQUdBLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ3ZCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLGdCQUFnQixRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQ3hDLE9BQU87eUJBQ0UsVUFBVTs7aUVBRThCLFVBQVU7b0VBQ1AsRUFBRTtpREFFbEQsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFDbEQ7OzJCQUVXLEVBQUU7MkJBQ0YsRUFBRTs7O3lCQUdKLENBQUM7SUFDZCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1FBQ2xELE1BQU0sYUFBYSxHQUFHOzZCQUNELGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7Ozs7O2dEQU1iLGNBQWM7OztnQ0FHOUIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7O2VBSWpELGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxjQUFjLEVBQUU7d0JBQ2hELGNBQWM7RUFDcEMsQ0FBQztRQUNLLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9