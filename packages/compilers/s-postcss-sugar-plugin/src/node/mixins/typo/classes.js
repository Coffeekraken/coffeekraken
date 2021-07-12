import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';
/**
 * @name           classes
 * @namespace      node.mixins.typo
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the typo helper classes like s-typo:h1, s-typo:p, and all the typo
 * elements that are defined in the config.theme.typo configuration stack.
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.typo.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginTypoClassesInterface extends __SInterface {
}
postcssSugarPluginTypoClassesInterface.definition = {};
export { postcssSugarPluginTypoClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const typosObj = __theme().config('typo');
    Object.keys(typosObj).forEach((typoName) => {
        const typoObj = typosObj[typoName];
        const cls = `s-typo:${typoName}`;
        const css = __jsObjectToCssProperties(typoObj, {
            exclude: [':rhythm-vertical']
        });
        vars.push(`/**
    * @name            ${cls}
    * @namespace        sugar.css.typo
    * @type             CssClass
    * @platform         css
    * @status           beta
    * 
    * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any HTMLElement
    * 
    * @example      html
    * <span class="${cls.replace(':', '\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${cls.replace(':', '--')} {
        ${css}
   }`);
        if (typoObj[':rhythm-vertical']) {
            vars.push(`

        /**
          * @name         s-rhythm:vertical ${cls}
          * @namespace    sugar.css.typo
          * @type         CssClass
          * @platform     css
          * @status       beta
          * 
          * This class allows you to activate the space(s) on your "<yellow>${cls}</yellow>" HTMLElement
          * 
          * @example      html
          * <div class="s-rhythm\:vertical">
          *     <span class="${cls.replace(':', '\:')}">Something cool</span>
          * </div>
          * 
          * @since    2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       @sugar.rhythm.vertical {
        &.${cls}, & .${cls} {
          ${__jsObjectToCssProperties(typoObj[':rhythm-vertical'])}
        }
      }
      `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxVQUFVLFFBQVEsRUFBRSxDQUFDO1FBRWpDLE1BQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDLE9BQU8sRUFBRTtZQUM3QyxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUM5QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLEdBQUc7Ozs7OztvREFNd0IsUUFBUTs7O3FCQUd2QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUM7Ozs7O01BS3BDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQztVQUNqQixHQUFHO0tBQ1IsQ0FBQyxDQUFDO1FBRUosSUFBSSxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUU1QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OENBRzRCLEdBQUc7Ozs7Ozs4RUFNNkIsR0FBRzs7OzsrQkFJbEQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDOzs7Ozs7O1lBT3hDLEdBQUcsUUFBUSxHQUFHO1lBQ2QseUJBQXlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7OztPQUczRCxDQUFDLENBQUM7U0FFSjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==