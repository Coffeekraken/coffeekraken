import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @as              @sugar.ui.label.classes
 * @namespace     node.mixin.ui.label
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the label classes
 *
 * @param       {('inline'|'block'|'float')[]}                           [lnfs=['inline','block','float']]         The style(s) you want to generate
 * @param       {'inline'|'block'|'float'}                [defaultLnf='theme.ui.label.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr')[]}        [scope=['bare', 'lnf', 'vr']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.label.classes
 *
 * @example     css
 * \@sugar.ui.input.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
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

export interface IPostcssSugarPluginUiLabelClassesParams {
    lnfs: ('inline' | 'float' | 'block')[];
    defaultLnf: 'inline' | 'float' | 'block';
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssSugarPluginUiLabelClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLabelClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLabelClassesParams = {
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
        * @status       beta
        * 
        * These classes allows you to structure forms using labels.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.label.classes;
        * 
        * .my-label {
        *   \@sugar.ui.label;
        * } 
        *
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-label:responsive${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} label lnf`;
            })
            .join('\n')}
        * @cssClass         s-label:inline          Make sure the input and label stay inline even on mobile. Usefull for checkbox and radio for example.
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf
            * <form class="s-flex:column s-gap:30">
            *   <label class="s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }">
            *     <span>John Doe</span>
            *     <input type="text" class="s-input" placeholder="Type something!" />
            *   </label>
            *   <label class="s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }">
            *     <span>John Doe</span>
            *     <textarea class="s-input" placeholder="Type something!" rows="3"></textarea>
            *   </label>
            *   <label class=" s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }">
            *     <span>I'm disabled</span>
            *     <input type="text" disabled class="s-input" placeholder="Type something!" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }">
            *     <span>Support RTL</span>
            *     <input type="text" class="s-input" placeholder="Type something!" />
            *   </label>
            *   <label class="s-label:responsive${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            } s-color:accent">
            *     <span>With the accent color</span>
            *     <input type="text" class="s-input" placeholder="Type something!" />
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
                @sugar.ui.label($lnf: ${lnf}, $scope: bare);
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
                    @sugar.ui.label($lnf: ${lnf}, $scope: lnf);
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
            
            > * {
                width: auto;
                flex-grow: 1;
                flex-shrink: 0;
            }

            @sugar.media(<=mobile) {
                @sugar.ui.label($lnf: block, $scope: bare);

                > * {
                    width: 100%;
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
