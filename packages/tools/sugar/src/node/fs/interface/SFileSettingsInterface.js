import __SInterface from '../../interface/SInterface';
import SFileWatchSettingsInterface from './SFileWatchSettingsInterface';
import SFileWriteSettingsInterface from './SFileWriteSettingsInterface';
import SFileReadSettingsInterface from './SFileReadSettingsInterface';
/**
 * @name          SFileSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Settings infertage
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFileSettingsInterface extends __SInterface {
}
SFileSettingsInterface.definition = {
    checkExistence: {
        type: 'Boolean',
        required: true,
        default: true
    },
    cwd: {
        type: 'String',
        required: true,
        default: process.cwd()
    },
    shrinkSizesTo: {
        type: 'Integer',
        required: true,
        default: 4
    },
    watch: {
        interface: SFileWatchSettingsInterface,
        type: 'Boolean|Object',
        required: true
    },
    writeSettings: {
        interface: SFileWriteSettingsInterface.override({
            path: {
                required: false
            }
        }),
        type: 'Object',
        required: true
    },
    readSettings: {
        interface: SFileReadSettingsInterface,
        type: 'Object',
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGaWxlU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFFdEQsT0FBTywyQkFBMkIsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RSxPQUFPLDJCQUEyQixNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sMEJBQTBCLE1BQU0sOEJBQThCLENBQUM7QUFFdEU7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTs7QUFDdkQsaUNBQVUsR0FBRztJQUNsQixjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtLQUN2QjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLDJCQUEyQjtRQUN0QyxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxhQUFhLEVBQUU7UUFDYixTQUFTLEVBQUUsMkJBQTJCLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGLENBQUM7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxZQUFZLEVBQUU7UUFDWixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUMifQ==