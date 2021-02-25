"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../config/sugar"));
/**
 * @name            ResolveSettingsInterface
 * @namespace       sugar.node.module.interface
 * @type            Class
 * @extends         SInterface
 *
 * This represent the resolve settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class ResolveSettingsInterface extends SInterface_1.default {
}
ResolveSettingsInterface.definition = {
    dirs: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.dirs')
    },
    extensions: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.extensions')
    },
    fields: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.fields')
    }
};
exports.default = ResolveSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXNEO0FBQ3RELCtEQUErQztBQUUvQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSx3QkFBeUIsU0FBUSxvQkFBWTs7QUFDMUMsbUNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsZUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGVBQWEsQ0FBQywyQkFBMkIsQ0FBQztLQUNwRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7Q0FDRixDQUFDO0FBRUosa0JBQWUsd0JBQXdCLENBQUMifQ==