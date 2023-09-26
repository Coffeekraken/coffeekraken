import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @as              @s.ui.button.classes
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        stable
 *
 * Generate the button classes
 *
 * @param       {('solid'|'outline'|'text'|'loading')[]}                           [lnfs=['solid','outline','text','loading']]         The style(s) you want to generate
 * @param       {'solid'|'outline'|'text'|'loading'}                [defaultLnf='theme.ui.button.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf)[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.button.classes
 *
 * @example       css
 * \@s.ui.button.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid', 'outline', 'text', 'loading'],
                default: ['solid', 'outline', 'text', 'loading'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid', 'outline', 'text', 'loading'],
                default: __STheme.get('ui.button.defaultLnf') ?? 'solid',
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

export interface IPostcssSugarPluginUiButtonClassesParams {
    lnfs: ('solid' | 'outline' | 'text' | 'loading')[];
    defaultLnf: 'solid' | 'outline' | 'text' | 'loading';
    scope: ('bare' | 'lnf' | 'bare' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiButtonClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonClassesParams>;
    atRule: any;
    CssVars: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
        lnfs: ['solid', 'outline', 'text', 'loading'],
        defaultLnf: 'solid',
        scope: ['bare', 'lnf', 'vr', 'tf'],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Buttons
        * @namespace          sugar.style.ui.button
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/button
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.ui.button.classes;
        * 
        * .my-button {
        *   \@s.ui.button;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-btn${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} button lnf`;
            })
            .join('\n')}
        * @cssClass            s-format:text button             Apply the button style on button tags inside the s-format:text scope 
        * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped button(s)
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf
            * <div class="s-flex s-gap:20">
            *   <a class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            }">Click me!</button>
            *   <a class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:accent">Click me!</a>
            *   <a class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:complementary">Click me!</a>
            *   <a class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:info">Click me!</a>
            *   <a class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:error">Click me!</a>
            *   <a disabled class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            }">Click me!</a>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @example       html       Shapes
        * <div class="s-flex s-gap:20">
        *   <a class="s-btn">Click me!</a>
        *   <a class="s-btn s-shape:pill">Click me!</a>
        *   <a class="s-btn s-shape:square">Click me!</a>
        * </div>
        * 
        * @example       html       Scales
        * <div class="s-flex s-gap:20">
        *   <a class="s-btn s-scale:07">Click me!</a>
        *   <a class="s-btn s-scale:1">Click me!</a>
        *   <a class="s-btn s-scale:13">Click me!</a>
        *   <a class="s-btn s-scale:16">Click me!</a>
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
            * @name           s-btn
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" button
            * 
            * @example        html
            * <a class="s-btn">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
        .s-btn {
            @s.ui.button($scope: bare);
        }`,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            let cls = `s-btn`;
            if (lnf !== finalParams.defaultLnf) {
                cls += `-${lnf}`;
            }

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${lnf}</s-color>" button
            * 
            * @example        html
            * <a class="${cls
                .replace(/\./gm, ' ')
                .trim()}">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
            ).code(
                `
        .${cls}:not(.s-bare) {
            @s.ui.button($lnf: ${lnf}, $scope: lnf);
        }`,
                {
                    type: 'CssClass',
                },
            );
        });
    }

    vars.comment(
        () => `/**
        * @name           s-btn-block
        * @namespace          sugar.style.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn-block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`,
    ).code(
        `
      .s-btn-block {
        display: block !important;
        width: 100%;
      }
    `,
        {
            type: 'CssClass',
        },
    );

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(
            () => `/**
            * @name           s-format:text button
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a simple button tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <a>
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @s.format.text {
                button {
                    @s.ui.button($scope: '${finalParams.scope.join(',')}');
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
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent some buttons in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <a class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <a class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <a class="s-btn">
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @s.rhythm.vertical {
                button, .s-btn {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.button.rhythmVertical'),
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
