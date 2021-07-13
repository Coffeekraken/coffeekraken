/**
*
* @name      wrap
* @namespace            js.dom.manipulate
* @type      Function
* @platform          js
* @platform          ts
* @status      beta
*
* Wrap an HTMLElement inside another `$wrapper` one
*
* @param    {HTMLElement}    $toWrap    The element to wrap
* @param    {HTMLElement}    $wrapper    The wrapper element
* @return    {HTMLElement}           The toWrap element
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import wrap from '@coffeekraken/sugar/js/dom/wrap'
* const $wrapper = document.createElement('div')
* // assuming:
* // <div>
* //   <span class="wrap">Hello World</span>
* // </div>
* wrap(document.querySelector('.wrap'), $wrapper)
* // output:
* // <div>
* //   <div>
* //     <span class="wrap">Hello World</span>
* //   </div>
* // </div>
*
* @since       1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/