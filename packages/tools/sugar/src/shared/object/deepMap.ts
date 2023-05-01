// @ts-nocheck

import __isClassInstance from '../is/isClassInstance';
import __isPlainObject from '../is/isPlainObject';
import __deepMerge from '../object/deepMerge';
import __clone from './clone';

/**
 * @name            deepMap
 * @namespace            shared.object
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 *
 * @setting    {Boolean}              [classInstances=false]            Specify if you want the objects to be processed the same as other values
 * @setting         {Boolean}       [array=true]                    Specify if we want to process also arrays or not
 * @setting         {Boolean}       [clone=false]          Specify if you want to clone the object passed before cleaning it
 * @setting         {Boolean}      [privateProps=true]     Specify if you want to clean also the private properties that starts with "_"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __deepMap($1, $2)
 * __deepMap($1, ({object, prop, value, path}) => {
 *      $2
 * })
 *
 * @example       js
 * import { __deepMap } from '@coffeekraken/sugar/object';
 * __deepMap({
 *    hello: 'world'
 * }, ({object, prop, value, path}) => {
 *    return '~ ' + value;
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDeepMapSettings {
    classInstances?: boolean;
    array?: boolean;
    clone?: boolean;
    privateProps?: boolean;
}

export default function __deepMap(
    objectOrArray: any,
    processor?: Function,
    settings?: IDeepCleanSettings,
    _path = [],
) {
    settings = __deepMerge(
        {
            classInstances: false,
            array: true,
            clone: false,
            privateProps: true,
        },
        settings,
    );

    const isArray = Array.isArray(objectOrArray);

    let newObject = isArray
        ? []
        : settings.clone
        ? __clone(objectOrArray, { deep: true })
        : objectOrArray;

    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/)) return;

        if (
            __isPlainObject(objectOrArray[prop]) ||
            (__isClassInstance(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)
        ) {
            const res = __deepMap(
                objectOrArray[prop],
                processor,
                {
                    ...settings,
                    clone: false,
                },
                [..._path, prop],
            );

            if (isArray) {
                newObject.push(res);
            } else {
                if (prop === '...' && __isPlainObject(res)) {
                    newObject = {
                        ...newObject,
                        ...res,
                    };
                } else {
                    newObject[prop] = res;
                }
            }
            return;
        }

        const res = processor({
            object: objectOrArray,
            prop,
            value: objectOrArray[prop],
            path: [..._path, prop].join('.'),
        });
        if (res === -1) {
            delete newObject[prop];
            return;
        }
        if (isArray) {
            newObject.push(res);
        } else {
            if (prop === '...' && __isPlainObject(res)) {
                // console.log('DEFEF', res);
                newObject = {
                    ...newObject,
                    ...res,
                };
            } else {
                newObject[prop] = res;
            }
        }
    });
    return newObject;
}
