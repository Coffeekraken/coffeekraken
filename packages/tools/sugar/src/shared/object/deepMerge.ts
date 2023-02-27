// @ts-nocheck

import __isPlainObject from '../is/isPlainObject';

/**
 * @name                deepMerge
 * @namespace            shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * @return          {Object}                              The merged object result
 *
 * @setting         {Boolean}           [mergeArray=false]      Merge or not arrays
 *
 * @feature         Support array merging by passing the last parameter as the { mergeArray: true } object
 * @feature         Support merging object with getters. Can access the source object from the second object property getter using the `this.$source` property
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __deepMerge($1, $2)
 * 
 * @example           js
 * import { __deepMerge } from '@coffeekraken/sugar/object';
 * __deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IDeepMergeSettings {
    mergeArray?: boolean;
    // mergeGetterSource: boolean;
}

export default function __deepMerge(...args) {
    let finalSettings: IDeepMergeSettings = {
        mergeArray: false,
    };
    // const potentialSettings = args[args.length - 1];
    // if (
    //     potentialSettings?.mergeArray !== undefined ||
    //     potentialSettings?.mergeGetterSource !== undefined
    // ) {
    //     finalSettings = {
    //         ...finalSettings,
    //         ...potentialSettings,
    //     };
    //     // remove the settings object from the merge process
    //     args = args.slice(0, -1);
    // }

    function merge(firstObj, secondObj) {
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

        // delete newObj.$source;
        // if (!newObj.$source) {
        //     Object.defineProperty(newObj, '$source', {
        //         enumerable: false,
        //         configurable: false,
        //         value: firstObj,
        //     });
        // }
        // Object.defineProperty(secondObj, 'plop', {
        //     value: 'yop',
        // });

        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            // if (finalSettings.mergeGetterSource && key === '$source') {
            //     return;
            // }

            const secondObjDesc = Object.getOwnPropertyDescriptor(
                secondObj,
                key,
            );

            // const secondObjValue = secondObj[key];

            // delete secondObj[key];
            // Object.defineProperty(secondObj, key, {
            //     configurable: true,
            //     writable: true,
            //     value: secondObjValue,
            //     // get() {
            //     //     console.log('GET', key);
            //     //     return secondObjValue;
            //     // },
            // });

            // secondObjDesc.$source = secondObj.$source;

            if (secondObjDesc.set || secondObjDesc.get) {
                // const v = secondObj[key];
                // Object.defineProperty(newObj, key, {
                //     enumerable: true,
                //     writable: true,
                //     get() {
                //         console.log('GET', key, v);
                //         return v;
                //     },
                // });

                // if (finalSettings.mergeGetterSource) {
                //     Object.defineProperty(newObj, '$source', {
                //         enumerable: false,
                //         value: firstObj,
                //     });
                // }

                Object.defineProperty(newObj, key, secondObjDesc);
            } else if (
                finalSettings.mergeArray &&
                Array.isArray(firstObj[key]) &&
                Array.isArray(secondObj[key])
            ) {
                newObj[key] = [...firstObj[key], ...secondObj[key]];
            } else if (
                __isPlainObject(newObj[key]) &&
                __isPlainObject(secondObj[key])
            ) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            } else {
                newObj[key] = secondObj[key];
            }
        });

        return newObj;
    }

    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }

    return currentObj;
}
