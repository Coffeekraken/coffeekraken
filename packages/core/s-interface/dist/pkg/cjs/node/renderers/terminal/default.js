"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ value, interfaceClass }) {
    return `<green>${(0, toString_1.default)(value, {})}</green>`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEZBQW9FO0FBRXBFOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILG1CQUF5QixFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDaEQsT0FBTyxVQUFVLElBQUEsa0JBQVUsRUFBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuRCxDQUFDO0FBRkQsNEJBRUMifQ==