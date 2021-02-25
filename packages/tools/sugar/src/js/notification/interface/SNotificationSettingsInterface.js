// @shared
import __sugarConfig from '../../../node/config/sugar';
import __SInterface from '../../interface/SInterface';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFFVixPQUFPLGFBQWEsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUV0RDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxZQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLCtCQUErQixDQUFDO0tBQ3hEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztDQUNGLENBQUM7QUFFSixlQUFlLDhCQUE4QixDQUFDIn0=