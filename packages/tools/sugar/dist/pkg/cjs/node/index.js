"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = __importDefault(require("./error/handleError"));
const exitCleanup_1 = __importDefault(require("./process/exitCleanup"));
const onProcessExit_1 = __importDefault(require("./process/onProcessExit"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// handle the errors
(0, handleError_1.default)();
// exit cleanup
(0, onProcessExit_1.default)(() => {
    return exitCleanup_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNFQUFnRDtBQUNoRCx3RUFBa0Q7QUFDbEQsNEVBQXNEO0FBQ3RELGtFQUFrRTtBQUVsRTs7Ozs7Ozs7OztHQVVHO0FBRUgsb0JBQW9CO0FBQ3BCLElBQUEscUJBQWEsR0FBRSxDQUFDO0FBRWhCLGVBQWU7QUFDZixJQUFBLHVCQUFlLEVBQUMsR0FBRyxFQUFFO0lBQ2pCLE9BQU8scUJBQWEsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyJ9