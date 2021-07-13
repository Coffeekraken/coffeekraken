/**
*
* @name      querySelector
* @namespace            js.dom.query
* @type      Function
* @platform          js
* @platform          ts
* @status      beta
*
* Enhanced proxy of the Element.querySelector function that let you specify
* if you want an element that is visible, or even that is in the viewport
*
* @feature       Specify if you want nodes that are only inside or outside the viewport
* @feature       Specify if you want nodes that are only visible or invisible
*
* @setting       {Boolean}       [visible=null]        Specify if you want only the visible nodes
* @setting       {Boolean}       [inViewport=null]     Specify if you want only the nodes that are in the viewport
* @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
*
* @param 		{String} 			selector 			The css selector to search
* @param 		{Object} 			settings	 		The settings of the query
* @return 		{HTMLElement} 							The founded element
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import querySelector from '@coffeekraken/sugar/js/dom/querySelector';
* // simple query
* const elm = querySelector('.a-cool-css-selector');
*
* // get an element that is in the viewport
* const elm = querySelector('.a-cool-css-selector', {
* 		inViewport : true
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/