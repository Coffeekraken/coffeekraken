import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
        default: __STheme.config('ui.dropdown.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __STheme.config('ui.dropdown.defaultStyle'),
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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/dropdown.js`],
    };
}
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
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
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
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <button class="s-btn s-color:accent s-mbe:30 s-mie:20">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-color:complementary s-mbe:30 s-mie:20">
            *       I'm disabled
            *       <div class="s-dropdown" disabled>
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <span class="s-btn-group s-mbe:30 s-mie:20">
            *       <a class="s-btn">Click me!</a>
            *       <button class="s-btn s-color:complementary">
            *           +
            *           <div class="s-dropdown:bottom-end">
            *               <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *               <a class="s-btn s-color:accent">You find me!</a>
            *           </div>
            *       </button>
            *   </span>
            * </div>
            * 
            * <!-- Positions -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Position</h3>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Bottom (default)
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Bottom start
            *       <div class="s-dropdown:bottom-start">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Bottom end
            *       <div class="s-dropdown:bottom-end">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Top
            *       <div class="s-dropdown:top">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Top start
            *       <div class="s-dropdown:top-start">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Top end
            *       <div class="s-dropdown:top-end">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- Colors -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (non-exhaustive)</h3>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Accent
            *       <div class="s-dropdown s-color:accent">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:complementary">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Complementary
            *       <div class="s-dropdown s-color:complementary">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Info
            *       <div class="s-dropdown s-color:info">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Error
            *       <div class="s-dropdown s-color:error">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- RTL -->
            * <div class="s-font:30 s-mbe:50" dir="rtl">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">RTL Support</h3>
            *   <button class="s-btn s-mbe:30">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Top start
            *       <div class="s-dropdown:top-start">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Top end
            *       <div class="s-dropdown:top-end">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- Scales -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scales</h3>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Scale 0.7
            *       <div class="s-dropdown s-scale:07">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       No scale
            *       <div class="s-dropdown">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mbe:30 s-mie:20">
            *       Scale 1.3
            *       <div class="s-dropdown s-scale:13">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
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
        *         <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *         <a class="s-btn s-color:accent">You find me!</a>
        *     </div>
        * </span>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown${finalParams.defaultStyle === style ? '' : `--${style}`} {
            @sugar.color(${finalParams.defaultColor});
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
        *       <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-color:accent">You find me!</a>
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
        *       <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-color:accent">You find me!</a>
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
        *       <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-color:accent">You find me!</a>
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
        *       <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-color:accent">You find me!</a>
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
        *       <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-color:accent">You find me!</a>
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
        *       <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-color:accent">You find me!</a>
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sNENBQTZDLFNBQVEsWUFBWTs7QUFDNUQsdURBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDckI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO0tBQ3ZEO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUM7S0FDdkQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztLQUN2QztDQUNKLENBQUM7QUFVTixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsTUFBTSxVQUFVLFlBQVk7SUFDeEIsT0FBTztRQUNILEtBQUssRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLGNBQWMsQ0FBQztLQUN4QyxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2pCLFlBQVksRUFBRSxJQUFJLEVBQ2xCLFlBQVksRUFBRSxPQUFPLEVBQ3JCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUMvQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUJKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDhCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyxXQUFXLEtBQUs7OzZEQUVzQixLQUFLOzs7O3NEQUlaLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7c0RBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OzsyREFTMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztzREFhcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztzREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztzREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztzREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztzREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztzREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O3NEQVkvQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O3NEQU8vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O3NEQU8vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O3NEQU8vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7c0RBWS9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7c0RBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElB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