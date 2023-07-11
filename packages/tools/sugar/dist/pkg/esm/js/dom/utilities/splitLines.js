// @ts-nocheck
import __throttle from '../../../shared/function/throttle.js';
export default function __splitLines(elm, settings = {}) {
    settings = Object.assign({ tag: 'p', class: 'split-lines' }, settings);
    // apply again on resize
    window.addEventListener('resize', __throttle(150, (e) => {
        _splitLines(elm, settings);
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQThDOUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQ2hDLEdBQWdCLEVBQ2hCLFdBQXlDLEVBQUU7SUFFM0MsUUFBUSxtQkFDSixHQUFHLEVBQUUsR0FBRyxFQUNSLEtBQUssRUFBRSxhQUFhLElBQ2pCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsd0JBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDbkIsUUFBUSxFQUNSLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsQixXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFFRixhQUFhO0lBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUzQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUTtJQUM5QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMseUJBQXlCLENBQUM7SUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxNQUFNLENBQUM7S0FDMUM7SUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbEMsd0NBQXdDO0lBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3BCLDZEQUE2RCxDQUNoRSxDQUFDO0lBQ0YsS0FBSyxHQUFHLEtBQUs7U0FDUixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLE9BQU8sK0JBQStCLElBQUksU0FBUyxDQUFDO0lBQ3hELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBRXRCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3pELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztJQUNmLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMvQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDcEQsSUFBSSxHQUFHLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtZQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwQyxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFM0IsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLO1NBQ2hCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2IsT0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLFdBQVcsUUFBUSxDQUFDLEtBQUssV0FBVyxPQUFPLEtBQUssUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzNGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQixDQUFDIn0=