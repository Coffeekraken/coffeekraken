// @ts-nocheck
import _map from 'lodash/map';
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
    words = _map(words, (word) => {
        return `<${settings.tag} class="${settings.class}__word">${word}</${settings.tag}>`;
    }).join(' ');
    elm.innerHTML = words;
}
export default splitWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRXb3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0V29yZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQTRDOUIsU0FBUyxVQUFVLENBQUMsR0FBZ0IsRUFBRSxXQUF5QyxFQUFFO0lBRS9FLFFBQVEsbUJBQ04sR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxJQUM5QixRQUFRLENBQ1osQ0FBQztJQUVGLGFBQWE7SUFDYixXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTNCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRO0lBQ2hDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztJQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztLQUN4QztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyx3Q0FBd0M7SUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FDdEIsNkRBQTZELENBQzlELENBQUM7SUFDRixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzNCLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxLQUFLLFdBQVcsSUFBSSxLQUFLLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN0RixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN4QixDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==