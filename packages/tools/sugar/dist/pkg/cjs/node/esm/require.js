"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callsites_1 = __importDefault(require("callsites"));
const esm_1 = __importDefault(require("esm"));
const module_1 = require("module");
/**
 * @name                require
 * @namespace           node.esm
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to get back an fully functional "require" function in
 * an ESM context.
 *
 * @param       {String}            package         The package you want to require
 * @return      {Function}                  The "require" cjs fully functional function
 *
 * @example         js
 * import require from '@coffeekraken/sugar/node/esm/require';
 * require('something');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function _require(pkg) {
    var _a;
    // @ts-ignore
    let filePath = (_a = (0, callsites_1.default)()[1]
        .getFileName()) === null || _a === void 0 ? void 0 : _a.replace(/^file:\/\//, '');
    const rr = (0, module_1.createRequire)(filePath);
    const r = (0, esm_1.default)({});
    const requiredPkg = rr(pkg);
    return requiredPkg;
}
exports.default = _require;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBQ3BDLDhDQUF3QjtBQUN4QixtQ0FBdUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUF3QixRQUFRLENBQUMsR0FBVzs7SUFDeEMsYUFBYTtJQUNiLElBQUksUUFBUSxHQUFHLE1BQUEsSUFBQSxtQkFBVyxHQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFCLFdBQVcsRUFBRSwwQ0FDWixPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sRUFBRSxHQUFHLElBQUEsc0JBQWEsRUFBUyxRQUFRLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsR0FBRyxJQUFBLGFBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztJQUNwQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQVRELDJCQVNDIn0=