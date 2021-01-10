"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SCompileTsProcessInterface_1 = __importDefault(require("./interface/SCompileTsProcessInterface"));
const STsCompiler_1 = __importDefault(require("./STsCompiler"));
/**
 * @name            STypescriptToJsProcess
 * @namespace           sugar.node.typescript
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
const Cls = (_a = class SCompileTsProcess extends SProcess_1.default {
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings) {
            super(Object.assign({ id: 'STsCompileProcess', name: 'Compile TS Process' }, (settings || {})));
            this._tsCompiler = new STsCompiler_1.default({});
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
        process(params, settings) {
            return this._tsCompiler.compile(params, settings);
        }
    },
    _a.interface = SCompileTsProcessInterface_1.default,
    _a);
module.exports = Cls;
//# sourceMappingURL=STsCompileProcess.js.map