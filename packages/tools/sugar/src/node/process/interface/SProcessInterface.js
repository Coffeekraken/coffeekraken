"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
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
class SProcessInterface extends SInterface_1.default {
}
exports.default = SProcessInterface;
// static extendsArray = ['SProcess', 'SPromise'];
SProcessInterface.definitionObj = {
    id: {
        type: 'String',
        required: true
    },
    state: {
        type: 'String',
        required: true,
        values: ['idle', 'running', 'killed', 'error', 'success', 'watching']
    },
    duration: {
        type: 'Number',
        required: true
    },
    startTime: {
        type: 'Number',
        required: true
    },
    endTime: {
        type: 'Number',
        required: true
    },
    stdout: {
        type: 'Array<String>',
        required: true,
        default: []
    },
    stderr: {
        type: 'Array<String>',
        required: true,
        default: []
    },
    process: {
        type: 'Function',
        required: true
    },
    kill: {
        type: 'Function',
        required: true
    },
    log: {
        type: 'Function',
        required: true
    }
};
SProcessInterface.title = 'SProcess elements Interface';
SProcessInterface.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit';
