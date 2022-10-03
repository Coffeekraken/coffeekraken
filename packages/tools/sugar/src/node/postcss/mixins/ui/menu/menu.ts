import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiDatetimePickerInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.menu.defaultLnf'),
            },
            type: {
                type: 'String',
                values: ['primary', 'mobile'],
                default: __STheme.get('ui.menu.defaultType'),
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

export interface IPostcssUiDatetimePickerParams {
    lnf: 'solid';
    type: 'primary' | 'mobile';
    scope: ('bare' | 'lnf')[];
}

export { postcssUiDatetimePickerInterface as interface };

/**
 * @name          menu
 * @namespace     ui.menu
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the menu lnf to any .s-menu element
 *
 * @example     css
 * .s-menu {
 *    @sugar.ui.menu;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiDatetimePickerParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiDatetimePickerParams = {
        lnf: __STheme.get('ui.menu.defaultLnf'),
        type: __STheme.get('ui.menu.defaultType'),
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        switch (finalParams.type) {
            case 'primary':
            default:
                vars.push(`
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    text-align: center;
                    user-select: none;
                    flex-grow: 1;

                    .s-menu__item:not(:hover,:focus,:focus-within) > .s-menu__children {
                        @sugar.visually.hidden();
                    }

                    .s-menu__item {
                        position: relative;
                    }
                    .s-menu__item .s-menu__item {
                        text-align: initial;
                    }

                    .s-menu--level-1 {
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);

                        & > .s-menu__item {
                            display: block;
                        }

                    }
                `);
                break;
        }
    }

    if (finalParams.scope.includes('lnf')) {
        console.log('LNF');
    }

    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            .s-menu__item {
                font-size: sugar.font.size(50);
            }

            .s-menu__item .s-menu__item .s-menu__link {
                display: block;
                font-size: sugar.font.size(40);
                padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
                @sugar.border.radius();
            }

        `);

        vars.push(`
        & {
        } `);

        switch (finalParams.lnf) {
            case 'solid':
            default:
                vars.push(`
                    > .s-menu__item {
                        padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
                        border-radius: sugar.border.radius(ui.menu.borderRadius);

                        &:hover,
                        &:active {
                            background: sugar.color(base, background, --darken 3%);
                        }

                        > .s-menu__children {
                            background: sugar.color(base, background);
                            @sugar.depth(100);
                            @sugar.border.radius();

                            .s-menu__link {
                                background: sugar.color(accent, --alpha 0);

                                &:hover {
                                    background: sugar.color(accent);
                                    color: sugar.color(accent, foreground);
                                }
                            }

                        }

                    }
                `);
                break;
        }
    }

    return vars;
}
