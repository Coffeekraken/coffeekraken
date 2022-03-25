var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __uniqid from "../../../shared/string/uniqid";
import __injectStyle from "../../dom/css/injectStyle";
import __emptyNode from "../manipulate/emptyNode";
import __convert from "../../../shared/time/convert";
function innerHtml(node, content, settings = {}) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({
      action: "replace",
      animIn: "fade",
      animOut: "fade",
      animInDuration: 300,
      animOutDuration: 150,
      animInDistance: 25,
      animOutDistance: 25,
      animInEasing: "ease-in-out",
      animOutEasing: "ease-in-out"
    }, settings);
    settings.animInDuration = __convert(settings.animInDuration, "ms");
    settings.animOutDuration = __convert(settings.animOutDuration, "ms");
    const _uniqid = __uniqid();
    const _animInClassName = `s-innerHtml-animIn-${_uniqid}`;
    const _animOutClassName = `s-innerHtml-animOut-${_uniqid}`;
    let $styleAnimIn, $styleAnimOut, $div;
    switch (settings.animIn) {
      case "fade":
        const sheetAnimIn = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        $styleAnimIn = __injectStyle(sheetAnimIn);
        break;
      case "fadeDown":
        const sheetAnimInFadeUp = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateY(-${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        $styleAnimIn = __injectStyle(sheetAnimInFadeUp);
        break;
      case "fadeUp":
        const sheetAnimInFadeDown = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateY(${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        $styleAnimIn = __injectStyle(sheetAnimInFadeDown);
        break;
      case "fadeRight":
        const sheetAnimInFadeLeft = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateX(-${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        $styleAnimIn = __injectStyle(sheetAnimInFadeLeft);
        break;
      case "fadeLeft":
        const sheetAnimInFadeRight = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateX(${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        $styleAnimIn = __injectStyle(sheetAnimInFadeRight);
        break;
    }
    switch (settings.animOut) {
      case "fade":
        const sheetAnimOutFade = `
          @keyframes animOut-${_uniqid} {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          .${_animOutClassName} {
            animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        $styleAnimOut = __injectStyle(sheetAnimOutFade);
        break;
      case "fadeUp":
        const sheetAnimOutFadeUp = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        $styleAnimOut = __injectStyle(sheetAnimOutFadeUp);
        break;
      case "fadeDown":
        const sheetAnimOutFadeDown = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        $styleAnimOut = __injectStyle(sheetAnimOutFadeDown);
        break;
      case "fadeLeft":
        const sheetAnimOutFadeLeft = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(-${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        $styleAnimOut = __injectStyle(sheetAnimOutFadeLeft);
        break;
      case "fadeRight":
        const sheetAnimOutFadeRight = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        $styleAnimOut = __injectStyle(sheetAnimOutFadeRight);
        break;
    }
    switch (settings.action) {
      case "replace":
        node.classList.add(_animOutClassName);
        setTimeout(() => {
          node.classList.remove(_animOutClassName);
          if (typeof content === "string") {
            node.innerHTML = content;
          } else {
            __emptyNode(node).append(content);
          }
          node.classList.add(_animInClassName);
          setTimeout(() => {
            resolve();
            node.classList.remove(_animInClassName);
            $styleAnimIn.parentNode.removeChild($styleAnimIn);
            $styleAnimOut.parentNode.removeChild($styleAnimOut);
          }, settings.animInDuration);
        }, settings.animOutDuration);
        break;
      case "append":
        $div = document.createElement("div");
        $div.classList.add(_animInClassName);
        if (typeof content === "string") {
          $div.innerHTML = content;
        } else {
          $div.append(content);
        }
        node.appendChild($div);
        setTimeout(() => {
          resolve();
          $div.classList.remove(_animInClassName);
          $styleAnimIn.parentNode.removeChild($styleAnimIn);
          $styleAnimOut.parentNode.removeChild($styleAnimOut);
        }, settings.animInDuration);
        break;
      case "prepend":
        $div = document.createElement("div");
        $div.classList.add(_animInClassName);
        if (typeof content === "string") {
          $div.innerHTML = content;
        } else {
          $div.append(content);
        }
        node.insertBefore($div, node.firstChild);
        setTimeout(() => {
          resolve();
          $div.classList.remove(_animInClassName);
          $styleAnimIn.parentNode.removeChild($styleAnimIn);
          $styleAnimOut.parentNode.removeChild($styleAnimOut);
        }, settings.animInDuration);
        break;
    }
  });
}
var innerHtml_default = innerHtml;
export {
  innerHtml_default as default
};
