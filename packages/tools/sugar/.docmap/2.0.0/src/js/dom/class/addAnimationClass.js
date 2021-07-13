/**
*
* @name        addAnimationClass
* @namespace            js.dom.class
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Add a class that trigger an animation and remove it at the end
*
* @param    {HTMLElement}    $elm    The element to take care of
* @param    {String|Array}    cls    The class or classes (Array) to apply
* @return    {Promise}               A promise that will be resolved once the class have been removed and the animation finished
*
* @todo        interface
* @todo        doc
* @todo        tests
*
* @example    js
* import addAnimationClass from '@coffeekraken/sugar/js/dom/addAnimationClass'
* addAnimationClass(myElm, 'my-cool-class').then($elm => {
*    // do something at the animation end...
* });
*
* @since       1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/