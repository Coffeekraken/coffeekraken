"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
/**
 * @name            globalNodeModulesPath
 * @namespace       node.npm
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function returns you the path to the global node modules folder
 *
 * @return      {String}            The path to the global node modules folder
 *
 * @example         js
 * import globalNodeModulesPath from '@coffeekraken/sugar/node/npm/globalNodeModulesPath';
 * globalNodeModulesPath();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1() {
    return child_process_1.default
        .execSync(`npm root --global`, {
        stdio: 'pipe',
    })
        .toString()
        .trim()
        .split('\n')
        .slice(-1)[0];
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSDtJQUNJLE9BQU8sdUJBQWM7U0FDaEIsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzNCLEtBQUssRUFBRSxNQUFNO0tBQ2hCLENBQUM7U0FDRCxRQUFRLEVBQUU7U0FDVixJQUFJLEVBQUU7U0FDTixLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQVRELDRCQVNDIn0=