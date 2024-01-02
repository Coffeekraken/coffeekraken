import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';

/**
 * @name          classes
 * @as          @s.ui.input.classes
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the input classes
 *
 * @param       {('solid'|'underline')[]}                           [lnfs=['solid','underline']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default lnf you want
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet         @s.ui.input.classes
 *
 * @example     css
 * @s.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['solid', 'underline'],
            },
            defaultLnf: {
                type: 'String',
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiFormClassesParams {
    lnfs: string[];
    defaultLnf: 'solid' | 'underline';
}

export { SSugarcssPluginUiFormClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiFormClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiFormClassesParams = {
        lnfs: [],
        defaultLnf: 'solid',
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Input
        * @namespace          sugar.style.ui.input
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some lnfs to your text input
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
        * @s.ui.input.classes;
        * 
        * .my-input {
        *   @s.ui.input;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-input${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                }           Apply the ${lnf} input lnf`;
            })
            .join('\n')}
        * 
        ${__keysFirst(finalParams.lnfs, ['default'])
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>John Doe</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf}" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        <span>I'm disabled</span>
            *       <input type="text" disabled placeholder="Type something!" class="s-input\:${lnf}" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive s-mbe:30">
            *       <span>Support RTL</span>
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${lnf}" />
            *   </label>
            * 
            * `;
            })
            .join('\n')}
        *
        * @example        html       Shapes
        *   <label class="s-label:responsive s-mbe:30">
        *       <span>John Doe</span>
        *       <input type="text" placeholder="Type something!" class="s-input s-shape:default" />
        *  </label>
        *   <label class="s-label:responsive s-mbe:30">
        *       <span>John Doe</span>
        *       <input type="text" placeholder="Type something!" class="s-input s-shape:square" />
        *  </label>
        * <label class="s-label:responsive s-mbe:30">
        *       <span>John Doe</span>
        *       <input type="text" placeholder="Type something!" class="s-input s-shape:pill" />
        *  </label>
        * 
        *
        * @example        html       Colors (non-exhaustive)
        ${['main', 'accent', 'complementary', 'error']
            .map((color) => {
                return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>John Doe</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-color:${color}" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        * @example        html       Scales (non-exhaustive)
        ${['07', '10', '13', '16']
            .map((scale) => {
                return ` 
            *   <label class="s-label:responsive s-scale:${scale} s-mbe:30">
            *       <span>John Doe</span>
            *       <input type="text" placeholder="Type something!" class="s-input" />
            *   </label>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.code(`@s.scope 'bare' {`);
    vars.comment(
        () => `/**
        * @name           s-input
        * @namespace          sugar.style.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bare</yellow>" input
        * 
        * @example        html
        * <input type="text" class="s-input" placeholder="Hello world" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
    ).code(
        `
        .s-input {
            @s.scope.only 'bare' {
                @s.ui.input;
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
        const isDefaultStyle = finalParams.defaultLnf === lnf;

        const styleCls = isDefaultStyle ? '' : `.s-input-${lnf}`;
        const cls = `.s-input${styleCls}`;

        vars.comment(
            () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${lnf}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            [
                `${cls} {`,
                `   @s.scope.only 'lnf' {`,
                `       @s.ui.input($lnf: ${lnf});`,
                `   }`,
                `}`,
            ].join('\n'),
            {
                type: 'CssClass',
            },
        );
    });
    vars.code('}');

    return vars;
}
