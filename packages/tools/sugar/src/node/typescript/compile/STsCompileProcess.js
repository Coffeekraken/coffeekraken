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
            const input = params.input;
            delete params.input;
            return this._tsCompiler.compile(input, Object.assign(Object.assign({}, settings), params));
        }
    },
    _a.interfaces = {
        this: SCompileTsProcessInterface_1.default
    },
    _a);
module.exports = Cls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZVByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRUFBOEM7QUFNOUMsd0dBQWtGO0FBRWxGLGdFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLEdBQUcsU0FBMkIsTUFBTSxpQkFDeEMsU0FBUSxrQkFBUTtRQU1oQjs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBcUM7WUFDL0MsS0FBSyxpQkFDSCxFQUFFLEVBQUUsbUJBQW1CLEVBQ3ZCLElBQUksRUFBRSxvQkFBb0IsSUFDdkIsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEVBQ25CLENBQUM7WUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsT0FBTyxDQUNMLE1BQWlDLEVBQ2pDLFFBQXFDO1lBRXJDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDM0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBRXBCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxrQ0FDaEMsUUFBUSxHQUNSLE1BQU0sRUFDVCxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBaERRLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUsb0NBQTRCO0tBQ2xDO09BOENILENBQUM7QUFFRixpQkFBUyxHQUFHLENBQUMifQ==