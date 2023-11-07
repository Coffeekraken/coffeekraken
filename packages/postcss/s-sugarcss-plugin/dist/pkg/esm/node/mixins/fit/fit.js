import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           fit
 * @as              @s.fit
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a certain object-fit on your element
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.fit($1)
 *
 * @example        css
 * .my-element {
 *    @s.fit(cover);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginFitInterface extends __SInterface {
    static get _definition() {
        return {
            size: {
                type: 'String',
                values: ['fill', 'contain', 'cover', 'none', 'abs'],
                default: 'fill',
            },
        };
    }
}
export { SSugarcssPluginFitInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ size: 'fill' }, params);
    const vars = [];
    switch (finalParams.size) {
        case 'cover':
            vars.push(`
                & {
                    object-fit: cover;
                }
            `);
            break;
        case 'contain':
            vars.push(`
                & {
                    object-fit: contain;
                }
            `);
            break;
        case 'none':
            vars.push(`
                & {
                    object-fit: none;
                }
            `);
            break;
        case 'abs':
            vars.push(`
                & {
                    position: absolute;
                    top: 0; left: 0;
                }
            `);
            break;
        case 'fill':
        default:
            vars.push(`
                & {
                    object-fit: fill;
                }
            `);
            break;
    }
    vars.push(`
        & {
            width: 100%; height: 100%;
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLDJCQUE0QixTQUFRLFlBQVk7SUFDbEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUNuRCxPQUFPLEVBQUUsTUFBTTthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsMkJBQTJCLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLE1BQU0sSUFDVCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixRQUFRLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDdEIsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxLQUFLO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7YUFLVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxNQUFNLENBQUM7UUFDWjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9