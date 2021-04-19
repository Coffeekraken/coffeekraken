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
        default: 'default'
    }
};
exports.default = SFrontstackStartInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2tTdGFydEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHN0YWNrU3RhcnRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRkFBeUQ7QUFDekQsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0seUJBQTBCLFNBQVEscUJBQVk7O0FBQzNDLG9DQUFVLEdBQUc7SUFDbEIsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFHSixrQkFBZSx5QkFBeUIsQ0FBQyJ9