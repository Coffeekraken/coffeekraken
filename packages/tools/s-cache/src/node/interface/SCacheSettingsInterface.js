"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("@coffeekraken/sugar/is/node"));
// import __SInterface from '@coffeekraken/sugar/interface/SInterface';
const SInterface_1 = __importDefault(require("@coffeekraken/sugar/interface/SInterface"));
/**
 * @name            SCacheSettingsInterface
 * @namespace       sugar.js.cache.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Represent the SCache settings interface
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCacheSettingsInterface extends SInterface_1.default {
}
SCacheSettingsInterface.definition = {
    name: {
        type: 'String',
        required: true,
        default: 'SCache'
    },
    ttl: {
        type: 'Number',
        required: true,
        default: -1
    },
    deleteOnExpire: {
        type: 'Boolean',
        required: true,
        default: true
    },
    adapter: {
        type: 'String',
        required: true,
        default: node_1.default() ? 'fs' : 'ls'
    },
    parse: {
        type: 'Function',
        required: true,
        default: JSON.parse
    },
    stringify: {
        type: 'Function',
        required: true,
        default: JSON.stringify
    }
};
exports.default = SCacheSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGVTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7QUFFVix1RUFBbUQ7QUFDbkQsdUVBQXVFO0FBQ3ZFLDBGQUFvRTtBQUVwRTs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sdUJBQXdCLFNBQVEsb0JBQVk7O0FBQ3pDLGtDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxRQUFRO0tBQ2xCO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDWjtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsSUFBSTtLQUNkO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO0tBQ2xDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7S0FDcEI7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUztLQUN4QjtDQUNGLENBQUM7QUFFSixrQkFBZSx1QkFBdUIsQ0FBQyJ9