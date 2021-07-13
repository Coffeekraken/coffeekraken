/**
*
* @name            sameItems
* @namespace       shared.array
* @type            Function
*
* This function take two arrays and return all the items that are the same.
* You can specify if you want only comparing by reference for object, etc... or if
* you want to transform items in hashes and compare that instead.
*
* @param       {Array}         ...arrays           The arrays you want to compare
* @param       {Object}        [settings={}]           Some settings to refine your comparaison process
* @return      {Array}                              An array containing all the items that are present in all the passed arrays
*
* @setting         {Boolean}          [references=true]        Specify if you want to use the references comparaison or not
* @setting         {Boolean}           [hash=true]             Specify if you want to allows transforming object etc in to hashes and compare this instead
*
* @import      import sameItems from '@coffeekraken/sugar/shared/array/sameItems';
*
* @example         js
* import sameItems from '@coffeekraken/sugar/shared/array/sameItems';
* sameItems([1,2,3,4], [1,3,5]); // => [1,3]
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/