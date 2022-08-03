// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SCliPackageRenameParamsInterface
 * @namespace           node.package.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliPackageRenameParamsInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                description: 'Specify the new name for your package',
                type: 'String'
            },
            folder: {
                description: 'Specify if the folder has to be renames as well',
                type: 'Boolean'
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsWUFBWTtJQUN0RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxTQUFTO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9