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
 * @namespace     node.mixin.ui.label
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the label classes
 *
 * @param       {('inline'|'block'|'float')[]}                           [styles=['inline','block','float']]         The style(s) you want to generate
 * @param       {'inline'|'block'|'float'}                [defaultStyle='theme.ui.label.defaultStyle']           The default style you want
 * @param       {String}                            [defaultColor=theme.ui.label.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.input.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLabelClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['inline', 'block', 'float'],
                default: ['inline', 'block', 'float'],
            },
            defaultStyle: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: s_theme_1.default.get('ui.label.defaultStyle'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('color')),
                default: s_theme_1.default.get('ui.label.defaultColor'),
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
exports.interface = postcssSugarPluginUiLabelClassesInterface;
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function dependencies() {
    return {
        files: [`${(0, dirname_1.default)()}/label.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], 
        // shapes: [],
        defaultStyle: 'inline', defaultColor: 'main', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Labels
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/labels
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to structure forms using labels.
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-label${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} label style`;
    })
        .join('\n')}
        * @cssClass         s-label:inline          Make sure the input and label stay inline even on mobile. Usefull for checkbox and radio for example.
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
            *     <input type="text" class="s-input ${style !== 'block' ? 's-width:40' : ''}" placeholder="Type something!" />
            *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
            *     <textarea class="s-input ${style !== 'block' ? 's-width:40' : ''}" placeholder="Type something!" rows="3"></textarea>
            *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
            *   </label>
        *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
        *     <input type="text" disabled class="s-input ${style !== 'block' ? 's-width:40' : ''}" placeholder="Type something!" />
        *     <span>I'm disabled</span>
    *   </label>
    *   <label dir="rtl" class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
    *     <input type="text" class="s-input ${style !== 'block' ? 's-width:40' : ''}" placeholder="Type something!" />
    *     <span>Support RTL</span>
    *   </label>
    *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent">
    *     <input type="text" class="s-input ${style !== 'block' ? 's-width:40' : ''}" placeholder="Type something!" />
    *     <span>With the accent color</span>
    *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    finalParams.styles.forEach((style) => {
        let cls = `s-label`;
        if (style !== finalParams.defaultStyle) {
            cls += `:${style}`;
        }
        vars.comment(() => `/**
                * @name           ${cls}
                * @namespace          sugar.style.ui.label
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${style}</s-color>" label
                * 
                * @example        html
                * <label class="${cls.replace(':', ':')}">
                *   <span>Hello world</span>
                *   <input type="text" class="s-input" placeholder="Type something!" />
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `);
        if (finalParams.scope.includes('bare')) {
            vars.code(`.s-label${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.label($style: ${style}, $scope: bare);
            } 
            `, {
                type: 'CssClass',
            });
        }
        if (finalParams.scope.includes('lnf')) {
            vars.code(() => `
                .${cls.replace(':', '--')} {
                    @sugar.ui.label($style: ${style}, $scope: lnf);
                } 
            `, {
                type: 'CssClass',
            });
        }
    });
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-label:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `, { type: 'CssClass' });
    }
    vars.comment(() => `/**
        * @name           s-label:responsive
        * @namespace          sugar.style.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>responsive</yellow>" label.
        * This mean that on desktop and tablet it will be "inline", and on mobile it will be "block".
        * 
        * @example        html
        * <label class="s-label:responsive">
        *   <span>Hello world</span>
        *   <input type="text" class="s-input" placeholder="Hello world" />
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-label--responsive {
            text-align: initial;

            > span {
                width: clamp(100px, 50%, 50%);
            }   
            > input:not([type="radio"][type="checkbox"]),
            > textarea,
            > div {
                width: clamp(250px, 50%, 50%);
            }

            @sugar.media(<=mobile) {
                @sugar.ui.label($style: block, $scope: bare);

                > span,
                > input:not([type="radio"][type="checkbox"]),
                > textarea,
                > div {
                    width: 100%;
                }   
                > span {
                    padding-block-start: 0;
                } 
            }
        }
        `, {
        type: 'CssClass',
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQzthQUN4QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDcEMsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ2pEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUM1QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9B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