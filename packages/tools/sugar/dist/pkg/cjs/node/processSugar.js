"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("@coffeekraken/sugar/error");
const process_1 = require("@coffeekraken/sugar/process");
const process_2 = require("@coffeekraken/sugar/process");
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
(0, process_2.__onProcessExit)(() => {
    return process_1.__exitCleanup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLHFEQUEyRDtBQUMzRCx5REFBNEQ7QUFDNUQseURBQThEO0FBRTlEOzs7Ozs7Ozs7O0dBVUc7QUFFSCxvQkFBb0I7QUFDcEIsSUFBQSxzQkFBYyxHQUFFLENBQUM7QUFFakIsZUFBZTtBQUNmLElBQUEseUJBQWUsRUFBQyxHQUFHLEVBQUU7SUFDakIsT0FBTyx1QkFBYSxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIn0=