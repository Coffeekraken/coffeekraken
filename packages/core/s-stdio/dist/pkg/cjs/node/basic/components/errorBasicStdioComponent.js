"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("@coffeekraken/sugar/console");
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name        errorBasicStdioComponent
 * @namespace   shared.basic.components
 * @type        ISStdioComponent
 *
 * Basic stdio error component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    id: 'error',
    render(logObj, settings = {}) {
        const value = logObj.value !== undefined ? logObj.value : logObj;
        return `⚠️  ${(0, console_1.__parseHtml)((0, string_1.__toString)(value))}`;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQTBEO0FBQzFELHVEQUF3RDtBQUV4RDs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNYLEVBQUUsRUFBRSxPQUFPO0lBQ1gsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN4QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2pFLE9BQU8sT0FBTyxJQUFBLHFCQUFXLEVBQUMsSUFBQSxtQkFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0NBQ0osQ0FBQyJ9