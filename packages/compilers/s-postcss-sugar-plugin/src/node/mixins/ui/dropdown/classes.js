import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiDropdownClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                default: ['solid'],
            },
            shape: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.dropdown.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.dropdown.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr', 'tf'],
                default: ['bare', 'lnf', 'shape', 'vr', 'tf'],
            },
        };
    }
}
export { postcssSugarPluginUiDropdownClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/dropdown.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], shapes: ['default', 'square', 'pill'], defaultStyle: 'solid', defaultShape: 'default', scope: ['bare', 'lnf', 'shape', 'tf', 'vr'] }, params);
    const vars = new CssVars();
    vars.comment(() => `
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
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-dropdown${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} dropdown shape`;
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
            * `;
    })
        .join('\n')}
        *
        * <!-- Shapes -->
        ${finalParams.shapes
        .map((shape) => {
        return ` * <!-- ${shape} shape -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${shape} shape</h3>
            *   <button class="s-btn s-color:accent s-mbe:30 s-mie:20">
            *       Click me!
            *       <div class="s-dropdown:${shape}">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-color:complementary s-mbe:30 s-mie:20">
            *       I'm disabled
            *       <div class="s-dropdown:${shape}" disabled>
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <span class="s-btn-group s-mbe:30 s-mie:20">
            *       <a class="s-btn">Click me!</a>
            *       <button class="s-btn s-color:complementary">
            *           +
            *           <div class="s-dropdown:${shape}:bottom-end">
            *               <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *               <a class="s-btn s-color:accent">You find me!</a>
            *           </div>
            *       </button>
            *   </span>
            * </div>
            * `;
    })
        .join('\n')}
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
        *
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-dropdown
            * @namespace      sugar.css.ui.dropdown
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" dropdown
            * 
            * @example        html
            * <span class="s-dropdown-container">
            *     <button class="s-btn">Click me!</button>
            *     <div class="s-dropdown">
            *         <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *         <a class="s-btn s-color:accent">You find me!</a>
            *     </div>
            * </span>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `).code(`
            .s-dropdown {
                @sugar.ui.dropdown($scope: bare);
            }
            `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
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
       `).code(`
            .s-dropdown${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.dropdown($style: ${style}, $scope: lnf);
            }
            `);
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(() => `/**
        * @name           s-dropdown${finalParams.defaultShape === shape ? '' : `:${shape}`}
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${shape}</yellow>" dropdown
        * 
        * @example        html
        * <span class="s-dropdown-container">
        *     <button class="s-btn">Click me!</button>
        *     <div class="s-dropdown${finalParams.defaultShape === shape ? '' : `:${shape}`}">
        *         <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *         <a class="s-btn s-color:accent">You find me!</a>
        *     </div>
        * </span>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `).code(`
        .s-dropdown${finalParams.defaultShape === shape ? '' : `--${shape}`} {
            @sugar.ui.dropdown($shape: ${shape}, $scope: shape);
        }
        `);
        });
    }
    vars.comment(() => `/**
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
     `).code(`
        .s-dropdown {
            @sugar.ui.dropdown($position: bottom, $scope: position);
        }
        `);
    vars.comment(() => `/**
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
     `).code(`
        .s-dropdown--bottom-start {
            @sugar.ui.dropdown($position: bottom-start, $scope: position);
        }
        `);
    vars.comment(() => `/**
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
     `).code(`
        .s-dropdown--bottom-end {
            @sugar.ui.dropdown($position: bottom-end, $scope: position);
        }
        `);
    vars.comment(() => `/**
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
     `).code(`
        .s-dropdown--top {
            @sugar.ui.dropdown($position: top, $scope: position);
        }
        `);
    vars.comment(() => `/**
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
     `).code(`
        .s-dropdown--top-start {
            @sugar.ui.dropdown($position: top-start, $scope: position);
        }
        `);
    vars.comment(() => `/**
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
     `).code(`
        .s-dropdown--top-end {
            @sugar.ui.dropdown($position: top-end, $scope: position);
        }
        `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO2FBQ3ZEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQzthQUN2RDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJ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SyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OztlQU0zRixDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7a0RBUTJCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7a0RBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7a0RBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7a0RBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7a0RBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7a0RBTy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztrREFZL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztrREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztrREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztrREFPL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O2tEQVkv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