"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../../node/config/sugar"));
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
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
class SNotificationSettingsInterface extends SInterface_1.default {
}
SNotificationSettingsInterface.definition = {
    adapters: {
        type: 'Array<String>',
        required: true,
        default: sugar_1.default('notification.adapters')
    },
    adaptersSettings: {
        type: 'Object',
        required: true,
        default: sugar_1.default('notification.adaptersSettings')
    },
    enable: {
        type: 'Boolean',
        required: true,
        default: sugar_1.default('notification.enable')
    },
    types: {
        type: 'Object',
        required: true,
        default: sugar_1.default('notification.types')
    }
};
exports.default = SNotificationSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLHVFQUF1RDtBQUV2RCw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sOEJBQStCLFNBQVEsb0JBQVk7O0FBQ2hELHlDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsK0JBQStCLENBQUM7S0FDeEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLDhCQUE4QixDQUFDIn0=