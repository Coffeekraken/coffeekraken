import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          badge
 * @namespace     node.mixins.ui.badge
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "badge" UI component css.
 *
 * @param       {'default'|'square'|'rounded'}          [shape='default']       The shape you want your avatar to have
 * @param       {'solid'|'outline'}                           [style='solid']         The style you want your badge to have
 * @param       {('bare'|'lnf'|'shape'|'interactive')[]}        [scope=['bare','lnf','shape']]      The scope you want to generate
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
            style: {
                type: 'String',
                values: ['solid', 'outline'],
                default: 'solid',
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: 'default',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBadgeParams {
    style: 'solid' | 'outline';
    shape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape')[];
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
        style: 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`   
        display: inline-block;
        white-space: nowrap;
        user-select: none;
    `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            font-size: sugar.scalable(0.75em);
            padding-inline: sugar.padding(ui.badge.paddingInline);
            padding-block: sugar.padding(ui.badge.paddingBlock);
            vertical-align: baseline;

            & > * {
                @sugar.color(main);
            }

        `);

        switch (finalParams.style) {
            case 'outline':
                vars.push(`
                position: relative;
                color: sugar.color(current);
                background: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: sugar.color(current) solid sugar.theme(ui.badge.borderWidth);
                    pointer-events: none;
                }
            `);
                break;
            case 'solid':
            default:
                vars.push(`
                     color: sugar.color(current, foreground);
                     background-color: sugar.color(current);
                `);
                break;
        }
    }

    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                    &:after {
                        border-radius: 0;
                    }
            `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 999999px;
                    &:after {
                        border-radius: 999999px;
                    }
                `);
                break;
            case 'default':
            default:
                vars.push(`
                    border-radius: 0.5em;
                    &:after {
                        border-radius: 0.5em;
                    }
                `);
                break;
        }
    }

    return vars;
}
