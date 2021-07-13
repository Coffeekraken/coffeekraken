/**
*
* @name      splitWords
* @namespace            js.dom.utils
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Split each words inside an HTMLElement by scoping them inside some tags.
* Here's an result sample for :
* Hello World
*
* ```html
* <span class="s-split-words">Hello</span>
* <span class="s-split-words">World</span>
* ```
*
* @setting 	{String} 			[tag="p"] 		The tag to use to split the words
* @setting 	{String} 			[tagClass="s-split-lines"] 		The class to apply on the tags
*
* @param 	{HTMLElement} 		elm 		 	The HTMLElement to split words in
* @param     {ISplitWordsSettings}       [settings={}]       Some settings to tweak the process
* @return 	{HTMLElement} 						The HTMLElement processed
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import splitWords from '@coffeekraken/sugar/js/dom/splitLines'
* const myCoolElement = document.querySelector('.my-cool-element');
* splitWords(myCoolElement);
*
* @since       1.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/