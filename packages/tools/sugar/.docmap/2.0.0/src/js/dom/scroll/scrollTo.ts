/**
*
* @name      scrollTo
* @namespace            js.dom.scroll
* @type      Function
* @platform          js
* @platform          ts
* @status          beta
*
* Function that let you make a smooth page scroll to a specific element in the page
*
* @feature       Promise based API
* @feature       Tweak the scroll behavior like duration, easing, etc...
*
* @setting 		{Number} 					[duration=1000] 		The animation duration
* @setting 		{Function} 					[easing=easeInOutQuad] 			An easing Function
* @setting 		{Number} 					[offset=0] 			The destination offset
* @setting 		{String} 					[align='top'] 			The destination align (top, center, bottom)
* @setting 		{Function} 					[onFinish=null] 		A callback to call when the animation if finished
*
* @param 		{HTMLElement} 				target 			The element to scroll to
* @param       {IScrollToSettings}     [settings={}]       Some settings to tweak the scroll behavior
* @return      {Promise}           A promise resolved once the scroll has ended
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import scrollTop from '@coffeekraken/sugar/js/dom/scrollTo'
* import easeInOutQuad from '@coffeekraken/sugar/js/easings/easeInOutQuad'
* scrollTo(myCoolHTMLElement);
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/