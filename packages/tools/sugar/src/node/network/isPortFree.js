"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            isPortFree
 * @namespace       sugar.node.http
 * @type            Function
 * @async
 *
 * This function simply check if the passed port is free or not
 *
 * @param           {Number}            port            The port to check
 * @return          {Promise}                           A promise resolved with the result when the check has been done
 *
 * @example         js
 * import isPortFree from '@coffeekraken/sugar/node/http/isPortFree';
 * await isPortFree(22000); // => true
 *
 * @see             https://stackoverflow.com/a/60897593
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function isPortFree(port) {
    return new Promise((resolve) => {
        const server = require('http')
            .createServer()
            .listen(port, () => {
            server.close();
            resolve(true);
        })
            .on('error', () => {
            resolve(false);
        });
    });
}
exports.default = isPortFree;
