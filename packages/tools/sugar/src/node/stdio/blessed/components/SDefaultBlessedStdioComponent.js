"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedStdioComponent_1 = __importDefault(require("../SBlessedStdioComponent"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
class SDefaultBlessedStdioComponent extends SBlessedStdioComponent_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(logObj, settings = {}) {
        super(logObj, deepMerge_1.default({
            blessed: {
                content: parseHtml_1.default(logObj.value)
            }
        }, settings));
    }
}
/**
 * @name        id
 * @type        String
 * @static
 *
 * Specify the "id" string that will be used in the logObj.type property
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SDefaultBlessedStdioComponent.id = 'default';
const cls = SDefaultBlessedStdioComponent;
exports.default = SDefaultBlessedStdioComponent;
//# sourceMappingURL=SDefaultBlessedStdioComponent.js.map