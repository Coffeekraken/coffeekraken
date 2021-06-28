// @ts-nocheck

import __isPlain from '../is/plainObject';
import __unquote from '../string/unquote';
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
  if (!Array.isArray(object) && !__isPlain(object)) return object;

  // decycle object
  object = __decycle(object);

  settings = {
    separator: '.',
    array: false,
    arrayWithDots: false,
    quoteSeparatedProperties: true,
    quoteCharacter: '"',
    excludeProps: [],
    keepLastIntact: false,
    ...settings
  };

  for (const key in object) {
    if (object[key] === undefined) continue;

    if (object[key] === null) {
      toReturn[key] = null;
      continue;
    }

    if (settings.excludeProps.indexOf(key) !== -1) {
      toReturn[key] = object[key];
      continue;
    }

    if (
      (Array.isArray(object[key]) && settings.array) ||
      (!Array.isArray(object[key]) && typeof object[key]) == 'object'
    ) {
      // if (object[key].__isFlattened === true) {
      //   toReturn[key] = object[key];
      //   continue;
      // }

      const isArray = Array.isArray(object[key]);

      const flatObject = flatten(object[key], {
        ...settings,
        keepLastIntact: false
      });
      // delete object[key].__isFlattened;

      for (const x in flatObject) {
        if (flatObject[x] === undefined) continue;

        // if (flatObject[x] && flatObject[x].__proto__)
        //   flatObject[x].__proto__.__isFlattened = true;

        if (isArray) {
          if (settings.arrayWithDots) {
            toReturn[`${key}.${x}`] = flatObject[x];
          } else {
            toReturn[`${key}[${x}]`] = flatObject[x];
          }
        } else {
          const part = key;
          if (
            settings.quoteSeparatedProperties &&
            part.includes(settings.separator)
          ) {
            toReturn[
              `${settings.quoteCharacter}${key}${settings.quoteCharacter}` +
                settings.separator +
                x
            ] = flatObject[x];
          } else {
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
