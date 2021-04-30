"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFrontstackStartInterface
 * @namespace           s-frontstack
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SFrontstackStartProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontstackStartInterface extends s_interface_1.default {
}
SFrontstackStartInterface.definition = {
    receipe: {
        type: 'String',
        alias: 'r',
        values: Object.keys(s_sugar_config_1.default('frontstack.receipes')),
        default: s_sugar_config_1.default('frontstack.receipe')
    },
    exclude: {
        type: 'Array<String>',
        alias: 'e',
        values: Object.keys(s_sugar_config_1.default('frontstack.actions')),
        default: s_sugar_config_1.default('frontstack.exclude')
    }
};
exports.default = SFrontstackStartInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLHlCQUEwQixTQUFRLHFCQUFZOztBQUMzQyxvQ0FBVSxHQUFHO0lBQ2xCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekQsT0FBTyxFQUFFLHdCQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztDQUNGLENBQUM7QUFHSixrQkFBZSx5QkFBeUIsQ0FBQyJ9