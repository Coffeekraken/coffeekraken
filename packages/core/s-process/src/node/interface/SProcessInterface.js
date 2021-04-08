"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
SProcessInterface.definition = {
    help: {
        type: 'Boolean',
        alias: 'h',
        default: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFxQixpQkFBa0IsU0FBUSxxQkFBWTs7QUFBM0Qsb0NBU0M7QUFSQyxrREFBa0Q7QUFDM0MsNEJBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUMifQ==