"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
    words = words
        .map((word) => {
        return `<${settings.tag} style="white-space:nowrap">${word}</${settings.tag}>`;
    })
        .join(' ');
    let letters = _decodeHtml(words).split('');
    let hasTagOpened = false;
    letters = letters.map((letter) => {
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
exports.default = splitLetters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLFNBQVMsV0FBVyxDQUFDLElBQUk7SUFDckIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDckIsQ0FBQztBQTRFRCxTQUFTLFlBQVksQ0FDakIsR0FBZ0IsRUFDaEIsV0FBMkMsRUFBRTtJQUU3QyxRQUFRLG1CQUNKLEdBQUcsRUFBRSxNQUFNLEVBQ1gsS0FBSyxFQUFFLGlCQUFpQixJQUNyQixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztJQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQztLQUM1QztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyx3Q0FBd0M7SUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDcEIsNkRBQTZELENBQ2hFLENBQUM7SUFFRixjQUFjO0lBQ2QsS0FBSyxHQUFHLEtBQUs7U0FDUixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRywrQkFBK0IsSUFBSSxLQUFLLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNuRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztJQUN6QixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQzdCLDZCQUE2QjtRQUM3QixJQUFJLE1BQU0sS0FBSyxHQUFHO1lBQUUsWUFBWSxHQUFHLElBQUksQ0FBQzthQUNuQyxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7WUFDckIsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUNELElBQUksWUFBWTtZQUFFLE9BQU8sTUFBTSxDQUFDO1FBQ2hDLElBQUksTUFBTSxLQUFLLEdBQUc7WUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLHdCQUF3QixRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLGFBQWEsTUFBTSxLQUFLLFFBQVEsQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzNLLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWpDLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGtCQUFlLFlBQVksQ0FBQyJ9