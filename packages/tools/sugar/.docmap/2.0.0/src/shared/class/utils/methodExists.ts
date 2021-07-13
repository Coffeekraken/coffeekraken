/**
*
* @name                                    methodExists
* @namespace            js.class.utils
* @type                                    Function
* @platform          js
* @platform          ts
* @platform          node
* @status          beta
*
* Check if one or more methods exists on a class instance
*
* @param           {Object}              instance                The instance to check the methods on
* @param           {String}              ...methods              The methods to check
* @return          {Boolean|Array}                               Return true if all is ok, and an array of missing methods if not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example           js
* class Coco {
*    hello() {}
* }
* import methodExists from '@coffeekraken/sugar/node/class/utils/methodExists';
* const myInstance = new Coco();
* methodExists(myInstance, 'hello', 'world'); // => ['world'];
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/