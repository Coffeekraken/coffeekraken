"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../core/env");
/**
 * @name          testEnv
 * @namespace     sugar.js.is
 * @type          Function
 *
 * Check if the current environment is in a test process or not
 *
 * @return      {Boolean}         true if in environment environment, false if not
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
exports.default = isTestEnv;
