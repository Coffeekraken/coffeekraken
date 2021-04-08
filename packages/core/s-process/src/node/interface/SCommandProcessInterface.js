"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SProcessInterface_1 = __importDefault(require("./SProcessInterface"));
/**
 * @name                SProcessInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessInterface extends s_interface_1.default {
}
exports.default = SProcessInterface;
// static extendsArray = ['SProcess', 'SPromise'];
SProcessInterface.definition = Object.assign(Object.assign({}, SProcessInterface_1.default.definition), { command: {
        type: 'String',
        alias: 'c',
        required: true
    } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbW1hbmRQcm9jZXNzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbW1hbmRQcm9jZXNzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFxQixpQkFBa0IsU0FBUSxxQkFBWTs7QUFBM0Qsb0NBVUM7QUFUQyxrREFBa0Q7QUFDM0MsNEJBQVUsbUNBQ1osMkJBQW1CLENBQUMsVUFBVSxLQUNqQyxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsUUFBUSxFQUFFLElBQUk7S0FDZixJQUNEIn0=