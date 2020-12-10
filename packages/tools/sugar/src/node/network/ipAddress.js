"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ip_1 = __importDefault(require("ip"));
/**
 * @name              ipAddress
 * @namespace         sugar.node.network
 * @type              Function
 * @beta
 *
 * This function allows you to get your ip address
 *
 * @return      {String}            The current ip address of your system
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import ipAddress from '@coffeekraken/sugar/node/network/ipAddress';
 * ipAddress(); // => 192.168.10.45
 *
 * @see             https://www.npmjs.com/package/ip
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function ipAddress() {
    return ip_1.default.address();
}
module.exports = ipAddress;
//# sourceMappingURL=module.js.map