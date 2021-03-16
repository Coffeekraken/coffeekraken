// @ts-nocheck

import __uncamelize from '../../shared/string/uncamelize';

/**
 * @name      styleObject2String
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
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
function styleObject2String(styleObj) {
  // process the style object
  const propertiesArray = [];
  for (const key in styleObj) {
    const value = styleObj[key];
    // if the value is ''
    // mean that we need to get rid of
    if (value === undefined || value === '') {
      delete styleObj[key];
    } else {
      propertiesArray.push(`${__uncamelize(key)}:${value};`);
    }
  }
  // return the css text
  return propertiesArray.join(' ');
}
export default styleObject2String;
