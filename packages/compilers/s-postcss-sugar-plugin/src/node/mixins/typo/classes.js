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
            exclude: [':rhythmVertical']
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
        vars.push(`/**
    * @name            s-format:text ${typoName}
    * @namespace        sugar.css.typo
    * @type             CssClass
    * @platform         css
    * @status           beta
    * 
    * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any ${typoName} tag in the .s-format:text scope
    * 
    * @example      html
    * <div class="s-format\:text">
    *   <${typoName}>Something cool</${typoName}>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   @sugar.format.text {
     ${typoName} {
           ${css}
     }
   }`);
        if (typoObj[':rhythmVertical']) {
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
        &.${cls.replace(':', '--')}, & .${cls.replace(':', '--')} {
          ${__jsObjectToCssProperties(typoObj[':rhythmVertical'])}
        }
      }
      `);
            vars.push(`

        /**
          * @name         s-rhythm:vertical.s-format:text ${typoName}
          * @namespace    sugar.css.typo
          * @type         CssClass
          * @platform     css
          * @status       beta
          * 
          * This class allows you to activate the space(s) on your "<yellow>${typoName}</yellow>" scopes .s-format:text tags
          * 
          * @example      html
          * <div class="s-rhythm\:vertical s-format\:text">
          *     <${typoName}>Something cool</${typoName}>
          * </div>
          * 
          * @since    2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       .s-rhythm--vertical.s-format--text ${typoName}, ${typoName}.s-rhythm--vertical.s-format--text {
          ${__jsObjectToCssProperties(typoObj[':rhythmVertical'])}
        }
      `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxVQUFVLFFBQVEsRUFBRSxDQUFDO1FBRWpDLE1BQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDLE9BQU8sRUFBRTtZQUM3QyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLEdBQUc7Ozs7OztvREFNd0IsUUFBUTs7O3FCQUd2QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUM7Ozs7O01BS3BDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQztVQUNqQixHQUFHO0tBQ1IsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLElBQUksQ0FBQzt1Q0FDMEIsUUFBUTs7Ozs7O29EQU1LLFFBQVEsc0NBQXNDLFFBQVE7Ozs7V0FJL0YsUUFBUSxvQkFBb0IsUUFBUTs7Ozs7O09BTXhDLFFBQVE7YUFDRixHQUFHOztLQUVYLENBQUMsQ0FBQztRQUVKLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzhDQUc0QixHQUFHOzs7Ozs7OEVBTTZCLEdBQUc7Ozs7K0JBSWxELEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQzs7Ozs7OztZQU94QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUM7WUFDbEQseUJBQXlCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7OztPQUcxRCxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7NERBRzRDLFFBQVE7Ozs7Ozs4RUFNVSxRQUFROzs7O21CQUluRSxRQUFRLG9CQUFvQixRQUFROzs7Ozs7NENBTVgsUUFBUSxLQUFLLFFBQVE7WUFDckQseUJBQXlCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7O09BRTFELENBQUMsQ0FBQztTQUVKO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9