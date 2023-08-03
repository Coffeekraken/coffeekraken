// @ts-nocheck

/**
 * @name                        deepUnwrap
 * @namespace            shared.object
 * @type                        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function allows you to specify a "search" property to find deep inside the passed object
 * as well as an "removeProps" to remove while unwraping the finded object.
 * Unwraping mean take all the finded object properties (minus the removeProps ones)
 * and set them onto the parent object.
 *
 * @param               {Object}                object                The object to process
 * @param               {String}                searchProp            The property to search in order to find the object(s) to unwrap
 * @param               {}
 * @return              {Object}                                      The filtered object
 *
 * @setting             {Boolean}           [clone=true]            Specify if you want to clone the object before filter it
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __deepFilter } from '@coffeekraken/sugar/object';
 * __deepFilter ({
 *    coco: 'hello',
 *    plop: true,
 *    sub: {
 *      property: 'world'
 *    }
 * }, ({key, item}) => typeof item === 'string');
 * // { coco: 'hello' }
 *
 * @since         2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDeepUnsrapSettings {
    clone: boolean;
    removeProps: string[];
}

export default function deepUnwrap(
    obj: any,
    searchProp: string,
    settings?: IDeepUnsrapSettings,
): any {
    return obj;
}
