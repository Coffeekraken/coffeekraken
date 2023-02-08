"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiNav = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_request_1 = __importDefault(require("@coffeekraken/s-request"));
const object_1 = require("@coffeekraken/sugar/object");
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const lit_1 = require("lit");
class ApiNav extends s_lit_component_1.default {
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
            const request = new s_request_1.default({
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
            res.data.map = (0, object_1.__filter)(res.data.map, (key, item) => {
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
                (0, set_1.default)(this._menuStack, namespace.replace('@coffeekraken.', ''), res.data.map[namespace]);
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
                return (0, lit_1.html) `
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
                return (0, lit_1.html) `
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
            ${this._renderList((0, object_1.__get)(this._menuStack, itemNamespace), itemNamespace, level + 1)}
          </li>
        `;
            }
        });
        return (0, lit_1.html) `
      <ul class="s-fs-tree">
        ${items}
      </ul>
    `;
    }
    render() {
        if (!this.state.loaded) {
            return (0, lit_1.html) `
        <div>
          <i class="s-loader:spinner s-color:accent"></i>
          &nbsp;
          <p class="s-typo:p s-display:inline-block">Loading please wait...</p>
        </div>
      `;
        }
        return (0, lit_1.html) `
      <div class="${this.utils.cls('')}">
        ${this._renderList(this._menuStack)}
      </div>
    `;
    }
}
exports.ApiNav = ApiNav;
ApiNav.state = {
    loaded: false,
};
(() => {
    if (!customElements.get('api-nav')) {
        customElements.define('api-nav', ApiNav);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsd0VBQWlEO0FBQ2pELHVEQUE2RDtBQUM3RCxnRkFBMEQ7QUFDMUQsNkJBQTJCO0FBSTNCLE1BQWEsTUFBTyxTQUFRLHlCQUFlO0lBQ3pDO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBT0wsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7SUFSakIsQ0FBQztJQVVLLFlBQVk7OztZQUNoQixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQUM7Z0JBQzdCLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztZQUVILElBQUksZ0JBQWdCLENBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ3pELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRTt3QkFDNUQsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQ3JCO2lCQUNGO2dCQUNELElBQUksZ0JBQWdCO29CQUFFLE9BQU87Z0JBQzdCLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2pDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUNwQixJQUFJLFdBQVcsQ0FB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