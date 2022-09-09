"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencies = exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
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
 * @param       {String}                            [defaultColor=theme.ui.dropdown.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.dropdown.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiDropdownClassesInterface extends s_interface_1.default {
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
                default: s_theme_1.default.get('ui.dropdown.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: s_theme_1.default.get('ui.dropdown.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('color')),
                default: s_theme_1.default.get('ui.dropdown.defaultColor'),
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
exports.interface = postcssSugarPluginUiDropdownClassesInterface;
const fs_1 = require("@coffeekraken/sugar/fs");
function dependencies() {
    return {
        files: [`${(0, fs_1.__dirname)()}/dropdown.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], shapes: ['default', 'square', 'pill'], defaultStyle: 'solid', defaultShape: 'default', defaultColor: 'main', scope: ['bare', 'lnf', 'shape', 'tf', 'vr'] }, params);
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
            *      <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
            *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Bottom start
        *   </button>
        *   <div class="s-dropdown:bottom-start">
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Bottom end
        *   </button>
        *   <div class="s-dropdown:bottom-end">
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Top
        *   </button>
        *   <div class="s-dropdown:top">
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *       Top start
        *   </button>
        *   <div class="s-dropdown:top-start">
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn s-color:accent">
        *      Top end
        *   </button>
        *   <div class="s-dropdown:top-end">
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        *  <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn s-color:accent">
        *       Top start
        *   </button>
        *   <div class="s-dropdown:top-start">
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
        *          <a class="s-btn s-color:accent">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn s-color:accent">
        *       Top end
        *   </button>
        *   <div class="s-dropdown:top-end">
        *          <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
            *         <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
            *         <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *         <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *       <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-dropdown:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `, { type: 'CssClass' });
    }
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
        *       <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *       <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *       <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *       <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
        *       <p class="s-typo:p s-mbe:30">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</p>
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDekM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7YUFDcEQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQzthQUNwRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBQ3BEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDNUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNoRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFXd0QsaUVBQVM7QUFFbEUsK0NBQW1EO0FBQ25ELFNBQWdCLFlBQVk7SUFDeEIsT0FBTztRQUNILEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBQSxjQUFTLEdBQUUsY0FBYyxDQUFDO0tBQ3hDLENBQUM7QUFDTixDQUFDO0FBSkQsb0NBSUM7QUFFRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNqQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUNyQyxZQUFZLEVBQUUsT0FBTyxFQUNyQixZQUFZLEVBQUUsU0FBUyxFQUN2QixZQUFZLEVBQUUsTUFBTSxFQUNwQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQ3hDLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQW9CSixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyw4QkFDSCxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQsd0JBQXdCLEtBQUssaUJBQWlCLENBQUM7SUFDbkQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNiLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDhCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztVQVFiLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLGlDQUFpQyxLQUFLLFVBQ3pDLFdBQVcsQ0FBQyxZQUFZLEtBQUssS0FBSztZQUM5QixDQUFDLENBQUMseURBQXlEO1lBQzNELENBQUMsQ0FBQyxFQUNWOzs7Ozs7a0RBTWtDLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7ZUFJbEYsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRWIsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8saUNBQWlDLEtBQUssVUFDekMsV0FBVyxDQUFDLFlBQVksS0FBSyxLQUFLO1lBQzlCLENBQUMsQ0FBQyx5REFBeUQ7WUFDM0QsQ0FBQyxDQUFDLEVBQ1Y7Ozs7O3lDQUt5QixLQUFLO3NEQUNRLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7ZUFJdEYsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O2tEQVEyQixlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7a0RBUy9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OztrREFTL0MsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O2tEQVMvQyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7a0RBUy9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OztrREFTL0MsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7a0RBVy9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OztrREFTL0MsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O2tEQVMvQyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7OztLQVE1RixDQUNBLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O3FEQVdtQyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJ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