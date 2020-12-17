"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBlessedOutputComponent_1 = __importDefault(require("../SBlessedOutputComponent"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const replaceTokens_1 = __importDefault(require("../../../string/replaceTokens"));
/**
 * @name                SHeadingBlessedOutputComponent
 * @namespace           sugar.node.blessed.output.components
 * @type                Class
 * @extends             SBlessedOutputComponent
 * @state               Beta
 *
 * This represent the "heading" blessed output component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISHeadingBlessedOutputComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedOutput class
 * import SBlessedOutput from '@coffeekraken/sugar/node/blessed/output/SBlessedOutput';
 * import SHeadingBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/components/SHeadingBlessedOutputComponent';
 * SBlessedOutput.registerComponent(SHeadingBlessedOutputComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = (_a = class SHeadingBlessedOutputComponent extends SBlessedOutputComponent_1.default {
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
            const contentArray = [
                `<[color]>${'-'.repeat(this.parent.width)}</[color]>`,
                this.logObj.value,
                `<[color]>${'-'.repeat(this.parent.width)}</[color]>`
            ];
            this.setContent(parseHtml_1.default(replaceTokens_1.default(contentArray.join('\n'), this.logObj)));
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
    _a.id = 'heading',
    _a);
module.exports = cls;
//# sourceMappingURL=SHeadingBlessedOutputComponent.js.map