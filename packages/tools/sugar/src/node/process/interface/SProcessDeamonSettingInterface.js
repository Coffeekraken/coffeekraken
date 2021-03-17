"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../shared/class/SInterface"));
/**
 * @name                SProcessDeamonSettingInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for the passed "deamon" setting in a process
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessDeamonSettingInterface extends SInterface_1.default {
}
exports.default = SProcessDeamonSettingInterface;
SProcessDeamonSettingInterface.definition = {
    class: {
        type: 'Class',
        required: true,
        description: 'The SDeamon based class to use'
    },
    watchArgs: {
        type: 'Array',
        required: true,
        description: 'An array of arguments that will be passed to the "watch" method of the deamon'
    },
    processParams: {
        type: 'Function',
        description: 'An optional function that will take as arguments the initial process params and the data send by the deamon. You then can update the params depending on the data from the deamon and return the new params object to send to the "run" process method'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NEZWFtb25TZXR0aW5nSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NEZWFtb25TZXR0aW5nSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQXFCLDhCQUErQixTQUFRLG9CQUFZOztBQUF4RSxpREFtQkM7QUFsQlEseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsT0FBTztRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsV0FBVyxFQUFFLGdDQUFnQztLQUM5QztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFLElBQUk7UUFDZCxXQUFXLEVBQ1QsK0VBQStFO0tBQ2xGO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFVBQVU7UUFDaEIsV0FBVyxFQUNULHdQQUF3UDtLQUMzUDtDQUNGLENBQUMifQ==