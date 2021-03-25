// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/plainObject", "./decycle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const plainObject_1 = __importDefault(require("../is/plainObject"));
    const decycle_1 = __importDefault(require("./decycle"));
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
    function flatten(object, settings = {}) {
        const toReturn = {};
        // make sure the passed object is not null, undefined
        if (!Array.isArray(object) && !plainObject_1.default(object))
            return object;
        // decycle object
        object = decycle_1.default(object);
        settings = Object.assign({ separator: '.', array: false, arrayWithDots: false, quoteSeparatedProperties: true, quoteCharacter: '"', excludeProps: [], keepLastIntact: false }, settings);
        for (const key in object) {
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
                const isArray = Array.isArray(object[key]);
                const flatObject = flatten(object[key], Object.assign(Object.assign({}, settings), { keepLastIntact: false }));
                // delete object[key].__isFlattened;
                for (const x in flatObject) {
                    if (flatObject[x] === undefined)
                        continue;
                    // if (flatObject[x] && flatObject[x].__proto__)
                    //   flatObject[x].__proto__.__isFlattened = true;
                    if (isArray) {
                        if (settings.arrayWithDots) {
                            toReturn[`${key}.${x}`] = flatObject[x];
                        }
                        else {
                            toReturn[`${key}[${x}]`] = flatObject[x];
                        }
                    }
                    else {
                        const part = key;
                        if (settings.quoteSeparatedProperties &&
                            part.includes(settings.separator)) {
                            toReturn[`${settings.quoteCharacter}${key}${settings.quoteCharacter}` +
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
        // if (settings.keepLastIntact) {
        //   const returnWithLastIntact = {};
        //   Object.keys(toReturn).forEach((path) => {
        //     // split paths
        //     const a = path
        //       .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
        //       .map((p) => __unquote(p));
        //     // single part path
        //     if (a.length <= 1)
        //       return (returnWithLastIntact[a.join(settings.separator)] =
        //         toReturn[path]);
        //     const propName = a.slice(-1)[0];
        //     let p = a
        //       .slice(0, -1)
        //       .map((t) => {
        //         if (t.includes(settings.separator))
        //           return `${settings.quoteCharacter}${t}${settings.quoteCharacter}`;
        //         return t;
        //       })
        //       .join(settings.separator);
        //     p = __unquote(p);
        //     // if (propName === '__isFlattened') return;
        //     if (propName.match(/\[[0-9]+\]$/gm)) {
        //       p = p += `${settings.separator}${propName.split('[')[0]}`;
        //       if (returnWithLastIntact[p] === undefined) returnWithLastIntact[p] = [];
        //       returnWithLastIntact[p].push(toReturn[path]);
        //     } else {
        //       if (returnWithLastIntact[p] === undefined) returnWithLastIntact[p] = {};
        //       returnWithLastIntact[p][propName] = toReturn[path];
        //     }
        //   });
        //   // console.log('LA', returnWithLastIntact);
        //   return returnWithLastIntact;
        // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0VBQTBDO0lBRTFDLHdEQUFrQztJQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNHO0lBQ0gsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVwQixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLE1BQU0sQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDO1FBRWhFLGlCQUFpQjtRQUNqQixNQUFNLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzQixRQUFRLG1CQUNOLFNBQVMsRUFBRSxHQUFHLEVBQ2QsS0FBSyxFQUFFLEtBQUssRUFDWixhQUFhLEVBQUUsS0FBSyxFQUNwQix3QkFBd0IsRUFBRSxJQUFJLEVBQzlCLGNBQWMsRUFBRSxHQUFHLEVBQ25CLFlBQVksRUFBRSxFQUFFLEVBQ2hCLGNBQWMsRUFBRSxLQUFLLElBQ2xCLFFBQVEsQ0FDWixDQUFDO1FBRUYsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDeEIsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztnQkFBRSxTQUFTO1lBRXhDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDeEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDckIsU0FBUzthQUNWO1lBRUQsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDN0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsU0FBUzthQUNWO1lBRUQsSUFDRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQy9EO2dCQUNBLDRDQUE0QztnQkFDNUMsaUNBQWlDO2dCQUNqQyxjQUFjO2dCQUNkLElBQUk7Z0JBRUosTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFM0MsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0NBQ2pDLFFBQVEsS0FDWCxjQUFjLEVBQUUsS0FBSyxJQUNyQixDQUFDO2dCQUNILG9DQUFvQztnQkFFcEMsS0FBSyxNQUFNLENBQUMsSUFBSSxVQUFVLEVBQUU7b0JBQzFCLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVM7d0JBQUUsU0FBUztvQkFFMUMsZ0RBQWdEO29CQUNoRCxrREFBa0Q7b0JBRWxELElBQUksT0FBTyxFQUFFO3dCQUNYLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTs0QkFDMUIsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN6Qzs2QkFBTTs0QkFDTCxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFDO3FCQUNGO3lCQUFNO3dCQUNMLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQzt3QkFDakIsSUFDRSxRQUFRLENBQUMsd0JBQXdCOzRCQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDakM7NEJBQ0EsUUFBUSxDQUNOLEdBQUcsUUFBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRTtnQ0FDMUQsUUFBUSxDQUFDLFNBQVM7Z0NBQ2xCLENBQUMsQ0FDSixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDbkI7NkJBQU07NEJBQ0wsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDeEQ7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsU0FBUzthQUNWO1lBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUVELCtCQUErQjtRQUUvQixpQ0FBaUM7UUFDakMscUNBQXFDO1FBQ3JDLDhDQUE4QztRQUM5QyxxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLCtDQUErQztRQUMvQyxtQ0FBbUM7UUFFbkMsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QixtRUFBbUU7UUFDbkUsMkJBQTJCO1FBRTNCLHVDQUF1QztRQUN2QyxnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qiw4Q0FBOEM7UUFDOUMsK0VBQStFO1FBQy9FLG9CQUFvQjtRQUNwQixXQUFXO1FBQ1gsbUNBQW1DO1FBQ25DLHdCQUF3QjtRQUV4QixtREFBbUQ7UUFFbkQsNkNBQTZDO1FBQzdDLG1FQUFtRTtRQUNuRSxpRkFBaUY7UUFDakYsc0RBQXNEO1FBQ3RELGVBQWU7UUFDZixpRkFBaUY7UUFDakYsNERBQTREO1FBQzVELFFBQVE7UUFDUixRQUFRO1FBQ1IsZ0RBQWdEO1FBRWhELGlDQUFpQztRQUNqQyxJQUFJO1FBRUoseUJBQXlCO1FBRXpCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxtQkFBbUI7SUFDbkIsZUFBZTtJQUVmLDhCQUE4QjtJQUM5QixvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLG9CQUFvQjtJQUVwQixlQUFlO0lBQ2YsYUFBYTtJQUNiLFFBQVE7SUFDUix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLG9CQUFvQjtJQUNwQix3QkFBd0I7SUFDeEIsV0FBVztJQUNYLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLFdBQVc7SUFDWCxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6Qiw0QkFBNEI7SUFDNUIsWUFBWTtJQUNaLFVBQVU7SUFDVixTQUFTO0lBQ1QsUUFBUTtJQUNSLDZCQUE2QjtJQUM3QixRQUFRO0lBQ1IsTUFBTTtJQUNOLEtBQUs7SUFFTCxrQkFBZSxPQUFPLENBQUMifQ==