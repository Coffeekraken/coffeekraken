/**
*
* @name      scriptLoaded
* @namespace            js.dom.load
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Detect when a script has been fully loaded
*
* @feature       Promise based API
* @feature       Callback support
*
* @param    {HTMLScriptElement}    $script    The script element to detect the loading state
* @param       {Function}      [cb=null]     A callback if you prefer
* @return    {Promise}    The promise that will be resolved when the script is fully loaded
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import scriptLoaded from '@coffeekraken/sugar/js/dom/scriptLoaded'
* scriptLoaded($script).then(($script) => {
*   // do something here
* })
*
* @since       1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/