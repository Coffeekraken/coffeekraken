import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           shape
 * @namespace      node.mixin.shape
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to apply a shape to any element that support it
 * by using the `border-radius: sugar.border.radius(shape)` statement like the buttons,
 * badges, etc...
 *
 * @param           {'square'|'pill'}           $shape      The shape you want for your item
 * @return        {Css}           The generated css
 *
 * @snippet         @sugar.shape($1)
 *
 * @example        css
 * .btn {
 *    @sugar.shape(square);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class PostcssSugarPluginShapeInterface extends __SInterface {
    static get _definition() {
        return {
            shape: {
                type: 'String',
                description: 'Specify the shape you want. Can be "square", "pill" or "default". If not specified, will print the border-radius necessary to shape an element.',
                values: ['square', 'pill', 'default'],
            },
        };
    }
}
export { PostcssSugarPluginShapeInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ shape: null }, params);
    const vars = [];
    // shape
    switch (finalParams.shape) {
        case 'square':
            vars.push(`
                --s-shape: 0;
            `);
            break;
        case 'pill':
            vars.push(`
                --s-shape: 99999px;
            `);
            break;
        case 'default':
            vars.push(`
                --s-shape: sugar.border.radius();
            `);
            break;
        default:
            vars.push(`
                border-radius: sugar.border.radius(shape);
            `);
            break;
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxpSkFBaUo7Z0JBQ3JKLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDO2FBQ3hDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUN6RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxJQUFJLElBQ1IsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsUUFBUTtJQUNSLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixLQUFLLFFBQVE7WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzthQUVULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzthQUVULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzthQUVULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7O2FBRVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtLQUNiO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9