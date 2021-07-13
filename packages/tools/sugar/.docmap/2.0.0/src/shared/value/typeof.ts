/**
*
* @name          typeof
* @namespace            js.value
* @type          Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function return the correct type of the passed value.
* It support the recognition of arrays and return 'Array' as property type.
* You can olso ask the function to gives you the "of" types of the passed value. This mean that if you
* pass an Array like so "[10,'Hello',true]" and that you ask for "of" types, it will returns you
* "Array<Integer|String|Boolean>".
* Another feature is to ask the result as an object like so:
* {
*    type: 'Array',
*    of: ['Integer','String','Boolean']
* }
* You can ask also the typeof function to returns you the actual class name if the passed value is an instance
* of an custom class.
*
* @param       {Mixed}    value    The value to get the type of
* @param       {Object}    [settings={}]         An object of settings to configure your type get process:
* - of (false) {Boolean}: Specify if you want to get the "child" properties types for Objects, Arrays and custom classes
* - format ('String') {String}: Specify if you want back a String or an Object
* - customClass (true) {Boolean}: Specify if you want the custom classes to return theirs real names or simply Object
* @return      {String|Object}               The type in string format, of an object if the setting "object" is set to true
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import typeof from '@coffeekraken/sugar/js/value/typeof';
* typeof(true); // => Boolean
* typeof(10); // => Integer
* typeof(12.4); // => Number
* typeof(['Hello']); // => Array
* typeof(['Hello',true], { of: true }); // => Array<String|Boolean>
*
* class MyCoolClass {
*    // ...
* }
* const myInstance = new MyCoolClass();
* typeof(myInstance, { customClass: true }); // => MyCoolClass
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/