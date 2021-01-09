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
//# sourceMappingURL=flatten.js.map