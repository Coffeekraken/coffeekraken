import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           depth
 * @namespace      node.mixins.depth
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginFitInterface extends __SInterface {
}
postcssSugarPluginFitInterface.definition = {
    size: {
        type: 'String',
        values: ['fill', 'contain', 'cover', 'none'],
        default: 'fill',
    },
};
export { postcssSugarPluginFitInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBSXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSw4QkFBK0IsU0FBUSxZQUFZOztBQUM5Qyx5Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQzVDLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0NBQ0osQ0FBQztBQU9OLE9BQU8sRUFBRSw4QkFBOEIsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV2RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxNQUFNLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3RCLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssTUFBTSxDQUFDO1FBQ1o7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztLQVVULENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=