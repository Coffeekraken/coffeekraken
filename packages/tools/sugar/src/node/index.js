"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("./config/sugar"));
const SLog_1 = __importDefault(require("./log/SLog"));
const handleError_1 = __importDefault(require("./error/handleError"));
const initEnv_1 = __importDefault(require("./init/initEnv"));
const onProcessExit_1 = __importDefault(require("./process/onProcessExit"));
const exitCleanup_1 = __importDefault(require("./process/exitCleanup"));
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
// handle the errors
handleError_1.default();
// exit cleanup
onProcessExit_1.default(() => {
    return exitCleanup_1.default;
});
// SFile classes
registerSFileClasses_1.default();
// Logging
new SLog_1.default(sugar_1.default('log'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwyREFBMkM7QUFDM0Msc0RBQWdDO0FBQ2hDLHNFQUFnRDtBQUNoRCw2REFBdUM7QUFDdkMsNEVBQXNEO0FBQ3RELHdFQUFrRDtBQUNsRCxxRkFBK0Q7QUFFL0Q7Ozs7Ozs7Ozs7R0FVRztBQUVILFdBQVc7QUFDWCxpQkFBUyxFQUFFLENBQUM7QUFFWixvQkFBb0I7QUFDcEIscUJBQWEsRUFBRSxDQUFDO0FBRWhCLGVBQWU7QUFDZix1QkFBZSxDQUFDLEdBQUcsRUFBRTtJQUNuQixPQUFPLHFCQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxnQkFBZ0I7QUFDaEIsOEJBQXNCLEVBQUUsQ0FBQztBQUV6QixVQUFVO0FBQ1YsSUFBSSxjQUFNLENBQUMsZUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMifQ==