"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const handleError_1 = __importDefault(require("./error/handleError"));
const initEnv_1 = __importDefault(require("./init/initEnv"));
const onProcessExit_1 = __importDefault(require("./process/onProcessExit"));
const exitCleanup_1 = __importDefault(require("./process/exitCleanup"));
// import __registerSFileClasses from './fs/registerSFileClasses';
/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Logging: Get the powerfull options of the SLog class without any change in your codebase
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// init env
initEnv_1.default();
// handle the errors
handleError_1.default();
// exit cleanup
onProcessExit_1.default(() => {
    return exitCleanup_1.default;
});
// SFile classes
// __registerSFileClasses();
// Logging
new s_log_1.default(s_sugar_config_1.default('log'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRkFBeUQ7QUFDekQsZ0VBQXlDO0FBQ3pDLHNFQUFnRDtBQUNoRCw2REFBdUM7QUFDdkMsNEVBQXNEO0FBQ3RELHdFQUFrRDtBQUVsRCxrRUFBa0U7QUFFbEU7Ozs7Ozs7Ozs7R0FVRztBQUVILFdBQVc7QUFDWCxpQkFBUyxFQUFFLENBQUM7QUFFWixvQkFBb0I7QUFDcEIscUJBQWEsRUFBRSxDQUFDO0FBRWhCLGVBQWU7QUFDZix1QkFBZSxDQUFDLEdBQUcsRUFBRTtJQUNuQixPQUFPLHFCQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxnQkFBZ0I7QUFDaEIsNEJBQTRCO0FBRTVCLFVBQVU7QUFDVixJQUFJLGVBQU0sQ0FBQyx3QkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMifQ==