var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import __SLitComponent from "@coffeekraken/s-lit-component";
import { html } from "lit";
import { property } from "lit/decorators.js";
import __SRequest from "@coffeekraken/s-request";
import __set from "@coffeekraken/sugar/shared/object/set";
import __get from "@coffeekraken/sugar/shared/object/get";
import __filter from "@coffeekraken/sugar/shared/object/filter";
class ConfigExplorerNav extends __SLitComponent {
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
    const request = new __SRequest({
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
    res.data.map = __filter(res.data.map, (key, item) => {
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
      __set(this._menuStack, namespace, res.data.map[namespace]);
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
        return html`
                    <li>
                        <i
                            class="s-icon:file-${icon} s-tc:extension-${icon}"
                        ></i>
                        <a href="/api/${itemNamespace}">${itemObj.name}</a>
                    </li>
                `;
      } else {
        return html`
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
                        ${((_a = this._menuStates[itemNamespace]) == null ? void 0 : _a.opened) ? html`
                                  ${this._renderList(__get(this._menuStack, itemNamespace), itemNamespace)}
                              ` : ""}
                    </li>
                `;
      }
    });
    return html`
            <ul class="${!currentNamespace ? "s-fs-tree" : ""}">
                ${items}
            </ul>
        `;
  }
  render() {
    if (!this._loaded) {
      return html`
                <div class="s-until:sibling:mounted">
                    <i class="s-loader:spinner s-color:accent"></i>
                    &nbsp;
                    <p class="s-typo:p s-display:inline-block">
                        Loading API navigation.<br />Please wait...
                    </p>
                </div>
            `;
    }
    return html`
            <div class="${this.componentUtils.className("")}">
                ${this._renderList(this._menuStack)}
            </div>
        `;
  }
}
__decorateClass([
  property()
], ConfigExplorerNav.prototype, "_loaded", 2);
var configExplorerNav_default = () => {
  if (!customElements.get("config-explorer-nav")) {
    customElements.define("config-explorer-nav", ConfigExplorerNav);
  }
};
export {
  ConfigExplorerNav,
  configExplorerNav_default as default
};
