// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SFrontspecBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the add the frontspec.build file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontspecBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            sources: {
                type: 'Object',
                description: 'Specify each properties you want in your frontspec with an object that describe the type of the source and some settings depending on the source itself',
                default: __SSugarConfig.get('frontspec.build.sources'),
            },
            silent: {
                type: 'Boolean',
                description: 'Specify if you want to mute the output',
                default: false,
            },
            write: {
                type: 'Boolean',
                description: 'Specify if you want to write the frontspec.json file',
                default: true,
            },
        };
    }
}
export default SFrontspecBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sOEJBQStCLFNBQVEsWUFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCx5SkFBeUo7Z0JBQzdKLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQ3pEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxzREFBc0Q7Z0JBQzFELE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGVBQWUsOEJBQThCLENBQUMifQ==