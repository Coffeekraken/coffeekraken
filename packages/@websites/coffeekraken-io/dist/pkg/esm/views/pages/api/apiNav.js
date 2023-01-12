// @ts-nocheck
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
import { __filter, __get } from '@coffeekraken/sugar/object';
import __set from '@coffeekraken/sugar/shared/object/set';
import { html } from 'lit';
export class ApiNav extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
        this._openedNamespaces = [];
        this._menuStack = {};
        this._menuStates = {};
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
                console.log('ACTUAL', e.target);
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
                this.state.loaded = true;
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
            this.state.loaded = true;
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
            this._menuStates[namespace].opened =
                !this._menuStates[namespace].opened;
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
        if (!this.state.loaded) {
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
            <div class="${this.utils.cls('')}">
                ${this._renderList(this._menuStack)}
            </div>
        `;
    }
}
ApiNav.state = {
    loaded: false,
};
(() => {
    if (!customElements.get('api-nav')) {
        customElements.define('api-nav', ApiNav);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxPQUFPLE1BQU8sU0FBUSxlQUFlO0lBQ3ZDO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBT1Asc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7SUFSakIsQ0FBQztJQVVLLFlBQVk7OztZQUNkLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO2dCQUMzQixHQUFHLEVBQUUsY0FBYztnQkFDbkIsTUFBTSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxnQkFBZ0IsQ0FBQztZQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN2RCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdB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