"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SValidation_1 = require("../../SValidation");
const ofType_1 = require("../../../is/ofType");
/**
 * @name          STypeValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "type" validation
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
exports.default = STypeValidation;
