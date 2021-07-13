/**
*
* @name      scrollToLocationHash
* @namespace            js.dom.scroll
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Scroll to the location hash if an hash is present.
* This function will try to get the target element from the hash and scroll to it
*
* @setting    {IScrollToSettings}            [scroll={}]       Some scroll settings that you can check on the sugar.dom.scroll.scrollTo function
*
* @param       {IScrollToLocationHashSettings}       [settings={}]       Some settings to tweak the scroll behavior
* @return      {Promise}                     A promise resolved once the scroll has ended
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import __scrollToLocationHash from '@coffeekraken/sugar/js/dom/scrollToLocationHash'
* __scrollToLocationHash(500, 0)
*
* @since       1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)

*/