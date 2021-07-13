/**
*
* @name                      resolveTokens
* @namespace            js.object
* @type                      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function take an object and propare it to accept tokens like:
* - '{this.something.else}'
* - etc...
*
* @param         {Object}            object        The object to process
* @return        {Object}                          The proxied object that you can use
*
* @todo      interface
* @todo      doc
* @todo      tests
* @todo      add some settings to set token structure
*
* @example       js
* import resolveTokens from '@coffeekraken/sugar/js/object/resolveTokens';
* const myObj = resolveTokens({
*    hello: 'world',
*    plop: '{this.hello}
* });
*
* @since         2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/