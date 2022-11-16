import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the button classes
 *
 * @param       {('default'|'gradient'|'outline'|'text')[]}                           [lnfs=['default','gradient','outline','text']]         The style(s) you want to generate
 * @param       {'default'|'gradient'|'outline'|'text'}                [defaultLnf='theme.ui.button.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr')[]}        [scope=['bare', 'lnf', 'vr']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.button.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['default', 'gradient', 'outline', 'text'],
                default: ['default', 'gradient', 'outline', 'text'],
            },
            defaultLnf: {
                type: 'String',
                values: ['default', 'gradient', 'outline', 'text'],
                default: __STheme.get('ui.button.defaultLnf') ?? 'default',
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
    lnfs: ('default' | 'gradient' | 'outline' | 'text')[];
    defaultLnf: 'default' | 'gradient' | 'outline' | 'text';
    scope: ('bare' | 'lnf' | 'bare' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiButtonClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
        lnfs: ['default', 'gradient', 'outline', 'text'],
        defaultLnf: 'default',
        scope: ['bare', 'lnf', 'vr', 'tf'],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Buttons
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/button
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
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
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-btn${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} button lnf`;
            })
            .join('\n')}
        * @cssClass             s-btn:pill                  Apply the pill shape
        * @cssClass             s-btn:square                Apply the square shape
        * @cssClass            s-format:text button             Apply the button style on button tags inside the s-format:text scope 
        * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped button(s)
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf ${
                    finalParams.defaultLnf === lnf
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-mbe:20"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-mbe:20 s-color:accent"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-mbe:20 s-color:complementary"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-mbe:20 s-color:info"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-mbe:20 s-color:error"><span>Click me!</span></a>
            *   <a tabindex="0" disabled class="s-btn:${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-mbe:20"><span>Click me!</span></a>
            * `;
            })
            .join('\n')}
        * 
        * @example       html       Shapes
        *   <a tabindex="0" class="s-btn:pill s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn:square s-mie:20">Click me!</a>
        * 
        * @example       html       Scales
        *   <a tabindex="0" class="s-btn s-scale:07 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:1 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:13 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:16 s-mie:20">Click me!</a>
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
            @sugar.ui.button($scope: bare);
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
                cls += `--${lnf}`;
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
        .${cls} {
            @sugar.ui.button($lnf: ${lnf}, $scope: lnf);
        }`,
                {
                    type: 'CssClass',
                },
            );
        });
    }

    vars.comment(
        () => `/**
        * @name           s-btn:pill
        * @namespace          sugar.style.ui.button
        * @type           CssClass
        * 
        * Apply the pill shape to a button
        * 
        * @example        html
        * <div class="s-format:text">
        *   <button>
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
            s-btn--pill {
                border-radius: 9999px;
            } 
    `,
        {
            type: 'CssClass',
        },
    );

    vars.comment(
        () => `/**
        * @name           s-btn:square
        * @namespace          sugar.style.ui.button
        * @type           CssClass
        * 
        * Apply the square shape to a button
        * 
        * @example        html
        * <div class="s-format:text">
        *   <button>
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
            s-btn--square {
                border-radius: 0;
            } 
    `,
        {
            type: 'CssClass',
        },
    );

    vars.comment(
        () => `/**
        * @name           s-btn--block
        * @namespace          sugar.style.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`,
    ).code(
        `
      .s-btn--block {
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
            *   <button>
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
            @sugar.format.text {
                button {
                    @sugar.ui.button($scope: '${finalParams.scope.join(',')}');
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
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
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
            @sugar.rhythm.vertical {
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
