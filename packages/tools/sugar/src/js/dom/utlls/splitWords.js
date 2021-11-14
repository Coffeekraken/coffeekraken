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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRXb3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0V29yZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQTJDOUIsU0FBUyxVQUFVLENBQ2YsR0FBZ0IsRUFDaEIsV0FBeUMsRUFBRTtJQUUzQyxRQUFRLG1CQUNKLEdBQUcsRUFBRSxNQUFNLEVBQ1gsS0FBSyxFQUFFLGFBQWEsSUFDakIsUUFBUSxDQUNkLENBQUM7SUFFRixhQUFhO0lBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUzQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUTtJQUM5QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMseUJBQXlCLENBQUM7SUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxNQUFNLENBQUM7S0FDMUM7SUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbEMsd0NBQXdDO0lBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQ3BCLDZEQUE2RCxDQUNoRSxDQUFDO0lBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN6QixPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsS0FBSyxXQUFXLElBQUksS0FBSyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDeEYsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDMUIsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=