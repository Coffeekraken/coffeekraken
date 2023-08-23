"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiCardInterface extends s_interface_1.default {
    static get _definition() {
        return {
            direction: {
                type: 'String',
                values: [
                    'vertical',
                    'horizontal',
                    'vertical-reverse',
                    'horizontal-reverse',
                ],
                default: 'vertical',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'direction'],
                default: ['bare', 'lnf', 'direction'],
            },
        };
    }
}
exports.interface = postcssUiCardInterface;
/**
 * @name          menu
 * @namespace     ui.card
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the menu lnf to any .s-menu element
 *
 * @snippet         @sugar.ui.card
 *
 * @example     css
 * .s-menu {
 *    @sugar.ui.card;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ direction: 'vertical', scope: ['bare', 'lnf', 'direction'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            display: flex;
            flex-direction: column;
            align-items: center;

            &.s-card--horizontal {
                
            }
            &.s-card--horizontal-reverse {
                
            }
            &.s-card--vertical-reverse {
                
            }

            ._content {
                align-items: unset;
            }

            ._ctas {
                display: flex;
            }

        `);
    }
    // direction
    if (finalParams.scope.indexOf('direction') !== -1) {
        switch (finalParams.direction) {
            case 'horizontal-reverse':
                vars.push(`
                    flex-direction: row-reverse;
                    max-width: none;

                    ._media {
                        align-self: stretch;
                        width: 50%;
                    }
                    ._img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    @sugar.media mobile {
                        flex-direction: column-reverse;
                    }
                `);
                break;
            case 'horizontal':
                vars.push(`
                    flex-direction: row;
                    max-width: none;
                    
                    ._media {
                        align-self: stretch;
                        width: 50%;
                    }
                    ._img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    @sugar.media mobile {
                        flex-direction: column;
                    }
            `);
                break;
            case 'vertical-reverse':
                vars.push(`
                    flex-direction: column-reverse;
                    align-items: flex-start;
                `);
                break;
            default:
            case 'vertical':
                vars.push(`
                        align-items: flex-start;
                    `);
                break;
        }
    }
    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            background: sugar.color(main, surface);
            @sugar.border.radius(ui.card.borderRadius);
            @sugar.depth (ui.card.depth);

            ._media {
                @sugar.border.radius(ui.card.borderRadius);
            }

            ._img {
                @sugar.border.radius(ui.card.borderRadius);
            }

            ._content {
                padding-block: sugar.padding(ui.card.paddingBlock);
                padding-inline: sugar.padding(ui.card.paddingInline);
            }
        `);
    }
    // wireframe
    vars.push(`
        @sugar.wireframe {
            @sugar.wireframe.background;
            @sugar.wireframe.border;
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHNCQUF1QixTQUFRLHFCQUFZO0lBQzdDLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFLFVBQVU7YUFDdEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUM7YUFDeEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBV2tDLDJDQUFTO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQ2hDLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBdUJULENBQUMsQ0FBQztLQUNOO0lBRUQsWUFBWTtJQUNaLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDL0MsUUFBUSxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQzNCLEtBQUssb0JBQW9CO2dCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztpQkFpQlQsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFlBQVk7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFpQmIsQ0FBQyxDQUFDO2dCQUVDLE1BQU07WUFDVixLQUFLLGtCQUFrQjtnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQzs7O2lCQUdULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsUUFBUTtZQUNSLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsSUFBSSxDQUNMOztxQkFFQyxDQUNKLENBQUM7Z0JBQ0YsTUFBTTtTQUNiO0tBQ0o7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztTQWlCVCxDQUFDLENBQUM7S0FDTjtJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEzSUQsNEJBMklDIn0=