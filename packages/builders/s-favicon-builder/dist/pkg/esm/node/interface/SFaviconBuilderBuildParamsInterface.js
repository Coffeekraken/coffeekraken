import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SFaviconBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SFaviconBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFaviconBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input image file to use',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('faviconBuilder.input'),
            },
            outDir: {
                description: 'Specify the output directory ou want your icons in',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('faviconBuilder.outDir'),
            },
            settings: {
                description: 'Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder',
                type: 'Object',
                default: __SSugarConfig.get('faviconBuilder.settings'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUNBQW9DLFNBQVEsWUFBWTtJQUN6RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxvREFBb0Q7Z0JBQ3hELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCw4R0FBOEc7Z0JBQ2xILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQ3pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9