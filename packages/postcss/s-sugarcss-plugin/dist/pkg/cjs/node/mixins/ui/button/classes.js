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
 * @as              @s.ui.button.classes
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        stable
 *
 * Generate the button classes
 *
 * @param       {('solid'|'outline'|'text'|'loading')[]}                           [lnfs=['solid','outline','text','loading']]         The style(s) you want to generate
 * @param       {'solid'|'outline'|'text'|'loading'}                [defaultLnf='theme.ui.button.defaultLnf']           The default style you want
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 * @scope       tf              Text format css
 *
 * @snippet         @s.ui.button.classes
 *
 * @example       css
 * @s.ui.button.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiButtonClassesInterface extends s_interface_1.default {
    static get _definition() {
        var _a;
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid', 'outline', 'text', 'loading'],
                default: ['solid', 'outline', 'text', 'loading'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid', 'outline', 'text', 'loading'],
                default: (_a = s_theme_1.default.current.get('ui.button.defaultLnf')) !== null && _a !== void 0 ? _a : 'solid',
            },
        };
    }
}
exports.interface = SSugarcssPluginUiButtonClassesInterface;
function default_1({ params, atRule, CssVars, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: ['solid', 'outline', 'text', 'loading'], defaultLnf: 'solid' }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Buttons
        * @namespace          sugar.style.ui.button
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/button
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.button.classes;
        * 
        * .my-button {
        *   @s.ui.button;
        * }
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-btn${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} button lnf`;
    })
        .join('\n')}
        * @cssClass            s-format:text button             Apply the button style on button tags inside the s-format:text scope 
        * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped button(s)
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf
            * <div class="s-flex:align-center:wrap s-gap:20">
            *   <a class="s-btn:${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}">Click me!</button>
            *   <a class="s-btn:${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:accent">Click me!</a>
            *   <a class="s-btn:${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:complementary">Click me!</a>
            *   <a class="s-btn:${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:info">Click me!</a>
            *   <a class="s-btn:${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:error">Click me!</a>
            *   <a disabled class="s-btn:${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}">Click me!</a>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @example       html       Shapes
        * <div class="s-flex:align-center:wrap s-gap:20">
        *   <a class="s-btn">Click me!</a>
        *   <a class="s-btn s-shape:pill">Click me!</a>
        *   <a class="s-btn s-shape:square">Click me!</a>
        * </div>
        * 
        * @example       html       Scales
        * <div class="s-flex:align-center:wrap s-gap:20">
        *   <a class="s-btn s-scale:07">Click me!</a>
        *   <a class="s-btn s-scale:1">Click me!</a>
        *   <a class="s-btn s-scale:13">Click me!</a>
        *   <a class="s-btn s-scale:16">Click me!</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
        @s.scope 'bare' {
            .s-btn {
                
                    @s.ui.button;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
            * @name           s-btn-block
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">block</s-color>" button
            * 
            * @example        html
            * <a class="s-btn-block">I'm a cool block button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
        .s-btn-block {
            display: block !important;
            width: 100%;
        }
        `, {
        type: 'CssClass',
    });
    vars.code(`}`);
    vars.code(`@s.scope 'lnf' {`);
    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-btn`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `-${lnf}`;
        }
        vars.comment(() => `/**
        * @name           ${cls}
        * @namespace          sugar.style.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${lnf}</s-color>" button
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
    `).code(`
                .${cls} {
                    @s.scope.only 'lnf' {
                        @s.ui.button($lnf: ${lnf});
                    }
                }`, {
            type: 'CssClass',
        });
    });
    vars.code('}');
    vars.code(`@s.scope 'tf' {`);
    vars.comment(() => `/**
            * @name           s-format:text button
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a simple button tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <a>
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @s.format.text {
                button {
                    @s.ui.button;
                } 
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'vr' {`);
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent some buttons in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <a class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <a class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <a class="s-btn">
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
                @s.rhythm.vertical {
                    button, .s-btn {
                        ${s_theme_1.default.current.jsObjectToCssProperties(s_theme_1.default.current.get('ui.button.rhythmVertical'))}
                    } 
                }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQztnQkFDL0MsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDO2FBQ25EO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQztnQkFDL0MsT0FBTyxFQUNILE1BQUEsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLG1DQUFJLE9BQU87YUFDOUQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT21ELDREQUFTO0FBRTdELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxVQUFVLEVBQ1YsV0FBVyxHQU9kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUM3QyxVQUFVLEVBQUUsT0FBTyxJQUNoQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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