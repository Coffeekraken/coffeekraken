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
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SRequest from '@coffeekraken/s-request';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __get from '@coffeekraken/sugar/shared/object/get';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
export class ConfigExplorerNav extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
            // interface: __ConfigExplorerNavComponentInterface,
        });
        this._openedNamespaces = [];
        this._menuStack = {};
        this._menuStates = {};
        this._loaded = false;
    }
    firstUpdated() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const request = new __SRequest({
                url: '/api/docmap',
                method: 'get',
            });
            // restore state
            this._menuStates = JSON.parse((_a = window.localStorage.getItem('ConfigExplorerNavStates')) !== null && _a !== void 0 ? _a : '{}');
            const cachedNav = JSON.parse((_b = window.localStorage.getItem('ConfigExplorerNav')) !== null && _b !== void 0 ? _b : '{}');
            if (Object.keys(cachedNav).length) {
                this._menuStack = cachedNav;
                this._loaded = true;
            }
            const res = yield request.send();
            const listed = [];
            res.data.map = __filter(res.data.map, (key, item) => {
                if (!key.match(/[a-zA-Z0-9]+\.config\.[a-zA-Z0-9]+/))
                    return false;
                if (listed.includes(key))
                    return false;
                listed.push(key);
                return true;
            });
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
            this._menuStates[namespace].opened = !this._menuStates[namespace]
                .opened;
        }
        // save state
        window.localStorage.setItem('ConfigExplorerNavStates', JSON.stringify(this._menuStates));
        this.requestUpdate();
    }
    _renderList(obj, currentNamespace = '') {
        const items = Object.keys(obj).map((itemName) => {
            var _a;
            const itemObj = obj[itemName];
            const itemNamespace = `${currentNamespace ? `${currentNamespace}.` : ''}${itemName}`;
            if (itemObj.name && itemObj.namespace) {
                let icon = itemObj.platform[0].name;
                return html `
                    <li>
                        <i
                            class="s-icon:file-${icon} s-tc:extension-${icon}"
                        ></i>
                        <a href="/api/${itemNamespace}">${itemObj.name}</a>
                    </li>
                `;
            }
            else {
                return html `
                    <li class="${this._isAcive(itemNamespace) ? 'active' : ''}">
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
                        ${((_a = this._menuStates[itemNamespace]) === null || _a === void 0 ? void 0 : _a.opened)
                    ? html `
                                  ${this._renderList(__get(this._menuStack, itemNamespace), itemNamespace)}
                              `
                    : ''}
                    </li>
                `;
            }
        });
        return html `
            <ul class="${!currentNamespace ? 's-fs-tree' : ''}">
                ${items}
            </ul>
        `;
    }
    render() {
        if (!this._loaded) {
            return html `
                <div class="s-until:sibling:mounted">
                    <i class="s-loader:spinner s-color:accent"></i>
                    &nbsp;
                    <p class="s-typo:p s-display:inline-block">
                        Loading API navigation.<br />Please wait...
                    </p>
                </div>
            `;
        }
        return html `
            <div class="${this.componentUtils.className('')}">
                ${this._renderList(this._menuStack)}
            </div>
        `;
    }
}
__decorate([
    property()
], ConfigExplorerNav.prototype, "_loaded", void 0);
export default () => {
    if (!customElements.get('config-explorer-nav')) {
        customElements.define('config-explorer-nav', ConfigExplorerNav);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUk3QyxNQUFNLE9BQU8saUJBQWtCLFNBQVEsZUFBZTtJQUNsRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLG9EQUFvRDtTQUN2RCxDQUFDLENBQUM7UUFHUCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUGhCLENBQUM7SUFTSyxZQUFZOzs7WUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztnQkFDM0IsR0FBRyxFQUFFLGFBQWE7Z0JBQ2xCLE1BQU0sRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztZQUVILGdCQUFnQjtZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3pCLE1BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsbUNBQUksSUFBSSxDQUNqRSxDQUFDO1lBRUYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDeEIsTUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxtQ0FBSSxJQUFJLENBQzNELENBQUM7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