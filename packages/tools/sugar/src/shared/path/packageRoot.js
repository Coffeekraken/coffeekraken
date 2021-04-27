// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/env", "../is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const env_1 = __importDefault(require("../core/env"));
    const node_1 = __importDefault(require("../is/node"));
    /**
     * @name                  packageRoot
     * @namespace            js.path
     * @type                  Function
     * @env                   development
     * @status              beta
     *
     * This function return the path where stands the package in the filesystem.
     * !!! This function works only in development mode cause it will be dangerous to
     * expose this kind on information on a website...
     * If the environment is not the good one, this function will simply return an empty string
     *
     * @return        {String}                Either the package root path if available, or an empty string if not...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import packageRoot from '@coffeekraken/sugar/js/path/packageRoot';
     * packageRoot(); // => /Users/something/hello/world
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    function packageRoot(...args) {
        if (node_1.default()) {
            const packageRootFn = require('../../node/path/packageRoot').default; // eslint-disable-line
            return packageRootFn(...args);
        }
        else {
            const environment = env_1.default('node_env') || env_1.default('environment') || env_1.default('env');
            if (environment !== 'development' && environment !== 'test')
                return '';
            return env_1.default('package_root') || '';
        }
    }
    exports.default = packageRoot;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBZ0M7SUFDaEMsc0RBQWtDO0lBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFHLElBQUk7UUFDMUIsSUFBSSxjQUFRLEVBQUUsRUFBRTtZQUNkLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtZQUM1RixPQUFPLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxNQUFNLFdBQVcsR0FDZixhQUFLLENBQUMsVUFBVSxDQUFDLElBQUksYUFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RCxJQUFJLFdBQVcsS0FBSyxhQUFhLElBQUksV0FBVyxLQUFLLE1BQU07Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFDdkUsT0FBTyxhQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUNELGtCQUFlLFdBQVcsQ0FBQyJ9