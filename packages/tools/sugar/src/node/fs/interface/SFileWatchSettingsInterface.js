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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVXYXRjaFNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbGVXYXRjaFNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXNEO0FBRXREOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLDJCQUE0QixTQUFRLG9CQUFZOztBQUM3QyxzQ0FBVSxHQUFHO0lBQ2xCLGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsR0FBRztLQUNiO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLDJCQUEyQixDQUFDIn0=