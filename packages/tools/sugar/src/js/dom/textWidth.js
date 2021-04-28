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
        define(["require", "exports", "./getStyleProperty"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    /**
     * @name      textWidth
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Get the text width in px of a passed string or the passed HTMLElement
     *
     * @param 		{String|HTMLElement}		source 		The source to process
     * @return 		{Number} 								The calculated width of the text
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import textWidth from '@coffeekraken/sugar/js/dom/textWidth'
     * // text of an HTMLElement
     * const width = textWidth(myCoolHTMLElement);
     *
     * // text directly (no font-size management so it's less accurate...)
     * const width = textWidth('Hello World');
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function textWidth(source) {
        // create an element
        const elm = document.createElement('span');
        elm.style.whiteSpace = 'nowrap';
        elm.style.position = 'absolute';
        elm.style.visibility = 'hidden';
        let text = source;
        // if the source if an html element
        if (source.tagName) {
            // set the text into the element
            const tagName = source.tagName.toLowerCase();
            switch (tagName) {
                case 'input':
                case 'textarea':
                    text = source.value;
                    break;
                default:
                    text = source.innerText;
                    break;
            }
            // get the font properties
            const fs = getStyleProperty_1.default(source, 'font-size');
            const ff = getStyleProperty_1.default(source, 'font-family');
            const ls = getStyleProperty_1.default(source, 'letter-spacing');
            elm.style.fontSize = fs;
            elm.style.fontFamily = ff;
            elm.style.letterSpacing = ls;
        }
        // replacing spaces
        text = text.replace(/ /g, '\u00a0');
        // set the element content
        elm.innerHTML = text;
        // append the element to the body
        document.body.appendChild(elm);
        // return the width of the element
        const width = elm.offsetWidth;
        // remove the element from the dom
        document.body.removeChild(elm);
        // return the width
        return width;
    }
    exports.default = textWidth;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFdpZHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS90ZXh0V2lkdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMEVBQW9EO0lBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTTtRQUN2QixvQkFBb0I7UUFDcEIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUM7UUFFbEIsbUNBQW1DO1FBQ25DLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixnQ0FBZ0M7WUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QyxRQUFRLE9BQU8sRUFBRTtnQkFDZixLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLFVBQVU7b0JBQ2IsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ3BCLE1BQU07Z0JBQ1I7b0JBQ0UsSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ3hCLE1BQU07YUFDVDtZQUVELDBCQUEwQjtZQUMxQixNQUFNLEVBQUUsR0FBRywwQkFBa0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDbkQsTUFBTSxFQUFFLEdBQUcsMEJBQWtCLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sRUFBRSxHQUFHLDBCQUFrQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hELEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1NBQzlCO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwQywwQkFBMEI7UUFDMUIsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsaUNBQWlDO1FBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLGtDQUFrQztRQUNsQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQzlCLGtDQUFrQztRQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixtQkFBbUI7UUFDbkIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=