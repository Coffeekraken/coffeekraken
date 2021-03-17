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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L2ZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQTBDO0lBQzFDLDhEQUEwQztJQUMxQyxzREFBa0M7SUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ3BDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVwQixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLE1BQU0sQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDO1FBRWhFLGlCQUFpQjtRQUNqQixNQUFNLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzQixRQUFRLGNBQ04sU0FBUyxFQUFFLEdBQUcsRUFDZCxLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxLQUFLLEVBQ3BCLHdCQUF3QixFQUFFLElBQUksRUFDOUIsY0FBYyxFQUFFLEdBQUcsRUFDbkIsWUFBWSxFQUFFLEVBQUUsRUFDaEIsY0FBYyxFQUFFLEtBQUssSUFDbEIsUUFBUSxDQUNaLENBQUM7UUFFRixLQUFLLElBQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN4QixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO2dCQUFFLFNBQVM7WUFFeEMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN4QixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixTQUFTO2FBQ1Y7WUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM3QyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixTQUFTO2FBQ1Y7WUFFRCxJQUNFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUM5QyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFDL0Q7Z0JBQ0EsNENBQTRDO2dCQUM1QyxpQ0FBaUM7Z0JBQ2pDLGNBQWM7Z0JBQ2QsSUFBSTtnQkFFSixJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUUzQyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFDakMsUUFBUSxLQUNYLGNBQWMsRUFBRSxLQUFLLElBQ3JCLENBQUM7Z0JBQ0gsb0NBQW9DO2dCQUVwQyxLQUFLLElBQU0sQ0FBQyxJQUFJLFVBQVUsRUFBRTtvQkFDMUIsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUzt3QkFBRSxTQUFTO29CQUUxQyxnREFBZ0Q7b0JBQ2hELGtEQUFrRDtvQkFFbEQsSUFBSSxPQUFPLEVBQUU7d0JBQ1gsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFOzRCQUMxQixRQUFRLENBQUksR0FBRyxTQUFJLENBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDekM7NkJBQU07NEJBQ0wsUUFBUSxDQUFJLEdBQUcsU0FBSSxDQUFDLE1BQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDMUM7cUJBQ0Y7eUJBQU07d0JBQ0wsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNmLElBQ0UsUUFBUSxDQUFDLHdCQUF3Qjs0QkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ2pDOzRCQUNBLFFBQVEsQ0FDTixLQUFHLFFBQVEsQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFnQjtnQ0FDMUQsUUFBUSxDQUFDLFNBQVM7Z0NBQ2xCLENBQUMsQ0FDSixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDbkI7NkJBQU07NEJBQ0wsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDeEQ7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsU0FBUzthQUNWO1lBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUVELCtCQUErQjtRQUUvQixJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDM0IsSUFBTSxzQkFBb0IsR0FBRyxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUNqQyxjQUFjO2dCQUNkLElBQU0sQ0FBQyxHQUFHLElBQUk7cUJBQ1gsS0FBSyxDQUFDLDhCQUE4QixDQUFDO3FCQUNyQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxpQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO2dCQUU1QixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxzQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXBCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQztxQkFDTixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNaLEdBQUcsQ0FBQyxVQUFDLENBQUM7b0JBQ0wsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7d0JBQ2hDLE9BQU8sS0FBRyxRQUFRLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBZ0IsQ0FBQztvQkFDcEUsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLENBQUMsR0FBRyxpQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVqQiw0Q0FBNEM7Z0JBRTVDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDbkMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUcsQ0FBQztvQkFDMUQsSUFBSSxzQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTO3dCQUFFLHNCQUFvQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDeEUsc0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDTCxJQUFJLHNCQUFvQixDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVM7d0JBQUUsc0JBQW9CLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN4RSxzQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3BEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCwyQ0FBMkM7WUFFM0MsT0FBTyxzQkFBb0IsQ0FBQztTQUM3QjtRQUVELHlCQUF5QjtRQUV6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsbUJBQW1CO0lBQ25CLGVBQWU7SUFFZiw4QkFBOEI7SUFDOUIsb0JBQW9CO0lBQ3BCLHdCQUF3QjtJQUN4QixvQkFBb0I7SUFFcEIsZUFBZTtJQUNmLGFBQWE7SUFDYixRQUFRO0lBQ1IsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLFdBQVc7SUFDWCxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQixXQUFXO0lBQ1gsa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLFlBQVk7SUFDWixVQUFVO0lBQ1YsU0FBUztJQUNULFFBQVE7SUFDUiw2QkFBNkI7SUFDN0IsUUFBUTtJQUNSLE1BQU07SUFDTixLQUFLO0lBRUwsa0JBQWUsT0FBTyxDQUFDIn0=