/**
*
* @name        throttle
* @namespace            js.function
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status          beta
*
* This utils function allows you to make sure that a function that will normally be called
* several times, for example during a scroll event, to be called once each threshhold time
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 		js
* import throttle from '@coffeekraken/sugar/js/function/throttle';
* const myThrottledFn = throttle(() => {
* 		// my function content that will be
* 		// executed only once each second
* }, 1000);
*
* document.addEventListener('scroll', (e) => {
* 		// call my throttled function
* 		myThrottledFn();
* });
*
* @since         2.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/