"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
/**
 * @name          SProcessStdio
 * @namespace     sugar.node.process
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the process "Stdio"
 * compatible setting.
 *
 * @param     {ISProcessStdioSettings}     [settings={}]       Some settings to configure your Stdio
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SProcessStdio from '@coffeekraken/sugar/node/process/SProcessStdio';
 * class MyCoolProcessStdio extends SProcessStdio {
 *    constructor(mySource, settings = {}) {
 *      super(source, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SProcessStdio {
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
         * @type      ISProcessStdioSettings
         * @private
         *
         * Store the process Stdio settings
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        this._sources = Array.isArray(source) ? source : [source];
        this._settings = deepMerge_1.default({}, settings);
        this._promise = new SPromise_1.default();
    }
    /**
     * @name          trigger
     * @type          Function
     *
     * Trigger some "events" through the SPromise instance
     *
     * @param       {String}      stack         The stack (name) of the event
     * @param       {Any}         data          The data to pass along the event
     * @return      {SPromise}                  The SPromise instance to maintain chainability
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    trigger(stack, data) {
        this._promise.trigger(stack, data);
        return this._promise;
    }
    /**
     * @name          on
     * @type          Function
     *
     * Subscribe to some events emitted by the Stdio
     *
     * @param       {String}      stack         The stack (name) of the event
     * @param       {Function}     callback       The callback to call when the event is fired
     * @return      {SPromise}                  The SPromise instance to maintain chainability
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    on(stack, callback) {
        this._promise.on(stack, callback);
        return this._promise;
    }
};
module.exports = Cls;
//# sourceMappingURL=SProcessStdio.js.map