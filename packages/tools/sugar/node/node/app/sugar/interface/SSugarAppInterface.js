"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SSugarAppInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe de arguments supported
 * when using the SSugarCli class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppInterface extends SInterface_1.default {
}
SSugarAppInterface.definition = {
    modules: {
        type: 'Object',
        required: true,
        default: sugar_1.default('sugar-app.modules')
    }
};
exports.default = SSugarAppInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYXBwL3N1Z2FyL2ludGVyZmFjZS9TU3VnYXJBcHBJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsK0VBQXlEO0FBQ3pELGtFQUFrRDtBQU9sRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsb0JBQVk7O0FBQ3BDLDZCQUFVLEdBQUc7SUFDbEIsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7Q0FDRixDQUFDO0FBR0osa0JBQWUsa0JBQWtCLENBQUMifQ==