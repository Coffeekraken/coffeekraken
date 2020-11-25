"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SValidation_1 = __importDefault(require("../../SValidation"));
const class_1 = __importDefault(require("../../../is/class"));
/**
 * @name          SStaticValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @wip
 *
 * This class represent the "static" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SStaticValidation extends SValidation_1.default {
    static exec(value, object, property) {
        if (class_1.default(object)) {
            if (!object[property])
                return false;
            return true;
        }
        else if (object.constructor) {
            if (!object.constructor[property])
                return false;
            return true;
        }
        return [value, object, property];
    }
}
SStaticValidation.message = 'The passed "<yellow>%2</yellow>" property has to be a <green>static</green> one';
module.exports = SStaticValidation;
