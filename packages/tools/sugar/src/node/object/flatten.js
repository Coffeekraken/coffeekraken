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
    settings = Object.assign({ separator: '.', array: false, arrayWithDots: false, quoteSeparatedProperties: true, quoteCharacter: '"', keepLastIntact: false }, settings);
    for (const i in object) {
        if (object[i] === undefined)
            continue;
        if (object[i] === null) {
            toReturn[i] = null;
            continue;
        }
        if ((Array.isArray(object[i]) && settings.array) ||
            (!Array.isArray(object[i]) && typeof object[i]) == 'object') {
            // if (object[i].__isFlattened === true) {
            //   toReturn[i] = object[i];
            //   continue;
            // }
            const isArray = Array.isArray(object[i]);
            const flatObject = flatten(object[i], Object.assign(Object.assign({}, settings), { keepLastIntact: false }));
            // delete object[i].__isFlattened;
            for (const x in flatObject) {
                if (flatObject[x] === undefined)
                    continue;
                // if (flatObject[x] && flatObject[x].__proto__)
                //   flatObject[x].__proto__.__isFlattened = true;
                if (isArray) {
                    if (settings.arrayWithDots) {
                        toReturn[`${i}.${x}`] = flatObject[x];
                    }
                    else {
                        toReturn[`${i}[${x}]`] = flatObject[x];
                    }
                }
                else {
                    let part = i;
                    if (settings.quoteSeparatedProperties &&
                        part.includes(settings.separator)) {
                        toReturn[`${settings.quoteCharacter}${i}${settings.quoteCharacter}` +
                            settings.separator +
                            x] = flatObject[x];
                    }
                    else {
                        toReturn[i + settings.separator + x] = flatObject[x];
                    }
                }
            }
            continue;
        }
        toReturn[i] = object[i];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYsb0VBQTBDO0FBQzFDLGdFQUEwQztBQUMxQyx3REFBa0M7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNwQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIscURBQXFEO0lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUM7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUVoRSxpQkFBaUI7SUFDakIsTUFBTSxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFM0IsUUFBUSxtQkFDTixTQUFTLEVBQUUsR0FBRyxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLEtBQUssRUFDcEIsd0JBQXdCLEVBQUUsSUFBSSxFQUM5QixjQUFjLEVBQUUsR0FBRyxFQUNuQixjQUFjLEVBQUUsS0FBSyxJQUNsQixRQUFRLENBQ1osQ0FBQztJQUVGLEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxFQUFFO1FBQ3RCLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFBRSxTQUFTO1FBRXRDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN0QixRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ25CLFNBQVM7U0FDVjtRQUVELElBQ0UsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEtBQUssQ0FB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