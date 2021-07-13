/**
*
* @name      styleObject2String
* @namespace            js.dom.style
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Transform a style object to inline string separated by ;
*
* @param 		{Object} 				styleObj 		An object of style to apply
* @return 		(String) 								The string style representation
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import styleObject2String from '@coffeekraken/sugar/js/dom/styleObject2String'
* const styleString = styleObject2String({
* 		paddingLeft : '20px',
* 		display : 'block'
* });
* // output => padding-left:20px; display:block;
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/