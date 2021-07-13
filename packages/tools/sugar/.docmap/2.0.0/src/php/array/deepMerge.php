/**
*
* @name            Sugar\array\deepMerge
* @namespace            php.array
* @type            Function
* @platform        php
* @status          beta
*
* This function take two arrays and merge them deeply by keeping distinct
* property keys.
*
* @param       {Array}         $array1         The base array on which to merge the second
* @param       {Array}         $array2         The array you want to merge in the first one
* @return      {Array}                         The resulting array
*
* @example         php
* \Sugar\ar\merge_deep([
*    'prop1' => 'Hello',
*    'prop2' => 'World'
* ], [
*    'prop1' => 'Plop'
* ]);
* // [
* //   'prop1' => 'Plop',
* //   'prop2' => 'World'
* // ]
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/