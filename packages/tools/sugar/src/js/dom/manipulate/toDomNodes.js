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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Eb21Ob2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvRG9tTm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBRXhELFNBQVMsYUFBYSxDQUFDLE1BQU07SUFDekIsT0FBTyxNQUFNO1NBQ1IsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDckIsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsR0FBRztJQUN2QixpQkFBaUI7SUFDakIsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQy9CLEtBQUssUUFBUTtZQUNULDJEQUEyRDtZQUMzRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsTUFBTTtRQUNWLEtBQUssVUFBVTtZQUNYLDJCQUEyQjtZQUMzQixPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxNQUFNO1FBQ1Y7WUFDSSxPQUFPLEdBQUcsQ0FBQztZQUNYLE1BQU07S0FDYjtBQUNMLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsVUFBVSxDQUFDLE1BQTRCO0lBQzVDLGtDQUFrQztJQUNsQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDaEIsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7SUFFRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXZELG9CQUFvQjtJQUNwQixJQUNJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztRQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUMzQjtRQUNFLHNDQUFzQztRQUN0QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5QjtJQUVELGtCQUFrQjtJQUNsQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM1Qiw0Q0FBNEM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQywwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPO1FBQ2pCLG1CQUFtQjtRQUNuQixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5QjtBQUNMLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9