// @ts-nocheck

import __SLitComponent from "@coffeekraken/s-lit-component";
import __SRequest from "@coffeekraken/s-request";
import __filter from "@coffeekraken/sugar/shared/object/filter";
import __get from "@coffeekraken/sugar/shared/object/get";
import __set from "@coffeekraken/sugar/shared/object/set";
import { html } from "lit";
import { property } from "lit/decorators.js";

export interface IApiNavComponentProps {}

export class ApiNav extends __SLitComponent {
  constructor() {
    super({
      shadowDom: false,
    });
  }

  _openedNamespaces = [];
  _menuStack = {};
  _menuStates = {};

  @property()
  _loaded = false;

  async firstUpdated() {
    const request = new __SRequest({
      url: "/docmap.json",
      method: "get",
    });

    let _dispatchTimeout;
    this.addEventListener("actual", (e) => {
      for (let [key, value] of Object.entries(this._menuStates)) {
        if (e.target.getAttribute("namespace").startsWith(key + ".")) {
          value.opened = true;
        }
      }
      if (_dispatchTimeout) return;
      _dispatchTimeout = setTimeout(() => {
        e.target.dispatchEvent(
          new CustomEvent("actual", {
            bubbles: true,
          })
        );
      }, 1000);
    });

    // restore state
    this._menuStates = JSON.parse(
      window.localStorage.getItem("apiNavStates") ?? "{}"
    );

    // const cachedNav = JSON.parse(
    //     window.localStorage.getItem('apiNav') ?? '{}',
    // );
    const cachedNav = {};
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
        // 'cssfontface',
        "cssmixin",
        "postcssmixin",
        "cssfunction",
        "postcssfunction",
        "object",
        // 'cssclass',
        "customelement",
        "feature",
      ];

      let type = item.type?.types?.[0]?.type ?? item.type;
      if (!type) return false;

      if (types.indexOf(type.toLowerCase()) === -1)
        types.push(type.toLowerCase());

      if (supportedTypes.indexOf(type.toLowerCase()) === -1) return false;
      return true;
    });

    this._menuStack = {};
    Object.keys(res.data.map).forEach((namespace) => {
      if (!namespace.match(/^@coffeekraken/)) return;
      __set(this._menuStack, namespace, res.data.map[namespace]);
    });

    // save new nav
    // window.localStorage.setItem('apiNav', JSON.stringify(this._menuStack));
    this._loaded = true;

    this.requestUpdate();
  }

  _isAcive(namespace) {
    return this._menuStates[namespace]?.opened;
  }

  _toggle(namespace) {
    if (!this._menuStates[namespace]) {
      this._menuStates[namespace] = {
        opened: true,
      };
    } else {
      this._menuStates[namespace].opened = !this._menuStates[namespace].opened;
    }

    // save state
    window.localStorage.setItem(
      "apiNavStates",
      JSON.stringify(this._menuStates)
    );

    this.requestUpdate();
  }

  _renderList(obj, currentNamespace = "", level = 0) {
    if (!obj) return "";

    const itemsKeys = Object.keys(obj);
    const items = itemsKeys.map((itemName) => {
      const itemObj = obj[itemName];
      const itemNamespace = `${
        currentNamespace ? `${currentNamespace}.` : ""
      }${itemName}`;

      if (!this._menuStates[itemNamespace]) {
        this._menuStates[itemNamespace] = {
          opened: false,
        };
      }

      if (itemObj.name && itemObj.namespace) {
        return html`
          <li>
            <div class="s-flex">
              <a
                href="/api/${itemNamespace}"
                namespace="${itemNamespace}"
                class="s-link:stretch s-order:2"
                >${itemObj.name}</a
              >
              <i
                class="s-icon:file-${itemObj.extension} s-tc:accent s-until:sibling:loading s-mie:10"
              ></i>
              <div
                class="s-loader:spinner s-color:accent s-mie:10 s-float:right s-when:siblings:loading"
              ></div>
            </div>
          </li>
        `;
      } else {
        return html`
          <li
            class="${level === 0 || this._isAcive(itemNamespace)
              ? "active"
              : ""}"
          >
            <div
              @click=${() => {
                this._toggle(itemNamespace);
              }}
            >
              <i
                class="s-icon:folder-opened s-tc:complementary s-when:grandparent:active"
              ></i>
              <i class="s-icon:folder"></i>
              ${itemName}
            </div>
            ${this._renderList(
              __get(this._menuStack, itemNamespace),
              itemNamespace,
              level + 1
            )}
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

(() => {
  if (!customElements.get("api-nav")) {
    customElements.define("api-nav", ApiNav);
  }
})();
