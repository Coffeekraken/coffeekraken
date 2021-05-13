import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name            SNotificationSettingsInterface
 * @namespace       sugar.js.notification.interface
 * @type            Class
 * @extends         SInterface
 *
 * Interface that describe the settings object you can pass to the SNofication constructor
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SNotificationSettingsInterface extends __SInterface {
}
SNotificationSettingsInterface.definition = {
    adapters: {
        type: 'Array<String>',
        required: true,
        default: __sugarConfig('notification.adapters')
    },
    adaptersSettings: {
        type: 'Object',
        required: true,
        default: __sugarConfig('notification.adaptersSettings')
    },
    enable: {
        type: 'Boolean',
        required: true,
        default: __sugarConfig('notification.enable')
    },
    types: {
        type: 'Object',
        required: true,
        default: __sugarConfig('notification.types')
    }
};
export default SNotificationSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLDhCQUErQixTQUFRLFlBQVk7O0FBQ2hELHlDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsK0JBQStCLENBQUM7S0FDeEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0NBQ0YsQ0FBQztBQUVKLGVBQWUsOEJBQThCLENBQUMifQ==