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
 * @as              @s.ui.switch.classes
 * @namespace     node.mixin.ui.switch
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the switch classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The style(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.switch.classes
 *
 * @example     css
 * @s.ui.switch.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiSwitchClassesMixinInterface extends s_interface_1.default {
    static get _definition() {
        var _a;
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: (_a = s_theme_1.default.get('ui.form.defaultLnf')) !== null && _a !== void 0 ? _a : 'solid',
            },
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
exports.interface = SSugarcssPluginUiSwitchClassesMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'solid', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Switch
        * @namespace          sugar.style.ui.switch
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/form/switch
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to style checkbox HTMLElement as switches
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.switch.classes;
        * 
        * .my-switch {
        *   @s.ui.switch;
        * }
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
            *     <span>John Doe</span>
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
        * @example      html            Shapes
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch s-shape:default" checked />
        *   </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch s-shape:square" checked />
        *   </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch s-shape:pill" checked />
        *   </label>
        *
        * @example      html            RTL Support
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        * </div>
        * 
        * @example      html            Colors (non-exhauustive)
        ${['main', 'accent', 'complementary', 'error']
        .map((color) => `
        *   <label class="s-mbe:30 s-label s-color:${color}">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        `)
        .join('\n')}
        * 
        * @example      html            Scales
        *   <label class="s-mbe:30 s-label s-scale\:05">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:10">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:15">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:20">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
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
            @s.ui.switch($scope: bare);
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
            .${cls.replace('\n', '-')}:not(.s-bare) {
                @s.ui.switch($lnf: ${lnf}, $scope: lnf);
            }
        `, { type: 'CssClass' });
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsbUNBQUksT0FBTzthQUN6RDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUXdELGlFQUFTO0FBRWxFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixVQUFVLEVBQUUsT0FBTyxFQUNuQixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FB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