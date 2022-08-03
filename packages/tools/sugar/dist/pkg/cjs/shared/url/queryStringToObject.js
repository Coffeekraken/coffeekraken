"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ltrim_1 = __importDefault(require("../string/ltrim"));
/**
 * @name        queryStringToObject
 * @namespace            js.url
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
 * @example    js
 * import queryStringToObject from '@coffeekraken/sugar/js/string/queryStringToObject'
 * queryStringToObject('?var1=value1&var2=value2') // { var1: 'value1', var2: 'value2' }
 *
 * @snippet     js
 * Sugar.js.url.queryStringToObject($1)
 *
 * @see  	http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function queryStringToObject(str) {
    str = (0, ltrim_1.default)(str, '?');
    str = str.replace(/%20/gm, ' ');
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
exports.default = queryStringToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxHQUFHO0lBQzVCLEdBQUcsR0FBRyxJQUFBLGVBQUssRUFBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNmLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDMUIsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGtCQUFlLG1CQUFtQixDQUFDIn0=