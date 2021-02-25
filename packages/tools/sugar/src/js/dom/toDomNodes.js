// @ts-nocheck
import __strToHtml from '../string/strToHtml';
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
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Eb21Ob2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvRG9tTm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLFNBQVMsYUFBYSxDQUFDLE1BQU07SUFDM0IsT0FBTyxNQUFNO1NBQ1YsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDckIsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsR0FBRztJQUN6QixpQkFBaUI7SUFDakIsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ2pDLEtBQUssUUFBUTtZQUNYLDJEQUEyRDtZQUMzRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsTUFBTTtRQUNSLEtBQUssVUFBVTtZQUNiLDJCQUEyQjtZQUMzQixPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxNQUFNO1FBQ1I7WUFDRSxPQUFPLEdBQUcsQ0FBQztZQUNYLE1BQU07S0FDVDtBQUNILENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxVQUFVLENBQUMsTUFBTTtJQUN4QixrQ0FBa0M7SUFDbEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2xCLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9CO0lBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2RCxvQkFBb0I7SUFDcEIsSUFDRSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7UUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFDekI7UUFDQSxzQ0FBc0M7UUFDdEMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDNUI7SUFFRCxrQkFBa0I7SUFDbEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsNENBQTRDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUNqQixtQkFBbUI7UUFDbkIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==