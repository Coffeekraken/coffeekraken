// @ts-nocheck

import __minimatch from 'minimatch';
import __deepize from './deepize';
import __flatten from './flatten';

/**
 * @name                          getGlob
 * @namespace            shared.object
 * @type                          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue".
 * It support glob patterns like "something.*.id" and returns you a new object containing
 * all values with the path that matches the passed glob pattern.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @param               {Object}            [settings={}]           A settings object to configure your glob get process
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @setting         {Boolean}               [deepize=true]          Specify if you want the result object to be deepized using the ```deepize``` sugar function
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import get from '@coffeekraken/sugar/js/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function getGlob(obj, glob, settings = {}) {
    settings = {
        deepize: true,
        ...settings,
    };

    const flat = __flatten(obj);

    const resultObj = {};

    Object.keys(flat).forEach((path) => {
        if (__minimatch(path, glob)) {
            resultObj[path] = flat[path];
        }
    });

    // if (glob === 'watch') {
    //   console.log('GLOB', resultObj);
    // }

    if (settings.deepize === true) return __deepize(resultObj);
    return resultObj;
}

// console.log(
//   getGlob(
//     {
//       someting: {
//         cool: 'hello'
//       },
//       coco: ['hello', 'world'],
//       world: {
//         'coco.plop': {
//           yep: 'dsojiofj'
//         }
//       }
//     },
//     'world.*'
//   )
// );
