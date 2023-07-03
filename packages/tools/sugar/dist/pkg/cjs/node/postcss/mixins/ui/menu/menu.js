"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiDatetimePickerInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.menu.defaultLnf'),
            },
            type: {
                type: 'String',
                values: ['primary', 'mobile'],
                default: s_theme_1.default.get('ui.menu.defaultType'),
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
exports.interface = postcssUiDatetimePickerInterface;
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
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: s_theme_1.default.get('ui.menu.defaultLnf'), type: s_theme_1.default.get('ui.menu.defaultType'), scope: ['bare', 'lnf'] }, params);
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUMvQztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUTRDLHFEQUFTO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUN2QyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsRUFDekMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxRQUFRLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUM7O2lCQUVULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFnRlQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtLQUN0QztJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztTQWVULENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFZCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDckIsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBaUZULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFyT0QsNEJBcU9DIn0=