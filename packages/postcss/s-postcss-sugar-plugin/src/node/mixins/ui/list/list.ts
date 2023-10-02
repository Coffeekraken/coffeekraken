import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          list
 * @as            @s.ui.list
 * @namespace     node.mixin.ui.list
 * @type               PostcssMixin
 * @interface     ./list          interface
 * @platform      postcss
 * @status        stable
 *
 * Apply the list style to any element
 *
 * @param       {('dl'|'ul'|'ol'|'icon')[]}                           [lnf='ui.list.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet     @s.ui.list
 *
 * @example     css
 * .my-list {
 *    @s.ui.list;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiListInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: __STheme.get('ui.list.defaultLnf'),
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

export interface IPostcssSugarPluginUiListParams {
    lnf: 'dl' | 'ul' | 'ol' | 'icon';
    scope: string[];
}

export { postcssSugarPluginUiListInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListParams = {
        lnf: 'dl',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    let bulletSelector = '&:before';
    if (finalParams.lnf === 'icon') {
        bulletSelector = '& > i:first-child';
    }

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        position: relative;
        font-size: s.font.size(30);

        ${finalParams.lnf === 'ol' ? 'counter-reset: s-ol-list;' : ''}

        & > * {
            display: block !important;
            padding-inline-start: 1em;
            margin-bottom: 0.3em;
            margin-top: 0.3em;
            line-height: 1.8;
        }
        `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            & > * {
                color: s.color(main, text, --alpha 0.7);

                ${bulletSelector} {
                    display: inline-block;
                    position: absolute;
                    left: 0.5em;
                    transform: translateX(-50%);
                    color: s.color(current);
                }

                & > *:not(i) {
                    @s.color(main);
                }
            }

            [dir="rtl"] & > *,
            &[dir="rtl"] > * {
                ${bulletSelector} {
                    left: auto;
                    right: 0;
                    transform: none;
                }
            }

        `);

        switch (finalParams.lnf) {
            case 'ol':
                vars.push(`
                    & > * {
                        counter-increment: s-ol-list;

                        ${bulletSelector} {
                            content: counter(s-ol-list);
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                    `);
                break;
            case 'icon':
                vars.push(`
                    & > * {
                        padding-inline-start: 1.5em;
                        &:before {
                            content: ' ' !important;
                        }

                        ${bulletSelector} {
                            margin-top: 0.55em;
                            font-size: 0.8em;
                        }
                    }

                `);
                break;
            case 'ul':
                vars.push(`
                    & > * {
                        ${bulletSelector} {
                            content: "${__STheme.get('ui.list.bulletChar')}";
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                `);
                break;
            case 'dl':
                vars.push(`
                    & > * {
                    }
                    `);
                break;
        }
    }

    return vars;
}
