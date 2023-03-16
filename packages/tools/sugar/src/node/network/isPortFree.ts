// @ts-nocheck
import __tcpPortUsed from 'tcp-port-used';

/**
 * @name            isPortFree
 * @namespace            node.network
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
 * @snippet         __isPortFree($1)
 * await __isPortFree($1)
 *
 * @example         js
 * import { __isPortFree } from '@coffeekraken/sugar/network';
 * await __isPortFree(22000); // => true
 *
 * @see             https://www.npmjs.com/package/tcp-port-used
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function __isPortFree(port) {
    return new Promise((resolve) => {
        __tcpPortUsed.check(port, '127.0.0.1').then(
            function (inUse) {
                resolve(!inUse);
            },
            function (e) {
                resolve(false);
            },
        );
    });
}
