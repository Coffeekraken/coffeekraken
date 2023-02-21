"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
            return (0, dom_1.__stringToNode)(elm.innerHTML);
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
 @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __toDomNodes(source) {
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
        return (0, dom_1.__stringToNode)(source);
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
exports.default = __toDomNodes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUF5RDtBQUV6RCxTQUFTLGFBQWEsQ0FBQyxNQUFNO0lBQ3pCLE9BQU8sTUFBTTtTQUNSLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLEdBQUc7SUFDdkIsaUJBQWlCO0lBQ2pCLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUMvQixLQUFLLFFBQVE7WUFDVCwyREFBMkQ7WUFDM0QsT0FBTyxJQUFBLG9CQUFjLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU07UUFDVixLQUFLLFVBQVU7WUFDWCwyQkFBMkI7WUFDM0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsTUFBTTtRQUNWO1lBQ0ksT0FBTyxHQUFHLENBQUM7WUFDWCxNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixZQUFZLENBQ2hDLE1BQTRCO0lBRTVCLGtDQUFrQztJQUNsQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDaEIsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7SUFFRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXZELG9CQUFvQjtJQUNwQixJQUNJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztRQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUMzQjtRQUNFLHNDQUFzQztRQUN0QyxPQUFPLElBQUEsb0JBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQztLQUNqQztJQUVELGtCQUFrQjtJQUNsQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM1Qiw0Q0FBNEM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQywwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPO1FBQ2pCLG1CQUFtQjtRQUNuQixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5QjtBQUNMLENBQUM7QUE3QkQsK0JBNkJDIn0=