/**
*
* @name            map
* @namespace            js.iterable
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function take an iterable value like an Array, an Object, a Map, a String, an Integer, a Set, etc... and
* simply iterate over like a forEach.
*
* @param       {Iterable}      stack       The stack on which to iterate
* @param       {IIterableCallbackFn}                     A callback called on each stack items with parameters "key" and "value". You must return either a new value for the stack item to be set, either nothing to pass to the next item
* @return      {Promise}               A promise resolved with the new stack
*
* @example       js
* import map from '@coffeekraken/sugar/js/iterable/map';
* const myStack = ['hello', 'world'];
* map(myStack, ({key, value}) => {
*    return `${value} coco`;
* });
* // ['hello coco', 'world coco']
*
* @since         2.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/