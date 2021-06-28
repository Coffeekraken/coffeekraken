// @ts-nocheck

import __ip from 'ip';

/**
 * @name              ipAddress
 * @namespace            node.network
 * @type              Function
 * @platform        ts
 * @platform        node
 * @status          beta
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
 * import ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
 * ipAddress(); // => 192.168.10.45
 *
 * @see             https://www.npmjs.com/package/ip
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function ipAddress() {
  return __ip.address();
}
export default ipAddress;
