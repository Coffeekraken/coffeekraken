import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          badge
 * @namespace     node.mixin.ui.badge
 * @type          PostcssMixin
 * @interface       ./badge
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "badge" UI component css.
 *
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.badge();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiBadgeInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['default', 'outline'],
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

export interface IPostcssSugarPluginUiBadgeParams {
    lnf: 'default' | 'outline';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBadgeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBadgeParams = {
        lnf: 'default',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`   
        display: inline-flex;
        align-items: center;
        line-height: 1;
        white-space: nowrap;
        user-select: none;
    `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            font-size: sugar.scalable(0.75em);
            padding-inline: sugar.padding(20);
            padding-block: sugar.padding(10);
            vertical-align: baseline;
            font-weight: bold;
            text-rendering: optimizeLegibility;
            @sugar.shape();

            & > * {
                @sugar.color(main);
            }

        `);

        switch (finalParams.lnf) {
            case 'outline':
                vars.push(`
                position: relative;
                color: sugar.color(current);
                background: none !important;
                text-shadow: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: sugar.color(current) solid 1px;
                    pointer-events: none;
                }
            `);
                break;
            default:
                vars.push(`
                     color: sugar.color(current, foreground);
                     background-color: sugar.color(current);
                `);
                break;
        }
    }

    return vars;
}
