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
                            background: sugar.color(base, background);
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
                                background: sugar.color(base, background);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDL0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQ3ZDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQ3pDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3RCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOztpQkFFVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQWlGVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0tBQ3RDO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O1NBZVQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVkLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLE9BQU8sQ0FBQztZQUNiO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFpRlQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9