"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
class SBlessedStdioComponent extends SBlessedComponent_1.default {
    /**
     * @name        construct
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(logObj, settings = {}) {
        super(deepMerge_1.default({
            blessed: {
                scrollable: true,
                mouse: false,
                keys: false
            }
        }, settings));
        // save the logObj
        this.logObj = logObj;
    }
    update() {
        if (!this.isDisplayed())
            return;
        this.height = 0;
        this.screen.render();
        this.height = this.realHeight;
        super.update();
    }
}
const cls = SBlessedStdioComponent;
exports.default = SBlessedStdioComponent;
//# sourceMappingURL=SBlessedStdioComponent.js.map