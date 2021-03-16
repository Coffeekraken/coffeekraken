"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
/**
 * @name                SSugarAppModulePresetInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe a sugar ui module object
 * structure and requirements
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppModulePresetInterface extends SInterface_1.default {
}
SSugarAppModulePresetInterface.definition = {
    name: {
        type: 'String',
        description: 'The preset name',
        required: true
    },
    description: {
        type: 'String',
        description: 'The preset description'
    },
    params: {
        type: 'Object',
        description: 'An object of parameters that will be used in your module class instance',
        required: true,
        default: {}
    },
    settings: {
        type: 'Object',
        description: 'An object of settings that will be used in your modules class instance',
        required: true,
        default: {}
    }
};
SSugarAppModulePresetInterface.makeAvailableAsType();
exports.default = SSugarAppModulePresetInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlUHJlc2V0SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYXBwL3N1Z2FyL2ludGVyZmFjZS9TU3VnYXJBcHBNb2R1bGVQcmVzZXRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsK0VBQXlEO0FBR3pEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxvQkFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxpQkFBaUI7UUFDOUIsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHdCQUF3QjtLQUN0QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHlFQUF5RTtRQUMzRSxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCx3RUFBd0U7UUFDMUUsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNaO0NBQ0YsQ0FBQztBQUVKLDhCQUE4QixDQUFDLG1CQUFtQixFQUFFLENBQUM7QUFDckQsa0JBQWUsOEJBQThCLENBQUMifQ==