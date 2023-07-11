// @ts-nocheck
import __stringToNode from '../html/stringToNode.js';
function processNodeElm(elm) {
    // check tpl type
    switch (elm.tagName.toLowerCase()) {
        case 'script':
            // grab the script content and convert it to html if needed
            return __stringToNode(elm.innerHTML);
            break;
        case 'template':
            // get the template content
            return document.importNode(elm.content, true);
            break;
        default:
            return elm;
            break;
    }
}
/**
 * @name      toDomNodes
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status        betas
 *
 * Return a usable nodeTree from a variable source like selector, an html string, an html template tag or a node that will be cloned.
 *
 * @param 			{String|HTMLElement} 			source 			The source of the template (html string, selector, node element)
 * @return 			{HTMLElement} 									An HTMLElement node tree that represent the template
 *
 * @snippet         __toDomNodes($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __toDomNodes } from '@coffeekraken/sugar/dom';
 * __toDomNodes('<span>Hello World</span>');
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __toDomNodes(source) {
    // if the source is an HTMLElement
    if (source.tagName) {
        return processNodeElm(source);
    }
    if (typeof source === 'string')
        source = source.trim();
    // check source type
    if (typeof source === 'string' &&
        source.substr(0, 1) === '<' &&
        source.substr(-1) === '>') {
        // The source is an html string source
        return __stringToNode(source);
    }
    // string selector
    if (typeof source === 'string') {
        // Try to get the template from the document
        const tpl = document.querySelector(source);
        // if don't found anything
        if (!tpl)
            return;
        // process the node
        return processNodeElm(tpl);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxTQUFTLGNBQWMsQ0FBQyxHQUFHO0lBQ3ZCLGlCQUFpQjtJQUNqQixRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDL0IsS0FBSyxRQUFRO1lBQ1QsMkRBQTJEO1lBQzNELE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxNQUFNO1FBQ1YsS0FBSyxVQUFVO1lBQ1gsMkJBQTJCO1lBQzNCLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlDLE1BQU07UUFDVjtZQUNJLE9BQU8sR0FBRyxDQUFDO1lBQ1gsTUFBTTtLQUNiO0FBQ0wsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDaEMsTUFBNEI7SUFFNUIsa0NBQWtDO0lBQ2xDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNoQixPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQztJQUVELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdkQsb0JBQW9CO0lBQ3BCLElBQ0ksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO1FBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQzNCO1FBQ0Usc0NBQXNDO1FBQ3RDLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBRUQsa0JBQWtCO0lBQ2xCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzVCLDRDQUE0QztRQUM1QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsR0FBRztZQUFFLE9BQU87UUFDakIsbUJBQW1CO1FBQ25CLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCO0FBQ0wsQ0FBQyJ9