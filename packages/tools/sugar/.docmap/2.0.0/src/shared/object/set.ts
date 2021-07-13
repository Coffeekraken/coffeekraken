/**
*
* @name                                        set
* @namespace            js.object
* @type                                        Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
*
* @param                         {Object}                         obj                      The object in which to set the value
* @param                         {String}                        path                      The object path where to set the value
* @param                         {Mixed}                         value                     The value to set
* @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example               js
* import set from '@coffeekraken/sugar/js/object/set';
* set('myObject.cool.value', 'Hello world'); // => Hello world
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/