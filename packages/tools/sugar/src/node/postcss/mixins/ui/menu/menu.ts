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

    console.log(finalParams);

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        switch (finalParams.type) {
            case 'mobile':
                vars.push(`
                    
                `);
                break;
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

                    @sugar.media mobile {
                        position: fixed;
                        top: 0; left: 0;
                        height: 100vh;
                        width: 100vw;
                        overflow-y: auto;
                        justify-content: flex-start; 
                        flex-direction: column;
                        text-align: inherit;
                        user-select: none;
                    }

                    .s-menu__item:not(:hover,:focus,:focus-within) > .s-menu__children {
                        @sugar.visually.hidden();
                    }

                    .s-menu__item {
                        position: relative;
                    }
                    .s-menu__item .s-menu__item {
                        text-align: initial;
                    }

                    .s-menu__link {
                        display: block;
                    }

                    .s-menu--level-1 {
                        min-width: 100%;
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);

                        & > .s-menu__item {
                            display: block;
                        }

                        @sugar.media mobile {
                            position: relative;
                            top: 0; left: 0;
                            transform: none;
                            margin-block-start: sugar.padding(ui.menu.paddingBlock);
                        }
                    }
                `);
                break;
        }
    }

    if (finalParams.scope.includes('lnf')) {
    }

    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            .s-menu__item {
                font-size: sugar.font.size(50);
            }

            .s-menu--level-1 .s-menu__item,
            .s-menu--level-1 .s-menu__link {
                display: block;
                font-size: sugar.font.size(40);
                @sugar.border.radius();
            }
            .s-menu--level-1 .s-menu__link {
                padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
            }

        `);

        vars.push(`
        & {
        } `);

        switch (finalParams.lnf) {
            case 'solid':
            default:
                vars.push(`

                    @sugar.media mobile {
                        background: sugar.color(base, background);
                        padding-inline: sugar.padding(30);
                    }

                    > .s-menu__item {
                        padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
                        border-radius: sugar.border.radius(ui.menu.borderRadius);
                        @sugar.transition(fast);

                        @sugar.media mobile {
                            padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(20);
                            width: 100%;

                        }

                        > .s-menu__link {
                            padding: 0;
                            @sugar.transition(fast);
                        }
                        &:hover,
                        &:active {
                            > .s-menu__link {
                                padding: 0 sugar.padding(20);
                            }
                        }

                        &:hover,
                        &:active {
                            background: sugar.color(accent);
                            color: sugar.color(accent, foreground);
                        }

                        > .s-menu__children {
                            background: sugar.color(base, background);
                            padding: sugar.padding(20);
                            @sugar.depth(100);
                            @sugar.border.radius();

                            @sugar.media mobile {
                                background: sugar.color(base, surface);
                            }

                            .s-menu__item {
                                background: sugar.color(accent, --alpha 0);

                                &:has(> .s-menu__link):hover {
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
