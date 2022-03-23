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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var SSidePanelComponent_exports = {};
__export(SSidePanelComponent_exports, {
  default: () => SSidePanel,
  define: () => define
});
module.exports = __toCommonJS(SSidePanelComponent_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_SSidePanelComponentInterface = __toESM(require("./interface/SSidePanelComponentInterface"), 1);
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_hotkey = __toESM(require("@coffeekraken/sugar/js/keyboard/hotkey"), 1);
var import_s_side_panel = __toESM(require("../css/s-side-panel.css"), 1);
class SSidePanel extends import_s_lit_component.default {
  static get properties() {
    return import_s_lit_component.default.properties({}, import_SSidePanelComponentInterface.default);
  }
  static get styles() {
    return import_lit.css`
            ${(0, import_lit.unsafeCSS)(import_s_side_panel.default)}
        `;
  }
  set active(value) {
    this._active = value;
    if (value && this.constructor._activePanels.indexOf(this) === -1) {
      this.constructor._activePanels.push(this);
    }
    if (value) {
      this.setAttribute("active", true);
    } else
      this.removeAttribute("active");
    this.requestUpdate();
  }
  get active() {
    return this._active;
  }
  constructor() {
    super((0, import_deepMerge.default)({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: import_SSidePanelComponentInterface.default
      }
    }));
    if (this.props.closeOn.indexOf("click") !== -1) {
      this.addEventListener("click", (e) => {
        if (this._$container.contains(e.target))
          return;
        if (this.constructor._activePanels.slice(-1)[0] !== this)
          return;
        this.constructor._activePanels.pop();
        this.active = false;
      });
    }
    if (this.props.closeOn.indexOf("escape") !== -1) {
      (0, import_hotkey.default)("escape").on("press", () => {
        if (this.constructor._activePanels.slice(-1)[0] !== this)
          return;
        this.constructor._activePanels.pop();
        this.active = false;
      });
    }
    this._$nodes = Array.from(this.children);
    if (this.props.triggerer) {
      const $triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
      $triggerers.forEach(($triggerer) => {
        $triggerer.addEventListener("click", (e) => {
          this.open();
        });
      });
    }
  }
  firstUpdated() {
    this._$container = this.querySelector(".s-side-panel__container");
    this._$nodes.forEach(($node) => {
      var _a;
      (_a = this._$container) == null ? void 0 : _a.appendChild($node);
    });
  }
  open() {
    this.active = true;
  }
  close() {
    this.active = false;
  }
  render() {
    return import_lit.html`
            ${this.overlay ? import_lit.html` <div class="${this.componentUtils.className("__overlay")}"></div> ` : ""}
            <div class="${this.componentUtils.className("__container")}"></div>
        `;
  }
}
SSidePanel._activePanels = [];
__decorateClass([
  (0, import_decorators.property)()
], SSidePanel.prototype, "overlay", 2);
function define(props = {}, tagName = "s-side-panel") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, SSidePanel);
}
