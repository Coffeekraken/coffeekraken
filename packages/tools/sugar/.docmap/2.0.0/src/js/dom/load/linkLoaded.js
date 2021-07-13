/**
*
* @name      linkLoaded
* @namespace            js.dom.load
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Wait until the passed HTMLLinkElement is fully loaded
*
* @feature       Promise based API
* @feature       Callback support
*
* @param 		{HTMLLinkElement} 			link  		The link tag to check the loading state
* @param 		{Function}					[cb=null] 	An optional callback to call
* @return 		{Promise} 								The promise that will be resolved
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import linkLoaded from '@coffeekraken/sugar/js/dom/linkLoaded'
* linkLoaded(myCoolHTMLLinlElement).then((link) => {
* 		// do something when the link is loaded
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/