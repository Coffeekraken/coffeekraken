// @ts-nocheck
import __strToHtml from '../../html/strToHtml';
function processString(string) {
    return string
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&nbsp;/g, ' ');
}
function processNodeElm(elm) {
    // check tpl type
    switch (elm.tagName.toLowerCase()) {
        case 'script':
            // grab the script content and convert it to html if needed
            return __strToHtml(elm.innerHTML);
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __toDomNodes } from '@coffeekraken/sugar/dom';
 * __toDomNodes('<span>Hello World</span>');
 *
 * @since         1.0.0
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
        return __strToHtml(source);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUUvQyxTQUFTLGFBQWEsQ0FBQyxNQUFNO0lBQ3pCLE9BQU8sTUFBTTtTQUNSLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLEdBQUc7SUFDdkIsaUJBQWlCO0lBQ2pCLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUMvQixLQUFLLFFBQVE7WUFDVCwyREFBMkQ7WUFDM0QsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU07UUFDVixLQUFLLFVBQVU7WUFDWCwyQkFBMkI7WUFDM0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsTUFBTTtRQUNWO1lBQ0ksT0FBTyxHQUFHLENBQUM7WUFDWCxNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDaEMsTUFBNEI7SUFFNUIsa0NBQWtDO0lBQ2xDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNoQixPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQztJQUVELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdkQsb0JBQW9CO0lBQ3BCLElBQ0ksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO1FBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQzNCO1FBQ0Usc0NBQXNDO1FBQ3RDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlCO0lBRUQsa0JBQWtCO0lBQ2xCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzVCLDRDQUE0QztRQUM1QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsR0FBRztZQUFFLE9BQU87UUFDakIsbUJBQW1CO1FBQ25CLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCO0FBQ0wsQ0FBQyJ9