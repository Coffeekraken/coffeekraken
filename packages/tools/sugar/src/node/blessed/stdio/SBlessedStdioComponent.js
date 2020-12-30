"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
/**
 * @name            SBlessedStdioComponent
 * @namespace       sugar.node.blessed.Stdio
 * @type            Class
 * @extends         SBlessedComponent
 * @state           Beta
 *
 * This represent the base class that all the "Stdio components" classes MUST extends
 *
 * @param       {ILog}          logObj          The logObj to handle
 * @param       {ISBlessedStdioComponentSettings}        [settings={}]       Some settings to configure your Stdio type
 *
 * @example         js
 * import SBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdioComponent';
 * class MyCoolStdioComponent extends SBlessedStdioComponent {
 *      construct(logObj, settings={}) {
 *          super(logObj, settings);
 *      }
 *      render() {
 *          // make your render logic here...
 *      }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = class ISBlessedStdioComponent extends SBlessedComponent_1.default {
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
        this.height = 0;
        this.screen.render();
        this.height = this.realHeight;
        super.update();
    }
};
module.exports = cls;
//# sourceMappingURL=SBlessedStdioComponent.js.map