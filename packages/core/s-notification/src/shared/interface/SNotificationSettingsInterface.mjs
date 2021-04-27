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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLW5vdGlmaWNhdGlvbi9zcmMvc2hhcmVkL2ludGVyZmFjZS9TTm90aWZpY2F0aW9uU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sOEJBQStCLFNBQVEsWUFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQztLQUN4RDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7Q0FDRixDQUFDO0FBRUosZUFBZSw4QkFBOEIsQ0FBQyJ9