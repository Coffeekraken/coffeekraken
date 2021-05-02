"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const node_1 = __importDefault(require("@coffeekraken/sugar/src/shared/is/node"));
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
class SCacheSettingsInterface extends s_interface_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGVTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7QUFFViw0RUFBcUQ7QUFDckQsa0ZBQThEO0FBRTlEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSx1QkFBd0IsU0FBUSxxQkFBWTs7QUFDekMsa0NBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUNaO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGNBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7S0FDbEM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztLQUNwQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxVQUFVO1FBQ2hCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO0tBQ3hCO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLHVCQUF1QixDQUFDIn0=