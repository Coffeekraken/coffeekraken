// @ts-nocheck

import __camelize from '../../shared/string/camelize';
import __autoCast from '../../shared/string/autoCast';

/**
 * @name      styleString2Object
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Transform a style string to an object representation
 *
 * @param 		{String} 				style 			The style string
 * @return 		(Object) 								The string object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import styleString2Object from '@coffeekraken/sugar/js/dom/styleString2Object'
 * const styleString = styleString2Object('padding-left:20px; display:block;');
 * // output => {
 * //		paddingLeft : '20px',
 * // 		display : 'block'
 * // }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function styleString2Object(style: string): any {
    if (!style || style === '') return {};
    const obj = {};
    const split = style.replace(/\s/g, '').split(';');
    split.forEach((statement) => {
        // split statement by key value pairs
        const spl = statement.split(':'),
            key = __camelize(spl[0]),
            value = spl[1];
        // add element into object
        obj[key] = __autoCast(value);
    });
    // return the style object
    return obj;
}
export default styleString2Object;
