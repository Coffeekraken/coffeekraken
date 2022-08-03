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
 * @example           js
 * import merge from '@coffeekraken/sugar/node/object/merge';
 * merge({a: 'hello'}, {a: 'plop', hello: 'world');
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function _merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
        return secondObj;
    if (!secondObj && firstObj)
        return firstObj;
    if (!firstObj && !secondObj)
        return {};
    const firstProps = Object.getOwnPropertyNames(firstObj);
    firstProps.forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(firstObj, key);
        if (desc.set || desc.get) {
            Object.defineProperty(newObj, key, desc);
        }
        else {
            newObj[key] = firstObj[key];
        }
    });
    const secondProps = Object.getOwnPropertyNames(secondObj);
    secondProps.forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(secondObj, key);
        if (desc.set || desc.get) {
            Object.defineProperty(newObj, key, desc);
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTO0lBQy9CLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVM7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUM3QyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVE7UUFBRSxPQUFPLFFBQVEsQ0FBQztJQUM1QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXZDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsSUFBSTtJQUM1QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQyJ9