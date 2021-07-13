/**
*
* @name        backgroundImageLoaded
* @namespace            js.dom.load
* @type      Function
* @platform          js
* @platform          ts
* @status        betas
*
* Detect when a background image has been loaded on an HTMLElement
*
* @feature       Promise based API
* @feature       Callback support
*
* @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
* @param     {Function}      [cb=null]       A callback function if you prefer
* @return    {SPromise}    A promise that will be resolved when the background image has been loaded
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import backgroundImageLoaded from '@coffeekraken/sugar/js/dom/backgroundImageLoaded'
* backgroundImageLoaded($myElm).then(() => {
*   // do something when loaded
* })
*
* @since     1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/