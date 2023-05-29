"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function _decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
function __splitLetters(elm, settings = {}) {
    settings = Object.assign({ tag: 'span', class: 's-split-letters', letterClass: 's-split-letter' }, settings);
    let string = elm._splitLettersOriginalString;
    if (!string) {
        string = elm.innerHTML;
        elm._splitLettersOriginalString = string;
    }
    elm.classList.add(settings.class);
    function process(nodes) {
        nodes.forEach((node) => {
            if (node.childNodes.length) {
                process(node.childNodes);
            }
            if (node.nodeName === '#text') {
                const newValue = node.textContent
                    .split('')
                    .map((letter) => {
                    return `<${settings.tag} class="${settings.letterClass}">${letter}</span>`;
                })
                    .join('');
                const $wrap = document.createElement(settings.tag);
                $wrap.innerHTML = newValue;
                $wrap.classList.add(settings.class);
                node.after($wrap);
                node.remove();
            }
        });
    }
    process(elm.childNodes);
    return elm;
    // wrap each characters inside two spans
    let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
    _console.log(words);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLFNBQVMsV0FBVyxDQUFDLElBQUk7SUFDckIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDckIsQ0FBQztBQThFRCxTQUF3QixjQUFjLENBQ2xDLEdBQWdCLEVBQ2hCLFdBQTJDLEVBQUU7SUFFN0MsUUFBUSxtQkFDSixHQUFHLEVBQUUsTUFBTSxFQUNYLEtBQUssRUFBRSxpQkFBaUIsRUFDeEIsV0FBVyxFQUFFLGdCQUFnQixJQUMxQixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztJQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQztLQUM1QztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyxTQUFTLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtnQkFDM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVc7cUJBQzVCLEtBQUssQ0FBQyxFQUFFLENBQUM7cUJBQ1QsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ1osT0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLFdBQVcsUUFBUSxDQUFDLFdBQVcsS0FBSyxNQUFNLFNBQVMsQ0FBQztnQkFDL0UsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDZCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4QixPQUFPLEdBQUcsQ0FBQztJQUVYLHdDQUF3QztJQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUNwQiw2REFBNkQsQ0FDaEUsQ0FBQztJQUVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEIsY0FBYztJQUNkLEtBQUssR0FBRyxLQUFLO1NBQ1IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsK0JBQStCLElBQUksS0FBSyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkYsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUUzQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDekIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM3Qiw2QkFBNkI7UUFDN0IsSUFBSSxNQUFNLEtBQUssR0FBRztZQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDbkMsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ3JCLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDckIsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFDRCxJQUFJLFlBQVk7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNoQyxJQUFJLE1BQU0sS0FBSyxHQUFHO1lBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyx3QkFBd0IsUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyxhQUFhLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMzSyxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVqQyxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUE1RUQsaUNBNEVDIn0=