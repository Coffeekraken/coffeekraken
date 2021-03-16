"use strict";
// @ts-nocheck
// @shared
const __diff = require('deep-diff').diff;
const __set = require('../../../node/object/set');
const __get = require('../../../node/object/get');
/**
 * @name                            deepDiff
 * @namespace           node.object
 * @type                            Function
 *
 * Take two objects and return an object that contains only the differences between them
 *
 * @param           {Object}              origin              The original object to compare
 * @param           {Object}              compare             The object to compare to the original one
 * @return          {Object}                                  An object that contains only the differences between the two objects
 *
 * @example           js
 * const deepDiff = require('@coffeekraken/sugar/node/object/deepDiff');
 * const origin = { hello: 'world', plop: 'yop' };
 * const compare = { hello: 'world' };
 * deepDiff(origin, compare); // => { plop: 'yop' }
 *
 * @see     https://www.npmjs.com/package/deep-diff
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function deepDiff(origin, compare) {
    const finalObject = {};
    // const diffs = __diff(origin, compare, (path, key) => {
    //   const p = path.length ? path.join('.') + '.' + key : key;
    //   const value = __get(origin, p);
    //   return value !== undefined || !Array.isArray(value);
    // });
    const diffs = __diff(origin, compare);
    diffs.forEach((diff) => {
        switch (diff.kind) {
            case 'D':
                break;
            case 'E':
                break;
            case 'N':
                __set(finalObject, diff.path.join('.'), diff.rhs);
                break;
        }
    });
    return finalObject;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcERpZmYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2hhcmVkL29iamVjdC9fX3dpcF9fL2RlZXBEaWZmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDekMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDbEQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPO0lBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2Qix5REFBeUQ7SUFDekQsOERBQThEO0lBQzlELG9DQUFvQztJQUVwQyx5REFBeUQ7SUFDekQsTUFBTTtJQUNOLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JCLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLEdBQUc7Z0JBQ04sTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyJ9