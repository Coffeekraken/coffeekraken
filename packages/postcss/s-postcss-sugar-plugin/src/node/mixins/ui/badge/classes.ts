import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @namespace     node.mixin.ui.badge
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the badge classes
 *
 * @param       {('default'|'outline')[]}                           [lnfs=['default','outline']]         The lnf(s) you want to generate
 * @param       {'default'|'outline'}                [defaultLnf='theme.ui.badge.defaultLnf']           The default lnf you want
 * @param       {('bare'|'lnf'|'vr')[]}        [scope=['bare', 'lnf', 'vr']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.badge.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['default', 'outline'],
                default: ['default', 'outline'],
            },
            defaultLnf: {
                type: 'String',
                values: ['default', 'outline'],
                default: 'default',
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

export interface IPostcssSugarPluginUiBadgeClassesParams {
    lnfs: ('default' | 'outline')[];
    defaultLnf: 'default' | 'outline';
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssSugarPluginUiBadgeClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBadgeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBadgeClassesParams = {
        lnfs: [],
        defaultLnf: 'default',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Badges
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/badges
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a badge
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-badge${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} badge style`;
            })
            .join('\n')}
        * 
        * @cssClass         s-badge:square       Display your badge with squared corners
        * @cssClass         s-badge:pill         Display your badge with rounded corners
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf}
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:error">Say hello!</a>
            * `;
            })
            .join('\n')}
        * 
        * @example          html        Shapes
        * <a class="s-badge s-mie:20 s-mbe:20">Say hello!</a>
        * <a class="s-badge:pill s-mie:20 s-mbe:20">Say hello!</a>
        * <a class="s-badge:square s-mie:20 s-mbe:20">Say hello!</a>
        * 
        * @example        html       Scales
        *   <a class="s-badge s-scale:05 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:1 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:12 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:15 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:20 s-mbe:20">Say hello!</a>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-badge
            * @namespace          sugar.style.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge">I'm a cool badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-badge {
                @sugar.ui.badge($scope: bare);
            }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            vars.comment(
                () => `/**
            * @name           s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            }
            * @namespace          sugar.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">outline</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            }">I'm a cool ${lnf} badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
            ).code(
                `
            .s-badge${lnf === finalParams.defaultLnf ? '' : `--${lnf}`} {
                @sugar.ui.badge($lnf: ${lnf}, $scope: lnf);
            }
        `,
                { type: 'CssClass' },
            );
        });
    }

    vars.comment(
        () => `/**
    * @name           s-badge:pill
    }
    * @namespace          sugar.ui.badge
    * @type           CssClass
    * 
    * This class represent a(n) "<s-color="accent">pill</s-color>" badge
    * 
    * @example        html
    * <a class="s-badge:pill">I'm a cool pill badge</a>
    * 
    * @since    2.0.0
    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/`,
    ).code(
        `
    .s-badge--pill {
        border-radius: 9999px;
    }
`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name           s-badge:square
    }
    * @namespace          sugar.ui.badge
    * @type           CssClass
    * 
    * This class represent a(n) "<s-color="accent">square</s-color>" badge
    * 
    * @example        html
    * <a class="s-badge:square">I'm a cool square badge</a>
    * 
    * @since    2.0.0
    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/`,
    ).code(
        `
    .s-badge--square {
        border-radius: 0;
    }
`,
        { type: 'CssClass' },
    );

    return vars;
}
