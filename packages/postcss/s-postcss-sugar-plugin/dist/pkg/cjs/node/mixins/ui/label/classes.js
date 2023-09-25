"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          classes
 * @as              @sugar.ui.label.classes
 * @namespace     node.mixin.ui.label
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the label classes
 *
 * @param       {('inline'|'block'|'float')[]}                           [lnfs=['inline','block','float']]         The style(s) you want to generate
 * @param       {'inline'|'block'|'float'}                [defaultLnf='theme.ui.label.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr')[]}        [scope=['bare', 'lnf', 'vr']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.label.classes
 *
 * @example     css
 * \@sugar.ui.input.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLabelClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['inline', 'block', 'float'],
                default: ['inline', 'block', 'float'],
            },
            defaultLnf: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: s_theme_1.default.get('ui.label.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr'],
                default: ['bare', 'lnf', 'vr'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiLabelClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'inline', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Label
        * @namespace          sugar.style.ui.label
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/labels
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to structure forms using labels.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.label.classes;
        * 
        * .my-label {
        *   \@sugar.ui.label;
        * } 
        *
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-label:responsive${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} label lnf`;
    })
        .join('\n')}
        * @cssClass         s-label:inline          Make sure the input and label stay inline even on mobile. Usefull for checkbox and radio for example.
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf
            * <form class="s-flex:column s-gap:30">
            *   <label class="s-label:responsive${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}">
            *     <span>John Doe</span>
            *     <input type="text" class="s-input" placeholder="Type something!" />
            *   </label>
            *   <label class="s-label:responsive${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}">
            *     <span>John Doe</span>
            *     <textarea class="s-input" placeholder="Type something!" rows="3"></textarea>
            *   </label>
            *   <label class=" s-label:responsive${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}">
            *     <span>I'm disabled</span>
            *     <input type="text" disabled class="s-input" placeholder="Type something!" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}">
            *     <span>Support RTL</span>
            *     <input type="text" class="s-input" placeholder="Type something!" />
            *   </label>
            *   <label class="s-label:responsive${lnf === finalParams.defaultLnf ? '' : `:${lnf}`} s-color:accent">
            *     <span>With the accent color</span>
            *     <input type="text" class="s-input" placeholder="Type something!" />
            *   </label>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-label`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `:${lnf}`;
        }
        vars.comment(() => `/**
                * @name           ${cls}
                * @namespace          sugar.style.ui.label
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${lnf}</s-color>" label
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
            vars.code(`.s-label${finalParams.defaultLnf === lnf ? '' : `-${lnf}`} {
                @sugar.ui.label($lnf: ${lnf}, $scope: bare);
            } 
            `, {
                type: 'CssClass',
            });
        }
        if (finalParams.scope.includes('lnf')) {
            vars.code(() => `
                .${cls.replace(':', '-')}:not(.s-bare) {
                    @sugar.ui.label($lnf: ${lnf}, $scope: lnf);
                } 
            `, {
                type: 'CssClass',
            });
        }
    });
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
        .s-label-responsive:not(.s-label-float) {
            text-align: initial;
            
            display: flex;
            
            > * {
                width: auto;
                flex-grow: 1;
                flex-shrink: 0;
            }

            @sugar.media(<=mobile) {
                @sugar.ui.label($lnf: block, $scope: bare);

                > * {
                    width: 100%;
                }
            }
        }
        `, {
        type: 'CssClass',
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxxQkFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDeEM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUMvQztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRcUQsOERBQVM7QUFFL0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFVBQVUsRUFBRSxRQUFRLEVBQ3BCLEtBQUssRUFBRSxFQUFFLElBQ04sTUFB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