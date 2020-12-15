"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
/**
 * @name          SProcessOutput
 * @namespace     sugar.node.process
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the process "output"
 * compatible setting.
 *
 * @param     {ISProcessOutputSettings}     [settings={}]       Some settings to configure your output
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SProcessOutput from '@coffeekraken/sugar/node/process/SProcessOutput';
 * class MyCoolProcessOutput extends SProcessOutput {
 *    constructor(mySource, settings = {}) {
 *      super(source, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SProcessOutput {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(source, settings = {}) {
        /**
         * @name      _settings
         * @type      ISProcessOutputSettings
         * @private
         *
         * Store the process output settings
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        this._sources = Array.isArray(source) ? source : [source];
        this._settings = deepMerge_1.default({}, settings);
    }
};
module.exports = Cls;
//# sourceMappingURL=SProcessOutput.js.map