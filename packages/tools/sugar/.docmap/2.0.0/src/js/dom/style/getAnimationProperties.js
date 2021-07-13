/**
*
* @name      getAnimationProperties
* @namespace            js.dom.style
* @type      Function
* @platform          js
* @platform          ts
* @status          wip
*
* Get the css animation properties from an HTMLElement in an object format
*
* @param 		{HTMLElement} 					elm  		The element to get the properties from
* @return 		{Object} 									The animation properties
*
* @todo      refactore
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import getAnimationProperties from '@coffeekraken/sugar/js/dom/getAnimationProperties'
* const props = getAnimationProperties(myCoolHTMLElement);
* // output format
* // {
* // 	name : ['animation1'],
* // 	duration : [200],
* // 	delay : [0],
* // 	timingFunction : ['linear'],
* // 	iterationCount : [1],
* // 	direction : ['forward'],
* // 	totalDuration : 200
* // }
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/