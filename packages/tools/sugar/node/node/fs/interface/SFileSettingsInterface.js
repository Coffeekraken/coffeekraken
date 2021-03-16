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
    sourcesExtensions: {
        type: "Array<String>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2ZzL2ludGVyZmFjZS9TRmlsZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXNEO0FBRXRELGdHQUF3RTtBQUN4RSxnR0FBd0U7QUFDeEUsOEZBQXNFO0FBRXRFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFxQixzQkFBdUIsU0FBUSxvQkFBWTs7QUFBaEUseUNBeUNDO0FBeENRLGlDQUFVLEdBQUc7SUFDbEIsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7S0FDdkI7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUUscUNBQTJCO1FBQ3RDLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELGFBQWEsRUFBRTtRQUNiLFNBQVMsRUFBRSxxQ0FBMkIsQ0FBQyxRQUFRLENBQUM7WUFDOUMsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2FBQ2hCO1NBQ0YsQ0FBQztRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFlBQVksRUFBRTtRQUNaLFNBQVMsRUFBRSxvQ0FBMEI7UUFDckMsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQyJ9