var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var innerHtml_exports = {};
__export(innerHtml_exports, {
  default: () => innerHtml_default
});
module.exports = __toCommonJS(innerHtml_exports);
var import_uniqid = __toESM(require("../../../shared/string/uniqid"), 1);
var import_injectStyle = __toESM(require("../../dom/css/injectStyle"), 1);
var import_emptyNode = __toESM(require("../manipulate/emptyNode"), 1);
var import_convert = __toESM(require("../../../shared/time/convert"), 1);
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
    settings.animInDuration = (0, import_convert.default)(settings.animInDuration, "ms");
    settings.animOutDuration = (0, import_convert.default)(settings.animOutDuration, "ms");
    const _uniqid = (0, import_uniqid.default)();
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
        $styleAnimIn = (0, import_injectStyle.default)(sheetAnimIn);
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
        $styleAnimIn = (0, import_injectStyle.default)(sheetAnimInFadeUp);
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
        $styleAnimIn = (0, import_injectStyle.default)(sheetAnimInFadeDown);
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
        $styleAnimIn = (0, import_injectStyle.default)(sheetAnimInFadeLeft);
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
        $styleAnimIn = (0, import_injectStyle.default)(sheetAnimInFadeRight);
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
        $styleAnimOut = (0, import_injectStyle.default)(sheetAnimOutFade);
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
        $styleAnimOut = (0, import_injectStyle.default)(sheetAnimOutFadeUp);
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
        $styleAnimOut = (0, import_injectStyle.default)(sheetAnimOutFadeDown);
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
        $styleAnimOut = (0, import_injectStyle.default)(sheetAnimOutFadeLeft);
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
        $styleAnimOut = (0, import_injectStyle.default)(sheetAnimOutFadeRight);
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
            (0, import_emptyNode.default)(node).append(content);
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
