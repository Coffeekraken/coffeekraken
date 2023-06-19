// @ts-nocheck

import __isPlainObject from '../is/isPlainObject';

/**
 * @name            deepClean
 * @namespace            shared.object
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function takes an object as input and returns a cleaned version of it.
 * You can pass a cleaner function that has to returns true or false. If returns true, the element will be
 * keeped. If false, it will be removed from the output.
 * The default cleaner function remove all that is either null, "" or undefined.
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 *
 * @setting         {Function}      [cleaner=null]       The cleaner function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @setting         {Boolean}       [array=true]                    Specify if we want to process also arrays or not
 * @setting         {Boolean}       [clone=false]          Specify if you want to clone the object passed before cleaning it
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __deepClean($1)
 * __deepClean($1);
 *
 * @example       js
 * import { __deepClean } from '@coffeekraken/sugar/object';
 * __deepClean({
 *    hello: 'world',
 *    something: null
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDeepCleanSettings {
    array?: boolean;
    clone?: boolean;
}

export default function __deepClean(
    objectOrArray: any,
    settings?: IDeepCleanSettings,
) {
    settings = {
        array: true,
        clone: false,
        cleaner(value) {
            if (value === undefined || value === null || value === '') {
                return false;
            }
            if (__isPlainObject(value) && !Object.keys(value).length) {
                return false;
            }
            return true;
        },
        ...(settings ?? {}),
    };

    let workingObj;
    if (settings.clone) {
        workingObj = Array.isArray(objectOrArray)
            ? [...objectOrArray]
            : Object.assign({}, objectOrArray);
    } else {
        workingObj = objectOrArray;
    }

    if (settings.array && Array.isArray(objectOrArray)) {
        for (let [i, v] of objectOrArray.entries()) {
            if (__isPlainObject(v) || Array.isArray(v)) {
                workingObj[i] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[i])) {
                workingObj.splice(workingObj.indexOf(v), 1);
            }
        }
    } else if (__isPlainObject(objectOrArray)) {
        for (let [k, v] of Object.entries(objectOrArray)) {
            if (__isPlainObject(v) || Array.isArray(v)) {
                workingObj[k] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[k])) {
                delete workingObj[k];
            }
        }
    }

    return workingObj;
}
