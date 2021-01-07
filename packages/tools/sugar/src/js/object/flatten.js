// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
    var unquote_1 = __importDefault(require("../string/unquote"));
    /**
     * @name                              flatten
     * @namespace           sugar.js.object
     * @type                              Function
     * @stable
     *
     * Transform the passed multiple level object into a single level one
     *
     * @param               {Object}                          object                    The object to flatten
     * @param               {Object}                          [settings={}]             An object of settings to configure your flatten process
     * @return              {Object}                                                    The flatten object
     *
     * @setting               {String}            [separation="."]          The separation character to use for preperty names
     * @setting 							{Boolean}			    	[array=false] 		Specify if you want to flatten array or not
     * @setting               {Boolean}          [arrayWithDots=false]     Specify if you want to flatten array using the "something.0" syntax instead of the default one "something[0]"
     * @setting               {Boolean}          [quoteSeparatedProperties=true]      Specify if you want to quote dotted properties to be able to restore them correctly later
     * @setting               {String}        [quoteCharacter='"']        Specify the quote character to use when need to quote separated properties
     * @setting               {Boolean}       [keepLastIntact=false]       Specify if you want to keep the last level (object, array) intact and not to flatten each properties
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import flatten from '@coffeekraken/sugar/js/object/flatten';
     * flatten({
     *    hello: {
     *      world: 'Coco'
     *    }
     * });
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function flatten(object, settings) {
        if (settings === void 0) { settings = {}; }
        var toReturn = {};
        settings = __assign({ separator: '.', array: false, arrayWithDots: false, quoteSeparatedProperties: true, quoteCharacter: '"', keepLastIntact: false }, settings);
        for (var i in object) {
            if (object[i] === undefined)
                continue;
            if (object[i] === null) {
                toReturn[i] = null;
            }
            else if ((Array.isArray(object[i]) && settings.array) ||
                (!Array.isArray(object[i]) && typeof object[i]) == 'object') {
                var isArray = Array.isArray(object[i]);
                var flatObject = flatten(object[i], __assign(__assign({}, settings), { keepLastIntact: false }));
                for (var x in flatObject) {
                    if (flatObject[x] === undefined)
                        continue;
                    if (isArray) {
                        if (settings.arrayWithDots) {
                            toReturn[i + "." + x] = flatObject[x];
                        }
                        else {
                            toReturn[i + "[" + x + "]"] = flatObject[x];
                        }
                    }
                    else {
                        var part = i;
                        if (settings.quoteSeparatedProperties &&
                            part.includes(settings.separator)) {
                            toReturn["" + settings.quoteCharacter + i + settings.quoteCharacter +
                                settings.separator +
                                x] = flatObject[x];
                        }
                        else {
                            toReturn[i + settings.separator + x] = flatObject[x];
                        }
                    }
                }
            }
            else {
                toReturn[i] = object[i];
            }
        }
        if (settings.keepLastIntact) {
            var returnWithLastIntact_1 = {};
            Object.keys(toReturn).forEach(function (path) {
                // split paths
                var a = path
                    .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
                    .map(function (p) { return unquote_1.default(p); });
                if (a.length <= 1)
                    return (returnWithLastIntact_1[a.join(settings.separator)] =
                        toReturn[path]);
                var propName = a.slice(-1)[0];
                var p = a
                    .slice(0, -1)
                    .map(function (t) {
                    if (t.includes(settings.separator))
                        return "" + settings.quoteCharacter + t + settings.quoteCharacter;
                    return t;
                })
                    .join(settings.separator);
                p = unquote_1.default(p);
                if (propName.match(/\[[0-9]+\]$/gm)) {
                    p = p += "" + settings.separator + propName.split('[')[0];
                    if (returnWithLastIntact_1[p] === undefined)
                        returnWithLastIntact_1[p] = [];
                    returnWithLastIntact_1[p].push(toReturn[path]);
                }
                else {
                    if (returnWithLastIntact_1[p] === undefined)
                        returnWithLastIntact_1[p] = {};
                    returnWithLastIntact_1[p][propName] = toReturn[path];
                }
            });
            return returnWithLastIntact_1;
        }
        return toReturn;
    }
    return flatten;
});
//# sourceMappingURL=flatten.js.map