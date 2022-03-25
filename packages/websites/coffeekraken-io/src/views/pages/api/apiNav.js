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
class ApiNav extends __SLitComponent {
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
      url: "/docmap.json",
      method: "get"
    });
    let _dispatchTimeout;
    this.addEventListener("actual", (e) => {
      for (let [key, value] of Object.entries(this._menuStates)) {
        if (e.target.getAttribute("namespace").startsWith(key + ".")) {
          value.opened = true;
        }
      }
      if (_dispatchTimeout)
        return;
      _dispatchTimeout = setTimeout(() => {
        e.target.dispatchEvent(new CustomEvent("actual", {
          bubbles: true
        }));
      }, 1e3);
    });
    this._menuStates = JSON.parse((_a = window.localStorage.getItem("apiNavStates")) != null ? _a : "{}");
    const cachedNav = JSON.parse((_b = window.localStorage.getItem("apiNav")) != null ? _b : "{}");
    if (Object.keys(cachedNav).length) {
      this._menuStack = cachedNav;
      this._loaded = true;
    }
    const res = await request.send();
    const types = [];
    res.data.map = __filter(res.data.map, (key, item) => {
      const supportedTypes = [
        "function",
        "class",
        "cssmixin",
        "cssfunction",
        "object",
        "customelement",
        "feature"
      ];
      if (types.indexOf(item.type) === -1)
        types.push(item.type);
      if (supportedTypes.indexOf(item.type.toLowerCase()) === -1)
        return false;
      return true;
    });
    this._menuStack = {};
    Object.keys(res.data.map).forEach((namespace) => {
      __set(this._menuStack, namespace, res.data.map[namespace]);
    });
    window.localStorage.setItem("apiNav", JSON.stringify(this._menuStack));
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
    window.localStorage.setItem("apiNavStates", JSON.stringify(this._menuStates));
    this.requestUpdate();
  }
  _renderList(obj, currentNamespace = "", level = 0) {
    const itemsKeys = Object.keys(obj);
    const items = itemsKeys.map((itemName) => {
      const itemObj = obj[itemName];
      const itemNamespace = `${currentNamespace ? `${currentNamespace}.` : ""}${itemName}`;
      if (!this._menuStates[itemNamespace]) {
        this._menuStates[itemNamespace] = {
          opened: false
        };
      }
      if (itemObj.name && itemObj.namespace) {
        return html`
                    <li>
                        <div class="s-flex">
                            <a href="/api/${itemNamespace}" namespace="${itemNamespace}" class="s-link:stretch s-order:2">${itemObj.name}</a>
                            <i
                                class="s-icon:file-${itemObj.extension} s-tc:accent s-until:sibling:loading s-mie:10"
                            ></i>
                            <div class="s-loader:spinner s-color:accent s-mie:10 s-float:right s-when:siblings:loading"></div>
                        </div>
                    </li>
                `;
      } else {
        return html`
                    <li class="${level === 0 || this._isAcive(itemNamespace) ? "active" : ""}">
                        <div @click=${() => {
          this._toggle(itemNamespace);
        }}>
                            <i class="s-icon:folder-opened s-tc:complementary s-when:grandparent:active"></i>
                            <i class="s-icon:folder"></i>
                            ${itemName}
                        </div>
                        ${this._renderList(__get(this._menuStack, itemNamespace), itemNamespace, level + 1)}
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
                <div>
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
], ApiNav.prototype, "_loaded", 2);
var apiNav_default = () => {
  if (!customElements.get("api-nav")) {
    customElements.define("api-nav", ApiNav);
  }
};
export {
  ApiNav,
  apiNav_default as default
};
