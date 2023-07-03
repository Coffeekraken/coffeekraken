// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                STypescriptBuilderSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the settings of the class STypescriptBuilder.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STypescriptBuilderSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            log: {
                type: 'Object',
                description: 'Specify the logs you want. THis is an object with properties "summary" and "compile".',
                default: {
                    summary: true,
                    compile: true,
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZO0lBQ3pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsT0FBTyxFQUFFO29CQUNMLE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFBRSxJQUFJO2lCQUNoQjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9