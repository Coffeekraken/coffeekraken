// @ts-nocheck
import __isPlainObject from '../is/isPlainObject';

/**
 * @name                        deepFilter
 * @namespace            shared.object
 * @type                        Function
 * @platform          js
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
 * @snippet         __deepFilter($1, $2)
 * __deepFilter($1, ({value, key}) => {
 *      $2
 * })
 *
 * @example           js
 * import { __deepFilter } from '@coffeekraken/sugar/object';
 * __deepFilter ({
 *    coco: 'hello',
 *    plop: true,
 *    sub: {
 *      property: 'world'
 *    }
 * }, ({key, value}) => typeof value === 'string');
 * // { coco: 'hello' }
 *
 * @since         2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDeepFilterSettings {
    cloneFirst?: boolean;
    array?: boolean;
}

export interface IDeepFilterFilter {
    (item: IDeepFilterItem): undefined | boolean;
}

export interface IDeepFilterItem {
    key: string;
    value: any;
    isObject: boolean;
}

function processValue(
    key: any,
    value: any,
    filter: IDeepFilterFilter,
    settings: IDeepFilterSettings,
): any {
    const newObj = {},
        keys = Object.keys(object);

    if (settings.array && Array.isArray(value)) {
        for (let [i, item] of value.entries()) {
            processValue(i, item);
        }
    } else if (__isPlainObject(value)) {
        for (let [k, v] of Object.entries(value)) {
            processValue(k, v);
        }
    } else {
        // pass the property in the filter function
        const res = filter({
            key,
            value,
        });
    }

    // loop on the object keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let value = object[key];

        if (__isPlainObject(value)) {
            processValue(value, filter, settings);
        } else if (settings.array && Array.isArray(value)) {
        }

        // pass the property in the filter function
        const res = filter({
            key,
            value,
            isObject: __isPlainObject(value),
        });

        // true mean: we keep this totally
        if (res === true) {
            if (__isPlainObject(value)) {
                (newObj[key] = settings.cloneFirst
                    ? Object.assign({}, value)
                    : value),
                    filter,
                    settings;
            } else {
                newObj[key] = value;
            }
        } else if (res === undefined) {
            if (__isPlainObject(value)) {
                newObj[key] = settings.cloneFirst
                    ? processValue(Object.assign({}, value), filter, settings)
                    : processValue(value, filter, settings);
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

export default function __deepFilter(
    object: any,
    filter: IDeepFilterFilter,
    settings?: Partial<IDeepFilterSettings>,
) {
    settings = {
        cloneFirst: true,
        ...(settings ?? {}),
    };
    return processValue(
        settings.cloneFirst ? Object.assign({}, object) : object,
        filter,
        settings,
    );
}
