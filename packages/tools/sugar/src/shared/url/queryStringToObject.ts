// @ts-nocheck

import ltrim from '../string/ltrim';

/**
 * @name        queryStringToObject
 * @namespace           sugar.js.url
 * @type      Function
 * @stable
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
 * @example    js
 * import queryStringToObject from '@coffeekraken/sugar/js/string/queryStringToObject'
 * queryStringToObject('?var1=value1&var2=value2') // { var1: 'value1', var2: 'value2' }
 *
 * @snippet     js
 * Sugar.js.url.queryStringToObject($1)
 *
 * @see  	http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function queryStringToObject(str) {
  str = ltrim(str, '?');
  str = decodeURIComponent(str);
  let chunks = str.split('&');
  const obj = {};
  chunks = chunks.filter((ch) => {
    return ch !== '';
  });
  for (let c = 0; c < chunks.length; c++) {
    const split = chunks[c].split('=', 2);
    obj[split[0]] = split[1];
  }
  return obj;
}
export default queryStringToObject;
