// @ts-nocheck
import _map from 'lodash/map';
function _decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
function splitLetters(elm, settings = {}) {
    settings = Object.assign({ tag: 'span', class: 's-split-litters' }, settings);
    let string = elm._splitLettersOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitLettersOriginalString = string;
    }
    elm.classList.add(settings.class);
    // wrap each characters inside two spans
    let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
    // split words
    words = _map(words, (word) => {
        return `<${settings.tag} style="white-space:nowrap">${word}</${settings.tag}>`;
    }).join(' ');
    let letters = _decodeHtml(words).split('');
    let hasTagOpened = false;
    letters = _map(letters, (letter) => {
        // check if a tag has started
        if (letter === '<')
            hasTagOpened = true;
        else if (letter === '>') {
            hasTagOpened = false;
            return letter;
        }
        if (hasTagOpened)
            return letter;
        if (letter === ' ')
            letter = '&nbsp;';
        return `<${settings.tag} class="${settings.class}__letter-container"><${settings.tag} class="${settings.class}__letter">${letter}</${settings.tag}></${settings.tag}>`;
    });
    elm.innerHTML = letters.join('');
    return elm;
}
export default splitLetters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BsaXRMZXR0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFFOUIsU0FBUyxXQUFXLENBQUMsSUFBSTtJQUNyQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNyQixDQUFDO0FBNEVELFNBQVMsWUFBWSxDQUNqQixHQUFnQixFQUNoQixXQUEyQyxFQUFFO0lBRTdDLFFBQVEsbUJBQ0osR0FBRyxFQUFFLE1BQU0sRUFDWCxLQUFLLEVBQUUsaUJBQWlCLElBQ3JCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0lBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2QixHQUFHLENBQUMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDO0tBQzVDO0lBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxDLHdDQUF3QztJQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUNwQiw2REFBNkQsQ0FDaEUsQ0FBQztJQUVGLGNBQWM7SUFDZCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRywrQkFBK0IsSUFBSSxLQUFLLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNuRixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFYixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztJQUN6QixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQy9CLDZCQUE2QjtRQUM3QixJQUFJLE1BQU0sS0FBSyxHQUFHO1lBQUUsWUFBWSxHQUFHLElBQUksQ0FBQzthQUNuQyxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7WUFDckIsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUNELElBQUksWUFBWTtZQUFFLE9BQU8sTUFBTSxDQUFDO1FBQ2hDLElBQUksTUFBTSxLQUFLLEdBQUc7WUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLHdCQUF3QixRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLGFBQWEsTUFBTSxLQUFLLFFBQVEsQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzNLLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWpDLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsWUFBWSxDQUFDIn0=