import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiDropdownClassesInterface extends __SInterface {
}
postcssSugarPluginUiDropdownClassesInterface.definition = {
    styles: {
        type: 'String[]',
        default: ['solid'],
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.dropdown.defaultStyle'),
    },
};
export { postcssSugarPluginUiDropdownClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid' }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Dropdown
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/dropdown
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice dropdown on buttons or whatever
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-dropdown${style === finalParams.defaultStyle ? '' : `\:${style}`}           Apply the ${style} dropdown style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${style} style</h3>
            *   <button class="s-btn s-ui\:accent s-mb\:30">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <span class="s-btn-group s-mb\:30">
            *       <a class="s-btn">Click me!</a>
            *       <button class="s-btn s-ui\:complementary">
            *           +
            *           <div class="s-dropdown">
            *               <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *               <a class="s-btn s-ui\:accent">You find me!</a>
            *           </div>
            *       </button>
            *   </span>
            * </div>
            * 
            * <!-- Positions -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Position</h3>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Bottom (default)
            *       <div class="s-dropdown">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Bottom start
            *       <div class="s-dropdown\:bottom-start">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Bottom end
            *       <div class="s-dropdown\:bottom-end">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top
            *       <div class="s-dropdown\:top">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top start
            *       <div class="s-dropdown\:top-start">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top end
            *       <div class="s-dropdown\:top-end">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- RTL -->
            * <div class="s-font\:30 s-mb\:50" dir="rtl">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">RTL Support</h3>
            *   <button class="s-btn s-mb\:30">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top start
            *       <div class="s-dropdown\:top-start">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top end
            *       <div class="s-dropdown\:top-end">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        vars.push(`/**
        * @name           s-dropdown${finalParams.defaultStyle === style ? '' : `\:${style}`}
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" dropdown
        * 
        * @example        html
        * <span class="s-dropdown-container">
        *     <button class="s-btn">Click me!</button>
        *     <div class="s-dropdown${finalParams.defaultStyle === style ? '' : `\:${style}`}">
        *         <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *         <a class="s-btn s-ui\:accent">You find me!</a>
        *     </div>
        * </span>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown${finalParams.defaultStyle === style ? '' : `--${style}`} {
            @sugar.ui.dropdown($style: ${style});
        }
        `);
    });
    vars.push(`/**
        * @name           s-dropdown
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom (center)</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:bottom">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown {
            @sugar.ui.dropdown($position: bottom);
        }
        `);
    vars.push(`/**
        * @name           s-dropdown:bottom-start
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom start</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:bottom-start">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--bottom-start {
            @sugar.ui.dropdown($position: bottom-start);
        }
        `);
    vars.push(`/**
        * @name           s-dropdown:bottom-end
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom end</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:bottom-end">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--bottom-end {
            @sugar.ui.dropdown($position: bottom-end);
        }
        `);
    vars.push(`/**
        * @name           s-dropdown:top
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:top">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top {
            @sugar.ui.dropdown($position: top);
        }
        `);
    vars.push(`/**
        * @name           s-dropdown:top-start
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top-start</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:top-start">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top-start {
            @sugar.ui.dropdown($position: top-start);
        }
        `);
    vars.push(`/**
        * @name           s-dropdown:top-end
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top-end</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:top-end">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top-end {
            @sugar.ui.dropdown($position: top-end);
        }
        `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sNENBQTZDLFNBQVEsWUFBWTs7QUFDNUQsdURBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDckI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO0tBQ3hEO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNqQixZQUFZLEVBQUUsT0FBTyxJQUNsQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztVQVdKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDhCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUN4RCx3QkFBd0IsS0FBSyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDLENBQUM7U0FDRCxJQUFJ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