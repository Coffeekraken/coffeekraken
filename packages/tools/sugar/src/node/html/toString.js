"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            toString
 * @namespace           sugar.js.html
 * @type      Function
 * @stable
 *
 * Return the string version of a dom node or the dom node and his children
 *
 * @param    {HTMLElement}    html    The HTMLElement to convert to string
 * @param    {Boolean}    [deep=true]    Include or not his children
 * @return    {String}    The string version of the dom node
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * const myDomNode = document.querySelector('.my-dom-node')
 * toString(myDomNode, false) // <div class="my-dom-node"></div>
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toStringFn(html, deep = true) {
    if (document !== undefined && document.createElement !== undefined) {
        const cont = document.createElement('div');
        cont.appendChild(html.cloneNode(deep));
        return cont.innerHTML;
    }
    return html;
}
exports.default = toStringFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7SUFDbkMsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1FBQ2xFLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=