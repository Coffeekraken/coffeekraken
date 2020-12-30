"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBlessedStdioComponent_1 = __importDefault(require("../SBlessedStdioComponent"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
/**
 * @name                SWarningBlessedStdioComponent
 * @namespace           sugar.node.blessed.stdio.components
 * @type                Class
 * @extends             SBlessedStdioComponent
 * @state               Beta
 *
 * This represent the "warning" blessed Stdio component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISWarningBlessedStdioComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedStdio class
 * import SBlessedStdio from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdio';
 * import SWarningBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/components/SWarningBlessedStdioComponent';
 * SBlessedStdio.registerComponent(SWarningBlessedStdioComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = (_a = class SWarningBlessedStdioComponent extends SBlessedStdioComponent_1.default {
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
            this._$content.height = this.realHeight;
            this._$line.height = this.realHeight;
            super.update();
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
    _a.id = 'warning',
    _a);
module.exports = cls;
//# sourceMappingURL=SWarningBlessedStdioComponent.js.map