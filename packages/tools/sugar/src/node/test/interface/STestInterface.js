"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                STestInterface
 * @namespace           sugar.node.test.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the cli parameters for the
 * test process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestInterface extends SInterface_1.default {
}
exports.default = STestInterface;
STestInterface.definitionObj = {
    input: {
        type: 'String',
        alias: 'i',
        description: 'Input files glob pattern',
        required: true,
        level: 1
    },
    watch: {
        type: 'String|Object',
        alias: 'w',
        description: 'Watch files glob pattern or settings object',
        level: 1
    }
};
