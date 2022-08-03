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
                console.log("ACTUAL", e.target);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUk3QyxNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDekM7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFHTCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUGhCLENBQUM7SUFTSyxZQUFZOzs7WUFDaEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7Z0JBQzdCLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztZQUVILElBQUksZ0JBQWdCLENBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxX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