// @ts-nocheck

import __isPortFree from './isPortFree';

/**
 * @name            getFreePort
 * @namespace       sugar.node.http
 * @type            Function
 * @async
 * @beta
 *
 * This function simply returns you a free port.
 * You can pass a port to check as parameter and if it is free, you will get it back as result
 *
 * @param           {Number}        [port=null]         A port to challenge before starting generating random ones
 * @return          {Promise}                           A promise that will be resolved once a free port has been found
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import getFreePort from '@coffeekraken/sugar/node/network/getFreePort';
 * await getFreePort(); // => 22343
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function getFreePort(port = null) {
  return new Promise(async (resolve) => {
    if (!port) port = Math.round(Math.random() * 65535);
    let isFree = await __isPortFree(port);
    do {
      port = Math.round(Math.random() * 65535);
      isFree = await __isPortFree(port);
    } while (!isFree);
    resolve(port);
  });
}
export = getFreePort;