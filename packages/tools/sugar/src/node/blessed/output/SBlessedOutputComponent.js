"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
/**
 * @name            SBlessedOutputComponent
 * @namespace       sugar.node.blessed.output
 * @type            Class
 * @extends         SBlessedComponent
 * @state           Beta
 *
 * This represent the base class that all the "output components" classes MUST extends
 *
 * @param       {ILog}          logObj          The logObj to handle
 * @param       {ISBlessedOutputComponentSettings}        [settings={}]       Some settings to configure your output type
 *
 * @example         js
 * import SBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/SBlessedOutputComponent';
 * class MyCoolOutputComponent extends SBlessedOutputComponent {
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
const cls = class ISBlessedOutputComponent extends SBlessedComponent_1.default {
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
                scrollable: true
            }
        }, settings));
        // save the logObj
        this.logObj = logObj;
    }
};
module.exports = cls;
//# sourceMappingURL=module.js.map