"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
/**
 * @name                initEnv
 * @namespace           sugar.node.init
 * @type                Function
 * @status              wip
 *
 * This function "simply" init some environment variables that can be useful.
 * Here's the list of added environment variables available:
 *
 * - PACKAGE_ROOT (null) {String}: Hold the filsystem package root path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
function initEnv() {
    process.env.PACKAGE_ROOT = packageRoot_1.default();
}
module.exports = initEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdEVudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXRFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCxzRUFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxPQUFPO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcscUJBQWEsRUFBRSxDQUFDO0FBQzdDLENBQUM7QUFDRCxpQkFBUyxPQUFPLENBQUMifQ==