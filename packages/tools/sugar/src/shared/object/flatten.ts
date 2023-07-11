// @ts-nocheck

import __isPlain from '../is/isPlainObject.js';

/**
 * @name                              flatten
 * @namespace            shared.object
 * @type                              Function
 * @platform          js
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
 * @setting               {Boolean}          [quoteSeparatedProperties=true]      Specify if you want to quote dotted properties to be able to restore them correctly later
 * @setting               {String}        [quoteCharacter='"']        Specify the quote character to use when need to quote separated properties
 * @setting               {Boolean}       [keepLastIntact=false]       Specify if you want to keep the last level (object, array) intact and not to flatten each properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __flatten($1)
 *
 * @example             js
 * import { __flatten } from '@coffeekraken/sugar/object';
 * __flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __flatten(object, settings = {}) {
    const toReturn = {};

    // make sure the passed object is not null, undefined
    if (!Array.isArray(object) && !__isPlain(object)) return object;

    settings = {
        separator: '.',
        array: false,
        quoteSeparatedProperties: true,
        quoteCharacter: '"',
        excludeProps: [],
        keepLastIntact: false,
        ...settings,
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
            const isArray = Array.isArray(object[key]);

            const flatObject = __flatten(object[key], {
                ...settings,
                keepLastIntact: false,
            });

            for (const x in flatObject) {
                if (flatObject[x] === undefined) continue;

                if (isArray) {
                    toReturn[`${key}[${x}]`] = flatObject[x];
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

    return toReturn;
}
