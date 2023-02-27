"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("@coffeekraken/sugar/error");
const process_1 = require("@coffeekraken/sugar/process");
/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Display errors
 * - Process exit cleanup
 *
 * @snippet         __processSugar()
 *
 * @example         js
 * import { __processSugar } from '@coffeekraken/sugar/process';
 * __processSugar();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __processSugar() {
    // handle the errors
    (0, error_1.__handleErrors)();
    // exit cleanup
    (0, process_1.__onProcessExit)(() => {
        return process_1.__exitCleanup;
    });
}
exports.default = __processSugar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLHFEQUEyRDtBQUMzRCx5REFBNkU7QUFFN0U7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBd0IsY0FBYztJQUNsQyxvQkFBb0I7SUFDcEIsSUFBQSxzQkFBYyxHQUFFLENBQUM7SUFFakIsZUFBZTtJQUNmLElBQUEseUJBQWUsRUFBQyxHQUFHLEVBQUU7UUFDakIsT0FBTyx1QkFBYSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELGlDQVFDIn0=