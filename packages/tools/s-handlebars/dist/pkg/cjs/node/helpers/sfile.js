"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
/**
 * @name            sfile
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get an SFile instance back from the passed file path
 *
 * @param       {String}        path                The path of the file
 * @return      {SFile}                         The SFile instance
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function sfile(path) {
    return s_file_1.default.new(path);
}
exports.default = sfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLEtBQUssQ0FBQyxJQUFJO0lBQzlCLE9BQU8sZ0JBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUZELHdCQUVDIn0=