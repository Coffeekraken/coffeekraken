/**
*
* @name      querySelectorLive
* @namespace            js.dom.query
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Observe the dom to get all the elements that matches a passed css selector at any point in time.
* Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
* when you don't have the chance to use the custom elements API instead
*
* @feature         Specify what you want to select and get notified each time a node like this appears in the dom
* @feature         Promise based API
* @feature         Callback support
* @feature         Monitor added nodes and existing nodes that have class and id attributes updated
*
* @param	{String} 		selector 		The css selector that we are interested in
* @param 	{Function} 		cb 				The function to call with the newly added node
* @param 	{Object} 		[settings={}] 	An optional settings object to specify things like the rootNode to monitor, etc...
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'
* querySelectorLive('.my-cool-item', (node, clearFn) => {
* 	// do something here with the detected node
*  // call clearFn if you want to stop listening for this selector
*  clearFn();
* });
*
* @since       1.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/