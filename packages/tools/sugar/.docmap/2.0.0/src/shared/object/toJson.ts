/**
*
* @name                toJson
* @namespace            shared.object
* @type                Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Convert class instances to plain JSON object
*
* @param       {Any}           object      The object to convert
* @return      {Any}                       The converted object
*
* @example         js
* import toJson from '@coffeekraken/sugar/shared/object/toJson';
* class MyClass {
*      hello = 'world';
*      something() {}
* }
* toJson(new MyClass()); // => { hello: 'world' }
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/