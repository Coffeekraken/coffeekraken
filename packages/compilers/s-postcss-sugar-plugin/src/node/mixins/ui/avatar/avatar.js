import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
class postcssSugarPluginUiAvatarInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                value: ['solid'],
                default: __STheme.get('ui.avatar.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'rounded'],
                default: __STheme.get('ui.avatar.defaultShape'),
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
export { postcssSugarPluginUiAvatarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
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
                        @sugar.depth(sugar.theme.value(ui.avatar.depth));
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
                        @sugar.depth(sugar.theme.value(ui.avatar.depth));
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
                        border-radius: sugar.border.radius(ui.avatar.borderRadius);
                    }
                    `);
                break;
            case 'default':
            default:
                vars.push(`
                    img {
                        border-radius: 0.5em;
                    }
                `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNoQixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixLQUFLO29CQUNMLE9BQU87b0JBQ1AsYUFBYTtvQkFDYixlQUFlO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUM7YUFDckQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLFFBQVEsRUFDZixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQzVCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O1NBY1QsQ0FBQyxDQUFDO0tBQ047SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O2lCQVFULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELGNBQWM7SUFDZCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO1FBRUgsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztpQkFLVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxnQkFBZ0I7SUFDaEIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNuRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O2FBV1QsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O2FBV1QsQ0FBQyxDQUFDO1NBQ047S0FDSjtJQUVELFFBQVE7SUFDUixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzNDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztpQkFJVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3FCQUlMLENBQUMsQ0FBQztnQkFDUCxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2lCQUlULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==