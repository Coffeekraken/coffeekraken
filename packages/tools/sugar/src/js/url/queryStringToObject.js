// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/ltrim"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ltrim_1 = __importDefault(require("../string/ltrim"));
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
        str = ltrim_1.default(str, '?');
        str = decodeURIComponent(str);
        var chunks = str.split('&');
        var obj = {};
        chunks = chunks.filter(function (ch) {
            return ch !== '';
        });
        for (var c = 0; c < chunks.length; c++) {
            var split = chunks[c].split('=', 2);
            obj[split[0]] = split[1];
        }
        return obj;
    }
    return queryStringToObject;
});
