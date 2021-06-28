// @ts-nocheck
import __isPlain from '../is/plainObject';
import __decycle from './decycle';
/**
 * @name                              flatten
 * @namespace            js.object
 * @type                              Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
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
export default flatten;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBQ0gsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVwQixxREFBcUQ7SUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFaEUsaUJBQWlCO0lBQ2pCLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFM0IsUUFBUSxtQkFDTixTQUFTLEVBQUUsR0FBRyxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLEtBQUssRUFDcEIsd0JBQXdCLEVBQUUsSUFBSSxFQUM5QixjQUFjLEVBQUUsR0FBRyxFQUNuQixZQUFZLEVBQUUsRUFBRSxFQUNoQixjQUFjLEVBQUUsS0FBSyxJQUNsQixRQUFRLENBQ1osQ0FBQztJQUVGLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1FBQ3hCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7WUFBRSxTQUFTO1FBRXhDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN4QixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLFNBQVM7U0FDVjtRQUVELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0Ms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