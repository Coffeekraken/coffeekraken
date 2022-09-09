// @ts-nocheck
import __throttle from '../../shared/function/throttle';
export default function __splitLines(elm, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQztBQTRDeEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQ2hDLEdBQWdCLEVBQ2hCLFdBQXlDLEVBQUU7SUFFM0MsUUFBUSxtQkFDSixHQUFHLEVBQUUsR0FBRyxFQUNSLEtBQUssRUFBRSxhQUFhLElBQ2pCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsd0JBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDbkIsUUFBUSxFQUNSLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQ1YsQ0FBQztJQUVGLGFBQWE7SUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTNCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRO0lBQzlCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztJQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztLQUMxQztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyx3Q0FBd0M7SUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDcEIsNkRBQTZELENBQ2hFLENBQUM7SUFDRixLQUFLLEdBQUcsS0FBSztTQUNSLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1YsT0FBTywrQkFBK0IsSUFBSSxTQUFTLENBQUM7SUFDeEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFdEIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDekQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ2YsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNwRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUzQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUs7U0FDaEIsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDYixPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyxXQUFXLE9BQU8sS0FBSyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDM0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCLENBQUMifQ==