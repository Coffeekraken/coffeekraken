import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name          classes
 * @namespace     node.mixin.ui.dropdown
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the dropdown classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.dropdown.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.dropdown.defaultShape']           The default shape you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.dropdown.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
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
                default: __STheme.get('ui.dropdown.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.dropdown.defaultShape'),
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
        * @namespace          sugar.style.ui
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
        * @cssClass             s-dropdown-container        The container of the dropdown that will trigger the display, hide, etc...
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
        * @cssClass       s-dropdown:bottom      Apply the bottom dropdown position
        * @cssClass       s-dropdown:bottom-start        Apply the bottom start dropdown position
        * @cssClass       s-dropdown:bottom-end        Apply the bottom end dropdown position
        * @cssClass       s-dropdown:top        Apply the top dropdown position
        * @cssClass       s-dropdown:top-start        Apply the top start dropdown position
        * @cssClass       s-dropdown:top-end        Apply the top end dropdown position
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style ${finalParams.defaultStyle === style
            ? '<span class="s-badge:outline s-scale:05">default</span>'
            : ''}
            * <div class="s-dropdown-container">
            *   <button class="s-btn s-color:accent">
            *      Click me!
            *   </button>
            *   <div class="s-dropdown s-bg:base s-p:30 s-radius">
            *      <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *      <a class="s-btn s-color:accent">You find me!</a>
            *   </div>
            * </div>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape} style ${finalParams.defaultShape === shape
            ? '<span class="s-badge:outline s-scale:05">default</span>'
            : ''}
            * <div class="s-dropdown-container">
            *   <button class="s-btn s-color:accent">
            *       Click me!
            *   </button>
            *   <div class="s-dropdown:${shape}">
            *          <p class="s-typo:p s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-color:accent">You find me!</a>
            *       </div>
            * </div>
            * `;
    })
        .join('\n')}
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
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
            * @name           s-dropdown${finalParams.defaultStyle === style ? '' : `:${style}`}
            * @namespace          sugar.style.ui.dropdown
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-dropdown${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.dropdown($style: ${style}, $scope: lnf);
            }
            `, {
                type: 'CssClass',
            });
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(() => `/**
        * @name           s-dropdown${finalParams.defaultShape === shape ? '' : `:${shape}`}
        * @namespace          sugar.style.ui.dropdown
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown${finalParams.defaultShape === shape ? '' : `--${shape}`} {
            @sugar.ui.dropdown($shape: ${shape}, $scope: shape);
        }
        `, {
                type: 'CssClass',
            });
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
        .s-dropdown--bottom-start {
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
        .s-dropdown--bottom-end {
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
        .s-dropdown--top {
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
        .s-dropdown--top-start {
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
        .s-dropdown--top-end {
            @sugar.ui.dropdown($position: top-end, $scope: position);
        }
        `, {
        type: 'CssClass',
    });
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-dropdown-container
            * @namespace          sugar.style.ui.tooltip
            * @type           CssClass
            * 
            * This class represent the tooltip container in which you have to put your actual .s-tooltip element
            * and anything you want as a tooltip activator. Can be a button, an image, really anything
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
        vars.comment(() => `/**
            * @name           s-dropdown-container:active
            * @namespace          sugar.style.ui.dropdown
            * @type           CssClass
            * 
            * This class allows you to display a dropdown inside a dropdown container without needing hover by the user
            * 
            * @example        html
            * <div class="s-dropdown-container:active">
            *   <img src="..." />
            *   <div class="s-dropdown">Something cool</div>
            * </div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
        // no need to write a class here cause this is handled in the dropdown.ts file directly...
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBQ3BEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxL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