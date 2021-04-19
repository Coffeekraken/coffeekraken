"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const SLog_1 = __importDefault(require("../shared/log/SLog"));
const initEnv_1 = __importDefault(require("./init/initEnv"));
const registerSFileClasses_1 = __importDefault(require("./fs/registerSFileClasses"));
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
// // handle the errors
// __handleError();
// // exit cleanup
// __onProcessExit(() => {
//   return __exitCleanup;
// });
// SFile classes
registerSFileClasses_1.default();
// Logging
new SLog_1.default(s_sugar_config_1.default('log'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRkFBeUQ7QUFDekQsOERBQXdDO0FBRXhDLDZEQUF1QztBQUd2QyxxRkFBK0Q7QUFFL0Q7Ozs7Ozs7Ozs7R0FVRztBQUVILFdBQVc7QUFDWCxpQkFBUyxFQUFFLENBQUM7QUFFWix1QkFBdUI7QUFDdkIsbUJBQW1CO0FBRW5CLGtCQUFrQjtBQUNsQiwwQkFBMEI7QUFDMUIsMEJBQTBCO0FBQzFCLE1BQU07QUFFTixnQkFBZ0I7QUFDaEIsOEJBQXNCLEVBQUUsQ0FBQztBQUV6QixVQUFVO0FBQ1YsSUFBSSxjQUFNLENBQUMsd0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDIn0=