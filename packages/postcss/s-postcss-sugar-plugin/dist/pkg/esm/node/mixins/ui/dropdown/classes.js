import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name          classes
 * @as          @sugar.ui.dropdown.classes
 * @namespace     node.mixin.ui.dropdown
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the dropdown classes
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.dropdown.classes
 *
 * @example     css
 * \@sugar.ui.dropdown.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiDropdownClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssSugarPluginUiDropdownClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Dropdown
        * @namespace          sugar.style.ui.dropdown
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
        * @install          css
        * \\@sugar.ui.dropdown.classes;
        * 
        * .my-dropdown {
        *   \@sugar.ui.dropdown;
        * }
        * 
        * @cssClass             s-dropdown-container        The container of the dropdown that will trigger the display, hide, etc...
        * @cssClass             s-dropdown                  Apply the dropdown styling
        * @cssClass       s-dropdown:bottom      Apply the bottom dropdown position
        * @cssClass       s-dropdown:bottom-start        Apply the bottom start dropdown position
        * @cssClass       s-dropdown:bottom-end        Apply the bottom end dropdown position
        * @cssClass       s-dropdown:top        Apply the top dropdown position
        * @cssClass       s-dropdown:top-start        Apply the top start dropdown position
        * @cssClass       s-dropdown:top-end        Apply the top end dropdown position
        * 
        * @example        html       Simple dropdown
        * <div class="s-dropdown-container">
        *   <button class="s-btn s-color:accent">
        *      Click me!
        *   </button>
        *   <div class="s-dropdown s-bg:base s-p:30 s-radius">
        *      <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *      <a class="s-btn s-color:accent">You find me!</a>
        *   </div>
        * </div>
        * 
        * @example        html       Position
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Bottom (default)
        *   </button>
        *   <div class="s-dropdown">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Bottom start
        *   </button>
        *   <div class="s-dropdown:bottom-start">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Bottom end
        *   </button>
        *   <div class="s-dropdown:bottom-end">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Top
        *   </button>
        *   <div class="s-dropdown:top">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Top start
        *   </button>
        *   <div class="s-dropdown:top-start">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *      Top end
        *   </button>
        *   <div class="s-dropdown:top-end">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * 
        * @example      html        RTL Support
        *  <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn s-color:accent">
        *       Click me!
        *   </button>
        *   <div class="s-dropdown">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        *  <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn s-color:accent">
        *       Top start
        *   </button>
        *   <div class="s-dropdown:top-start">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn s-color:accent">
        *       Top end
        *   </button>
        *   <div class="s-dropdown:top-end">
        *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-dropdown
            * @namespace          sugar.style.ui.dropdown
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-dropdown {
                @sugar.ui.dropdown($scope: bare);
            }
            `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.comment(() => `/**
            * @name           s-dropdown
            * @namespace          sugar.style.ui.dropdown
            * @type           CssClass
            * 
            * This class represent a(n) dropdown
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-dropdown:not(.s-bare) {
                @sugar.ui.dropdown($scope: lnf);
            }
            `, {
            type: 'CssClass',
        });
    }
    vars.comment(() => `/**
        * @name           s-dropdown
        * @namespace          sugar.style.ui.dropdown
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown {
            @sugar.ui.dropdown($position: bottom, $scope: position);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:bottom-start
        * @namespace          sugar.style.ui.dropdown
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-bottom-start {
            @sugar.ui.dropdown($position: bottom-start, $scope: position);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:bottom-end
        * @namespace          sugar.style.ui.dropdown
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-bottom-end {
            @sugar.ui.dropdown($position: bottom-end, $scope: position);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:top
        * @namespace          sugar.style.ui.dropdown
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-top {
            @sugar.ui.dropdown($position: top, $scope: position);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:top-start
        * @namespace          sugar.style.ui.dropdown
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-top-start {
            @sugar.ui.dropdown($position: top-start, $scope: position);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:top-end
        * @namespace          sugar.style.ui.dropdown
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-top-end {
            @sugar.ui.dropdown($position: top-end, $scope: position);
        }
        `, {
        type: 'CssClass',
    });
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-dropdown-container
            * @namespace          sugar.style.ui.dropdown
            * @type           CssClass
            * 
            * This class represent the tooltip container in which you have to put your actual .s-tooltip element
            * and anything you want as a tooltip activator. Can be a button, an image, really anything.
            * The dopdown will be visible depending on these rules:
            * 
            * - &.active > .s-dropdown
            * - &[active] > .s-dropdown
            * - &:focus > .s-dropdown
            * - &:focus-within > .s-dropdown
            * - & > .s-dropdown:hover
            * - & > .s-dropdown:focus
            * - & > .s-dropdown:focus-within
            * 
            * @example        html
            * <div class="s-tooltip-container">
            *   <img src="..." />
            *   <div class="s-tooltip">Something cool</div>
            * </div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
        vars.code(() => `
            .s-dropdown-container {
                position: relative;
                display: inline-block;
                cursor: pointer;

                & > .s-dropdown {
                    opacity: 0;
                    pointer-events: none;
                }

                &.active > .s-dropdown,
                &[active] > .s-dropdown,
                &:focus > .s-dropdown,
                &:focus-within > .s-dropdown,
                & > .s-dropdown:hover,
                & > .s-dropdown:focus,
                & > .s-dropdown:focus-within {
                    pointer-events: all;
                    opacity: 1;
                }
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0F5Q2dDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O2tEQVczQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7a0RBUy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OztrREFTL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O2tEQVMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7a0RBUy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OztrREFTL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7a0RBVy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OztrREFTL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O2tEQVMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7OztLQVE1RixDQUNBLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O3FEQVdtQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7OztRQVE1RixDQUNDLENBQUMsSUFB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