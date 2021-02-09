"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../core/env"));
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
exports.default = isTestEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEVudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3RFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLFNBQVM7SUFDaEIsT0FBTyxDQUNMLGFBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxNQUFNO1FBQzVCLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLFNBQVM7UUFDckMsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FDaEMsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==