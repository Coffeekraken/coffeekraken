"use strict";
// @ts-nocheck
// @shared
var __diff = require('deep-diff').diff;
var __set = require('../../../node/object/set');
var __get = require('../../../node/object/get');
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
    var finalObject = {};
    // const diffs = __diff(origin, compare, (path, key) => {
    //   const p = path.length ? path.join('.') + '.' + key : key;
    //   const value = __get(origin, p);
    //   return value !== undefined || !Array.isArray(value);
    // });
    var diffs = __diff(origin, compare);
    diffs.forEach(function (diff) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcERpZmYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWVwRGlmZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3pDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ2xELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTztJQUNoRCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIseURBQXlEO0lBQ3pELDhEQUE4RDtJQUM5RCxvQ0FBb0M7SUFFcEMseURBQXlEO0lBQ3pELE1BQU07SUFDTixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXRDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1FBQ2pCLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLEdBQUc7Z0JBQ04sTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyJ9