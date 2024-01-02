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
 * @as          @s.ui.select.classes
 * @namespace     node.mixin.ui.select
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the select classes
 *
 * @param       {('solid'|'underline')[]}                           [lnfs=['solid','underline']]         The style(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 * @scope       tf              Text format css
 *
 * @snippet         @s.ui.select.classes
 *
 * @example     css
 * @s.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormSelectClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['solid', 'underline'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.current.get('ui.form.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiFormSelectClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'solid' }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Select
        * @namespace          sugar.style.ui.select
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/select
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display nice select in your forms
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
        * @s.ui.select.classes;
        * 
        * .my-select {
        *   @s.ui.select;
        * }
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-select${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} select lnf`;
    })
        .join('\n')}
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>John Doe</span>
            *     <select class="s-select${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}" name="select-lnf-${lnf}">
            *       <option value="value1">${faker_1.default.name.findName()}</option>
            *       <option value="value2">${faker_1.default.name.findName()}</option>
            *       <option value="value3">${faker_1.default.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>I'm disabled</span>
            *     <select disabled class="s-select${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}" name="select-lnf-${lnf}">
            *       <option value="value1">${faker_1.default.name.findName()}</option>
            *       <option value="value2">${faker_1.default.name.findName()}</option>
            *       <option value="value3">${faker_1.default.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @example      html            Shapes
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-shape:default" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        * </label>
        * <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-shape:square" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        * </label>
        * <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-shape:pill" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        * </label>
        * 
        * @example      html            Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:accent" name="select-color-complementary">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:complementary" name="select-color-error">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:error" name="select-color-error" disabled>
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example      html            Multiple
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:accent" multiple name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example          html            RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:accent" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        * </div>
        * 
        * @example          html           Scales
        *   <label class="s-mbe:30 s-label:responsive s-scale:07">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:accent" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:accent" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:13">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:accent" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:16">
        *     <span>John Doe</span>
        *     <select class="s-select s-color:accent" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
            * @name           s-select
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" select
            * 
            * @example        html
            * <select class="s-select">
            *   <option value="value 1">Hello</option>
            *   <option value="value 2">World</option>
            * </select>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
                .s-select {
                    @s.ui.select;
                }`, { type: 'CssClass' });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    finalParams.lnfs.forEach((lnf) => {
        const isDefaultStyle = finalParams.defaultLnf === lnf;
        const styleCls = isDefaultStyle ? '' : `.s-select-${lnf}`;
        const cls = `.s-select${styleCls}`;
        vars.comment(() => `/**
            * @name           s-select${isDefaultStyle ? '' : `:${lnf}`}
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${lnf}</yellow>" select
            * 
            * @example        html
            * <select class="s-select${isDefaultStyle ? '' : `:${lnf}`}">
            *   <option value="value 1">Hello</option>
            *   <option value="value 2">World</option>
            * </select>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
        vars.code(() => `
                ${cls} {
                    @s.ui.select($lnf: ${lnf});
                }`, { type: 'CssClass' });
    });
    vars.code('}');
    vars.code(`@s.scope 'tf' {`);
    vars.comment(() => `/**
            * @name           s-format:text select
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent a simple select tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <select>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @s.format.text {
                select {
                    @s.ui.select;
                } 
            }
        `, { type: 'CssClass' });
    vars.code('}');
    vars.code(`@s.scope 'vr' {`);
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent some select in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <select class="s-select">
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @s.rhythm.vertical {
                select, .s-select {
                    ${s_theme_1.default.current.jsObjectToCssProperties(s_theme_1.default.current.get('ui.form.rhythmVertical'))}
                } 
            }
        `, { type: 'CssClass' });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7YUFDbEM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ3REO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU91RCxnRUFBUztBQUVqRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsVUFBVSxFQUFFLE9BQU8sSUFDaEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQTJCSixXQUFXLENBQUMsSUFBSTtTQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsT0FBTyw0QkFDSCxHQUFHLEtBQUssV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQsd0JBQXdCLEdBQUcsYUFBYSxDQUFDO0lBQzdDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRWIsV0FBVyxDQUFDLElBQUk7U0FDYixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNULE9BQU8saUNBQWlDLEdBQUc7OzsyQ0FJM0MsV0FBVyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQ2pELHNCQUFzQixHQUFHOzZDQUNRLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzZDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs2Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7O29EQU1wRCxXQUFXLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQsc0JBQXNCLEdBQUc7NkNBQ1EsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NkNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzZDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O2VBR3JELENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7eUNBTWtCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozt5Q0FNdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3lDQU12QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozt5Q0FRdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3lDQU12QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7eUNBTXZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozt5Q0FNdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7eUNBUXZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozt5Q0FTdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7O3lDQVN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7eUNBTXZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxF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