// @ts-nocheck

/**
 * @name              publicIpAddress
 * @namespace            node.network
 * @type              Function
 * @platform        node
 * @status          stable
 * @async
 *
 * This function allows you to get your public ip address
 *
 * @param       {Boolean}           [v6=false]          Specify if you want the ipv6 instead of the ipv4
 * @return      {String}            Your public ip address
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __publicIpAddress()
 * await __publicIpAddress()
 *
 * @example           js
 * import { __publicIpAddress } from '@coffeekraken/sugar/network';
 * await __publicIpAddress(); // => 243.334.12.98
 *
 * @see             https://github.com/sindresorhus/public-ip
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export default async function __publicIpAddress(v6 = false): string {
    let url = 'https://api.ipify.org';
    if (v6) {
        url = 'https://api64.ipify.org';
    }
    const response = await fetch(url);
    const ip = await response.text();
    return ip;
}
