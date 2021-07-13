/**
*
* @name                deepMerge
* @namespace            js.object
* @type                Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Deep merge one object with another and return the merged object result. This merging implementation support:
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
* import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
* deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
* // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
*
* @since       2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/