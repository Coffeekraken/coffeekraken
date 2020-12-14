"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBlessedOutputComponent_1 = __importDefault(require("../SBlessedOutputComponent"));
/**
 * @name                defaultBlessedOutputComponent
 * @namespace           sugar.node.blessed.output.components
 * @type                Class
 * @extends             SBlessedOutputComponent
 * @state               Beta
 *
 * This represent the "default" blessed output component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {IDefaultBlessedOutputComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedOutput class
 * import SBlessedOutput from '@coffeekraken/sugar/node/blessed/output/SBlessedOutput';
 * import SDefaultBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/components/SDefaultBlessedOutputComponent';
 * SBlessedOutput.registerComponent(SDefaultBlessedOutputComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = (_a = class SDefaultBlessedOutputComponent extends SBlessedOutputComponent_1.default {
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
            super(logObj, Object.assign(Object.assign({}, settings), { blessed: {
                    content: logObj.value
                } }));
        }
    },
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
    _a.id = 'default',
    _a);
module.exports = cls;
//# sourceMappingURL=module.js.map