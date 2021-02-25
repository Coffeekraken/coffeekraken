// @ts-nocheck
// @shared
import __isPlain from '../is/plainObject';
import __unquote from '../string/unquote';
import __decycle from './decycle';
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
    if (!Array.isArray(object) && !__isPlain(object))
        return object;
    // decycle object
    object = __decycle(object);
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
                .map((p) => __unquote(p));
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
            p = __unquote(p);
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
export default flatten;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNwQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIscURBQXFEO0lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRWhFLGlCQUFpQjtJQUNqQixNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTNCLFFBQVEsbUJBQ04sU0FBUyxFQUFFLEdBQUcsRUFDZCxLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxLQUFLLEVBQ3BCLHdCQUF3QixFQUFFLElBQUksRUFDOUIsY0FBYyxFQUFFLEdBQUcsRUFDbkIsWUFBWSxFQUFFLEVBQUUsRUFDaEIsY0FBYyxFQUFFLEtBQUssSUFDbEIsUUFBUSxDQUNaLENBQUM7SUFFRixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtRQUN4QixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQUUsU0FBUztRQUV4QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDeEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNyQixTQUFTO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxD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