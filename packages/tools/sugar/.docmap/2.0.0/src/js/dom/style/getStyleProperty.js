/**
*
* @name      getStyleProperty
* @namespace            js.dom.style
* @type      Function
* @platform          js
* @platform          ts
* @status      beta
*
* Get a style property on the passed element through the computed style.
* This function try to store the actual style to not trigger more that 1 redraw
* each js execution loop.
*
* @param 		{HTMLElement} 					elm  		The element to get style from
* @param 		{String} 						property 	The css property to get
* @return 		{Mixed} 									The style value
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
* const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
*
* @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/