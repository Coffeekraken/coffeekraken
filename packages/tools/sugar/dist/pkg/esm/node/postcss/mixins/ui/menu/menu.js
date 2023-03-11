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
                        position: absolute;
                        top: 0; left: 0;
                        height: 100vh;
                        width: 100%;
                        transform: translateX(120%);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDL0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFDdkMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsRUFDekMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxRQUFRLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUM7O2lCQUVULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFnRlQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtLQUN0QztJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztTQWVULENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFZCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDckIsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBaUZULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==