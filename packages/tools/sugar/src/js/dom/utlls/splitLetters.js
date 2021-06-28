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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BsaXRMZXR0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFFOUIsU0FBUyxXQUFXLENBQUMsSUFBSTtJQUN2QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNuQixDQUFDO0FBNkVELFNBQVMsWUFBWSxDQUFDLEdBQWdCLEVBQUUsV0FBMkMsRUFBRTtJQUVuRixRQUFRLG1CQUNOLEdBQUcsRUFBRSxNQUFNLEVBQ1gsS0FBSyxFQUFFLGlCQUFpQixJQUNyQixRQUFRLENBQ1osQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztJQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQztLQUMxQztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyx3Q0FBd0M7SUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDdEIsNkRBQTZELENBQzlELENBQUM7SUFFRixjQUFjO0lBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsK0JBQStCLElBQUksS0FBSyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDakYsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWIsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUUzQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDekIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNqQyw2QkFBNkI7UUFDN0IsSUFBSSxNQUFNLEtBQUssR0FBRztZQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDbkMsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDckIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELElBQUksWUFBWTtZQUFFLE9BQU8sTUFBTSxDQUFDO1FBQ2hDLElBQUksTUFBTSxLQUFLLEdBQUc7WUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLHdCQUF3QixRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLGFBQWEsTUFBTSxLQUFLLFFBQVEsQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3pLLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWpDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUNELGVBQWUsWUFBWSxDQUFDIn0=