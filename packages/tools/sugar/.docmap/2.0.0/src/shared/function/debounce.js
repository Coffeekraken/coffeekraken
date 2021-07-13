/**
*
* @name        debounce
* @namespace            js.function
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This utils function allows you to make sure that a function that will normally be called
* several times, for example during a scroll event, to be called only once after
* the delay passed
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 		js
* import debounce from '@coffeekraken/sugar/js/function/debounce';
* const myDebouncedFn = debounce(() => {
* 		// my function content that will be
* 		// executed only once after the 1 second delay
* }, 1000);
*
* document.addEventListener('scroll', (e) => {
* 		// call my debounced function
* 		myDebouncedFn();
* });
*
* @since           2.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/