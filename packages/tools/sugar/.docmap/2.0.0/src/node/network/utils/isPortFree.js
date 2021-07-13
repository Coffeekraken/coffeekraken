/**
*
* @name            isPortFree
* @namespace            node.http
* @type            Function
* @async
* @platform        ts
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
* @see             https://stackoverflow.com/a/60897593
* @since       2.0.0
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/