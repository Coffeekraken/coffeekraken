"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          avatar
 * @namespace     node.mixin.ui.avatar
 * @type          PostcssMixin
 * @interface       ./avatar
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "avatar" UI component css.
 *
 * @param       {'solid'}                                                [style='theme.ui.avatar.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'|'circle'}                 [shape='theme.ui.avatar.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape'|'interactive'|'notifications')[]}        [scope=['bare','lnf','shape','interactive','notifications']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.badge();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiAvatarInterface extends s_interface_1.default {
    static get _definition() {
        return {
            style: {
                type: 'String',
                value: ['solid'],
                default: s_theme_1.default.get('ui.avatar.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'rounded'],
                default: s_theme_1.default.get('ui.avatar.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: [
                    'bare',
                    'lnf',
                    'shape',
                    'interactive',
                    'notifications',
                ],
                default: ['bare', 'lnf', 'shape', 'notifications'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiAvatarInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ shape: 'square', style: 'solid', scope: ['bare', 'lnf', 'shape'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            position: relative;
            display: inline-block;
            width: sugar.scalable(1em);
            height: sugar.scalable(1em);

            img {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                object-fit: cover;
                border-radius: 50%;
                overflow: hidden;
            }
        `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    img {
                        background-color: sugar.color(current);
                        border-width: sugar.theme(ui.avatar.borderWidth);
                        border-color: sugar.color(current);
                        border-style: solid;
                        @sugar.depth(ui.avatar.depth);
                    }
                `);
                break;
        }
    }
    // interactive
    if (finalParams.scope.indexOf('interactive') !== -1) {
        vars.push(`
            cursor: pointer;
        `);
        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    &:hover img {
                        @sugar.outline($where: element);
                        position: absolute;
                    }
                `);
                break;
        }
    }
    // notifications
    if (finalParams.scope.indexOf('notifications') !== -1) {
        if (finalParams.scope.includes('bare')) {
            vars.push(`
                &[notifications] {
                    &:after {
                        content: attr(notifications);
                        position: absolute;
                        top: 0.2em; right: 0.2em;
                        font-size: sugar.scalable(0.15em);
                        min-width: 1.5em;
                        min-height: 1.5em;
                    }
                }
            `);
        }
        if (finalParams.scope.includes('lnf')) {
            vars.push(`
                &[notifications] {
                    &:after {
                        background: sugar.color(current);
                        color: sugar.color(current, foreground);
                        border-radius: 9999px;
                        padding: 0.33em;
                        font-weight: bold;
                        @sugar.depth(ui.avatar.depth);
                    }
                }
            `);
        }
    }
    // shape
    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    img {
                        border-radius: 0;
                    }
                `);
                break;
            case 'rounded':
                vars.push(`
                    img {
                        border-radius: 9999px;
                    }
                    `);
                break;
            case 'default':
            default:
                vars.push(`
                    img {
                        border-radius: sugar.border.radius(ui.avatar.borderRadius)m;
                    }
                `);
                break;
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNoQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRTtvQkFDSixNQUFNO29CQUNOLEtBQUs7b0JBQ0wsT0FBTztvQkFDUCxhQUFhO29CQUNiLGVBQWU7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQzthQUNyRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRK0Msd0RBQVM7QUFDekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxRQUFRLEVBQ2YsS0FBSyxFQUFFLE9BQU8sRUFDZCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUM1QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OztTQWNULENBQUMsQ0FBQztLQUNOO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztpQkFRVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxjQUFjO0lBQ2QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDOztTQUVULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLE9BQU87Z0JBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsZ0JBQWdCO0lBQ2hCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbkQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OzthQVdULENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OzthQVdULENBQUMsQ0FBQztTQUNOO0tBQ0o7SUFFRCxRQUFRO0lBQ1IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMzQyxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7aUJBSVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztxQkFJTCxDQUFDLENBQUM7Z0JBQ1AsTUFBTTtZQUNWLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7OztpQkFJVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdElELDRCQXNJQyJ9