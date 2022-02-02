import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name            SNotificationSettingsInterface
 * @namespace       shared.interface
 * @type.                      Class
 * @extends         SInterface
 * @interface
 * @status              beta
 * @platform             node
 * @platform           js
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxZQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3REO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUM7YUFDOUQ7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDbkQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsZUFBZSw4QkFBOEIsQ0FBQyJ9