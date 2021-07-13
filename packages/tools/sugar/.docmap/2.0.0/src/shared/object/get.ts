/**
*
* @name                          get
* @namespace            js.object
* @type                          Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Retreive an object value using a dotted path like "myObject.myProperty.myValue"
*
* @feature       Support optional property in the doted path like "something.cool?.hello.world"
*
* @param               {Object}                 obj                The object in which to set the value
* @param               {String}                path                The dotted object path to get
* @return              {Mixed}                                     The getted value or "undefined" if nothing found...
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example             js
* import get from '@coffeekraken/sugar/js/object/get';
* get('myObject.cool.value'); // => 'Hello world'
*
* @since     2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/