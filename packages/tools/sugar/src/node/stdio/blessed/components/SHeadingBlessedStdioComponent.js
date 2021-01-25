"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedStdioComponent_1 = __importDefault(require("../SBlessedStdioComponent"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const replaceTokens_1 = __importDefault(require("../../../string/replaceTokens"));
class SHeadingBlessedStdioComponent extends SBlessedStdioComponent_1.default {
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
                content: contentArray.join('\n')
            }
        }, settings));
    }
    update() {
        const padLeft = this.parent.padding.left || this.parent.parent.padding.left;
        const padRight = this.parent.padding.right || this.parent.parent.padding.right;
        const contentArray = [
            `<[color]>${'-'.repeat(this.parent.width - Math.round((padLeft + padRight) / 2))}</[color]>`,
            this.logObj.value,
            `<[color]>${'-'.repeat(this.parent.width - Math.round((padLeft + padRight) / 2))}</[color]>`
        ];
        this.setContent(parseHtml_1.default(replaceTokens_1.default(contentArray.join('\n'), this.logObj)));
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
SHeadingBlessedStdioComponent.id = 'heading';
const cls = SHeadingBlessedStdioComponent;
exports.default = SHeadingBlessedStdioComponent;
//# sourceMappingURL=SHeadingBlessedStdioComponent.js.map