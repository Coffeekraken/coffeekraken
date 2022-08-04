// @ts-nocheck
import __throttle from '../../shared/function/throttle';
function splitLines(elm, settings = {}) {
    settings = Object.assign({ tag: 'p', class: 'split-lines' }, settings);
    // apply again on resize
    window.addEventListener('resize', __throttle((e) => {
        _splitLines(elm, settings);
    }, 150));
    // first call
    _splitLines(elm, settings);
    return elm;
}
function _splitLines(elm, settings) {
    let string = elm._splitLinesOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitLinesOriginalString = string;
    }
    elm.classList.add(settings.class);
    // wrap each characters inside two spans
    let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
    words = words
        .map((word) => {
        return `<span class="s-split-lines">${word}</span>`;
    })
        .join(' ');
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
        return `<${settings.tag} class="${settings.class}__line">${lineStr}</${settings.tag}>`;
    })
        .join('');
}
export default splitLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQztBQTRDeEQsU0FBUyxVQUFVLENBQ2YsR0FBZ0IsRUFDaEIsV0FBeUMsRUFBRTtJQUUzQyxRQUFRLG1CQUNKLEdBQUcsRUFBRSxHQUFHLEVBQ1IsS0FBSyxFQUFFLGFBQWEsSUFDakIsUUFBUSxDQUNkLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsTUFBTSxDQUFDLGdCQUFnQixDQUNuQixRQUFRLEVBQ1IsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FDVixDQUFDO0lBRUYsYUFBYTtJQUNiLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFM0IsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVE7SUFDOUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO0tBQzFDO0lBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxDLHdDQUF3QztJQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUNwQiw2REFBNkQsQ0FDaEUsQ0FBQztJQUNGLEtBQUssR0FBRyxLQUFLO1NBQ1IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLCtCQUErQixJQUFJLFNBQVMsQ0FBQztJQUN4RCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUV0QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN6RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDL0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3BELElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUU7WUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEMsR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSztTQUNoQixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNiLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLFdBQVcsT0FBTyxLQUFLLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMzRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=