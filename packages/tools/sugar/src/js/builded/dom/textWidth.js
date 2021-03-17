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
     * @namespace           sugar.js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFdpZHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZG9tL3RleHRXaWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBb0Q7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFNO1FBQ3ZCLG9CQUFvQjtRQUNwQixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUNoQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUVsQixtQ0FBbUM7UUFDbkMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLGdDQUFnQztZQUNoQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdDLFFBQVEsT0FBTyxFQUFFO2dCQUNmLEtBQUssT0FBTyxDQUFDO2dCQUNiLEtBQUssVUFBVTtvQkFDYixJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDcEIsTUFBTTtnQkFDUjtvQkFDRSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDeEIsTUFBTTthQUNUO1lBRUQsMEJBQTBCO1lBQzFCLElBQU0sRUFBRSxHQUFHLDBCQUFrQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNuRCxJQUFNLEVBQUUsR0FBRywwQkFBa0IsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDckQsSUFBTSxFQUFFLEdBQUcsMEJBQWtCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDeEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7U0FDOUI7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLDBCQUEwQjtRQUMxQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixpQ0FBaUM7UUFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0Isa0NBQWtDO1FBQ2xDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDOUIsa0NBQWtDO1FBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLG1CQUFtQjtRQUNuQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSxTQUFTLENBQUMifQ==