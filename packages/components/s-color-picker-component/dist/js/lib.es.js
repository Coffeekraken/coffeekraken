import __SLitComponent from "@coffeekraken/s-lit-component";
import __Pickr from "@simonwep/pickr";
import {css, unsafeCSS, html} from "lit";
import __SInterface from "@coffeekraken/s-interface";
function plainObject(object) {
  if (!object)
    return false;
  if (typeof object !== "object")
    return false;
  if (object.constructor && object.constructor.name !== "Object")
    return false;
  if (Object.prototype.toString.call(object) !== "[object Object]")
    return false;
  if (object !== Object(object))
    return false;
  return true;
}
function __deepMerge(...args) {
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
      return secondObj;
    if (!secondObj && firstObj)
      return firstObj;
    if (!firstObj && !secondObj)
      return {};
    const firstProps = Object.getOwnPropertyNames(firstObj);
    firstProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(firstObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = firstObj[key];
      }
    });
    const secondProps = Object.getOwnPropertyNames(secondObj);
    secondProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else if (plainObject(newObj[key]) && plainObject(secondObj[key])) {
        newObj[key] = merge(newObj[key], secondObj[key]);
      } else {
        newObj[key] = secondObj[key];
      }
    });
    return newObj;
  }
  let currentObj = {};
  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i];
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
var __baseCss = `/*! Pickr 1.8.1 MIT | https://github.com/Simonwep/pickr */.pickr{position:relative;overflow:visible;transform:translateY(0)}.pickr *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}.pickr .pcr-button{position:relative;height:2em;width:2em;padding:.5em;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;border-radius:.15em;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="%2342445A" stroke-width="5px" stroke-linecap="round"><path d="M45,45L5,5"></path><path d="M45,5L5,45"></path></svg>') no-repeat 50%;background-size:0;transition:all .3s}.pickr .pcr-button:before{background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;z-index:-1;z-index:auto}.pickr .pcr-button:after,.pickr .pcr-button:before{position:absolute;content:"";top:0;left:0;width:100%;height:100%;border-radius:.15em}.pickr .pcr-button:after{transition:background .3s;background:var(--pcr-color)}.pickr .pcr-button.clear{background-size:70%}.pickr .pcr-button.clear:before{opacity:0}.pickr .pcr-button.clear:focus{box-shadow:0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px var(--pcr-color)}.pickr .pcr-button.disabled{cursor:not-allowed}.pcr-app *,.pickr *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}.pcr-app button.pcr-active,.pcr-app button:focus,.pcr-app input.pcr-active,.pcr-app input:focus,.pickr button.pcr-active,.pickr button:focus,.pickr input.pcr-active,.pickr input:focus{box-shadow:0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px var(--pcr-color)}.pcr-app .pcr-palette,.pcr-app .pcr-slider,.pickr .pcr-palette,.pickr .pcr-slider{transition:box-shadow .3s}.pcr-app .pcr-palette:focus,.pcr-app .pcr-slider:focus,.pickr .pcr-palette:focus,.pickr .pcr-slider:focus{box-shadow:0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px rgba(0,0,0,.25)}.pcr-app{position:fixed;display:flex;flex-direction:column;z-index:10000;border-radius:.1em;background:#fff;opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;box-shadow:0 .15em 1.5em 0 rgba(0,0,0,.1),0 0 1em 0 rgba(0,0,0,.03);left:0;top:0}.pcr-app.visible{transition:opacity .3s;visibility:visible;opacity:1}.pcr-app .pcr-swatches{display:flex;flex-wrap:wrap;margin-top:.75em}.pcr-app .pcr-swatches.pcr-last{margin:0}@supports (display:grid){.pcr-app .pcr-swatches{display:grid;align-items:center;grid-template-columns:repeat(auto-fit,1.75em)}}.pcr-app .pcr-swatches>button{font-size:1em;position:relative;width:calc(1.75em - 5px);height:calc(1.75em - 5px);border-radius:.15em;cursor:pointer;margin:2.5px;flex-shrink:0;justify-self:center;transition:all .15s;overflow:hidden;background:transparent;z-index:1}.pcr-app .pcr-swatches>button:before{position:absolute;content:"";top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:6px;border-radius:.15em;z-index:-1}.pcr-app .pcr-swatches>button:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:var(--pcr-color);border:1px solid rgba(0,0,0,.05);border-radius:.15em;box-sizing:border-box}.pcr-app .pcr-swatches>button:hover{filter:brightness(1.05)}.pcr-app .pcr-swatches>button:not(.pcr-active){box-shadow:none}.pcr-app .pcr-interaction{display:flex;flex-wrap:wrap;align-items:center;margin:0 -.2em}.pcr-app .pcr-interaction>*{margin:0 .2em}.pcr-app .pcr-interaction input{letter-spacing:.07em;font-size:.75em;text-align:center;cursor:pointer;color:#75797e;background:#f1f3f4;border-radius:.15em;transition:all .15s;padding:.45em .5em;margin-top:.75em}.pcr-app .pcr-interaction input:hover{filter:brightness(.975)}.pcr-app .pcr-interaction input:focus{box-shadow:0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px rgba(66,133,244,.75)}.pcr-app .pcr-interaction .pcr-result{color:#75797e;text-align:left;flex:1 1 8em;min-width:8em;transition:all .2s;border-radius:.15em;background:#f1f3f4;cursor:text}.pcr-app .pcr-interaction .pcr-result::-moz-selection{background:#4285f4;color:#fff}.pcr-app .pcr-interaction .pcr-result::selection{background:#4285f4;color:#fff}.pcr-app .pcr-interaction .pcr-type.active{color:#fff;background:#4285f4}.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear,.pcr-app .pcr-interaction .pcr-save{width:auto;color:#fff}.pcr-app .pcr-interaction .pcr-cancel:hover,.pcr-app .pcr-interaction .pcr-clear:hover,.pcr-app .pcr-interaction .pcr-save:hover{filter:brightness(.925)}.pcr-app .pcr-interaction .pcr-save{background:#4285f4}.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear{background:#f44250}.pcr-app .pcr-interaction .pcr-cancel:focus,.pcr-app .pcr-interaction .pcr-clear:focus{box-shadow:0 0 0 1px hsla(0,0%,100%,.85),0 0 0 3px rgba(244,66,80,.75)}.pcr-app .pcr-selection .pcr-picker{position:absolute;height:18px;width:18px;border:2px solid #fff;border-radius:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcr-app .pcr-selection .pcr-color-chooser,.pcr-app .pcr-selection .pcr-color-opacity,.pcr-app .pcr-selection .pcr-color-palette{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;flex-direction:column;cursor:grab;cursor:-webkit-grab}.pcr-app .pcr-selection .pcr-color-chooser:active,.pcr-app .pcr-selection .pcr-color-opacity:active,.pcr-app .pcr-selection .pcr-color-palette:active{cursor:grabbing;cursor:-webkit-grabbing}.pcr-app[data-theme=nano]{width:14.25em;max-width:95vw}.pcr-app[data-theme=nano] .pcr-swatches{margin-top:.6em;padding:0 .6em}.pcr-app[data-theme=nano] .pcr-interaction{padding:0 .6em .6em}.pcr-app[data-theme=nano] .pcr-selection{display:grid;grid-gap:.6em;grid-template-columns:1fr 4fr;grid-template-rows:5fr auto auto;align-items:center;height:10.5em;width:100%;align-self:flex-start}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-preview{grid-area:2/1/4/1;height:100%;width:100%;display:flex;flex-direction:row;justify-content:center;margin-left:.6em}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-preview .pcr-last-color{display:none}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-preview .pcr-current-color{position:relative;background:var(--pcr-color);width:2em;height:2em;border-radius:50em;overflow:hidden}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-preview .pcr-current-color:before{position:absolute;content:"";top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-palette{grid-area:1/1/2/3;width:100%;height:100%;z-index:1}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-palette .pcr-palette{border-radius:.15em;width:100%;height:100%}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-palette .pcr-palette:before{position:absolute;content:"";top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-chooser{grid-area:2/2/2/2}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-opacity{grid-area:3/2/3/2}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-chooser,.pcr-app[data-theme=nano] .pcr-selection .pcr-color-opacity{height:.5em;margin:0 .6em}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-chooser .pcr-picker,.pcr-app[data-theme=nano] .pcr-selection .pcr-color-opacity .pcr-picker{top:50%;transform:translateY(-50%)}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-chooser .pcr-slider,.pcr-app[data-theme=nano] .pcr-selection .pcr-color-opacity .pcr-slider{flex-grow:1;border-radius:50em}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-chooser .pcr-slider{background:linear-gradient(90deg,red,#ff0,#0f0,#0ff,#00f,#f0f,red)}.pcr-app[data-theme=nano] .pcr-selection .pcr-color-opacity .pcr-slider{background:linear-gradient(90deg,transparent,#000),url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:100%,.25em}`;
var __css = ".s-color-picker[default-style] {\n}\n\ns-color-picker:not([mounted]) > * {\n        display: none;\n    }\n\n[default-style] .s-color-picker__picker {\n        background: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surface-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surface-a, 1));\n        overflow: hidden;box-shadow: var(--s-theme-ui-colorPicker-depth, 0);\n        border-radius: var(--s-theme-ui-colorPicker-borderRadius, 6px);\n        padding-inline: calc(var(--s-theme-ui-colorPicker-paddingInline, 0.75em) * var(--s-scale, 1));\n        padding-block: calc(var(--s-theme-ui-colorPicker-paddingBlock, 0.375em) * var(--s-scale, 1));\n    }\n\n.pickr.s-color-picker__preview {\n    display: inline-block;\n    outline: none;\n    border-radius: 0 !important;\n}\n\n[default-style] .pickr.s-color-picker__preview {\n        transition: var(--s-theme-transition-fast, all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995));\n    }\n\n.pickr.s-color-picker__preview button:focus {\n        display: none;\n    }\n\n.pickr.s-color-picker__preview button {\n        width: 1em;\n        height: 1em;\n        border-radius: 0 !important;\n    }\n\n.pickr.s-color-picker__preview button:before,\n        .pickr.s-color-picker__preview button:after {\n            border-radius: 0 !important;\n        }\n";
class SColorPickerComponentInterface extends __SInterface {
}
SColorPickerComponentInterface.definition = {
  value: {
    type: "String",
    default: "#ff0000"
  }
};
class SColorPicker extends __SLitComponent {
  static get properties() {
    return __SLitComponent.properties({}, SColorPickerComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}
        `;
  }
  constructor() {
    super(__deepMerge({
      sLitComponent: {},
      sComponentUtils: {
        interface: SColorPickerComponentInterface
      }
    }));
  }
  firstUpdated() {
    var _a, _b, _c, _d;
    console.log(this.props);
    const pickr = __Pickr.create({
      el: (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".s-color-picker__preview"),
      theme: "nano",
      container: (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(".s-color-picker__picker-wrapper"),
      default: this.props.value,
      comparison: false,
      swatches: [],
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          input: true,
          clear: true
        }
      }
    });
    function getPickrState() {
      const color = pickr.getColor();
      const hsla = color.toHSLA(), hsva = color.toHSVA(), rgba = color.toRGBA(), hex = color.toHEXA(), cmyk = color.toCMYK();
      return {
        isOpened: pickr.isOpen(),
        hsla: {
          h: hsla[0],
          s: hsla[1],
          l: hsla[2],
          a: hsla[3],
          string: `hsla(${hsla[0]},${hsla[1]},${hsla[2]},${hsla[3]})`
        },
        hsva: {
          h: hsva[0],
          s: hsva[1],
          v: hsva[2],
          a: hsva[3],
          string: `hsva(${hsva[0]},${hsva[1]},${hsva[2]},${hsva[3]})`
        },
        rgba: {
          r: rgba[0],
          g: rgba[1],
          b: rgba[2],
          a: rgba[3],
          string: `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`
        },
        hex: hex.toString(),
        cmyk: {
          c: cmyk[0],
          m: cmyk[1],
          y: cmyk[2],
          k: cmyk[3],
          string: `cmyk(${cmyk[0]},${cmyk[1]},${cmyk[2]},${cmyk[3]})`
        }
      };
    }
    pickr.on("change", () => {
      pickr.applyColor();
      const detail = getPickrState();
      const change = new CustomEvent("change", {
        detail
      });
      this.dispatchEvent(change);
    });
    pickr.on("show", () => {
      const detail = getPickrState();
      const change = new CustomEvent("show", {
        detail
      });
      this.dispatchEvent(change);
    });
    pickr.on("hide", () => {
      const detail = getPickrState();
      const change = new CustomEvent("hide", {
        detail
      });
      this.dispatchEvent(change);
    });
    pickr.on("cancel", () => {
      const detail = getPickrState();
      const change = new CustomEvent("cancel", {
        detail
      });
      this.dispatchEvent(change);
    });
    const $app = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(".pcr-app");
    $app === null || $app === void 0 ? void 0 : $app.classList.add(this.componentUtils.className("__picker"));
    const $preview = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector(".pickr");
    $preview === null || $preview === void 0 ? void 0 : $preview.classList.add(this.componentUtils.className("__preview"));
  }
  render() {
    return html`
            <div class="${this.componentUtils.className("")}">
                <div class="${this.componentUtils.className("__picker-wrapper")}"></div>
                <div class="${this.componentUtils.className("__preview")}"></div>
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-color-picker") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SColorPicker);
}
export default SColorPicker;
export {define};
