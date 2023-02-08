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
            console.log(res.data);
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
                __set(this._menuStack, namespace.replace('@coffeekraken.', ''), res.data.map[namespace]);
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
            this._menuStates[namespace].opened = !this._menuStates[namespace].opened;
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
              <div
                class="s-loader:spinner s-color:accent s-mie:10 s-float:right s-when:siblings:loading"
              ></div>
            </div>
          </li>
        `;
            }
            else {
                return html `
          <li class="_folder ${this._isAcive(itemNamespace) ? 'active' : ''}">
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
      <ul class="s-fs-tree">
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
          <p class="s-typo:p s-display:inline-block">Loading please wait...</p>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxPQUFPLE1BQU8sU0FBUSxlQUFlO0lBQ3pDO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBT0wsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7SUFSakIsQ0FBQztJQVVLLFlBQVk7OztZQUNoQixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztnQkFDN0IsR0FBRyxFQUFFLGNBQWM7Z0JBQ25CLE1BQU0sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsSUFBSSxnQkFBZ0IsQ0FBQztZQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDekQsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFO3dCQUM1RCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztxQkFDckI7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