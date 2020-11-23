"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SDeamonInterface
 * @namespace           sugar.node.deamon.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element that is capable of "watching" some events/actions, and respond
 * to it by launching function, or whatever you want.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDeamonInterface extends SInterface_1.default {
}
exports.default = SDeamonInterface;
SDeamonInterface.extendsArray = ['SPromise'];
SDeamonInterface.definitionObj = {
    logs: {
        type: 'Object',
        required: true
    },
    watch: {
        type: 'Function',
        required: true
    },
    state: {
        type: 'String',
        required: true,
        values: ['idle', 'watching', 'error']
    }
};
