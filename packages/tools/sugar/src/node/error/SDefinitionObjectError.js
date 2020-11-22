"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SError_1 = require("./SError");
const validateObjectDefinitionObjectOutputString_1 = require("../validation/object/validateObjectDefinitionObjectOutputString");
/**
 * @todo      Doc
 */
class SDefinitionObjectError extends SError_1.default {
    constructor(issuesObj) {
        const string = validateObjectDefinitionObjectOutputString_1.default(issuesObj);
        super(string);
    }
}
exports.default = SDefinitionObjectError;
