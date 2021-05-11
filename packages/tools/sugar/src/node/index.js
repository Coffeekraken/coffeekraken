"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
// new __SLog(__sugarConfig('log'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFJZCxzRUFBZ0Q7QUFDaEQsNkRBQXVDO0FBQ3ZDLDRFQUFzRDtBQUN0RCx3RUFBa0Q7QUFFbEQsa0VBQWtFO0FBRWxFOzs7Ozs7Ozs7O0dBVUc7QUFFSCxXQUFXO0FBQ1gsaUJBQVMsRUFBRSxDQUFDO0FBRVosb0JBQW9CO0FBQ3BCLHFCQUFhLEVBQUUsQ0FBQztBQUVoQixlQUFlO0FBQ2YsdUJBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDbkIsT0FBTyxxQkFBYSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLDRCQUE0QjtBQUU1QixVQUFVO0FBQ1Ysb0NBQW9DIn0=