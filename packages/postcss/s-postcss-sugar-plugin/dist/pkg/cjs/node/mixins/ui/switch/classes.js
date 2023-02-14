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
 * @param       {('solid')[]}                           [lnfs=['solid']]         The style(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
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
                values: ['bare', 'lnf', 'tf'],
                default: ['bare', 'lnf', 'tf'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiSwitchClassesMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'solid', scope: [] }, params);
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
        * \\@sugar.ui.switch.classes;
        * 
        * .my-switch {
        *   \@sugar.ui.switch;
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
        * @example      html            Shapes
        *   <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch s-shape:default" />
        *   </label>
        * <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch s-shape:square" />
        *   </label>
        * <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-switch s-shape:pill" />
        *   </label>
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
            .${cls.replace('\n', '--')}:not(.s-bare) {
                @sugar.ui.switch($lnf: ${lnf}, $scope: lnf);
            }
        `, { type: 'CssClass' });
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sK0NBQWdELFNBQVEscUJBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsbUNBQUksT0FBTzthQUN6RDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRMkQsb0VBQVM7QUFFckUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFVBQVUsRUFBRSxPQUFPLEVBQ25CLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQTJCSixXQUFXLENBQUMsSUFBSTtTQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsT0FBTyw0QkFDSCxHQUFHLEtBQUssV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQsd0JBQXdCLEdBQUcsYUFBYSxDQUFDO0lBQzdDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRWIsV0FBVyxDQUFDLElBQUk7U0FDYixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNULE9BQU8saUNBQWlDLEdBQUc7OzBCQUVqQyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBEQUV6RCxHQUFHLEtBQUssV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQ7Ozs7bUVBS0ksR0FBRyxLQUFLLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQ2pEOztlQUVHLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3NCQUlELGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0JBSS9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0JBSS9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7c0JBTy9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OztVQU0zRCxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQztTQUN6QyxHQUFHLENBQ0EsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO3FEQUMwQixLQUFLO3NCQUNwQyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7U0FHNUQsQ0FDSTtTQUNBLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7c0JBSUQsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OztzQkFJL0MsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OztzQkFJL0MsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OztzQkFJL0MsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztLQU9oRSxDQUNBLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O3dCQVdNLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O1FBT3ZDLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7Ozs7U0FJSCxFQUNHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDO1lBQ3JCLElBQUksR0FBRyxLQUFLLFdBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2hDLEdBQUcsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ3JCO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztvQ0FDYyxHQUFHOzs7O2lFQUkwQixHQUFHOzs7Ozs7NEJBTXhDLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29EQUNDLEdBQUc7aUJBQ2xDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2lCQUNwQixJQUFJLEVBQUU7Ozs7OztZQU1mLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7ZUFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7eUNBQ0csR0FBRzs7U0FFbkMsRUFDTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBN01ELDRCQTZNQyJ9