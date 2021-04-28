// @ts-nocheck
import _map from 'lodash/map';
import __throttle from '../../shared/function/throttle';
/**
 * @name      splitLines
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Split each lines inside an HTMLElement by scoping them inside some tags.
 * Here's an result sample for :
 * Hello
 * World
 *
 * ```html
 * <p class="s-split-lines">Hello</p>
 * <p class="s-split-lines">World</p>
 * ```
 *
 * @param 	{HTMLElement} 		elm 		 	The HTMLElement to split lines in
 * @param 	{String} 			[tag="p"] 		The tag to use to split the lines
 * @param 	{String} 			[tagClass="s-split-lines"] 		The class to apply on the tags
 * @return 	{HTMLElement} 						The HTMLElement processed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import splitLines from '@coffeekraken/sugar/js/dom/splitLines'
 * const myCoolElement = document.querySelector('.my-cool-element');
 * splitLines(myCoolElement);
 *
 * @since       1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitLines(elm, tag = 'p', tagClass = 'split-lines') {
    // apply again on resize
    window.addEventListener('resize', __throttle((e) => {
        _splitLines(elm, tag, tagClass);
    }, 150));
    // first call
    _splitLines(elm, tag, tagClass);
    return elm;
}
function _splitLines(elm, tag, tagClass) {
    let string = elm._splitLinesOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitLinesOriginalString = string;
    }
    elm.classList.add(tagClass);
    // wrap each characters inside two spans
    let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
    words = _map(words, (word) => {
        return `<span class="s-split-lines">${word}</span>`;
    }).join(' ');
    elm.innerHTML = words;
    const spans = elm.querySelectorAll('span.s-split-lines');
    let top = null;
    const lines = [];
    let line = [];
    [].forEach.call(spans, (spanElm) => {
        const spanTop = spanElm.getBoundingClientRect().top;
        if (top && spanTop !== top) {
            lines.push(line.join(' '));
            line = [];
        }
        line.push(spanElm.innerHTML.trim());
        top = spanTop;
    });
    lines.push(line.join(' '));
    elm.innerHTML = lines
        .map((lineStr) => {
        return `<${tag} class="${tagClass}__line">${lineStr}</${tag}>`;
    })
        .join('');
}
export default splitLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0TGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQUM5QixPQUFPLFVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxRQUFRLEdBQUcsYUFBYTtJQUMxRCx3QkFBd0I7SUFDeEIsTUFBTSxDQUFDLGdCQUFnQixDQUNyQixRQUFRLEVBQ1IsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDZixXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQ1IsQ0FBQztJQUVGLGFBQWE7SUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVoQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVE7SUFDckMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO0tBQ3hDO0lBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFNUIsd0NBQXdDO0lBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3RCLDZEQUE2RCxDQUM5RCxDQUFDO0lBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixPQUFPLCtCQUErQixJQUFJLFNBQVMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUV0QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN6RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3BELElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUU7WUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNYO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEMsR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSztTQUNsQixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNmLE9BQU8sSUFBSSxHQUFHLFdBQVcsUUFBUSxXQUFXLE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNqRSxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==