"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
/**
 * @name            SSugarAppModuleInterface
 * @namespace       sugar.node.app.sugar.interface
 * @type            Class
 * @extends         SInterface
 *
 * This interface represent the sugar app module instance requirements and defaults
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppModuleSettingsInterface extends SInterface_1.default {
}
SSugarAppModuleSettingsInterface.definition = {
    mainProcessId: {
        type: 'String',
        required: true,
        default: 'main'
    },
    processIdUsedForState: {
        type: 'String',
        default: undefined
    }
};
class SSugarAppModuleInterface extends SInterface_1.default {
}
exports.default = SSugarAppModuleInterface;
SSugarAppModuleInterface.definition = {
    '_settings.sugarAppModule': {
        interface: SSugarAppModuleSettingsInterface,
        type: 'Object',
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYXBwL3N1Z2FyL2ludGVyZmFjZS9TU3VnYXJBcHBNb2R1bGVJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrRUFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sZ0NBQWlDLFNBQVEsb0JBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0lBQ0QscUJBQXFCLEVBQUU7UUFDckIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFHSixNQUFxQix3QkFBeUIsU0FBUSxvQkFBWTs7QUFBbEUsMkNBUUM7QUFQUSxtQ0FBVSxHQUFHO0lBQ2xCLDBCQUEwQixFQUFFO1FBQzFCLFNBQVMsRUFBRSxnQ0FBZ0M7UUFDM0MsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQyJ9