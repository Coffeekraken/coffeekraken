// @ts-nocheck
import __strToHtml from '../../shared/string/strToHtml';
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
 * import toDomNodes from '@coffeekraken/sugar/js/dom/toDomNodes';
 * toDomNodes('<span>Hello World</span>');
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function toDomNodes(source) {
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
export default toDomNodes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RCxTQUFTLGFBQWEsQ0FBQyxNQUFNO0lBQ3pCLE9BQU8sTUFBTTtTQUNSLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLEdBQUc7SUFDdkIsaUJBQWlCO0lBQ2pCLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUMvQixLQUFLLFFBQVE7WUFDVCwyREFBMkQ7WUFDM0QsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU07UUFDVixLQUFLLFVBQVU7WUFDWCwyQkFBMkI7WUFDM0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsTUFBTTtRQUNWO1lBQ0ksT0FBTyxHQUFHLENBQUM7WUFDWCxNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxNQUE0QjtJQUM1QyxrQ0FBa0M7SUFDbEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2hCLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2RCxvQkFBb0I7SUFDcEIsSUFDSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7UUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFDM0I7UUFDRSxzQ0FBc0M7UUFDdEMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUI7SUFFRCxrQkFBa0I7SUFDbEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDNUIsNENBQTRDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUNqQixtQkFBbUI7UUFDbkIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUI7QUFDTCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==