/**
*
* @name      textWidth
* @namespace            js.dom.utils
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Get the text width in px of a passed string or the passed HTMLElement
*
* @param 		{String|HTMLElement}		source 		The source to process
* @return 		{Number} 								The calculated width of the text
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import textWidth from '@coffeekraken/sugar/js/dom/textWidth'
* // text of an HTMLElement
* const width = textWidth(myCoolHTMLElement);
*
* // text directly (no font-size management so it's less accurate...)
* const width = textWidth('Hello World');
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/