"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const node_1 = __importDefault(require("../is/node"));
/**
 * @name            SInterfaceResult
 * @namespace       sugar.js.interface
 * @type            Class
 *
 * This class represent what you will get back from the ```SInterface.apply``` method.
 * You will be able to generate some string terminal version of the return as well as some html
 * version if needed
 *
 * @todo        integrate ```toHtml``` method
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SInterfaceResult {
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
    constructor(data = {}) {
        /**
         * @name        _data
         * @type        ISInterfaceResultData
         * @private
         *
         * Store the interface result data like the SDescriptorResult instance, etc...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._data = {};
        this._data = deepMerge_1.default({}, data);
    }
    /**
     * @name          hasIssues
     * @type          Function
     *
     * Return true if some issues have been detected, false if not
     *
     * @return        {Boolean}       true if has some issues, false if not
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hasIssues() {
        if (this._data.descriptorResult) {
            return this._data.descriptorResult.hasIssues();
        }
        return false;
    }
    /**
     * @name             toString
     * @type              Functio n
     *
     * This method return a string terminal compatible or html of this result object
     *
     * @return        {String}                The result object in string format
     *
     * @since          2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toString() {
        if (node_1.default()) {
            return this.toConsole();
        }
        else {
            return `The method "toHtml" has not being integrated for now...`;
        }
    }
    /**
     * @name          toConsole
     * @type          Function
     *
     * This method simply returns you a terminal compatible string
     * of the interface checking result
     *
     * @return        {String}                A string compatible with the terminal
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toConsole() {
        const stringArray = [];
        if (this._data.descriptorResult) {
            stringArray.push(this._data.descriptorResult.toConsole());
        }
        return `
${stringArray.join('\n')}
    `.trim();
    }
};
module.exports = Cls;
