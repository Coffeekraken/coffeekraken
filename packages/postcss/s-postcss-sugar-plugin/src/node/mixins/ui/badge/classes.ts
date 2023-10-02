import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @as              @s.ui.badge.classes
 * @namespace     node.mixin.ui.badge
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        stable
 *
 * Generate the badge classes
 *
 * @param       {('solid'|'outline')[]}                           [lnfs=['solid','outline']]         The lnf(s) you want to generate
 * @param       {'solid'|'outline'}                [defaultLnf='theme.ui.badge.defaultLnf']           The default lnf you want
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.badge.classes
 *
 * @example       css
 * \@s.ui.badge.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid', 'outline'],
                default: ['solid', 'outline'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid', 'outline'],
                default: __STheme.get('ui.badge.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBadgeClassesParams {
    lnfs: ('solid' | 'outline')[];
    defaultLnf: 'solid' | 'outline';
    scope: ('bare' | 'lnf')[];
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
        defaultLnf: 'solid',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Badge
        * @namespace          sugar.style.ui.badge
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/badges
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display any HTMLElement as a badge
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
        * \\@s.ui.badge.classes;
        * 
        * .my-badge {
        *   \@s.ui.badge;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-badge${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} badge style`;
            })
            .join('\n')}
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf}
            * <div class="s-flex:align-center:wrap s-gap:20">
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            }">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:accent">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:complementary">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:error">Say hello!</a>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @example          html        Shapes
        * <div class="s-flex:align-center:wrap s-gap:20">
        *   <a class="s-badge">Say hello!</a>
        *   <a class="s-badge s-shape:pill">Say hello!</a>
        *   <a class="s-badge s-shape:square">Say hello!</a>
        * </div>
        * 
        * @example        html       Scales
        * <div class="s-flex:align-center:wrap s-gap:20">
        *   <a class="s-badge s-scale:05">Say hello!</a>
        *   <a class="s-badge s-scale:1">Say hello!</a>
        *   <a class="s-badge s-scale:12">Say hello!</a>
        *   <a class="s-badge s-scale:15">Say hello!</a>
        *   <a class="s-badge s-scale:20">Say hello!</a>
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
                @s.ui.badge($scope: bare);
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
            * @namespace          sugar.style.ui.badge
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
            .s-badge${
                lnf === finalParams.defaultLnf ? '' : `-${lnf}`
            }:not(.s-bare) {
                @s.ui.badge($lnf: ${lnf}, $scope: lnf);
            }
        `,
                { type: 'CssClass' },
            );
        });
    }

    return vars;
}
