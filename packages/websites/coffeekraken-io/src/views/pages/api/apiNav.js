// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from "@coffeekraken/s-lit-component";
import __SRequest from "@coffeekraken/s-request";
import __filter from "@coffeekraken/sugar/shared/object/filter";
import __get from "@coffeekraken/sugar/shared/object/get";
import __set from "@coffeekraken/sugar/shared/object/set";
import { html } from "lit";
import { property } from "lit/decorators.js";
export class ApiNav extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
        this._openedNamespaces = [];
        this._menuStack = {};
        this._menuStates = {};
        this._loaded = false;
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
                if (_dispatchTimeout)
                    return;
                _dispatchTimeout = setTimeout(() => {
                    e.target.dispatchEvent(new CustomEvent("actual", {
                        bubbles: true,
                    }));
                }, 1000);
            });
            // restore state
            this._menuStates = JSON.parse((_a = window.localStorage.getItem("apiNavStates")) !== null && _a !== void 0 ? _a : "{}");
            // const cachedNav = JSON.parse(
            //     window.localStorage.getItem('apiNav') ?? '{}',
            // );
            const cachedNav = {};
            if (Object.keys(cachedNav).length) {
                this._menuStack = cachedNav;
                this._loaded = true;
            }
            const res = yield request.send();
            const types = [];
            res.data.map = __filter(res.data.map, (key, item) => {
                var _a, _b, _c, _d;
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
                let type = (_d = (_c = (_b = (_a = item.type) === null || _a === void 0 ? void 0 : _a.types) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : item.type;
                if (!type)
                    return false;
                if (types.indexOf(type.toLowerCase()) === -1)
                    types.push(type.toLowerCase());
                if (supportedTypes.indexOf(type.toLowerCase()) === -1)
                    return false;
                return true;
            });
            this._menuStack = {};
            Object.keys(res.data.map).forEach((namespace) => {
                if (!namespace.match(/^@coffeekraken/))
                    return;
                __set(this._menuStack, namespace, res.data.map[namespace]);
            });
            // save new nav
            // window.localStorage.setItem('apiNav', JSON.stringify(this._menuStack));
            this._loaded = true;
            this.requestUpdate();
        });
    }
    _isAcive(namespace) {
        var _a;
        return (_a = this._menuStates[namespace]) === null || _a === void 0 ? void 0 : _a.opened;
    }
    _toggle(namespace) {
        if (!this._menuStates[namespace]) {
            this._menuStates[namespace] = {
                opened: true,
            };
        }
        else {
            this._menuStates[namespace].opened = !this._menuStates[namespace].opened;
        }
        // save state
        window.localStorage.setItem("apiNavStates", JSON.stringify(this._menuStates));
        this.requestUpdate();
    }
    _renderList(obj, currentNamespace = "", level = 0) {
        if (!obj)
            return "";
        const itemsKeys = Object.keys(obj);
        const items = itemsKeys.map((itemName) => {
            const itemObj = obj[itemName];
            const itemNamespace = `${currentNamespace ? `${currentNamespace}.` : ""}${itemName}`;
            if (!this._menuStates[itemNamespace]) {
                this._menuStates[itemNamespace] = {
                    opened: false,
                };
            }
            if (itemObj.name && itemObj.namespace) {
                return html `
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
            }
            else {
                return html `
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
            ${this._renderList(__get(this._menuStack, itemNamespace), itemNamespace, level + 1)}
          </li>
        `;
            }
        });
        return html `
      <ul class="${!currentNamespace ? "s-fs-tree" : ""}">
        ${items}
      </ul>
    `;
    }
    render() {
        if (!this._loaded) {
            return html `
        <div>
          <i class="s-loader:spinner s-color:accent"></i>
          &nbsp;
          <p class="s-typo:p s-display:inline-block">
            Loading API navigation.<br />Please wait...
          </p>
        </div>
      `;
        }
        return html `
      <div class="${this.componentUtils.className("")}">
        ${this._renderList(this._menuStack)}
      </div>
    `;
    }
}
__decorate([
    property()
], ApiNav.prototype, "_loaded", void 0);
(() => {
    if (!customElements.get("api-nav")) {
        customElements.define("api-nav", ApiNav);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUk3QyxNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDekM7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFHTCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUGhCLENBQUM7SUFTSyxZQUFZOzs7WUFDaEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7Z0JBQzdCLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztZQUVILElBQUksZ0JBQWdCLENBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ3pELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxD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