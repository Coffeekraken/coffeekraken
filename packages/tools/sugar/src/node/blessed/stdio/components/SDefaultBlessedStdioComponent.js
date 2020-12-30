"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBlessedStdioComponent_1 = __importDefault(require("../SBlessedStdioComponent"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
/**
 * @name                SDefaultBlessedStdioComponent
 * @namespace           sugar.node.blessed.Stdio.components
 * @type                Class
 * @extends             SBlessedStdioComponent
 * @state               Beta
 *
 * This represent the "default" blessed Stdio component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {IDefaultBlessedStdioComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedStdio class
 * import SBlessedStdio from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdio';
 * import SDefaultBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/components/SDefaultBlessedStdioComponent';
 * SBlessedStdio.registerComponent(SDefaultBlessedStdioComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = (_a = class SDefaultBlessedStdioComponent extends SBlessedStdioComponent_1.default {
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
//# sourceMappingURL=SDefaultBlessedStdioComponent.js.map