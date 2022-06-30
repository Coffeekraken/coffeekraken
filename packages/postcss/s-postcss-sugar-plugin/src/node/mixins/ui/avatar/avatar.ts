import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          avatar
 * @namespace     node.mixin.ui.avatar
 * @type          PostcssMixin
 * @interface       ./avatar
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "avatar" UI component css.
 *
 * @param       {'solid'}                                                [style='theme.ui.avatar.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'|'circle'}                 [shape='theme.ui.avatar.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape'|'interactive'|'notifications')[]}        [scope=['bare','lnf','shape','interactive','notifications']]      The scope you want to generate
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

class postcssSugarPluginUiAvatarInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                value: ['solid'],
                default: __STheme.get('ui.avatar.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'rounded'],
                default: __STheme.get('ui.avatar.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: [
                    'bare',
                    'lnf',
                    'shape',
                    'interactive',
                    'notifications',
                ],
                default: ['bare', 'lnf', 'shape', 'notifications'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBadgeParams {
    shape: 'default' | 'square' | 'rounded';
    style: 'solid';
    scope: ('bare' | 'lnf' | 'shape' | 'interactive' | 'notifications')[];
}

export { postcssSugarPluginUiAvatarInterface as interface };
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
        shape: 'square',
        style: 'solid',
        scope: ['bare', 'lnf', 'shape'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            position: relative;
            display: inline-block;
            width: sugar.scalable(1em);
            height: sugar.scalable(1em);

            img {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                object-fit: cover;
                border-radius: 50%;
                overflow: hidden;
            }
        `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    img {
                        background-color: sugar.color(current);
                        border-width: sugar.theme(ui.avatar.borderWidth);
                        border-color: sugar.color(current);
                        border-style: solid;
                        @sugar.depth(ui.avatar.depth);
                    }
                `);
                break;
        }
    }

    // interactive
    if (finalParams.scope.indexOf('interactive') !== -1) {
        vars.push(`
            cursor: pointer;
        `);

        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    &:hover img {
                        @sugar.outline($where: element);
                        position: absolute;
                    }
                `);
                break;
        }
    }

    // notifications
    if (finalParams.scope.indexOf('notifications') !== -1) {
        if (finalParams.scope.includes('bare')) {
            vars.push(`
                &[notifications] {
                    &:after {
                        content: attr(notifications);
                        position: absolute;
                        top: 0.2em; right: 0.2em;
                        font-size: sugar.scalable(0.15em);
                        min-width: 1.5em;
                        min-height: 1.5em;
                    }
                }
            `);
        }

        if (finalParams.scope.includes('lnf')) {
            vars.push(`
                &[notifications] {
                    &:after {
                        background: sugar.color(current);
                        color: sugar.color(current, foreground);
                        border-radius: 9999px;
                        padding: 0.33em;
                        font-weight: bold;
                        @sugar.depth(ui.avatar.depth);
                    }
                }
            `);
        }
    }

    // shape
    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    img {
                        border-radius: 0;
                    }
                `);
                break;
            case 'rounded':
                vars.push(`
                    img {
                        border-radius: sugar.border.radius(ui.avatar.borderRadius);
                    }
                    `);
                break;
            case 'default':
            default:
                vars.push(`
                    img {
                        border-radius: 0.5em;
                    }
                `);
                break;
        }
    }

    return vars;
}
