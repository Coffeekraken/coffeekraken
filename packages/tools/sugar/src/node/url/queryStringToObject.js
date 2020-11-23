"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ltrim_1 = __importDefault(require("../string/ltrim"));
/**
 * @name        queryStringToObject
 * @namespace           sugar.js.url
 * @type      Function
 *
 * Transform a query string into his object (key => pairs) representation
 *
 * @param 	{String}  	queryString  	The query string to process
 * @return 	{Object} 					The object representation of the query string
 *
 * @example    js
 * import queryStringToObject from '@coffeekraken/sugar/js/string/queryStringToObject'
 * queryStringToObject('?var1=value1&var2=value2') // { var1: 'value1', var2: 'value2' }
 *
 * @snippet     js
 * Sugar.js.url.queryStringToObject($1)
 *
 * @see  	http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function queryStringToObject(str) {
    str = ltrim_1.default(str, '?');
    str = decodeURIComponent(str);
    var chunks = str.split('&'), obj = {};
    chunks = chunks.filter((ch) => {
        return ch !== '';
    });
    for (var c = 0; c < chunks.length; c++) {
        var split = chunks[c].split('=', 2);
        obj[split[0]] = split[1];
    }
    return obj;
}
exports.default = queryStringToObject;
