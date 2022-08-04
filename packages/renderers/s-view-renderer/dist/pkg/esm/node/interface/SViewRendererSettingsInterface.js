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
                default: __SSugarConfig.get('viewRenderer.rootDirs'),
            },
            cacheDir: {
                description: 'Specigy the folder to store the engines cache',
                type: 'String',
                default: __SSugarConfig.get('viewRenderer.cacheDir'),
            },
            enginesSettings: {
                description: 'Specify some engines settings. Object must contain each engine settings under his own property. For blade, the property name is "blade"',
                type: 'Object',
                default: {},
            },
            defaultData: {
                description: 'Specify some default data to pass to the view',
                type: 'Object',
                default: {},
            },
            sharedDataFiles: {
                description: 'Specify some shared data files to load',
                type: 'String[]',
                default: __SSugarConfig.get('viewRenderer.sharedDataFiles'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFDUCx5SUFBeUk7Z0JBQzdJLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7YUFDOUQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=