"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name          classes
 * @namespace     node.mixin.ui.switch
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the switch classes
 *
 * @param       {('default')[]}                           [lnfs=['default']]         The style(s) you want to generate
 * @param       {'default'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiSwitchClassesMixinInterface extends s_interface_1.default {
    static get _definition() {
        var _a;
        return {
            lnfs: {
                type: 'String[]',
                values: ['default'],
                default: ['default'],
            },
            defaultLnf: {
                type: 'String',
                values: ['default'],
                default: (_a = s_theme_1.default.get('ui.form.defaultLnf')) !== null && _a !== void 0 ? _a : 'default',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'tf'],
                default: ['bare', 'lnf', 'tf'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiSwitchClassesMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Switch
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/form/switch
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style checkbox HTMLElement as switches
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-switch${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} switch lnf`;
    })
        .join('\n')}
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf
            *   <label class="s-mbe:30 s-label">
            *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
            *     <input type="checkbox" class="s-switch${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" />
            *   </label>
                <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="checkbox" disabled class="s-switch${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" />
            *   </label>
            * `;
    })
        .join('\n')}
        *
        * @example      html            RTL Support
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        * </div>
        * 
        * @example      html            Colors (non-exhauustive)
        ${['main', 'accent', 'complementary', 'error']
        .map((color) => `
        *   <label class="s-mbe:30 s-label s-color:${color}">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        `)
        .join('\n')}
        * 
        * @example      html            Scales
        *   <label class="s-mbe:30 s-label s-scale\:05">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:10">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:15">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:20">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-switch
            * @namespace          sugar.style.ui.switch
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" switch
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <label class="s-label">
            *   <span>${faker_1.default.name.findName()}</span>
            *   <input type="checkbox" class="s-switch" />
            * </label>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-switch {
            @sugar.ui.switch($scope: bare);
        }
        `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            let cls = `s-switch`;
            if (lnf !== finalParams.defaultLnf) {
                cls += `\n${lnf}`;
            }
            vars.comment(() => `/**
                * @name           ${cls}
                * @namespace          sugar.style.ui.switch
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${lnf}</s-color>" switch
                * 
                * @feature      Vertical rhythm
                * 
                * @example        html
                * <label class="s-label">
                *   <span>${faker_1.default.name.findName()}</span>
                *   <input type="checkbox" class="${cls
                .replace(/\./gm, ' ')
                .trim()}" />
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .${cls.replace('\n', '--')} {
                @sugar.ui.switch($lnf: ${lnf}, $scope: lnf);
            }
        `, { type: 'CssClass' });
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sK0NBQWdELFNBQVEscUJBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ3ZCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsbUNBQUksU0FBUzthQUMzRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRMkQsb0VBQVM7QUFFckUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJ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