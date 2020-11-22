"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SError_1 = require("./SError");
const validateValueOutputString_1 = require("../validation/value/validateValueOutputString");
/**
 * @todo    Doc
 */
class SValueValidationError extends SError_1.default {
    constructor(issuesObj) {
        const string = validateValueOutputString_1.default(issuesObj);
        super(string);
    }
}
exports.default = SValueValidationError;
