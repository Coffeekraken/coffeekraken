"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SOutputProcessInterface
 * @namespace           sugar.node.blessed
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput class constructor.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SOutputProcessInterface extends SInterface_1.default {
}
exports.default = SOutputProcessInterface;
SOutputProcessInterface.definitionObj = {
    on: {
        type: 'Function',
        required: true
    }
};
