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
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: __STheme.get('ui.menu.defaultLnf'), type: __STheme.get('ui.menu.defaultType'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
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

                    .s-menu__inner {
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

                        .s-menu__item > .s-menu__children {
                            opacity: 1;
                            pointer-events: all;
                        }
                        .s-menu__item:not(:hover,:focus,:focus-within) > .s-menu__children {
                            @sugar.visually.hidden();
                            pointer-events: none;
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

                            @sugar.media <=mobile {
                                position: relative;
                                top: 0; left: 0;
                                transform: none;
                                margin-block-start: sugar.padding(ui.menu.paddingBlock);
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

                    @sugar.media <=mobile {
                        @sugar.transition();
                    }

                    .s-menu__inner {
                        @sugar.media <=mobile {
                            background: sugar.color(base, background);
                            padding-inline: sugar.padding(30);
                            @sugar.transition();
                        }

                        .s-menu--level-1 {
                            transform: translateX(-50%) translateY(0);
                        }
                        .s-menu__item:not(:hover,:focus,:focus-within) > .s-menu--level-1 {
                            transform: translateX(-50%) translateY(-25px);
                        }

                        .s-menu__item > .s-menu__children {
                            @sugar.transition(fast);
                        }

                        > .s-menu__item {
                            padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(ui.menu.paddingInline);
                            border-radius: sugar.border.radius(ui.menu.borderRadius);
                            @sugar.transition(fast);

                            @sugar.media <=mobile {
                                padding: sugar.padding(ui.menu.paddingBlock) sugar.padding(20);
                                width: 100%;
                            }

                            > .s-menu__link {
                                padding: 0;
                                @sugar.transition(fast);
                            }
                            &:hover,
                            &:active {
                                background: sugar.color(accent);
                                color: sugar.color(accent, foreground);

                                > .s-menu__link {

                                    @sugar.media <=mobile {
                                        padding: 0 sugar.padding(20);
                                    }
                                }
                            }

                            > .s-menu__children {
                                background: sugar.color(base, background);
                                padding: sugar.padding(20);
                                @sugar.depth(100);
                                @sugar.border.radius();

                                @sugar.media <=mobile {
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
                    }
                `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDL0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQ3ZDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQ3pDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3RCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOztpQkFFVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkE0RVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtLQUN0QztJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztTQWVULENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUM7O1dBRVAsQ0FBQyxDQUFDO1FBRUwsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3JCLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBMEVULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==