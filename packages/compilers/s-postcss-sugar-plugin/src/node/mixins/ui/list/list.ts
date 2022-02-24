import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          list
 * @namespace     ui.list
 * @type               PostcssMixin
 * @interface     ./list          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the list style to any element
 *
 * @param       {'dl'|'ul'|'ol'|'icon'}           [style='theme.ui.list.defaultStyle']        The style you want for your list
 * @param       {('bare'|'lnf')[]}      [scope=['bare','lnf']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-list {
 *    @sugar.ui.list;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiListInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: __STheme.config('ui.list.defaultStyle'),
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
    style: 'dl' | 'ul' | 'ol' | 'icon';
    scope: string[];
}

export { postcssSugarPluginUiListInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListParams = {
        style: 'dl',
        scope: ['bare', 'lnf'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    let bulletSelector = '&:before';
    if (finalParams.style === 'icon') {
        bulletSelector = '& > i:first-child';
    }

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        position: relative;
        font-size: sugar.font.size(30);

        ${finalParams.style === 'ol' ? 'counter-reset: s-ol-list;' : ''}

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
                ${bulletSelector} {
                    display: inline-block;
                    position: absolute;
                    left: 0.5em;
                    transform: translateX(-50%);
                    color: sugar.color(current);
                }

                & > *:not(i) {
                    @sugar.color(main);
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

        switch (finalParams.style) {
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
                            margin-top: 0.25em;
                            font-size: 0.8em;
                        }
                    }

                `);
                break;
            case 'ul':
                vars.push(`
                    & > * {
                        ${bulletSelector} {
                            content: "${__STheme.config('ui.list.bulletChar')}";
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                `);
                break;
            case 'dl':
            default:
                vars.push(`
                    & > * {
                        padding-inline-start: 0;
                    }
                    `);
                break;
        }
    }

    return vars;
}
