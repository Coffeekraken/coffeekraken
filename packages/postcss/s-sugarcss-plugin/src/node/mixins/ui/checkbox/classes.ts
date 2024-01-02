import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @as          @s.ui.checkbox.classes
 * @namespace     node.mixin.ui.checkbox
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        stable
 *
 * Generate the checkbox classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 * @scope       tf              Text format css
 *
 * @snippet         @s.checkbox.classes
 *
 * @example       css
 * @s.ui.form.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiCheckboxClassesInterface extends __SInterface {
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
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiCheckboxClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
}

export { SSugarcssPluginUiCheckboxClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiCheckboxClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiCheckboxClassesParams = {
        lnfs: ['solid'],
        defaultLnf: 'solid',
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
        * @status       stable
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
        * @s.ui.checkbox.classes;
        * 
        * .my-checkbox {
        *   @s.ui.checkbox;
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
        *   <label class="s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-ltr-1" value="hello 1" />
        *   </label>
        *   <label class="s-label s-scale:20">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-2" value="hello 2" />
        *   </label>
        *   <label class="s-label s-scale:30">
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

    vars.code(`@s.scope 'bare' {`);
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
                @s.scope.only 'bare' {
                    @s.ui.checkbox;
                }
            }
            `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'lnf' {`);
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
        .${cls} {
            @s.scope.only 'lnf' {
                @s.ui.checkbox($lnf: ${lnf});
            }
        }
        `,
            {
                type: 'CssClass',
            },
        );
    });
    vars.code('}');

    vars.code(`@s.scope 'tf' {`);
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
            @s.format.text {
                input[type="checkbox"] {
                    @s.ui.checkbox;
                } 
            }
        `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'vr' {`);

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
            @s.rhythm.vertical {
                input[type="checkbox"], .s-checkbox {
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get('ui.form.rhythmVertical'),
                    )}
                } 
            }
        `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    return vars;
}
