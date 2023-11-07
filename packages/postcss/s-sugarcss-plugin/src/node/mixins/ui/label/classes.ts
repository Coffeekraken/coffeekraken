import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @as              @s.ui.label.classes
 * @namespace     node.mixin.ui.label
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the label classes
 *
 * @param       {('inline'|'block'|'float')[]}                           [lnfs=['inline','block','float']]         The style(s) you want to generate
 * @param       {'inline'|'block'|'float'}                [defaultLnf='theme.ui.label.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr')[]}        [scope=['bare', 'lnf', 'vr']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.label.classes
 *
 * @example     css
 * @s.ui.input.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiLabelClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['inline', 'block', 'float'],
                default: ['inline', 'block', 'float'],
            },
            defaultLnf: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: __STheme.get('ui.label.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr'],
                default: ['bare', 'lnf', 'vr'],
            },
        };
    }
}

export interface ISSugarcssPluginUiLabelClassesParams {
    lnfs: ('inline' | 'float' | 'block')[];
    defaultLnf: 'inline' | 'float' | 'block';
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { SSugarcssPluginUiLabelClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiLabelClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiLabelClassesParams = {
        lnfs: [],
        defaultLnf: 'inline',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Label
        * @namespace          sugar.style.ui.label
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/labels
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to structure forms using labels.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.label.classes;
        * 
        * .my-label {
        *   @s.ui.label;
        * } 
        *
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-label${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} label lnf`;
            })
            .join('\n')}
        * @cssClass                 s-label:responsive           Make the label responsive
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf
            * <form class="s-flex:column s-gap:30">
            *   <label class="s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }">
            *     <span>John Doe</span>
            *     <input type="text" class="s-input s-width:60" placeholder="Type something!" />
            *   </label>
            *   <label class="s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }">
            *     <span>John Doe</span>
            *     <textarea class="s-input s-width:60" placeholder="Type something!" rows="3"></textarea>
            *   </label>
            *   <label class=" s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }">
            *     <span>Support RTL</span>
            *     <input type="text" class="s-input s-width:60" placeholder="Type something!" />
            *   </label>
            *   <label class="s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            } s-color:accent">
            *     <span>With the accent color</span>
            *     <input type="text" class="s-input s-width:60" placeholder="Type something!" />
            *   </label>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-label`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `:${lnf}`;
        }

        vars.comment(
            () => `/**
                * @name           ${cls}
                * @namespace          sugar.style.ui.label
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${lnf}</s-color>" label
                * 
                * @example        html
                * <label class="${cls.replace(':', ':')}">
                *   <span>Hello world</span>
                *   <input type="text" class="s-input" placeholder="Type something!" />
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        );

        if (finalParams.scope.includes('bare')) {
            vars.code(
                `.s-label${finalParams.defaultLnf === lnf ? '' : `-${lnf}`} {
                @s.ui.label($lnf: ${lnf}, $scope: bare);
            } 
            `,
                {
                    type: 'CssClass',
                },
            );
        }

        if (finalParams.scope.includes('lnf')) {
            vars.code(
                () => `
                .${cls.replace(':', '-')}:not(.s-bare) {
                    @s.ui.label($lnf: ${lnf}, $scope: lnf);
                } 
            `,
                {
                    type: 'CssClass',
                },
            );
        }
    });

    vars.comment(
        () => `/**
        * @name           s-label:responsive
        * @namespace          sugar.style.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>responsive</yellow>" label.
        * This mean that on desktop and tablet it will be "inline", and on mobile it will be "block".
        * 
        * @example        html
        * <label class="s-label:responsive">
        *   <span>Hello world</span>
        *   <input type="text" class="s-input" placeholder="Hello world" />
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
    ).code(
        `
        .s-label-responsive:not(.s-label-float) {
            text-align: initial;
            display: flex;
            
            > *:not(.s-width) {
                width: 50%;
            }

            > * {
                flex-shrink: 0;
            }

            @s.media(<=mobile) {
                @s.ui.label($lnf: block, $scope: bare);

                > * {
                    width: 100% !important;
                }
            }
        }
        `,
        {
            type: 'CssClass',
        },
    );

    return vars;
}
