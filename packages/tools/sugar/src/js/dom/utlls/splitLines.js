// @ts-nocheck
import _map from 'lodash/map';
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
        return `<${settings.tag} class="${settings.class}__line">${lineStr}</${settings.tag}>`;
    })
        .join('');
}
export default splitLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0TGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQUM5QixPQUFPLFVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQztBQTRDeEQsU0FBUyxVQUFVLENBQ2YsR0FBZ0IsRUFDaEIsV0FBeUMsRUFBRTtJQUUzQyxRQUFRLG1CQUNKLEdBQUcsRUFBRSxHQUFHLEVBQ1IsS0FBSyxFQUFFLGFBQWEsSUFDakIsUUFBUSxDQUNkLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsTUFBTSxDQUFDLGdCQUFnQixDQUNuQixRQUFRLEVBQ1IsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FDVixDQUFDO0lBRUYsYUFBYTtJQUNiLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFM0IsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVE7SUFDOUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO0tBQzFDO0lBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxDLHdDQUF3QztJQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUNwQiw2REFBNkQsQ0FDaEUsQ0FBQztJQUNGLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDekIsT0FBTywrQkFBK0IsSUFBSSxTQUFTLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFdEIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDekQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ2YsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNwRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUzQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUs7U0FDaEIsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDYixPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyxXQUFXLE9BQU8sS0FBSyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDM0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9