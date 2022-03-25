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
var configExplorerNav_exports = {};
__export(configExplorerNav_exports, {
  ConfigExplorerNav: () => ConfigExplorerNav,
  default: () => configExplorerNav_default
});
module.exports = __toCommonJS(configExplorerNav_exports);
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_s_request = __toESM(require("@coffeekraken/s-request"), 1);
var import_set = __toESM(require("@coffeekraken/sugar/shared/object/set"), 1);
var import_get = __toESM(require("@coffeekraken/sugar/shared/object/get"), 1);
var import_filter = __toESM(require("@coffeekraken/sugar/shared/object/filter"), 1);
class ConfigExplorerNav extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {}
    });
    this._openedNamespaces = [];
    this._menuStack = {};
    this._menuStates = {};
    this._loaded = false;
  }
  async firstUpdated() {
    var _a, _b;
    const request = new import_s_request.default({
      url: "/api/docmap",
      method: "get"
    });
    this._menuStates = JSON.parse((_a = window.localStorage.getItem("ConfigExplorerNavStates")) != null ? _a : "{}");
    const cachedNav = JSON.parse((_b = window.localStorage.getItem("ConfigExplorerNav")) != null ? _b : "{}");
    if (Object.keys(cachedNav).length) {
      this._menuStack = cachedNav;
      this._loaded = true;
    }
    const res = await request.send();
    const types = [];
    res.data.map = (0, import_filter.default)(res.data.map, (key, item) => {
      if (key.includes("imagesBuilder"))
        console.log("S", key);
      if (!key.match(/[a-zA-Z0-9]+\.config\.[a-zA-Z0-9]+/))
        return false;
      const configId = key.replace(/.*\.config\./, "");
      return true;
    });
    return;
    this._menuStack = {};
    Object.keys(res.data.map).forEach((namespace) => {
      (0, import_set.default)(this._menuStack, namespace, res.data.map[namespace]);
    });
    window.localStorage.setItem("ConfigExplorerNav", JSON.stringify(this._menuStack));
    this._loaded = true;
    this.requestUpdate();
  }
  _isAcive(namespace) {
    var _a;
    return (_a = this._menuStates[namespace]) == null ? void 0 : _a.opened;
  }
  _toggle(namespace) {
    if (!this._menuStates[namespace]) {
      this._menuStates[namespace] = {
        opened: true
      };
    } else {
      this._menuStates[namespace].opened = !this._menuStates[namespace].opened;
    }
    window.localStorage.setItem("ConfigExplorerNavStates", JSON.stringify(this._menuStates));
    this.requestUpdate();
  }
  _renderList(obj, currentNamespace = "") {
    const items = Object.keys(obj).map((itemName) => {
      var _a;
      const itemObj = obj[itemName];
      const itemNamespace = `${currentNamespace ? `${currentNamespace}.` : ""}${itemName}`;
      if (itemObj.name && itemObj.namespace) {
        let icon = itemObj.platform[0].name;
        return import_lit.html`
                    <li>
                        <i
                            class="s-icon:file-${icon} s-tc:extension-${icon}"
                        ></i>
                        <a href="/api/${itemNamespace}">${itemObj.name}</a>
                    </li>
                `;
      } else {
        return import_lit.html`
                    <li class="${this._isAcive(itemNamespace) ? "active" : ""}">
                        <i
                            class="s-icon:folder-opened s-tc:info s-when:active"
                        ></i>
                        <i class="s-icon:folder"></i>
                        <span
                            @click=${() => {
          this._toggle(itemNamespace);
        }}
                        >
                            ${itemName}
                        </span>
                        ${((_a = this._menuStates[itemNamespace]) == null ? void 0 : _a.opened) ? import_lit.html`
                                  ${this._renderList((0, import_get.default)(this._menuStack, itemNamespace), itemNamespace)}
                              ` : ""}
                    </li>
                `;
      }
    });
    return import_lit.html`
            <ul class="${!currentNamespace ? "s-fs-tree" : ""}">
                ${items}
            </ul>
        `;
  }
  render() {
    if (!this._loaded) {
      return import_lit.html`
                <div class="s-until:sibling:mounted">
                    <i class="s-loader:spinner s-color:accent"></i>
                    &nbsp;
                    <p class="s-typo:p s-display:inline-block">
                        Loading API navigation.<br />Please wait...
                    </p>
                </div>
            `;
    }
    return import_lit.html`
            <div class="${this.componentUtils.className("")}">
                ${this._renderList(this._menuStack)}
            </div>
        `;
  }
}
__decorateClass([
  (0, import_decorators.property)()
], ConfigExplorerNav.prototype, "_loaded", 2);
var configExplorerNav_default = () => {
  if (!customElements.get("config-explorer-nav")) {
    customElements.define("config-explorer-nav", ConfigExplorerNav);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfigExplorerNav
});
