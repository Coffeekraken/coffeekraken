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
exports.define = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const filter_1 = __importDefault(require("@coffeekraken/sugar/shared/object/filter"));
const lit_1 = require("lit");
const state_1 = require("../state/state");
class SCKDiscoverPropsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            platform: {
                type: 'String',
            },
        };
    }
}
class CKDiscover extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return s_lit_component_1.default.createProperties({}, SCKDiscoverPropsInterface);
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._docmap = yield (0, state_1.loadDocmap)();
            this.grabItem();
        });
    }
    grabItem() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.item = undefined;
            // this.timeout = undefined;
            // this.requestUpdate();
            const newMap = (0, filter_1.default)(this._docmap.map, (key, item) => {
                var _a, _b;
                if (!item.platform)
                    return false;
                if (!((_b = (_a = item.example) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.code))
                    return false;
                if (item.platform[0].name !== this.props.platform)
                    return false;
                return true;
            });
            const mapCount = Object.keys(newMap).length;
            const mapKeys = Object.keys(newMap);
            const itemIdx = Math.floor(Math.random() * mapCount);
            this.item = newMap[mapKeys[itemIdx]];
            this.requestUpdate();
            this.timeout = setTimeout(() => {
                this.timeout = undefined;
                this.requestUpdate();
            }, 200);
        });
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        return (0, lit_1.html) `
            <div class="ck-discover">
                ${!this.item
            ? (0, lit_1.html) `
                          <div class="s-code-example-loader">
                              <i class="s-loader:spinner s-color:accent"></i>
                              &nbsp;
                              <p class="s-typo:p s-display:inline-block">
                                  Loading code example. Please wait...
                              </p>
                          </div>
                      `
            : (0, lit_1.html) `
                          <a
                              @click="${this.grabItem}"
                              class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
                          >
                              <i class="s-icon:ui-refresh"></i>
                          </a>
                          ${this.item.async
                ? (0, lit_1.html) `
                                    <span class="s-badge:outline s-color:accent"
                                        >Async</span
                                    >&nbsp;
                                `
                : ''}
                          ${((_b = (_a = this.item.type) === null || _a === void 0 ? void 0 : _a.types) === null || _b === void 0 ? void 0 : _b[0].type) || this.item.type
                ? (0, lit_1.html) `
                                    <span class="s-badge s-color:complementary"
                                        >${(_f = (_e = (_d = (_c = this.item.type) === null || _c === void 0 ? void 0 : _c.types) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.type) !== null && _f !== void 0 ? _f : this.item.type}</span
                                    >
                                `
                : ''}
                          <br />
                          <br />
                          <h1 class="s-typo:h3 s-mbe:30">${this.item.name}</h1>
                          <p class="s-typo:p s-mbe:30 s-truncate:3">
                              ${this.item.description}
                          </p>
                          ${!this.timeout
                ? (0, lit_1.html) `
                                    <s-code-example
                                        lines="8"
                                        s-deps
                                        css="codeExample"
                                    >
                                        <code
                                            hidden
                                            lang="${this.props.platform ===
                    'ts' ||
                    this.props.platform === 'node'
                    ? 'js'
                    : this.props.platform ===
                        'postcss'
                        ? 'css'
                        : this.props.platform}"
                                        >
                                            ${this.item.example[0].code}
                                        </code>
                                    </s-code-example>
                                `
                : ''}
                          <div
                              class="s-until:sibling:mounted s-code-example-loader"
                          >
                              <i class="s-loader:spinner s-color:accent"></i>
                              &nbsp;
                              <p class="s-typo:p s-display:inline-block">
                                  Loading code example. Please wait...
                              </p>
                          </div>
                      `}
            </div>
        `;
    }
}
exports.default = CKDiscover;
function define(props = {}, tagName = 'ck-discover') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, CKDiscover);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELHNGQUFzRTtBQUN0RSw2QkFBMkI7QUFDM0IsMENBQTRDO0FBRTVDLE1BQU0seUJBQTBCLFNBQVEscUJBQVk7SUFDaEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFxQixVQUFXLFNBQVEseUJBQWU7SUFLbkQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBUkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFZSyxZQUFZOztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFBLGtCQUFVLEdBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztLQUFBO0lBRUssUUFBUTs7WUFDVix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLHdCQUF3QjtZQUV4QixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFjLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7O2dCQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBO29CQUFFLE9BQU8sS0FB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