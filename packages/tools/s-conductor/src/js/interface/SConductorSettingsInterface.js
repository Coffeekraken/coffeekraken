// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SConductorSettingsInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the SConductor settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SConductorSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            idleTimeout: {
                description: 'Specify after how many milliseconds of inactity the SConductor has to be considered as idle ',
                type: 'Number',
                default: 500
            },
            logTimeout: {
                description: 'Specify after how many milliseconds of inactity the SConductor has to log the small analysis',
                type: 'Number',
                default: 2000
            },
            log: {
                description: 'Specify if you want to log the small analysis when the SConductor is idle',
                type: 'Boolean',
                default: false
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmR1Y3RvclNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbmR1Y3RvclNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTywyQkFBNEIsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLDhGQUE4RjtnQkFDM0csSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsOEZBQThGO2dCQUMzRyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsMkVBQTJFO2dCQUN4RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==