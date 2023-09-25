import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          classes
 * @as          @sugar.ui.checkbox.classes
 * @namespace     node.mixin.ui.checkbox
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the checkbox classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @sugar.checkbox.classes
 *
 * @example       css
 * \@sugar.ui.form.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiCheckboxClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.form.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'tf', 'vr'],
                default: ['bare', 'lnf', 'tf', 'vr'],
            },
        };
    }
}
export { postcssSugarPluginUiCheckboxClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: ['solid'], defaultLnf: 'solid', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Checkbox
        * @namespace          sugar.style.ui.checkbox
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/checkbox
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice checkbox in your forms
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
        * \\@sugar.ui.checkbox.classes;
        * 
        * .my-checkbox {
        *   \@sugar.ui.checkbox;
        * }
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-checkbox${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} checkbox lnf`;
    })
        .join('\n')}
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf}
            * <div class="s-flex:column s-gap:30">
            *   <label class="s-label">
            *     <span>John Doe</span>
            *     <input type="checkbox" checked class="s-checkbox" name="checkbox-lnf-${lnf}-1" value="hello 1" />
            *   </label>
            *   <label class="s-label">
            *     <span>I'm disabled</span>
            *     <input type="checkbox" disabled class="s-checkbox s-color:accent" name="checkbox-lnf-${lnf}-3" value="hello 3" />
            *   </label>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @example      html       Shapes
        * <div class="s-flex:column s-gap:30">
        *   <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox s-shape:default s-color:accent" name="checkbox-style-color-2" value="hello 2" />
        *   </label>
        *   <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox s-shape:square s-color:accent" name="checkbox-style-color-2" value="hello 2" />
        *   </label>
        * <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox s-shape:pill s-color:accent" name="checkbox-style-color-2" value="hello 2" />
        *   </label>
        * </div>
        * 
        * @example      html       Colors (none-exhaustive)
        * <div class="s-flex:column s-gap:30">
        *   <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-color-2" value="hello 2" />
        *   </label>
        *   <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox s-color:complementary" name="checkbox-style-color-3" value="hello 3" />
        *   </label>
        *   <label class="s-label">
        *     <span>I'm disabled</span>
        *     <input type="checkbox" disabled class="s-checkbox s-color:error" name="checkbox-style-color-4" value="hello 4" />
        *   </label>
        * </div>
        * 
        * @example          html        RTL
        * <div class="s-flex:column s-gap:30" dir="rtl">
        *   <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-ltr-1" value="hello 1" />
        *   </label>
        *   <label class="s-label">
        *     <span>I'm disabled</span>
        *     <input type="checkbox" disabled class="s-checkbox" name="checkbox-style-ltr-3" value="hello 3" />
        *   </label>
        * </div>
        * 
        * @example          html        Scales
        * <div class="s-flex:column s-gap:30">
        *   <label class="s-label s-scale:07">
        *     <span>John Doe</span>
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-ltr-1" value="hello 1" />
        *   </label>
        *   <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-2" value="hello 2" />
        *   </label>
        *   <label class="s-label s-scale:13">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-3" value="hello 3" />
        *   </label>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-checkbox
            * @namespace          sugar.style.ui.checkbox
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" checkbox
            * 
            * @example        html
            * <input type="checkbox" class="s-checkbox" value="something" name="mycheckboxItem1" />
            * <input type="checkbox" class="s-checkbox" value="something" name="mycheckboxItem2" />
            * <input type="checkbox" class="s-checkbox" value="something" name="mycheckboxItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-checkbox {
                @sugar.ui.checkbox($scope: bare);
            }
            `, {
            type: 'CssClass',
        });
    }
    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-checkbox`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `-${lnf}`;
        }
        vars.comment(() => `/**
        * @name           ${cls}
        * @namespace          sugar.style.ui.checkbox
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${lnf}</s-color>" checkbox
        * 
        * @example        html
        * <input type="checkbox" class="s-checkbox${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" value="something" name="mycheckboxItem1" />
        * <input type="checkbox" class="s-checkbox${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" value="something" name="mycheckboxItem2" />
        <input type="checkbox" class="s-checkbox${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}" value="something" name="mycheckboxItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .${cls}:not(.s-bare) {
            @sugar.ui.checkbox($lnf: ${lnf}, $scope: lnf);
        }
        `, {
            type: 'CssClass',
        });
    });
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
            * @name           s-format:text
            * @namespace          sugar.style.ui.checkbox
            * @type           CssClass
            * 
            * This class represent a simple input[type="checkbox"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="checkbox" checked />
            *   <input type="checkbox" checked />
            *   <input type="checkbox" checked />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                input[type="checkbox"] {
                    @sugar.ui.checkbox($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.checkbox
            * @type           CssClass
            * 
            * This class represent some input[type="checkbox"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-checkbox" type="checkbox" checked />
            *   <input class="s-checkbox" type="checkbox" checked />
            *   <input class="s-checkbox" type="checkbox" checked />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                input[type="checkbox"], .s-checkbox {
                    ${__STheme.jsObjectToCssProperties(__STheme.get('ui.form.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDdkM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNm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