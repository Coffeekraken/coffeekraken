"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SValidation_1 = __importDefault(require("../../SValidation"));
const ofType_1 = __importDefault(require("../../../is/ofType"));
/**
 * @name          STypeValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @wip
 *
 * This class represent the "type" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STypeValidation extends SValidation_1.default {
    static exec(value, type) {
        const result = ofType_1.default(value, type);
        if (result === true)
            return true;
        return [value, type, result.$received.type];
    }
}
STypeValidation.message = 'This value has to be of type "<yellow>%1</yellow>" and you\'ve passed "<red>%0</red>" which is of type "<red>%2</red>"';
module.exports = STypeValidation;
