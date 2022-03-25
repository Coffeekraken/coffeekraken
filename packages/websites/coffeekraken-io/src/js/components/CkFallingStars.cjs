var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var CkFallingStars_exports = {};
__export(CkFallingStars_exports, {
  default: () => CKFallingStars,
  define: () => define
});
module.exports = __toCommonJS(CkFallingStars_exports);
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_lit = require("lit");
class CKFallingStars extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
    this._starsCount = 0;
    this._maxCount = 10;
  }
  async firstUpdated() {
    for (let i = 0; i < this._maxCount; i++) {
      const left = `${Math.random() * 100}%`;
      const $starStyle = document.createElement("style");
      $starStyle.rel = "stylesheet";
      $starStyle.innerHTML = `
                @keyframes star-${i} {
                    0% {
                        top: -50px;
                        left: var(--left);
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        left: calc(var(--left) - ${10 + Math.round(Math.random() * 0)}%);
                        opacity: 0;
                    }
                }
                ck-falling-stars .__star-${i} {
                    animation: star-${i} var(--falling-time, 1s) ease-in forwards;
                }
            `;
      document.head.appendChild($starStyle);
    }
    this.new();
  }
  new() {
    this._starsCount++;
    const starId = Math.round(Math.random() * this._maxCount);
    const $star = document.createElement("div");
    $star.classList.add("__star");
    $star.classList.add(`__star-${starId}`);
    $star.classList.add(Math.random() < 0.5 ? "accent" : "complementary");
    const speed = 1 + Math.random() * 1.5;
    $star.style.setProperty("--left", `${Math.random() * 100}%`);
    $star.style.setProperty("--falling-time", `${speed}s`);
    $star.style.setProperty("--speed", speed);
    $star.style.setProperty("--scale", Math.random() * 2);
    setTimeout(() => {
      $star.remove();
    }, 5e3);
    this.appendChild($star);
    setTimeout(this.new.bind(this), Math.random() * 3500);
  }
  render() {
    return import_lit.html`
        `;
  }
}
function define(props = {}, tagName = "ck-falling-stars") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, CKFallingStars);
}
