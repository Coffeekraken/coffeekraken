"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("../is/plainObject"));
const unquote_1 = __importDefault(require("../string/unquote"));
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
                    let part = key;
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
    if (settings.keepLastIntact) {
        const returnWithLastIntact = {};
        Object.keys(toReturn).forEach((path) => {
            // split paths
            const a = path
                .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
                .map((p) => unquote_1.default(p));
            // single part path
            if (a.length <= 1)
                return (returnWithLastIntact[a.join(settings.separator)] =
                    toReturn[path]);
            let propName = a.slice(-1)[0];
            let p = a
                .slice(0, -1)
                .map((t) => {
                if (t.includes(settings.separator))
                    return `${settings.quoteCharacter}${t}${settings.quoteCharacter}`;
                return t;
            })
                .join(settings.separator);
            p = unquote_1.default(p);
            // if (propName === '__isFlattened') return;
            if (propName.match(/\[[0-9]+\]$/gm)) {
                p = p += `${settings.separator}${propName.split('[')[0]}`;
                if (returnWithLastIntact[p] === undefined)
                    returnWithLastIntact[p] = [];
                returnWithLastIntact[p].push(toReturn[path]);
            }
            else {
                if (returnWithLastIntact[p] === undefined)
                    returnWithLastIntact[p] = {};
                returnWithLastIntact[p][propName] = toReturn[path];
            }
        });
        // console.log('LA', returnWithLastIntact);
        return returnWithLastIntact;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLG9FQUEwQztBQUMxQyxnRUFBMEM7QUFDMUMsd0RBQWtDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLHFEQUFxRDtJQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFaEUsaUJBQWlCO0lBQ2pCLE1BQU0sR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTNCLFFBQVEsbUJBQ04sU0FBUyxFQUFFLEdBQUcsRUFDZCxLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxLQUFLLEVBQ3BCLHdCQUF3QixFQUFFLElBQUksRUFDOUIsY0FBYyxFQUFFLEdBQUcsRUFDbkIsWUFBWSxFQUFFLEVBQUUsRUFDaEIsY0FBYyxFQUFFLEtBQUssSUFDbEIsUUFBUSxDQUNaLENBQUM7SUFFRixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtRQUN4QixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQUUsU0FBUztRQUV4QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDeEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNyQixTQUFTO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzdDLFFBQVEsQ0FBQyxH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