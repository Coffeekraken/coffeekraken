"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SValidation_1 = require("../../SValidation");
/**
 * @name          SValuesValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "values" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SValuesValidation extends SValidation_1.default {
    static exec(value, values) {
        return values.indexOf(value) !== -1;
    }
}
SValuesValidation.message = 'This value must be one of these "<green>%1</green>" but you\'ve passed "<red>%0</red>"';
exports.default = SValuesValidation;
