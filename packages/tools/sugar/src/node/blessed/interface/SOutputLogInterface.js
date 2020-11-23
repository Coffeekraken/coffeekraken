"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SOutputLogInterface
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
class SOutputLogInterface extends SInterface_1.default {
}
exports.default = SOutputLogInterface;
SOutputLogInterface.definitionObj = {
    value: {
        // type: 'Function',
        required: true,
        description: 'The value to log',
        alias: 'v'
    },
    clear: {
        type: 'Boolean|Integer',
        description: 'If set to <yellow>true</yellow>, clear the entire output stream, otherwise you can specify a number of line(s) to clear',
        alias: 'c'
    },
    temp: {
        type: 'Boolean',
        description: 'Set the log as temporary. This mean that it will dissapear on the next log action',
        alias: 't'
    },
    group: {
        type: 'String',
        description: 'Specify a group in which to display the log',
        alias: 'g'
    },
    mt: {
        type: 'Integer',
        description: 'Specify the margin top to apply',
        default: 0
    },
    mb: {
        type: 'Integer',
        description: 'Specify the margin bottom to apply',
        default: 1
    }
};
