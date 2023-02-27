// @ts-nocheck

/**
 * @name                merge
 * @namespace           shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * - object (true) {Boolean}: Specify if you want to merge the objects
 * - array (false) {Boolean}: Specify if you want to merge the arrays
 * @return          {Object}                              The merged object result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __merge($1, $2)
 * 
 * @example           js
 * import { __merge } from '@coffeekraken/sugar/object';
 * __merge({a: 'hello'}, {a: 'plop', hello: 'world');
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function _merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj) return secondObj;
    if (!secondObj && firstObj) return firstObj;
    if (!firstObj && !secondObj) return {};

    const firstProps = Object.getOwnPropertyNames(firstObj);
    firstProps.forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(firstObj, key);
        if (desc.set || desc.get) {
            Object.defineProperty(newObj, key, desc);
        } else {
            newObj[key] = firstObj[key];
        }
    });

    const secondProps = Object.getOwnPropertyNames(secondObj);
    secondProps.forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(secondObj, key);
        if (desc.set || desc.get) {
            Object.defineProperty(newObj, key, desc);
        } else {
            newObj[key] = secondObj[key];
        }
    });

    return newObj;
}

export default function (...args) {
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = _merge(currentObj, toMergeObj);
    }

    return currentObj;
}
