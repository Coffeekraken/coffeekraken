// @ts-nocheck

import ltrim from '../string/ltrim.js';

/**
 * @name        queryStringToObject
 * @namespace            shared.url
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Transform a query string into his object (key => pairs) representation
 *
 * @param 	{String}  	queryString  	The query string to process
 * @return 	{Object} 					The object representation of the query string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __queryStringToObject($1)
 *
 * @example    js
 * import { __queryStringToObject } from '@coffeekraken/sugar/url'
 * __queryStringToObject('?var1=value1&var2=value2') // { var1: 'value1', var2: 'value2' }
 *
 * @see  	http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __queryStringToObject(str) {
    str = ltrim(str, '?');
    str = str.replace(/%20/gm, ' ');
    str = decodeURIComponent(str);
    let chunks = str.split('&');
    const obj = {};
    chunks = chunks.filter((ch) => {
        return ch !== '';
    });
    for (let c = 0; c < chunks.length; c++) {
        const split = chunks[c].split('=', 2);
        if (split[1] !== undefined) {
            obj[split[0]] = split[1];
        } else {
            obj[split[0]] = true;
        }
    }
    return obj;
}
