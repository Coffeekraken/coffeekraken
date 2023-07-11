// @ts-nocheck

import __uncamelize from '../../../shared/string/uncamelize.js';

/**
 * @name      styleObject2String
 * @namespace            js.css.transform
 * @type      Function
 * @platform          js
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
 * @snippet         __styleObjectToString($1)
 *
 * @example 	js
 * import { __styleObjectToString } from '@coffeekraken/sugar/css'
 * const styleString =  __styleObjectToString({
 * 		paddingLeft : '20px',
 * 		display : 'block'
 * });
 * // output => padding-left:20px; display:block;
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __styleObjectToString(styleObj: any): string {
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
