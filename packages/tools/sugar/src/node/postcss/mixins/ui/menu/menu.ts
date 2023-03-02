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
 * @snippet         @sugar.ui.menu
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
            case 'mobile':
                vars.push(`
                    
                `);
                break;
            case 'primary':
            default:
                vars.push(`

                    position: relative;
                    user-select: none;

                    @sugar.media <=mobile {
                        position: fixed;
                        top: 0; left: 0;
                        height: 100vh;
                        width: 100vw;
                        transform: translateX(100vw);
                        pointer-events: none;

                        input[type="checkbox"]:checked + & {
                            pointer-events: all;
                            transform: translateX(0);
                        }
                    }

                    .s-menu_inner {
                        display: flex;
                        position: relative;
                        align-items: center;
                        justify-content: space-evenly;
                        text-align: center;
                        flex-grow: 1;

                        @sugar.media <=mobile {
                            height: 100%;
                            width: 100%;
                            overflow-y: auto;
                            justify-content: flex-start; 
                            flex-direction: column;
                            text-align: inherit;
                        }

                        .s-menu_item > .s-menu_children {
                            opacity: 1;
                            pointer-events: all;
                        }
                        .s-menu_item:not(:hover,:focus,:focus-within) > .s-menu_children {
                            @sugar.visually.hidden();
                            pointer-events: none;
                        }


                        .s-menu_item {
                            position: relative;

                            @sugar.media <=mobile {
                                display: block;
                                width: 100%;
                            }

                        }
                        .s-menu_item .s-menu_item {
                            text-align: initial;
                        }

                        .s-menu_link {
                            display: block;
                        }

                        .s-menu--level-1 {
                            min-width: 100%;
                            position: absolute;
                            top: 100%;
                            left: 50%;
                            transform: translateX(-50%);

                            & > .s-menu_item {
                                display: block;
                            }

                            @sugar.media <=mobile {
                                position: relative;
                                top: 0; left: 0;
                                transform: none;
                            }
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
            .s-menu_item {
                font-size: sugar.font.size(50);
            }

            .s-menu--level-1 .s-menu_item,
            .s-menu--level-1 .s-menu_link {
                display: block;
                font-size: sugar.font.size(40);
                @sugar.border.radius();
            }
            .s-menu--level-1 .s-menu_link {
                padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
            }

        `);

        vars.push(``);

        switch (finalParams.lnf) {
            case 'solid':
            default:
                vars.push(`

                    @sugar.media <=mobile {
                        @sugar.transition();
                    }

                    .s-menu_inner {
                        @sugar.media <=mobile {
                            background: sugar.color(main, background);
                            padding-inline: sugar.padding(30);
                            @sugar.transition();
                        }

                        .s-menu--level-1 {
                            transform: translateX(-50%) translateY(0);

                            @sugar.media <=mobile {
                                transform: translate(0, 0) !important;
                            }
                        }
                        .s-menu_item:not(:hover,:focus,:focus-within) > .s-menu--level-1 {
                            transform: translateX(-50%) translateY(-25px);
                        }

                        .s-menu_item > .s-menu_children {
                            @sugar.transition(fast);
                        }

                        .s-menu_link {
                            border-radius: sugar.border.radius(ui.menu.borderRadius);
                            padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
                            @sugar.transition(fast);

                            @sugar.media <=mobile {
                                padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(20);
                                width: 100%;
                            }
                        }

                        .s-menu_item {

                            &:hover,
                            &:active {
                                > .s-menu_link {
                                    @sugar.media <=mobile {
                                        padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
                                        width: 100%;
                                    }
                                }
                            }
                        }

                        > .s-menu_item {
                            
                            &:hover,
                            &:active {
                                > .s-menu_link {
                                    background: sugar.color(accent);
                                    color: sugar.color(accent, foreground);
                                }
                            }

                            > .s-menu_children {
                                background: sugar.color(main, background);
                                padding: sugar.padding(20);
                                @sugar.depth(100);
                                @sugar.border.radius();

                                .s-menu_item {
                                    background: sugar.color(accent, --alpha 0);

                                    &:has(> .s-menu_link):hover {
                                        background: sugar.color(accent);
                                        color: sugar.color(accent, foreground);
                                    }
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
