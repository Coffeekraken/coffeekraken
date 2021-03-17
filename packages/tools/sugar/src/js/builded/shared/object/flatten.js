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
        define(["require", "exports", "../is/plainObject", "../string/unquote", "./decycle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var unquote_1 = __importDefault(require("../string/unquote"));
    var decycle_1 = __importDefault(require("./decycle"));
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
        // make sure the passed object is not null, undefined
        if (!Array.isArray(object) && !plainObject_1.default(object))
            return object;
        // decycle object
        object = decycle_1.default(object);
        settings = __assign({ separator: '.', array: false, arrayWithDots: false, quoteSeparatedProperties: true, quoteCharacter: '"', excludeProps: [], keepLastIntact: false }, settings);
        for (var key in object) {
            if (object[key] === undefined)
                continue;
            if (object[key] === null) {
                toReturn[key] = null;
                continue;
            }
            if (settings.excludeProps.indexOf(key) !== -1) {
                toReturn[key] = object[key];
                continue;
            }
            if ((Array.isArray(object[key]) && settings.array) ||
                (!Array.isArray(object[key]) && typeof object[key]) == 'object') {
                // if (object[key].__isFlattened === true) {
                //   toReturn[key] = object[key];
                //   continue;
                // }
                var isArray = Array.isArray(object[key]);
                var flatObject = flatten(object[key], __assign(__assign({}, settings), { keepLastIntact: false }));
                // delete object[key].__isFlattened;
                for (var x in flatObject) {
                    if (flatObject[x] === undefined)
                        continue;
                    // if (flatObject[x] && flatObject[x].__proto__)
                    //   flatObject[x].__proto__.__isFlattened = true;
                    if (isArray) {
                        if (settings.arrayWithDots) {
                            toReturn[key + "." + x] = flatObject[x];
                        }
                        else {
                            toReturn[key + "[" + x + "]"] = flatObject[x];
                        }
                    }
                    else {
                        var part = key;
                        if (settings.quoteSeparatedProperties &&
                            part.includes(settings.separator)) {
                            toReturn["" + settings.quoteCharacter + key + settings.quoteCharacter +
                                settings.separator +
                                x] = flatObject[x];
                        }
                        else {
                            toReturn[key + settings.separator + x] = flatObject[x];
                        }
                    }
                }
                continue;
            }
            toReturn[key] = object[key];
        }
        // console.log('BE', toReturn);
        if (settings.keepLastIntact) {
            var returnWithLastIntact_1 = {};
            Object.keys(toReturn).forEach(function (path) {
                // split paths
                var a = path
                    .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
                    .map(function (p) { return unquote_1.default(p); });
                // single part path
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
                // if (propName === '__isFlattened') return;
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
            // console.log('LA', returnWithLastIntact);
            return returnWithLastIntact_1;
        }
        // console.log(toReturn);
        return toReturn;
    }
    // const obj1 = {},
    //   obj2 = {};
    // obj1.hello = 'hello world';
    // obj1.obj2 = obj2;
    // obj2.world = 'wodls';
    // obj2.obj1 = obj1;
    // console.log(
    //   flatten(
    //     {
    //       object1: obj1,
    //       object2: obj2,
    //       someting: {
    //         cool: 'hello'
    //       },
    //       popop: null,
    //       hello: {
    //         coo: null
    //       },
    //       coco: ['hello', 'world'],
    //       world: {
    //         'coco.plop': {
    //           yep: 'dsojiofj'
    //         }
    //       }
    //     },
    //     {
    //       keepLastIntact: true
    //     }
    //   )
    // );
    exports.default = flatten;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9vYmplY3QvZmxhdHRlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBMEM7SUFDMUMsOERBQTBDO0lBQzFDLHNEQUFrQztJQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNHO0lBQ0gsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDcEMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXBCLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsTUFBTSxDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUM7UUFFaEUsaUJBQWlCO1FBQ2pCLE1BQU0sR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNCLFFBQVEsY0FDTixTQUFTLEVBQUUsR0FBRyxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLEtBQUssRUFDcEIsd0JBQXdCLEVBQUUsSUFBSSxFQUM5QixjQUFjLEVBQUUsR0FBRyxFQUNuQixZQUFZLEVBQUUsRUFBRSxFQUNoQixjQUFjLEVBQUUsS0FBSyxJQUNsQixRQUFRLENBQ1osQ0FBQztRQUVGLEtBQUssSUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3hCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7Z0JBQUUsU0FBUztZQUV4QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLFNBQVM7YUFDVjtZQUVELElBQUksUUFBUSxDQUFDLFlBQVksQ0FB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