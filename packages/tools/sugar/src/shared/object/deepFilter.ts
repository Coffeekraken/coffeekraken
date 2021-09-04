// @ts-nocheck
import __isPlainObject from '../is/plainObject';

/**
 * @name                        deepFilter
 * @namespace            js.object
 * @type                        Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * Allow to filter an object using a function and this through all of the object structure. It works the same as the filter method on the Array object type.
 * The passed filter function will have as parameter each object properties and must return true or false depending if you want the
 * passed property in the filtered object
 *
 * @param               {Object}                object                The object to filter
 * @param               {Function}              filter                The filter function that take as parameter the property itself, and the property name
 * @return              {Object}                                      The filtered object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import deepFilter from '@coffeekraken/sugar/js/object/deepFilter';
 * deepFilter({
 *    coco: 'hello',
 *    plop: true,
 *    sub: {
 *      property: 'world'
 *    }
 * }, ({key, item}) => typeof item === 'string');
 * // { coco: 'hello' }
 *
 * @since         2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IDeepFilterSettings {
    cloneFirst: boolean;
}

export interface IDeepFilterFilter {
    (item: IDeepFilterItem): undefined | boolean;
}

export interface IDeepFilterItem {
    key: string;
    value: any;
    isObject: boolean;
}

function processObj(object: any, filter: IDeepFilterFilter, settings): any {
    const newObj = {},
        keys = Object.keys(object);

    // loop on the object keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];

        // pass the property in the filter function
        const res = filter({
            key,
            value,
            isObject: __isPlainObject(value),
        });

        // true mean: we keep this totally
        if (res === true) {
            if (__isPlainObject(value)) {
                (newObj[key] = settings.cloneFirst ? Object.assign({}, value) : value), filter, settings;
            } else {
                newObj[key] = value;
            }
        } else if (res === undefined) {
            if (__isPlainObject(value)) {
                newObj[key] = settings.cloneFirst
                    ? processObj(Object.assign({}, value), filter, settings)
                    : processObj(value, filter, settings);
            } else {
                newObj[key] = value;
            }
        }
        // false mean: we do not keep this
        else if (res === false) {
            continue;
        }
    }

    return newObj;
}

function deepFilter(object: any, filter: IDeepFilterFilter, settings?: Partial<IDeepFilterSettings>) {
    settings = {
        cloneFirst: true,
        ...(settings ?? {}),
    };
    return processObj(settings.cloneFirst ? Object.assign({}, object) : object, filter, settings);
}
export default deepFilter;
