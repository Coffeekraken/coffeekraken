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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Eb21Ob2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RvbS90b0RvbU5vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDRFQUF3RDtJQUV4RCxTQUFTLGFBQWEsQ0FBQyxNQUFNO1FBQzNCLE9BQU8sTUFBTTthQUNWLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVMsY0FBYyxDQUFDLEdBQUc7UUFDekIsaUJBQWlCO1FBQ2pCLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNqQyxLQUFLLFFBQVE7Z0JBQ1gsMkRBQTJEO2dCQUMzRCxPQUFPLG1CQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNO1lBQ1IsS0FBSyxVQUFVO2dCQUNiLDJCQUEyQjtnQkFDM0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLE1BQU07WUFDUjtnQkFDRSxPQUFPLEdBQUcsQ0FBQztnQkFDWCxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsVUFBVSxDQUFDLE1BQU07UUFDeEIsa0NBQWtDO1FBQ2xDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtZQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkQsb0JBQW9CO1FBQ3BCLElBQ0UsT0FBTyxNQUFNLEtBQUssUUFBUTtZQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO1lBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQ3pCO1lBQ0Esc0NBQXNDO1lBQ3RDLE9BQU8sbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QjtRQUVELGtCQUFrQjtRQUNsQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5Qiw0Q0FBNEM7WUFDNUMsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQywwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLEdBQUc7Z0JBQUUsT0FBTztZQUNqQixtQkFBbUI7WUFDbkIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=