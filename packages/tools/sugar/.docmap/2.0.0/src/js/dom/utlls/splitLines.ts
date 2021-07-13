/**
*
* @name      splitLines
* @namespace            js.dom.utils
* @type      Function
* @platform          js
* @platform          ts
* @status      beta
*
* Split each lines inside an HTMLElement by scoping them inside some tags.
* Here's an result sample for :
* Hello
* World
*
* ```html
* <p class="s-split-lines">Hello</p>
* <p class="s-split-lines">World</p>
* ```
*
* @setting 	{String} 			[tag="p"] 		The tag to use to split the lines
* @setting 	{String} 			[class="s-split-lines"] 		The class to apply on the tags
*
* @param 	{HTMLElement} 		elm 		 	The HTMLElement to split lines in
* @param     {ISplitLinesSettings}       [settings={}]       Some settings to tweak the process
* @return 	{HTMLElement} 						The HTMLElement processed
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import splitLines from '@coffeekraken/sugar/js/dom/splitLines'
* const myCoolElement = document.querySelector('.my-cool-element');
* splitLines(myCoolElement);
*
* @since       1.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/