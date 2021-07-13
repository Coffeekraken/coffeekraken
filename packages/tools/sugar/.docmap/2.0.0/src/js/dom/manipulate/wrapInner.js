/**
*
* @name      wrapInner
* @namespace            js.dom.manipulate
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Wrap the content of the passed `$parent` inside a the passed HTMLElement `$wrapper`
*
* @param    {HTMLElement}    $parent    The parent to wrap inner
* @param    {HTMLElement}    $wrapper    The wrapper element
* @return    {HTMLElement}             Return the parent element
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import wrapInner from '@coffeekraken/sugar/js/dom/wrapInner'
* const $myWrapper = document.createElement('div')
* // assuming
* // <div class="container">
* //   <span>Hello World</span>
* // </div>
* wrapInner(document.querySelector('.container'), $myWrapper)
* // return
* // <div class="container">
* //   <div>
* //     <span>Hello World</span>
* //   </div>
* // </div>
*
* @since       1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel@gmail.com)

*/