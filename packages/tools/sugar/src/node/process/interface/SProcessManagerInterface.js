"use strict";
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
SProcessManagerInterface.definitionObj = {
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
