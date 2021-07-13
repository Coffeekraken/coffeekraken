/**
*
* @name            sanitizeSugarJson
* @namespace            node.sugar
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function allows you to sanitize a sugarJson JSON to be sure you'll get
* the same structure everytime
*
* @param       {JSON}          sugarJson           The sugar.json JSON to sanitize
* @return      {JSON}                              Sanitizes sugarJson
*
* @example         js
* import sanitizeSugarJson from '@coffeekraken/sugar/node/sugar/sanitizeSugarJson';
* sanitizeSugarJson({
*      extends: 'something',
*      // ...
* }); // => { extends: ['something'], ... }
*
* @since       2.0.0
* @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/