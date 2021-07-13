/**
*
* @name        autoCast
* @namespace            js.string
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Auto cast the string into the correct variable type
*
* @param    {String}    string    The string to auto cast
* @return    {Mixed}    The casted value
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import autoCast from '@coffeekraken/sugar/js/string/autoCast'
* autoCast('12') // => 12
* autoCast('window.HTMLElement') // => HTMLElement
* autoCast('{"hello":"world"}') // {hello:'world'}
*
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/