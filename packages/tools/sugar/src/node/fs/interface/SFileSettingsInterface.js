"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SFileReadSettingsInterface_1 = __importDefault(require("./SFileReadSettingsInterface"));
const SFileWatchSettingsInterface_1 = __importDefault(require("./SFileWatchSettingsInterface"));
const SFileWriteSettingsInterface_1 = __importDefault(require("./SFileWriteSettingsInterface"));
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
class SFileSettingsInterface extends s_interface_1.default {
}
exports.default = SFileSettingsInterface;
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
    sourcesExtensions: {
        type: 'Array<String>',
        default: []
    },
    watch: {
        interface: SFileWatchSettingsInterface_1.default,
        type: 'Boolean|Object',
        required: true
    },
    writeSettings: {
        interface: SFileWriteSettingsInterface_1.default.override({
            path: {
                required: false
            }
        }),
        type: 'Object',
        required: true
    },
    readSettings: {
        interface: SFileReadSettingsInterface_1.default,
        type: 'Object',
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGaWxlU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsOEZBQXNFO0FBQ3RFLGdHQUF3RTtBQUN4RSxnR0FBd0U7QUFFeEU7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQXFCLHNCQUF1QixTQUFRLHFCQUFZOztBQUFoRSx5Q0F5Q0M7QUF4Q1EsaUNBQVUsR0FBRztJQUNsQixjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtLQUN2QjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsaUJBQWlCLEVBQUU7UUFDakIsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRSxxQ0FBMkI7UUFDdEMsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsU0FBUyxFQUFFLHFDQUEyQixDQUFDLFFBQVEsQ0FBQztZQUM5QyxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEtBQUs7YUFDaEI7U0FDRixDQUFDO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1osU0FBUyxFQUFFLG9DQUEwQjtRQUNyQyxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDIn0=