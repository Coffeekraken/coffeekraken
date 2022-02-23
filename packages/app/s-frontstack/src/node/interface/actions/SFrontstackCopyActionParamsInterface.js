import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontstackCopyActionParamsInterface
 * @namespace           node.actions.interface
 * @type.                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the interface that describe parameters of the "copy" action
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontstackCopyActionParamsInterface extends __SInterface {
    static get _definition() {
        return {
            src: {
                description: 'Specify what to copy',
                type: 'String',
                required: true
            },
            dest: {
                description: 'Specify where to paste',
                type: 'String',
                required: true
            },
            chdir: {
                description: 'Specify if need to change the cwd to the pasted folder location',
                type: 'Boolean',
                default: false
            }
        };
    }
}
export default SFrontstackCopyActionParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2tDb3B5QWN0aW9uUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250c3RhY2tDb3B5QWN0aW9uUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxpRUFBaUU7Z0JBQzlFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGVBQWUsb0NBQW9DLENBQUMifQ==