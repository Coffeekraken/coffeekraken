// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/string/strToHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var strToHtml_1 = __importDefault(require("../../shared/string/strToHtml"));
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
                return strToHtml_1.default(elm.innerHTML);
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
            return strToHtml_1.default(source);
        }
        // string selector
        if (typeof source === 'string') {
            // Try to get the template from the document
            var tpl = document.querySelector(source);
            // if don't found anything
            if (!tpl)
                return;
            // process the node
            return processNodeElm(tpl);
        }
    }
    exports.default = toDomNodes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Eb21Ob2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vdG9Eb21Ob2Rlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0RUFBd0Q7SUFFeEQsU0FBUyxhQUFhLENBQUMsTUFBTTtRQUMzQixPQUFPLE1BQU07YUFDVixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTLGNBQWMsQ0FBQyxHQUFHO1FBQ3pCLGlCQUFpQjtRQUNqQixRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDakMsS0FBSyxRQUFRO2dCQUNYLDJEQUEyRDtnQkFDM0QsT0FBTyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUNSLEtBQUssVUFBVTtnQkFDYiwyQkFBMkI7Z0JBQzNCLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxNQUFNO1lBQ1I7Z0JBQ0UsT0FBTyxHQUFHLENBQUM7Z0JBQ1gsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxNQUFNO1FBQ3hCLGtDQUFrQztRQUNsQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXZELG9CQUFvQjtRQUNwQixJQUNFLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztZQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUN6QjtZQUNBLHNDQUFzQztZQUN0QyxPQUFPLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsNENBQTRDO1lBQzVDLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU87WUFDakIsbUJBQW1CO1lBQ25CLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9