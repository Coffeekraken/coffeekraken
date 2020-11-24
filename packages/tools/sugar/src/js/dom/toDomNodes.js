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
        define(["require", "exports", "../string/strToHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    var strToHtml_1 = __importDefault(require("../string/strToHtml"));
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
    return toDomNodes;
});
