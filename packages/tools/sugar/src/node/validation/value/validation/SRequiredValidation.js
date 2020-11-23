"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SValidation_1 = __importDefault(require("../../SValidation"));
/**
 * @name          SRequiredValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "required" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SRequiredValidation extends SValidation_1.default {
    static exec(value) {
        return value !== null && value !== undefined;
    }
}
SRequiredValidation.message = 'This value is <yellow>required</yellow> and you\'ve passed "<red>%0"</red>';
exports.default = SRequiredValidation;
