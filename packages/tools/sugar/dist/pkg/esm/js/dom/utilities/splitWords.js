// @ts-nocheck
export default function __splitWords(elm, settings = {}) {
    settings = Object.assign({ tag: 'span', class: 'split-words' }, settings);
    // first call
    _splitWords(elm, settings);
    return elm;
}
function _splitWords(elm, settings) {
    let string = elm._splitWordsOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitWordsOriginalString = string;
    }
    elm.classList.add(settings.class);
    // wrap each characters inside two spans
    let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
    words = words
        .map((word) => {
        return `<${settings.tag} class="${settings.class}__word">${word}</${settings.tag}>`;
    })
        .join(' ');
    elm.innerHTML = words;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUE2Q2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQ2hDLEdBQWdCLEVBQ2hCLFdBQXlDLEVBQUU7SUFFM0MsUUFBUSxtQkFDSixHQUFHLEVBQUUsTUFBTSxFQUNYLEtBQUssRUFBRSxhQUFhLElBQ2pCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsYUFBYTtJQUNiLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFM0IsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVE7SUFDOUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2QixHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDO0tBQzFDO0lBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxDLHdDQUF3QztJQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUNwQiw2REFBNkQsQ0FDaEUsQ0FBQztJQUNGLEtBQUssR0FBRyxLQUFLO1NBQ1IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyxXQUFXLElBQUksS0FBSyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDeEYsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDMUIsQ0FBQyJ9