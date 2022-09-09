"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("@coffeekraken/sugar/error");
const exitCleanup_1 = __importDefault(require("./process/exitCleanup"));
const onProcessExit_1 = __importDefault(require("./process/onProcessExit"));
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
(0, error_1.__handleErrors)();
// exit cleanup
(0, onProcessExit_1.default)(() => {
    return exitCleanup_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHFEQUEyRDtBQUMzRCx3RUFBa0Q7QUFDbEQsNEVBQXNEO0FBRXREOzs7Ozs7Ozs7O0dBVUc7QUFFSCxvQkFBb0I7QUFDcEIsSUFBQSxzQkFBYyxHQUFFLENBQUM7QUFFakIsZUFBZTtBQUNmLElBQUEsdUJBQWUsRUFBQyxHQUFHLEVBQUU7SUFDakIsT0FBTyxxQkFBYSxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIn0=