"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function _decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
function __splitLetters(elm, settings = {}) {
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
exports.default = __splitLetters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLFNBQVMsV0FBVyxDQUFDLElBQUk7SUFDckIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDckIsQ0FBQztBQThFRCxTQUF3QixjQUFjLENBQ2xDLEdBQWdCLEVBQ2hCLFdBQTJDLEVBQUU7SUFFN0MsUUFBUSxtQkFDSixHQUFHLEVBQUUsTUFBTSxFQUNYLEtBQUssRUFBRSxpQkFBaUIsSUFDckIsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsMkJBQTJCLENBQUM7SUFDN0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQywyQkFBMkIsR0FBRyxNQUFNLENBQUM7S0FDNUM7SUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbEMsd0NBQXdDO0lBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3BCLDZEQUE2RCxDQUNoRSxDQUFDO0lBRUYsY0FBYztJQUNkLEtBQUssR0FBRyxLQUFLO1NBQ1IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsK0JBQStCLElBQUksS0FBSyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkYsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUUzQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDekIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM3Qiw2QkFBNkI7UUFDN0IsSUFBSSxNQUFNLEtBQUssR0FBRztZQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDbkMsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ3JCLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDckIsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFDRCxJQUFJLFlBQVk7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNoQyxJQUFJLE1BQU0sS0FBSyxHQUFHO1lBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyx3QkFBd0IsUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyxhQUFhLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMzSyxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVqQyxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFoREQsaUNBZ0RDIn0=