import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          badge
 * @as              @s.ui.badge
 * @namespace     node.mixin.ui.badge
 * @type          PostcssMixin
 * @interface       ./badge
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate the "badge" UI component css.
 *
 * @param       {'default'|'outline'}       [lnf='solid']]       The lnf you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.badge
 *
 * @example       css
 * .my-element {
 *      @s.ui.badge();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiBadgeInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'outline'],
                default: __STheme.current.get('ui.badge.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiBadgeParams {
    lnf: 'solid' | 'outline';
}

export { SSugarcssPluginUiBadgeInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiBadgeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiBadgeParams = {
        lnf: 'solid',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`   
        @s.scope 'bare' {
            display: inline-flex;
            align-items: center;
            line-height: 1;
            white-space: nowrap;
            user-select: none;
        }
    `);

    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
                font-size: s.scalable(0.75em);
                padding-inline: s.padding(20);
                padding-block: s.padding(10);
                vertical-align: baseline;
                font-weight: bold;
                text-rendering: optimizeLegibility;
                @s.shape();

                & > * {
                    @s.color(main);
                }
        `);

    switch (finalParams.lnf) {
        case 'outline':
            vars.push(`
                position: relative;
                color: s.color(current);
                background: none !important;
                text-shadow: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: s.color(current) solid 1px;
                    pointer-events: none;
                    @s.shape();
                }
            `);
            break;
        default:
            vars.push(`
                     color: s.color(current, foreground);
                     background-color: s.color(current);
                `);
            break;
    }

    vars.push(`}`);

    return vars;
}
