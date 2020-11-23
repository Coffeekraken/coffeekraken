"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SCliInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput ```log``` method.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCliInterface extends SInterface_1.default {
}
exports.default = SCliInterface;
SCliInterface.definitionObj = {
    interface: {
        type: 'SInterface',
        required: true,
        static: true
    },
    processClass: {
        type: 'SProcessManager',
        required: true,
        static: true
    },
    command: {
        type: 'String',
        required: true,
        static: true
    }
};
;
