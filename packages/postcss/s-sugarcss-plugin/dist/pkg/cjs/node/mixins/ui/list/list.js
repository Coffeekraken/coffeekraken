"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
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
class SSugarcssPluginUiListInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: s_theme_1.default.current.get('ui.list.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiListInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'dl' }, params);
    const vars = [];
    let bulletSelector = '&:before';
    if (finalParams.lnf === 'icon') {
        bulletSelector = '& > i:first-child';
    }
    vars.push(`@s.scope 'bare' {`);
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
    vars.push('}');
    vars.push(`@s.scope 'lnf' {`);
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
                            content: "${s_theme_1.default.current.get('ui.list.bulletChar')}";
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
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztnQkFDbEMsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN0RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNMEMsbURBQVM7QUFFcEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxJQUFJLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLElBQUksV0FBVyxDQUFDLEdBQUcsS0FBSyxNQUFNLEVBQUU7UUFDNUIsY0FBYyxHQUFHLG1CQUFtQixDQUFDO0tBQ3hDO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJSixXQUFXLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7Ozs7OztTQVM1RCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7a0JBSUksY0FBYzs7Ozs7Ozs7Ozs7Ozs7O2tCQWVkLGNBQWM7Ozs7Ozs7U0FPdkIsQ0FBQyxDQUFDO0lBRVAsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCLEtBQUssSUFBSTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7MEJBSUksY0FBYzs7Ozs7O3FCQU1uQixDQUFDLENBQUM7WUFDWCxNQUFNO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzswQkFPSSxjQUFjOzs7Ozs7aUJBTXZCLENBQUMsQ0FBQztZQUNQLE1BQU07UUFDVixLQUFLLElBQUk7WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDOzswQkFFSSxjQUFjO3dDQUNBLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDNUIsb0JBQW9CLENBQ3ZCOzs7OztpQkFLWixDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxJQUFJO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQzs7O3FCQUdELENBQUMsQ0FBQztZQUNYLE1BQU07S0FDYjtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBeEhELDRCQXdIQyJ9