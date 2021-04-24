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
     * @namespace            js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Eb21Ob2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvRG9tTm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEVBQXdEO0lBRXhELFNBQVMsYUFBYSxDQUFDLE1BQU07UUFDM0IsT0FBTyxNQUFNO2FBQ1YsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7YUFDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7YUFDckIsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsU0FBUyxjQUFjLENBQUMsR0FBRztRQUN6QixpQkFBaUI7UUFDakIsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2pDLEtBQUssUUFBUTtnQkFDWCwyREFBMkQ7Z0JBQzNELE9BQU8sbUJBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFDUixLQUFLLFVBQVU7Z0JBQ2IsMkJBQTJCO2dCQUMzQixPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDOUMsTUFBTTtZQUNSO2dCQUNFLE9BQU8sR0FBRyxDQUFDO2dCQUNYLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxVQUFVLENBQUMsTUFBTTtRQUN4QixrQ0FBa0M7UUFDbEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV2RCxvQkFBb0I7UUFDcEIsSUFDRSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7WUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFDekI7WUFDQSxzQ0FBc0M7WUFDdEMsT0FBTyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLDRDQUE0QztZQUM1QyxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsR0FBRztnQkFBRSxPQUFPO1lBQ2pCLG1CQUFtQjtZQUNuQixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==