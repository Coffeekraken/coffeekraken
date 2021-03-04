"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../../../string/toString"));
/**
 * @name                default
 * @namespace           sugar.js.interface.renderers.terminal
 * @default                Function
 *
 * Render the "default" field.
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1({ value, interfaceClass }) {
    return `<green>${toString_1.default(value, {})}</green>`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBRVYsd0VBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILG1CQUF5QixFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDaEQsT0FBTyxVQUFVLGtCQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFDbkQsQ0FBQztBQUZELDRCQUVDIn0=