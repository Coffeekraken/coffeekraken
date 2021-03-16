"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SProcessManagerInterface
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
class SProcessManagerInterface extends SInterface_1.default {
}
exports.default = SProcessManagerInterface;
// static extendsArray = ['SProcess', 'SPromise'];
SProcessManagerInterface.definition = {
    run: {
        type: 'Function',
        required: true
    },
    kill: {
        type: 'Function',
        required: true
    }
};
SProcessManagerInterface.title = 'SProcess elements Interface';
SProcessManagerInterface.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvcHJvY2Vzcy9pbnRlcmZhY2UvU1Byb2Nlc3NNYW5hZ2VySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQXFCLHdCQUF5QixTQUFRLG9CQUFZOztBQUFsRSwyQ0FnQkM7QUFmQyxrREFBa0Q7QUFDM0MsbUNBQVUsR0FBRztJQUNsQixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFFSyw4QkFBSyxHQUFHLDZCQUE2QixDQUFDO0FBQ3RDLG9DQUFXLEdBQ2hCLG9JQUFvSSxDQUFDIn0=