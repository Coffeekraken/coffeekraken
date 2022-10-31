// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SMitosisBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build a mitosis component using the SMitosis class.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMitosisBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            targets: {
                type: 'String[]',
                description: 'Specify the targets you want for your build',
                default: ['webcomponent', 'react'],
                values: ['webcomponent', 'react'],
            },
            watch: {
                type: 'Boolean',
                description:
                    'Specify if you want to watch for files updates and rebuild your component(s) automatically',
                default: false,
                alias: 'w',
            },
        };
    }
}
export default SMitosisBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sNEJBQTZCLFNBQVEsWUFBWTtJQUNuRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxVQUFVO2dCQUNoQixXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO2dCQUNsQyxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO2FBQ3BDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCw0RkFBNEY7Z0JBQ2hHLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsZUFBZSw0QkFBNEIsQ0FBQyJ9
