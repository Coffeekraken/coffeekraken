import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @as              @s.ui.radio.classes
 * @namespace     node.mixin.ui.radio
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the radio classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default lnf you want
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 * @scope       tf              Text format css
 *
 * @snippet         @s.ui.radio.classes
 *
 * @example     css
 * @s.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiRadioClassesInterface extends __SInterface {
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

export interface ISSugarcssPluginUiRangeClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
}

export { SSugarcssPluginUiRadioClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiRangeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiRangeClassesParams = {
        lnfs: [],
        defaultLnf: 'solid',
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Radio
        * @namespace          sugar.style.ui.radio
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/radio
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display nice radio in your forms
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
        * @s.ui.radio.classes;
        * 
        * .my-radio {
        *   @s.ui.radio;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-radio${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} radio lnf`;
            })
            .join('\n')}
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf
            *   <label class="s-mbe:30 s-label">
            *     <span>John Doe</span>
            *     <input type="radio" checked class="s-radio" name="radio-lnf-${lnf}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="radio" disabled class="s-radio" name="radio-lnf-${lnf}" value="hello 3" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        * @example        html          Shapes
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-shape:default" name="radio-style-color" value="hello 1" checked />
        * </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-shape:square" name="radio-style-color" value="hello 1" checked />
        * </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-shape:pill" name="radio-style-color" value="hello 1" checked />
        * </label>
        * 
        * @example        html          Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio" name="radio-style-color" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-color" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:complementary" name="radio-style-color" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>I'm disabled</span>
        *     <input type="radio" disabled class="s-radio s-color:error" name="radio-style-color" value="hello 4" />
        *   </label>
        * 
        * @example        html          RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-ltr" value="hello 1" checked />
        *   </label>
        * </div>
        * 
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <span>John Doe</span>
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-scale" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:20">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:30">
        *     <span>John Doe</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.code(`@s.scope 'bare' {`);
    vars.comment(
        () => `/**
            * @name           s-radio
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem2" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
    ).code(
        `
            .s-radio {
                @s.ui.radio;
            }
            `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'lnf' {`);
    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-radio`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `--${lnf}`;
        }

        vars.comment(
            () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${lnf}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            .${cls} {
                @s.ui.radio($lnf: ${lnf});
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
            * @name           s-format:text input[type="radio"]
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a simple input[type="radio"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="radio" name="my-radio" checked />
            *   <input type="radio" name="my-radio" />
            *   <input type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
    ).code(
        `
            @s.format.text {
                input[type="radio"] {
                    @s.ui.radio;
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
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent some input[type="radio"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-radio" type="radio" name="my-radio" checked />
            *   <input class="s-radio" type="radio" name="my-radio" />
            *   <input class="s-radio" type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
    ).code(
        `
            @s.rhythm.vertical {
                input[type="radio"], .s-radio {
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
