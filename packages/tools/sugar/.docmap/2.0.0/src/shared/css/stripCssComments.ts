/**
*
* @name          stripCssComments
* @namespace            js.css
* @type          Function
* @platform          js
* @platform          ts
* @platform          node
* @status              beta
*
* This function simply remove all the css comments like:
* - Multiline blocks css comments begining with /* *, ending with
* /
* - Single line comments begining with //
*
* @param       {String}        css         The css code to process
* @param       {Object}      [settings={}]   An object of settings
* @return      {String}                    The processed css code
*
* @setting     {Boolean}     [block=true]       Remove the blocks comments
* @setting     {Boolean}     [line=true]       Remove the line comments
*
* @todo        tests
* @todo        interface
* @todo        doc
*
* @example       js
* import stripCssComments from '@coffeekraken/sugar/js/css/stripCssComments';
* stripCssComments(`
* // something cool
* body { background-color: red; }
* `);
* // body { background-color: red }
*
* @see         https://www.npmjs.com/package/strip-css-comments
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/