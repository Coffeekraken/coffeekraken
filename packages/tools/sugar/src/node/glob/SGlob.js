"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const resolveGlob_1 = __importDefault(require("./resolveGlob"));
const extractGlob_1 = __importDefault(require("./extractGlob"));
const extractNoneGlob_1 = __importDefault(require("./extractNoneGlob"));
/**
 * @name                SGlob
 * @namespace           sugar.node.glob
 * @type                Class
 *
 * This class represent a glob pattern and can be used to resolve some globs and get back
 * an array of SFile instances or to extract some part of the pattern, etc...
 *
 * @param           {String|Array<String>}          globs            The glob pattern(s) you want to use with this instance
 * @param           {Object}                [settings={}]           An object of settings to configure your glob instance
 *
 * @todo               tests
 *
 * @example         js
 * import SGlob from '@coffeekraken/sugar/node/glob/SGlob';
 * const glob = new SGlob('my/cool/glob/*.js');
 * const files = await glob.resolve();
 * await SGlob.resolve('my/cool/glob/*.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SGlob {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(globs, settings = {}) {
        /**
         * @name            _settings
         * @type            Object
         * @private
         *
         * Store the instance settings
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name            _globs
         * @type            Array<String>
         * @private
         *
         * Store the instance globs
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._globs = null;
        this._settings = deepMerge_1.default({}, settings);
        this._globs = Array.isArray(globs) ? globs : [globs];
    }
    /**
     * @name                resolve
     * @type                Function
     * @async
     * @static
     *
     * Alias to the ```resolveGlob``` function available under "node/glob/resolveGlob"
     *
     * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
     * @param       {Object}            [settings={}]           An object of settings to configure your glob process
     * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static resolve(globs, settings = {}) {
        return resolveGlob_1.default(globs, settings);
    }
    /**
     * @name                extractGlob
     * @type                Function
     * @static
     *
     * Alias to the ```extractGlob``` function available under "node/glob/extractGlob"
     *
     * @param       {String}            string          The string from which to extract the glob part
     * @return      {String}                            The glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static extractGlob(string) {
        return extractGlob_1.default(string);
    }
    /**
     * @name                extractNoneGlob
     * @type                Function
     * @static
     *
     * Alias to the ```extractNoneGlob``` function available under "node/glob/extractNoneGlob"
     *
     * @param       {String}            string          The string from which to extract the none glob part
     * @return      {String}                            The none glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static extractNoneGlob(string) {
        return extractNoneGlob_1.default(string);
    }
    /**
     * @name                resolve
     * @type                Function
     * @async
     * @private
     *
     * Alias to the ```resolveGlob``` function available under "node/glob/resolveGlob"
     *
     * @param       {Object}            [settings={}]           An object of settings to configure your glob process
     * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    resolve(settings = {}) {
        settings = deepMerge_1.default(this._settings, {}, settings);
        return SGlob.resolve(this._globs, settings);
    }
    /**
     * @name                extractGlob
     * @type                Function
     *
     * Alias to the ```extractGlob``` function available under "node/glob/extractGlob"
     *
     * @return      {String|Array<String>}                            The glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    extractGlob() {
        if (this._globs.length === 1) {
            return SGlob.extractGlob(this._globs[0]);
        }
        return this._globs.map((glob) => {
            SGlob.extractGlob(glob);
        });
    }
    /**
     * @name                extractNoneGlob
     * @type                Function
     *
     * Alias to the ```extractNoneGlob``` function available under "node/glob/extractNoneGlob"
     *
     * @return      {String|Array<String>}                            The glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    extractNoneGlob() {
        if (this._globs.length === 1) {
            return SGlob.extractNoneGlob(this._globs[0]);
        }
        return this._globs.map((glob) => {
            SGlob.extractNoneGlob(glob);
        });
    }
}
exports.default = SGlob;
