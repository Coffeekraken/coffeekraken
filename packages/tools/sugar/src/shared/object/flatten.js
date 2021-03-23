"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsb0VBQTBDO0FBRTFDLHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVwQixxREFBcUQ7SUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLE1BQU0sQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRWhFLGlCQUFpQjtJQUNqQixNQUFNLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUzQixRQUFRLG1CQUNOLFNBQVMsRUFBRSxHQUFHLEVBQ2QsS0FBSyxFQUFFLEtBQUssRUFDWixhQUFhLEVBQUUsS0FBSyxFQUNwQix3QkFBd0IsRUFBRSxJQUFJLEVBQzlCLGNBQWMsRUFBRSxHQUFHLEVBQ25CLFlBQVksRUFBRSxFQUFFLEVBQ2hCLGNBQWMsRUFBRSxLQUFLLElBQ2xCLFFBQVEsQ0FDWixDQUFDO0lBRUYsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7UUFDeEIsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztZQUFFLFNBQVM7UUFFeEMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3hCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDckIsU0FBUztTQUNWO1FBRUQsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM3QyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFD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