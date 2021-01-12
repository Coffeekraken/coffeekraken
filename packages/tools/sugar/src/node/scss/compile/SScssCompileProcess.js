"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SScssInterface_1 = __importDefault(require("./interface/SScssInterface"));
const SScssCompiler_1 = __importDefault(require("./SScssCompiler"));
/**
 * @name            SScssCompileProcess
 * @namespace           sugar.node.scss.compile
 * @type            Class
 * @extends         SProcess
 * @wip
 *
 * This class represent the tsc compilation process to compile typescript to js
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssCompileProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(Object.assign({ id: 'SScssCompileProcess', name: 'Compile Scss Process' }, (settings || {})));
        this._scssCompiler = new SScssCompiler_1.default({});
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that actually execute the process
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        const input = params.input;
        delete params.input;
        return this._scssCompiler.compile(input, Object.assign(Object.assign({}, settings), params));
    }
}
SScssCompileProcess.interface = SScssInterface_1.default;
module.exports = SScssCompileProcess;
//# sourceMappingURL=SScssCompileProcess.js.map