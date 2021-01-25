"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedStdioComponent_1 = __importDefault(require("../SBlessedStdioComponent"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
class SFileBlessedStdioComponent extends SBlessedStdioComponent_1.default {
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
        const contentArray = ['-', parseHtml_1.default(logObj.value), '-'];
        super(Object.assign({ color: 'yellow' }, logObj), deepMerge_1.default({
            blessed: {
                content: ''
            }
        }, settings));
    }
    update() {
        // this.setContent(
        //   __parseHtml(__replaceTokens(contentArray.join('\n'), this.logObj))
        // );
        super.update();
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
SFileBlessedStdioComponent.id = 'file';
const cls = SFileBlessedStdioComponent;
exports.default = SFileBlessedStdioComponent;
//# sourceMappingURL=SFileBlessedStdioComponent.js.map