// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/env"], factory);
    }
})(function (require, exports) {
    "use strict";
    var env_1 = __importDefault(require("../core/env"));
    /**
     * @name          testEnv
     * @namespace     sugar.js.is
     * @type          Function
     * @stable
     *
     * Check if the current environment is in a test process or not
     *
     * @return      {Boolean}         true if in environment environment, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isTest from '@coffeekraken/sugar/js/is/testEnv';
     * isTest(); // => true
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isTestEnv() {
        return (env_1.default('NODE_ENV') === 'test' ||
            env_1.default('JEST_WORKER_ID') !== undefined ||
            typeof global.it === 'function');
    }
    return isTestEnv;
});
//# sourceMappingURL=module.js.map