import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           depth
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-element {
 *    \@sugar.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFitInterface extends __SInterface {
    static get _definition() {
        return {
            size: {
                type: 'String',
                values: ['fill', 'contain', 'cover', 'none'],
                default: 'fill',
            },
        };
    }
}
export { postcssSugarPluginFitInterface as interface };
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
        &:not(img,video) {
                    object-fit: none;
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSw4QkFBK0IsU0FBUSxZQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO2dCQUM1QyxPQUFPLEVBQUUsTUFBTTthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsOEJBQThCLElBQUksU0FBUyxFQUFFLENBQUM7QUFFdkQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLE1BQU0sSUFDVCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixRQUFRLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDdEIsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxNQUFNLENBQUM7UUFDWjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O0tBVVQsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9