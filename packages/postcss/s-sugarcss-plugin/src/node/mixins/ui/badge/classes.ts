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
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.badge.classes
 *
 * @example       css
 * @s.ui.badge.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiBadgeClassesInterface extends __SInterface {
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
                default: __STheme.current.get('ui.badge.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiBadgeClassesParams {
    lnfs: ('solid' | 'outline')[];
    defaultLnf: 'solid' | 'outline';
}

export { SSugarcssPluginUiBadgeClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiBadgeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiBadgeClassesParams = {
        lnfs: [],
        defaultLnf: 'solid',
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
        * @s.ui.badge.classes;
        * 
        * .my-badge {
        *   @s.ui.badge;
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
    ).code(
        `
            @s.scope.only 'bare' {
                .s-badge {
                    @s.ui.badge
                }
            }
    `,
        { type: 'CssClass' },
    );

    vars.code(`@s.scope 'lnf' {`);
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
            @s.scope.only 'lnf' {
                .s-badge${lnf === finalParams.defaultLnf ? '' : `-${lnf}`} {
                    @s.ui.badge($lnf: ${lnf});
                }
            }
    `,
            { type: 'CssClass' },
        );
    });
    vars.code('}');

    return vars;
}
