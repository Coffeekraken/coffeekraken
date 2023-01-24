import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the input classes
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

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['default', 'underline'],
            },
            defaultLnf: {
                type: 'String',
                default: __STheme.get('ui.form.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'tf'],
                default: ['bare', 'lnf', 'vr', 'tf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiFormClassesParams {
    lnfs: string[];
    defaultLnf: 'default' | 'underline';
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiFormClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormClassesParams = {
        lnfs: [],
        defaultLnf: 'default',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Text Input
        * @namespace          sugar.style.ui.input
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       beta
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
        * \\@sugar.ui.input.classes;
        * 
        * .my-input {
        *   \@sugar.ui.input;
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
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-width:40" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        <span>I'm disabled</span>
            *       <input type="text" disabled placeholder="Type something!" class="s-input\:${lnf} s-width:40" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive s-mbe:30">
            *       <span>Support RTL</span>
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${lnf} s-width:40" />
            *   </label>
            * 
            * `;
            })
            .join('\n')}
        *
        ${__keysFirst(finalParams.lnfs, ['default'])
            .map((lnf) => {
                return ` * @example        html       Shapes
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-shape:default s-width:40" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-shape:square s-width:40" />
            *  </label>
            * <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${lnf} s-shape:pill s-width:40" />
            *  </label>
            * `;
            })
            .join('\n')}
        *
        * @example        html       Colors (non-exhaustive)
        ${['main', 'accent', 'complementary', 'error']
            .map((color) => {
                return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-color:${color} s-width:40" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        * @example        html       Scales (non-exhaustive)
        ${['07', '10', '13', '16']
            .map((scale) => {
                return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-scale:${scale} s-width:40" />
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

    if (finalParams.scope.includes('bare')) {
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
            @sugar.ui.input($scope: bare);
        }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            const isDefaultStyle = finalParams.defaultLnf === lnf;

            const styleCls = isDefaultStyle ? '' : `.s-input--${lnf}`;
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
                    `${cls}:not(.s-bare) {`,
                    ` @sugar.ui.input($lnf: ${lnf}, $scope: lnf);`,
                    `}`,
                ].join('\n'),
                {
                    type: 'CssClass',
                },
            );
        });
    }

    return vars;
}
