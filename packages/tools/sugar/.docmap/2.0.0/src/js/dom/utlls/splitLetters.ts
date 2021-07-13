/**
*
* @name      splitLetters
* @namespace            js.dom.utils
* @type      Function
* @platform          js
* @platform          ts
* @status      beta
*
* Split each letters inside an HTMLElement by scoping them inside multiple tags.
* Here's an result sample for : Hello World
* ```html
* <span style="white-space:nowrap">
* 	<span class="split-letters">
* 		<span class="split-letters__letter">H</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">e</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">l</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">l</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">o</span>
* 	</span>
* </span>
* <span class="split-letters">
* 	<span class="split-letters__letter">&nbsp;</span>
* </span>
* <span style="white-space:nowrap">
* 	<span class="split-letters">
* 		<span class="split-letters__letter">W</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">o</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">r</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">l</span>
* 	</span>
* 	<span class="split-letters">
* 		<span class="split-letters__letter">d</span>
* 	</span>
* </span>
* ```
*
* @param 	{HTMLElement} 		elm 		 	The HTMLElement to split letters in
* @param     {ISplitLettersSettings}       [settings={}]       Some settings to tweak the process
* @return 	{HTMLElement} 						The HTMLElement processed
*
* @setting 	{String} 			[tag="span"] 	          The tag to use to split the letters
* @setting 	{String} 			[class="s-split-letters"] 		The class to apply on the tags
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
* const myCoolElement = document.querySelector('.my-cool-element');
* __splitLetters(myCoolElement);
*
* @since       1.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/