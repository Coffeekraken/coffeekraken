import __SugarConfig from '@coffeekraken/s-sugar-config';
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
    static get _definition() {
        return {
            adapters: {
                type: 'Array<String>',
                required: true,
                default: __SugarConfig.get('notification.adapters'),
            },
            adaptersSettings: {
                type: 'Object',
                required: true,
                default: __SugarConfig.get('notification.adaptersSettings'),
            },
            enable: {
                type: 'Boolean',
                required: true,
                default: __SugarConfig.get('notification.enable'),
            },
            types: {
                type: 'Object',
                required: true,
                default: __SugarConfig.get('notification.types'),
            },
        };
    }
}
export default SNotificationSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLDhCQUErQixTQUFRLFlBQVk7SUFDckQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdEQ7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzthQUM5RDtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNuRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxlQUFlLDhCQUE4QixDQUFDIn0=