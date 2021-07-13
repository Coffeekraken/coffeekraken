/**
*
* @name            deepAssign
* @namespace            js.object
* @type            Function
* @platform          js
* @platform          ts
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
* import deepAssign from '@coffeekraken/sugar/js/object/deepAssign';
* const obj1 = { something: 'cool' };
* const obj2 = { other: true };
* const obj3 = deepAssign(obj1, obj2);
* obj1 === obj3 // => true
*
* @see         https://www.npmjs.com/package/assign-deep
* @since       2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/