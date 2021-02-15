"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
const SFileWatchSettingsInterface_1 = __importDefault(require("./SFileWatchSettingsInterface"));
const SFileWriteSettingsInterface_1 = __importDefault(require("./SFileWriteSettingsInterface"));
const SFileReadSettingsInterface_1 = __importDefault(require("./SFileReadSettingsInterface"));
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
class SFileSettingsInterface extends SInterface_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGaWxlU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0RUFBc0Q7QUFFdEQsZ0dBQXdFO0FBQ3hFLGdHQUF3RTtBQUN4RSw4RkFBc0U7QUFFdEU7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQXFCLHNCQUF1QixTQUFRLG9CQUFZOztBQUFoRSx5Q0FxQ0M7QUFwQ1EsaUNBQVUsR0FBRztJQUNsQixjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtLQUN2QjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLHFDQUEyQjtRQUN0QyxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxhQUFhLEVBQUU7UUFDYixTQUFTLEVBQUUscUNBQTJCLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGLENBQUM7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxZQUFZLEVBQUU7UUFDWixTQUFTLEVBQUUsb0NBQTBCO1FBQ3JDLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUMifQ==