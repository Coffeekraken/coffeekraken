/**
*
* @name        setRecursiveTimeout
* @namespace            js.function
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status          beta
*
* This utils function allows you to call a passed function each x time during a certain duration
*
* @param 		{Function} 		fn 				The function to execute
* @param 		{Number} 		timeout 		The time between each execution
* @param 		{Number} 		duration 		The duration of the timeout
* @param 		{Number}		[spread=0] 		An optional spread time that will be used to randomize the function executions times
* @return 		{Function} 		       		A function that you can use to clear the timeout before it ends by itself
*
* @todo          interface
* @todo          doc
* @todo          tests
*
* @example 		js
* import setRecursiveTimeout from '@coffeekraken/sugar/js/function/setRecursiveTimeout';
* setRecursiveTimeout(() => {
* 		// I will be executed 10 times
* }, 1000, 10000);
*
* @since           2.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/