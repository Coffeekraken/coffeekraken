/**
*
* @name                      delete
* @namespace            js.object
* @type                      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Delete an object property using a dotPath like "something.else"
*
* @param         {Object}          object            The object on which you want to delete the property
* @param         {String}          dotPath           The dotpath to the property you want to delete
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import delete from '@coffeekraken/sugar/js/object/delete';
* const myObject = {
*    hello: 'world',
*    plop: 'yop'
* };
* delete(myObject, 'plop');
*
* @since     2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/