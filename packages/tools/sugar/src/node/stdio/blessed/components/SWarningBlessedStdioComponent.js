"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SBlessedStdioComponent_1 = __importDefault(require("../SBlessedStdioComponent"));
class SWarningBlessedStdioComponent extends SBlessedStdioComponent_1.default {
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
            blessed: {}
        }));
        this._$content = blessed_1.default.box({
            content: parseHtml_1.default(['<yellow><bold>Warning:</bold></yellow>', logObj.value].join('\n')),
            top: 0,
            left: 3,
            height: 'shrink',
            style: {}
        });
        this._$line = blessed_1.default.box({
            top: 0,
            left: 0,
            width: 1,
            height: 'shrink',
            style: {
                bg: 'yellow'
            }
        });
        this.append(this._$content);
        this.append(this._$line);
    }
    update() {
        // @ts-ignore
        this._$content.height = this.realHeight;
        // @ts-ignore
        this._$line.height = this.realHeight;
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
SWarningBlessedStdioComponent.id = 'warning';
// const cls: ISWarningBlessedStdioComponentCtor = SWarningBlessedStdioComponent;
exports.default = SWarningBlessedStdioComponent;
//# sourceMappingURL=SWarningBlessedStdioComponent.js.map