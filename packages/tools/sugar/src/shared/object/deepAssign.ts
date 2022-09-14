import __unique from '../array/unique';
import __isPlainObject from '../is/isPlainObject';
import __clone from './clone';
/**
 * @name            deepAssign
 * @namespace            shared.object
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take as first parameter the object you want to assign others to,
 * then others objects you want to assign to the first.
 * The difference with the ```deepMerge``` function is that this one keep the first
 * passed object as reference and update it directly. The ```deepMerge``` one create a new
 * object with the merging result
 *
 * @param       {Object}          referenceObj          The object you want to assign the others in
 * @param       {Object}          ...objects            Some objects you want to assign in the first one
 * @return      {Object}                                Return the reference to the first passed object
 *
 * @example         js
 * import { __deepAssign } from '@coffeekraken/sugar/object';
 * const obj1 = { something: 'cool' };
 * const obj2 = { other: true };
 * const obj3 = __deepAssign(obj1, obj2);
 * obj1 === obj3 // => true
 *
 * @see         https://www.npmjs.com/package/assign-deep
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __deepAssign(referenceObj, ...objects) {
    // objects.forEach((obj) => {
    //   __deepAssign(referenceObj, obj);
    // });
    // return referenceObj;

    const settings = {
        array: false,
        object: true,
        cloneChilds: true,
    };

    function merge(refObj, mixWithObj) {
        // const newObj = {};
        // if (!refObj && mixWithObj) return mixWithObj;
        // if (!mixWithObj && refObj) return refObj;
        // if (!refObj && !mixWithObj) return {};
        // __copyTo(refObj).override(newObj);
        for (const key of Object.keys(mixWithObj)) {
            // merging arrays
            if (
                settings.array === true &&
                Array.isArray(refObj[key]) &&
                Array.isArray(mixWithObj[key])
            ) {
                const newArray = __unique([...refObj[key], ...mixWithObj[key]]);
                refObj[key] = newArray;
                continue;
            }

            // merging objects
            if (
                settings.object === true &&
                __isPlainObject(refObj[key]) &&
                __isPlainObject(mixWithObj[key])
            ) {
                refObj[key] = merge(refObj[key], mixWithObj[key]);
                continue;
            }

            if (__isPlainObject(mixWithObj[key]) && settings.cloneChilds) {
                refObj[key] = __clone(mixWithObj[key], {
                    deep: true,
                });
            } else {
                // default values
                refObj[key] = mixWithObj[key];
            }
        }
        return refObj;
    }

    const potentialSettingsObj = objects[objects.length - 1] || {};
    if (
        (potentialSettingsObj.array &&
            typeof potentialSettingsObj.array === 'boolean') ||
        (potentialSettingsObj.object &&
            typeof potentialSettingsObj.object === 'boolean')
    ) {
        if (potentialSettingsObj.array !== undefined)
            settings.array = potentialSettingsObj.array;
        if (potentialSettingsObj.object !== undefined)
            settings.object = potentialSettingsObj.object;
        objects.pop();
    }

    for (let i = 0; i < objects.length; i++) {
        const toMergeObj = objects[i] || {};
        merge(referenceObj, toMergeObj);
    }

    return referenceObj;
}
