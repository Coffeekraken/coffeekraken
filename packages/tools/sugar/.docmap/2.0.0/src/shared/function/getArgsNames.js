/**
*
* @name                            getArgsNames
* @namespace           shared.function
* @type                            Function
* @platform          js
* @platform          ts
* @platform          node
* @status              beta
*
* Get the arguments names of the passed function. Return an array of the arguments names
*
* @param             {Function}              func                  The function reference of which get the arguments names
* @return            {Array}                                       An array of arguments names
*
* @todo        interface
* @todo        doc
* @todo        move this into the "function" folder
*
* @example         js
* import getArgsNames from '@coffeekraken/sugar/shared/function/getArgsNames';
* function hello(world, coco, plop) { }
* getArgsNames(hello); // => ['world', 'coco', 'plop']
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/