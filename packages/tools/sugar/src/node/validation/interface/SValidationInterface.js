"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SValidationInterface
 * @namespace           sugar.js.validation.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirements
 * for a validation class that extends the SValueValidation one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SValidationInterface extends SInterface_1.default {
}
exports.default = SValidationInterface;
SValidationInterface.definitionObj = {
    apply: {
        type: 'Function',
        required: true,
        description: 'This is the method that must be used when you want to validate a value.',
        static: true
    },
    exec: {
        type: 'Function',
        required: true,
        description: 'This is the method that will be called to validate the passed value. This method has to return true of false depending on the check result',
        static: true
    }
};
