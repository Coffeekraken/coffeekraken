/**
*
* @name        toString
* @namespace            js.string
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Convert passed value to a string
*
* @param    {Mixed}    value    The value to convert to string
* @param     {Object}      [settings={}]             An object of settings to configure your toString process:
* - beautify (true) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
* - highlight (true) {Boolean}: Specify if you want to color highlight the output like objects, arrays, etc...
* - theme ({}) {Object}: The theme to use to colorize the output. See https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
* @return    {String}    The resulting string
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import toString from '@coffeekraken/sugar/js/string/toString'
* toString({
* 	id:'hello'
* }) // '{"id":"hello"}'
*
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/