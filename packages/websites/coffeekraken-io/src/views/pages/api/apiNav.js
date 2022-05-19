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
import __set from '@coffeekraken/sugar/shared/object/set';
import __get from '@coffeekraken/sugar/shared/object/get';
import __filter from '@coffeekraken/sugar/shared/object/filter';
export class ApiNav extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
            // interface: __ApiNavComponentInterface,
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
                url: '/docmap.json',
                method: 'get',
            });
            let _dispatchTimeout;
            this.addEventListener('actual', (e) => {
                for (let [key, value] of Object.entries(this._menuStates)) {
                    if (e.target.getAttribute('namespace').startsWith(key + '.')) {
                        value.opened = true;
                    }
                }
                if (_dispatchTimeout)
                    return;
                _dispatchTimeout = setTimeout(() => {
                    e.target.dispatchEvent(new CustomEvent('actual', {
                        bubbles: true,
                    }));
                }, 1000);
            });
            // restore state
            this._menuStates = JSON.parse((_a = window.localStorage.getItem('apiNavStates')) !== null && _a !== void 0 ? _a : '{}');
            const cachedNav = JSON.parse((_b = window.localStorage.getItem('apiNav')) !== null && _b !== void 0 ? _b : '{}');
            if (Object.keys(cachedNav).length) {
                this._menuStack = cachedNav;
                this._loaded = true;
            }
            const res = yield request.send();
            const types = [];
            res.data.map = __filter(res.data.map, (key, item) => {
                var _a;
                const supportedTypes = [
                    'function',
                    'class',
                    // 'cssfontface',
                    'cssmixin',
                    'cssfunction',
                    'object',
                    // 'cssclass',
                    'customelement',
                    'feature',
                ];
                if (types.indexOf(item.type) === -1)
                    types.push(item.type);
                if (supportedTypes.indexOf((_a = item.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === -1)
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
            window.localStorage.setItem('apiNav', JSON.stringify(this._menuStack));
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
            this._menuStates[namespace].opened = !this._menuStates[namespace]
                .opened;
        }
        // save state
        window.localStorage.setItem('apiNavStates', JSON.stringify(this._menuStates));
        this.requestUpdate();
    }
    _renderList(obj, currentNamespace = '', level = 0) {
        if (!obj)
            return '';
        const itemsKeys = Object.keys(obj);
        const items = itemsKeys.map((itemName) => {
            const itemObj = obj[itemName];
            const itemNamespace = `${currentNamespace ? `${currentNamespace}.` : ''}${itemName}`;
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
                    ? 'active'
                    : ''}"
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
            <ul class="${!currentNamespace ? 's-fs-tree' : ''}">
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
            <div class="${this.componentUtils.className('')}">
                ${this._renderList(this._menuStack)}
            </div>
        `;
    }
}
__decorate([
    property()
], ApiNav.prototype, "_loaded", void 0);
export default () => {
    if (!customElements.get('api-nav')) {
        customElements.define('api-nav', ApiNav);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUloRSxNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDdkM7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxjQUFjLEVBQUU7WUFDWix5Q0FBeUM7YUFDNUM7U0FDSixDQUFDLENBQUM7UUFHUCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUGhCLENBQUM7SUFTSyxZQUFZOzs7WUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztnQkFDM0IsR0FBRyxFQUFFLGNBQWM7Z0JBQ25CLE1BQU0sRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztZQUVILElBQUksZ0JBQWdCLENBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFD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