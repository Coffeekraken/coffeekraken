/**
*
* @name      getTransitionProperties
* @namespace            js.dom.style
* @type      Function
* @platform          js
* @platform          ts
* @status        wip
*
* Get the css transition properties from an HTMLElement in an object format
*
* @param 		{HTMLElement} 					elm  		The element to get the properties from
* @return 		{Object} 									The animation properties
*
* @todo      refactor
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
* const props = getTransitionProperties(myCoolHTMLElement);
* // output format
* // {
* // 	property : ['all'],
* // 	duration : [200],
* // 	delay : [0],
* // 	timingFunction : ['linear'],
* // 	totalDuration : 200
* // }
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/