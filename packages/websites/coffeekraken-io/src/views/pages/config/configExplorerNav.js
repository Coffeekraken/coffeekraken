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
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __SRequest from '@coffeekraken/s-request';
import __get from '@coffeekraken/sugar/shared/object/get';
import __filter from '@coffeekraken/sugar/shared/object/filter';
export class ConfigExplorerNav extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
            // interface: __ConfigExplorerNavComponentInterface,
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUloRSxNQUFNLE9BQU8saUJBQWtCLFNBQVEsZUFBZTtJQUNsRDtRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtZQUNaLG9EQUFvRDthQUN2RDtTQUNKLENBQUMsQ0FBQztRQUdQLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFQaEIsQ0FBQztJQVNLLFlBQVk7OztZQUNkLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO2dCQUMzQixHQUFHLEVBQUUsYUFBYTtnQkFDbEIsTUFBTSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBRUgsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDekIsTUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBSSxJQUFJLENBQ2pFLENBQUM7WUFFRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN4QixNQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FB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