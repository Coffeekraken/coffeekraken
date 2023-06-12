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
                    return `<${settings.tag}>${letter}</span>`;
                })
                    .join('');
                const $wrap = document.createElement(settings.tag);
                $wrap.innerHTML = newValue;
                Array.from($wrap.children).forEach((child) => child.classList.add(settings.letterClass));
                $wrap.classList.add(settings.class);
                node.after($wrap);
                node.remove();
            }
        });
    }
    process(elm.childNodes);
    return elm;
}
exports.default = __splitLetters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLFNBQVMsV0FBVyxDQUFDLElBQUk7SUFDckIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDckIsQ0FBQztBQThFRCxTQUF3QixjQUFjLENBQ2xDLEdBQWdCLEVBQ2hCLFdBQTJDLEVBQUU7SUFFN0MsUUFBUSxtQkFDSixHQUFHLEVBQUUsTUFBTSxFQUNYLEtBQUssRUFBRSxpQkFBaUIsRUFDeEIsV0FBVyxFQUFFLGdCQUFnQixJQUMxQixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztJQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQztLQUM1QztJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyxTQUFTLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtnQkFDM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVc7cUJBQzVCLEtBQUssQ0FBQyxFQUFFLENBQUM7cUJBQ1QsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ1osT0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksTUFBTSxTQUFTLENBQUM7Z0JBQy9DLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25ELEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUN6QyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQzVDLENBQUM7Z0JBQ0YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQTlDRCxpQ0E4Q0MifQ==