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
import __set from '@coffeekraken/sugar/shared/object/set';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
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
                    'function',
                    'class',
                    // 'cssfontface',
                    'cssmixin',
                    'postcssmixin',
                    'cssfunction',
                    'postcssfunction',
                    'object',
                    // 'cssclass',
                    'customelement',
                    'feature',
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
(() => {
    if (!customElements.get('api-nav')) {
        customElements.define('api-nav', ApiNav);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUk3QyxNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDdkM7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFHUCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUGhCLENBQUM7SUFTSyxZQUFZOzs7WUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztnQkFDM0IsR0FBRyxFQUFFLGNBQWM7Z0JBQ25CLE1BQU0sRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztZQUVILElBQUksZ0JBQWdCLENBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ3ZELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxD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