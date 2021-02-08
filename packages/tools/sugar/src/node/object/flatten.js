"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = flatten;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYsb0VBQTBDO0FBQzFDLGdFQUEwQztBQUMxQyx3REFBa0M7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNwQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIscURBQXFEO0lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUM7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUVoRSxpQkFBaUI7SUFDakIsTUFBTSxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFM0IsUUFBUSxtQkFDTixTQUFTLEVBQUUsR0FBRyxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLEtBQUssRUFDcEIsd0JBQXdCLEVBQUUsSUFBSSxFQUM5QixjQUFjLEVBQUUsR0FBRyxFQUNuQixZQUFZLEVBQUUsRUFBRSxFQUNoQixjQUFjLEVBQUUsS0FBSyxJQUNsQixRQUFRLENBQ1osQ0FBQztJQUVGLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1FBQ3hCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7WUFBRSxTQUFTO1FBRXhDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN4QixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLFNBQVM7U0FDVjtRQUVELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0MsUUFBUSxDQUFDLEdB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