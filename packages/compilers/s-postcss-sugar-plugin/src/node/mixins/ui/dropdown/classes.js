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
    defaultColor: {
        type: 'String',
        default: __theme().config('ui.dropdown.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.dropdown.defaultStyle'),
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'vr', 'tf'],
        default: ['bare', 'lnf', 'vr', 'tf'],
    },
};
export { postcssSugarPluginUiDropdownClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultColor: 'ui', defaultStyle: 'solid', scope: ['bare', 'lnf', 'tf', 'vr'] }, params);
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
        * @feature          Support for scaling through the "s-scale:..." class
        * @feature          Support for colorizing through the "s-ui:..." class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-dropdown${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} dropdown style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mb:50">
            *   <h3 class="s-color:accent s-font:30 s-mb:30">${style} style</h3>
            *   <button class="s-btn s-ui:accent s-mb:30">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-ui:complementary s-mb:30">
            *       I'm disabled
            *       <div class="s-dropdown" disabled>
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <span class="s-btn-group s-mb:30">
            *       <a class="s-btn">Click me!</a>
            *       <button class="s-btn s-ui:complementary">
            *           +
            *           <div class="s-dropdown:bottom-end">
            *               <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *               <a class="s-btn s-ui:accent">You find me!</a>
            *           </div>
            *       </button>
            *   </span>
            * </div>
            * 
            * <!-- Positions -->
            * <div class="s-font:30 s-mb:50">
            *   <h3 class="s-color:accent s-font:30 s-mb:30">Position</h3>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Bottom (default)
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Bottom start
            *       <div class="s-dropdown:bottom-start">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Bottom end
            *       <div class="s-dropdown:bottom-end">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Top
            *       <div class="s-dropdown:top">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Top start
            *       <div class="s-dropdown:top-start">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Top end
            *       <div class="s-dropdown:top-end">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- Colors -->
            * <div class="s-font:30 s-mb:50">
            *   <h3 class="s-color:accent s-font:30 s-mb:30">Colors (non-exhaustive)</h3>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Accent
            *       <div class="s-dropdown s-ui:accent">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:complementary">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Complementary
            *       <div class="s-dropdown s-ui:complementary">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Info
            *       <div class="s-dropdown s-ui:info">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Error
            *       <div class="s-dropdown s-ui:error">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- RTL -->
            * <div class="s-font:30 s-mb:50" dir="rtl">
            *   <h3 class="s-color:accent s-font:30 s-mb:30">RTL Support</h3>
            *   <button class="s-btn s-mb:30">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Top start
            *       <div class="s-dropdown:top-start">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Top end
            *       <div class="s-dropdown:top-end">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- Scales -->
            * <div class="s-font:30 s-mb:50">
            *   <h3 class="s-color:accent s-font:30 s-mb:30">Scales</h3>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Scale 0.7
            *       <div class="s-dropdown s-scale:07">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       No scale
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb:30 s-mr:20">
            *       Scale 1.3
            *       <div class="s-dropdown s-scale:13">
            *          <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
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
        * @name           s-dropdown${finalParams.defaultStyle === style ? '' : `:${style}`}
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" dropdown
        * 
        * @example        html
        * <span class="s-dropdown-container">
        *     <button class="s-btn">Click me!</button>
        *     <div class="s-dropdown${finalParams.defaultStyle === style ? '' : `:${style}`}">
        *         <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *         <a class="s-btn s-ui:accent">You find me!</a>
        *     </div>
        * </span>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown${finalParams.defaultStyle === style ? '' : `--${style}`} {
            ${finalParams.defaultColor !== 'ui' ? `@sugar.color.remap(ui, ${finalParams.defaultColor});` : ''}
            @sugar.ui.dropdown($style: ${style}, $scope: '${finalParams.scope.join(',')}');
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
        *   <div class="s-dropdown:bottom">
        *       <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown {
            @sugar.ui.dropdown($position: bottom, $scope: position);
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
        *   <div class="s-dropdown:bottom-start">
        *       <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--bottom-start {
            @sugar.ui.dropdown($position: bottom-start, $scope: position);
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
        *   <div class="s-dropdown:bottom-end">
        *       <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--bottom-end {
            @sugar.ui.dropdown($position: bottom-end, $scope: position);
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
        *   <div class="s-dropdown:top">
        *       <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top {
            @sugar.ui.dropdown($position: top, $scope: position);
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
        *   <div class="s-dropdown:top-start">
        *       <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top-start {
            @sugar.ui.dropdown($position: top-start, $scope: position);
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
        *   <div class="s-dropdown:top-end">
        *       <p class="s-typo:p s-mb:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top-end {
            @sugar.ui.dropdown($position: top-end, $scope: position);
        }
        `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sNENBQTZDLFNBQVEsWUFBWTs7QUFDNUQsdURBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDckI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUM7S0FDeEQ7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO0tBQ3hEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN6QjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7S0FDdkM7Q0FDSixDQUFDO0FBVU4sT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2pCLFlBQVksRUFBRSxJQUFJLEVBQ2xCLFlBQVksRUFBRSxPQUFPLEVBQ3JCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUMvQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUJKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDhCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyxXQUFXLEtBQUs7OytEQUV3QixLQUFLOzs7O3FEQUlmLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7cURBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OzswREFTMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztxREFhcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztxREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztxREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztxREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztxREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztxREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O3FEQVkvQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O3FEQU8vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O3FEQU8vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O3FEQU8vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7cURBWS9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7cURBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7cURBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztxREFZL0MsT0FBTyxD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