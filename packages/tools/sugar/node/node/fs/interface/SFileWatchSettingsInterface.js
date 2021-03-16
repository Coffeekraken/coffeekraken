"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
/**
 * @name          SFileWatchSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFileWatchSettingsInterface extends SInterface_1.default {
}
SFileWatchSettingsInterface.definition = {
    pollingInterval: {
        type: 'Number',
        required: true,
        default: 500
    }
};
exports.default = SFileWatchSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVXYXRjaFNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvZnMvaW50ZXJmYWNlL1NGaWxlV2F0Y2hTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSwyQkFBNEIsU0FBUSxvQkFBWTs7QUFDN0Msc0NBQVUsR0FBRztJQUNsQixlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEdBQUc7S0FDYjtDQUNGLENBQUM7QUFFSixrQkFBZSwyQkFBMkIsQ0FBQyJ9