"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SValidation_1 = require("../../SValidation");
const path_1 = require("../../../is/path");
/**
 * @name          SPathValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "path" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SPathValidation extends SValidation_1.default {
    static exec(value, checkExistence = true) {
        // if (__isNode()) {
        //   const checkPath = require('@coffeekraken/sugar/node/fs/isPath');
        //   return checkPath(value, checkExistence);
        // } else {
        return path_1.default(value);
        // }
    }
}
SPathValidation.message = 'This value must be a valid <yellow>path</yellow> and you\'ve passed "<red>%0</red>"';
exports.default = SPathValidation;
