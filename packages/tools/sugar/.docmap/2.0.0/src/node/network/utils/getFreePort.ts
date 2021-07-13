/**
*
* @name            getFreePort
* @namespace            node.http
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply returns you a free port.
* You can pass a port to check as parameter and if it is free, you will get it back as result
*
* @param           {Number}        [port=null]         A port to challenge before starting generating random ones
* @return          {Promise}                           A promise that will be resolved once a free port has been found
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import getFreePort from '@coffeekraken/sugar/node/network/utils/getFreePort';
* await getFreePort(); // => 22343
*
* @since           2.0.0
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/