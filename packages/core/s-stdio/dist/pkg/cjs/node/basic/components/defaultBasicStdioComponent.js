"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
/**
 * @name        defaultBasicStdioComponent
 * @namespace   shared.basic.components
 * @type        ISStdioComponent
 *
 * Basic stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    id: 'default',
    render(logObj, settings = {}) {
        const value = logObj.value !== undefined ? logObj.value : logObj;
        return (0, parseHtml_1.default)((0, toString_1.default)(value));
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkZBQXVFO0FBQ3ZFLDBGQUFvRTtBQUVwRTs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNYLEVBQUUsRUFBRSxTQUFTO0lBQ2IsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN4QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2pFLE9BQU8sSUFBQSxtQkFBVyxFQUFDLElBQUEsa0JBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDSixDQUFDIn0=