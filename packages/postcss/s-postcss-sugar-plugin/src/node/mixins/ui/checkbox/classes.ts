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

export interface IPostcssSugarPluginUiCheckboxClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiCheckboxClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiCheckboxClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiCheckboxClassesParams = {
        lnfs: ['solid'],
        defaultLnf: 'solid',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
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
                return ` * @cssClass     s-checkbox${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} checkbox lnf`;
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
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
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
       `,
        ).code(
            `
            .s-checkbox {
                @sugar.ui.checkbox($scope: bare);
            }
            `,
            {
                type: 'CssClass',
            },
        );
    }

    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-checkbox`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `-${lnf}`;
        }

        vars.comment(
            () => `/**
        * @name           ${cls}
        * @namespace          sugar.style.ui.checkbox
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${lnf}</s-color>" checkbox
        * 
        * @example        html
        * <input type="checkbox" class="s-checkbox${
            lnf === finalParams.defaultLnf ? '' : `:${lnf}`
        }" value="something" name="mycheckboxItem1" />
        * <input type="checkbox" class="s-checkbox${
            lnf === finalParams.defaultLnf ? '' : `:${lnf}`
        }" value="something" name="mycheckboxItem2" />
        <input type="checkbox" class="s-checkbox${
            lnf === finalParams.defaultLnf ? '' : `:${lnf}`
        }" value="something" name="mycheckboxItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
        ).code(
            `
        .${cls}:not(.s-bare) {
            @sugar.ui.checkbox($lnf: ${lnf}, $scope: lnf);
        }
        `,
            {
                type: 'CssClass',
            },
        );
    });

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(
            () => `/**
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
       `,
        ).code(
            `
            @sugar.format.text {
                input[type="checkbox"] {
                    @sugar.ui.checkbox($scope: '${finalParams.scope.join(
                        ',',
                    )}');
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            () => `/**
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
       `,
        ).code(
            `
            @sugar.rhythm.vertical {
                input[type="checkbox"], .s-checkbox {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.form.rhythmVertical'),
                    )}
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
