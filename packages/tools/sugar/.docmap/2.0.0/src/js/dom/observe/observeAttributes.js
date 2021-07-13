/**
*
* @name        observeAttributes
* @namespace            js.dom.observe
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status        beta
*
* Observe attributes on an HTMLElement and get mutations through the SPromise instance
*
* @param 		{HTMLElement} 					target 		The element to observe
* @param 		{MutationObserverInit} 			settings 	The mutation observer settings
* @return 		{SPromise} 								The SPromise throught which you can have the mutations using the "then" callback
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import observeAttributes from 'sugarcss/js/dom/observeAttributes'
* const observer = observeAttributes(myCoolHTMLElement).then(mutation => {
* 		// do something with the mutation
* });
* / the observer
* observe();
*
* @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
* @since       1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* List of attributes to observe
* @setting
* @name 		attributes
* @type 		{Array}
* @default 	null

*/