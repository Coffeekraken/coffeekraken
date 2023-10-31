import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          avatar
 * @as              @s.ui.avatar
 * @namespace     node.mixin.ui.avatar
 * @type          PostcssMixin
 * @interface       ./avatar
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate the "avatar" UI component css.
 *
 * @param       {('bare'|'lnf'|'interactive'|'notifications')[]}        [scope=['bare','lnf','interactive','notifications']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.avatar
 *
 * @example       css
 * .my-element {
 *      @s.ui.avatar();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiAvatarInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'interactive', 'notifications'],
                default: ['bare', 'lnf', 'interactive', 'notifications'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBadgeParams {
    scope: ('bare' | 'lnf' | 'interactive' | 'notifications')[];
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
        scope: ['bare', 'lnf', 'interactive', 'notifications'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            position: relative;
            display: inline-block;
            width: s.scalable(1em);
            height: s.scalable(1em);

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
        vars.push(`
            img {
                background-color: s.color(current);
                border-color: s.color(current);
                border-style: solid;
                border-width: s.theme(ui.avatar.borderWidth);
                border-radius: 9999px;
            }
        `);
    }

    // interactive
    if (finalParams.scope.indexOf('interactive') !== -1) {
        vars.push(`
            cursor: pointer;
        `);

        vars.push(`
            &:hover img {
                @s.outline($where: element);
                position: absolute;
            }
        `);
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
                        font-size: s.scalable(0.15em);
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
                        background: s.color(current);
                        color: s.color(current, foreground);
                        border-radius: 9999px;
                        padding: 0.33em;
                        font-weight: bold;
                    }
                }
            `);
        }
    }

    return vars;
}
