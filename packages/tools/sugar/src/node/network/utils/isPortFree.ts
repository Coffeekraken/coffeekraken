// @ts-nocheck

import server from 'http';

/**
 * @name            isPortFree
 * @namespace       sugar.node.http
 * @type            Function
 * @async
 * @status              beta
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
 * @see             https://stackoverflow.com/a/60897593
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function isPortFree(port) {
  return new Promise(async (resolve) => {
    server
      .createServer()
      .listen(port, () => {
        try {
          server.close();
        } catch (e) {}
        resolve(true);
      })
      .on('error', () => {
        resolve(false);
      });
  });
}
export default isPortFree;
