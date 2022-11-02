"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const object_1 = require("@coffeekraken/sugar/object");
/**
 * @name            frontspec
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to access a sugar frontspecuration
 *
 * @param       {String}        dotPath            The frontspec dotpath
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function frontspec(dotPath = '') {
    const frontspec = new s_frontspec_1.default();
    const frontspecJson = frontspec.read();
    if (dotPath) {
        return (0, object_1.__get)(frontspecJson, dotPath);
    }
    return frontspecJson;
}
exports.default = frontspec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELHVEQUFtRDtBQUVuRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxTQUF3QixTQUFTLENBQUMsVUFBa0IsRUFBRTtJQUNsRCxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztJQUNyQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkMsSUFBSSxPQUFPLEVBQUU7UUFDVCxPQUFPLElBQUEsY0FBSyxFQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN4QztJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFQRCw0QkFPQyJ9