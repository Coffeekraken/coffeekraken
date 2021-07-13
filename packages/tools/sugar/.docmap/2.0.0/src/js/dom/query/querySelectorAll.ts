/**
*
* @name      querySelectorAll
* @namespace            js.dom.query
* @type      Function
* @platform          js
* @platform          ts
* @status      beta
*
* Enhanced proxy of the Element.querySelectorAll function that let you specify
* if you want elements that are visible, or even that are in the viewport
*
* @feature       Specify if you want nodes that are only inside or outside the viewport
* @feature       Specify if you want nodes that are only visible or invisible
*
* @setting       {Boolean}       [visible=null]        Specify if you want only the visible nodes
* @setting       {Boolean}       [inViewport=null]     Specify if you want only the nodes that are in the viewport
* @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
*
* @param 		{String} 				selector 			The css selector to search
* @param 		{Object} 				settings	 		The settings of the query
* @return 		{Array}<HTMLElement> 						The founded elements
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import querySelectorAll from '@coffeekraken/sugar/js/dom/querySelectorAll';
* // simple query
* const elms = querySelectorAll('.a-cool-css-selector');
*
* // get elements that are in the viewport
* const elms = querySelectorAll('.a-cool-css-selector', {
* 		inViewport : true
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/