"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
/**
 * @name                SSugarAppModuleObjInterface
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
class SSugarAppModuleObjInterface extends SInterface_1.default {
}
exports.default = SSugarAppModuleObjInterface;
SSugarAppModuleObjInterface.definition = {
    id: {
        type: 'String',
        description: 'A simple one word id that will be used to identify this module',
        required: true
    },
    name: {
        type: 'String',
        description: 'The module name like "Frontend Server", etc...',
        required: true
    },
    description: {
        type: 'String',
        description: 'The module description',
        required: false
    },
    autoRun: {
        type: 'Boolean',
        description: 'Specify if you want your module to run automatically after loading',
        required: false,
        default: false
    },
    modulePath: {
        type: 'String',
        description: 'The SSugarUiModule based class file path.',
        required: true,
        path: {
            exists: true
        }
    },
    processPath: {
        type: 'String',
        description: 'The SProcess based class file path',
        required: false,
        path: {
            exists: true
        }
    },
    presets: {
        type: 'Object<SSugarAppModulePreset>',
        description: 'An object of presets objects to use with the registered process',
        required: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlT2JqSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYXBwL3N1Z2FyL2ludGVyZmFjZS9TU3VnYXJBcHBNb2R1bGVPYmpJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsK0VBQXlEO0FBSXpEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBcUIsMkJBQTRCLFNBQVEsb0JBQVk7O0FBQXJFLDhDQThEQztBQTdEUSxzQ0FBVSxHQUFHO0lBQ2xCLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULGdFQUFnRTtRQUNsRSxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsZ0RBQWdEO1FBQzdELFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsUUFBUSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFDVCxvRUFBb0U7UUFDdEUsUUFBUSxFQUFFLEtBQUs7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsMkNBQTJDO1FBQ3hELFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLElBQUk7U0FDYjtLQUNGO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFFBQVEsRUFBRSxLQUFLO1FBQ2YsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLElBQUk7U0FDYjtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLCtCQUErQjtRQUNyQyxXQUFXLEVBQ1QsaUVBQWlFO1FBQ25FLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCx5RUFBeUU7UUFDM0UsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNaO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1Qsd0VBQXdFO1FBQzFFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtDQUNGLENBQUMifQ==