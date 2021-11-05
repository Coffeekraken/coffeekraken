import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
    const transitionObj = __STheme.config('transition');
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
                *   <div class="s-bg:main s-radius:30" id="${id}">
                *      <div class="s-transition${transition === 'default' ? '' : `:${transition}`} s-ratio:1 s-bg:accent s-radius:30"></div>
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFcEQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBaUJKLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUMsT0FBTyx3Q0FDSCxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxFQUNsRCwyQkFBMkIsVUFBVSxlQUFlLENBQUM7SUFDekQsQ0FBQyxDQUFDOzs7VUFHQSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUN2QixHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNoQixNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUN4QyxPQUFPO3lCQUNFLFVBQVU7O2lFQUU4QixVQUFVOzZEQUNkLEVBQUU7aURBRTNDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQ2xEOzsyQkFFVyxFQUFFOzJCQUNGLEVBQUU7Ozt5QkFHSixDQUFDO0lBQ2QsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtRQUNsRCxNQUFNLGFBQWEsR0FBRzs2QkFDRCxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7OztnREFNYixjQUFjOzs7Z0NBRzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7OztlQUlqRCxjQUFjLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssY0FBYyxFQUFFO3dCQUNoRCxjQUFjO0VBQ3BDLENBQUM7UUFDSyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9