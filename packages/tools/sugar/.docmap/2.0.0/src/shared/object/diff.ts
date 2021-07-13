/**
*
* @name                      diff
* @namespace            js.object
* @type                      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function take two objects and return an object that contains only what has been changed between the two.
* This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
*
* @param         {Object}          object1            The first object used for the diff process
* @param         {Object}          object2            The second object used for the diff process
* @param         {Object}          [settings={}]      An object of settings to configure the diff process:
* - deep (true) {Boolean}: Specify if you want a deep diff or a simple one level diff
* - added (true) {Boolean}: Specify if you want to include the props that does not exist on the object1 but exists on the object2
* - deleted (false) {Boolean}: Specify if you want to include the props that exists on the object1 but no more on the object2
* - equals (false) {Boolean}: Specify if you want to include the props that are equals from the object1 to the object2
* - emptyObject (false) {Boolean}: Specify if you want to keep the empty objects in the resulting one
* - updated (true) {Boolean}: Specify if you want to include the updated values
* @return        {Object}                             The object that contains only the differences between the two
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import diff from '@coffeekraken/sugar/js/object/diff';
* const myObject1 = {
*    hello: 'world',
*    plop: 'yop'
* };
* const myObject2 = {
*    coco: 'plop',
*    hello: 'hey!',
*    plop: 'yop'
* };
* diff(myObject1, myObject2);
* {
*    coco: 'plop',
*    hello: 'hey!'
* }
*
* @see       https://www.npmjs.com/package/is-equal
* @since       2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/