"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const tcp_port_used_1 = __importDefault(require("tcp-port-used"));
/**
 * @name            isPortFree
 * @namespace            node.http
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function simply check if the passed port is free or not
 *
 * @param           {Number}            port            The port to check
 * @return          {Promise}                           A promise resolved with the result when the check has been done
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
 * await isPortFree(22000); // => true
 *
 * @see             https://www.npmjs.com/package/tcp-port-used
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function isPortFree(port) {
    return new Promise((resolve) => {
        tcp_port_used_1.default.check(port, '127.0.0.1').then(function (inUse) {
            resolve(!inUse);
        }, function () {
            resolve(false);
        });
    });
}
exports.default = isPortFree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLGtFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxVQUFVLENBQUMsSUFBSTtJQUNwQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDM0IsdUJBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDdkMsVUFBVSxLQUFLO1lBQ1gsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxFQUNEO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=