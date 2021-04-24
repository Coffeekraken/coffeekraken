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
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
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
        var elm = document.createElement('span');
        elm.style.whiteSpace = 'nowrap';
        elm.style.position = 'absolute';
        elm.style.visibility = 'hidden';
        var text = source;
        // if the source if an html element
        if (source.tagName) {
            // set the text into the element
            var tagName = source.tagName.toLowerCase();
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
            var fs = getStyleProperty_1.default(source, 'font-size');
            var ff = getStyleProperty_1.default(source, 'font-family');
            var ls = getStyleProperty_1.default(source, 'letter-spacing');
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
        var width = elm.offsetWidth;
        // remove the element from the dom
        document.body.removeChild(elm);
        // return the width
        return width;
    }
    exports.default = textWidth;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFdpZHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGV4dFdpZHRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFvRDtJQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsU0FBUyxDQUFDLE1BQU07UUFDdkIsb0JBQW9CO1FBQ3BCLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBRWxCLG1DQUFtQztRQUNuQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsZ0NBQWdDO1lBQ2hDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0MsUUFBUSxPQUFPLEVBQUU7Z0JBQ2YsS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxVQUFVO29CQUNiLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNwQixNQUFNO2dCQUNSO29CQUNFLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO29CQUN4QixNQUFNO2FBQ1Q7WUFFRCwwQkFBMEI7WUFDMUIsSUFBTSxFQUFFLEdBQUcsMEJBQWtCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELElBQU0sRUFBRSxHQUFHLDBCQUFrQixDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNyRCxJQUFNLEVBQUUsR0FBRywwQkFBa0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUN4RCxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztTQUM5QjtRQUVELG1CQUFtQjtRQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlDQUFpQztRQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixrQ0FBa0M7UUFDbEMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUM5QixrQ0FBa0M7UUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsbUJBQW1CO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9