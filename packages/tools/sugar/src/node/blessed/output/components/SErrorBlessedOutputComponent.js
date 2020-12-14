"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBlessedOutputComponent_1 = __importDefault(require("../SBlessedOutputComponent"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
/**
 * @name                SErrorBlessedOutputComponent
 * @namespace           sugar.node.blessed.output.components
 * @type                Class
 * @extends             SBlessedOutputComponent
 * @state               Beta
 *
 * This represent the "error" blessed output component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISErrorBlessedOutputComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedOutput class
 * import SBlessedOutput from '@coffeekraken/sugar/node/blessed/output/SBlessedOutput';
 * import SErrorBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/components/SErrorBlessedOutputComponent';
 * SBlessedOutput.registerComponent(SErrorBlessedOutputComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = (_a = class SErrorBlessedOutputComponent extends SBlessedOutputComponent_1.default {
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
                    content: parseHtml_1.default(['<red><bold>Error:</bold></red>', '', logObj.value].join('\n')),
                    padding: {
                        left: 3
                    }
                } }));
            this._$line = blessed_1.default.box({
                top: -2,
                left: -3,
                width: 1,
                height: 'shrink',
                style: {
                    bg: 'red'
                }
            });
            this.append(this._$line);
        }
        update() {
            this._$line.height = this.getScrollHeight() + 2;
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
    _a.id = 'error',
    _a);
module.exports = cls;
//# sourceMappingURL=module.js.map