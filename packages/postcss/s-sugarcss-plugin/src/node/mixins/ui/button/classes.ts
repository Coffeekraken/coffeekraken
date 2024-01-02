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
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 * @scope       tf              Text format css
 *
 * @snippet         @s.ui.button.classes
 *
 * @example       css
 * @s.ui.button.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiButtonClassesInterface extends __SInterface {
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
                default:
                    __STheme.current.get('ui.button.defaultLnf') ?? 'solid',
            },
        };
    }
}

export interface ISSugarcssPluginUiButtonClassesParams {
    lnfs: ('solid' | 'outline' | 'text' | 'loading')[];
    defaultLnf: 'solid' | 'outline' | 'text' | 'loading';
}

export { SSugarcssPluginUiButtonClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    sharedData,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiButtonClassesParams>;
    atRule: any;
    CssVars: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiButtonClassesParams = {
        lnfs: ['solid', 'outline', 'text', 'loading'],
        defaultLnf: 'solid',
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
        * @s.ui.button.classes;
        * 
        * .my-button {
        *   @s.ui.button;
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
            * <div class="s-flex:align-center:wrap s-gap:20">
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
        * <div class="s-flex:align-center:wrap s-gap:20">
        *   <a class="s-btn">Click me!</a>
        *   <a class="s-btn s-shape:pill">Click me!</a>
        *   <a class="s-btn s-shape:square">Click me!</a>
        * </div>
        * 
        * @example       html       Scales
        * <div class="s-flex:align-center:wrap s-gap:20">
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
    ).code(
        `
        @s.scope 'bare' {
            .s-btn {
                @s.scope.only 'bare' {
                    @s.ui.button;
                }
            }
        }
    `,
        {
            type: 'CssClass',
        },
    );

    vars.code(`@s.scope 'bare' {`);
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
    vars.code(`}`);

    vars.code(`@s.scope 'lnf' {`);
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
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
    `,
        ).code(
            `
                .${cls} {
                    @s.ui.button($lnf: ${lnf});
                }`,
            {
                type: 'CssClass',
            },
        );
    });
    vars.code('}');

    vars.code(`@s.scope 'tf' {`);
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
                    @s.ui.button;
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
                        ${__STheme.current.jsObjectToCssProperties(
                            __STheme.current.get('ui.button.rhythmVertical'),
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
