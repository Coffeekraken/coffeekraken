"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function splitWords(elm, settings = {}) {
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
exports.default = splitWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQTJDZCxTQUFTLFVBQVUsQ0FDZixHQUFnQixFQUNoQixXQUF5QyxFQUFFO0lBRTNDLFFBQVEsbUJBQ0osR0FBRyxFQUFFLE1BQU0sRUFDWCxLQUFLLEVBQUUsYUFBYSxJQUNqQixRQUFRLENBQ2QsQ0FBQztJQUVGLGFBQWE7SUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTNCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRO0lBQzlCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztJQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztLQUMxQztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyx3Q0FBd0M7SUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDcEIsNkRBQTZELENBQ2hFLENBQUM7SUFDRixLQUFLLEdBQUcsS0FBSztTQUNSLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1YsT0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLFdBQVcsUUFBUSxDQUFDLEtBQUssV0FBVyxJQUFJLEtBQUssUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3hGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQzFCLENBQUM7QUFDRCxrQkFBZSxVQUFVLENBQUMifQ==