import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SViewRendererSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SViewRenderer settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SViewRendererSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            rootDirs: {
                description: 'Specify some folder paths where to search for views',
                type: 'String',
                default: __SSugarConfig.get('viewRenderer.rootDirs')
            },
            cacheDir: {
                description: 'Specigy the folder to store the engines cache',
                type: 'String',
                default: __SSugarConfig.get('viewRenderer.cacheDir')
            },
            enginesSettings: {
                description: 'Specify some engines settings. Object must contain each engine settings under his own property. For blade, the property name is "blade"',
                type: 'Object',
                default: {}
            },
            defaultData: {
                description: 'Specify some default data to pass to the view',
                type: 'Object',
                default: {}
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpZXdSZW5kZXJlclNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1ZpZXdSZW5kZXJlclNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSxxREFBcUQ7Z0JBQ2xFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFBRSx5SUFBeUk7Z0JBQ3RKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==