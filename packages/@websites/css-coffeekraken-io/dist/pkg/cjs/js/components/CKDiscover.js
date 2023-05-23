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
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCKDiscoverPropsInterface);
    }
    constructor() {
        super({
            shadowDom: false,
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._docmap = yield (0, state_1.loadDocmap)();
            _console.log('DOC', this._docmap);
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
                if (this.props.platform &&
                    item.platform[0].name !== this.props.platform)
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
                      `}
            </div>
        `;
    }
}
exports.default = CKDiscover;
function define(props = {}, tagName = 'ck-discover') {
    s_lit_component_1.default.define(tagName, CKDiscover, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELHNGQUFzRTtBQUN0RSw2QkFBMkI7QUFDM0IsMENBQTRDO0FBRTVDLE1BQU0seUJBQTBCLFNBQVEscUJBQVk7SUFDaEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFxQixVQUFXLFNBQVEseUJBQWU7SUFDbkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YseUJBQXlCLENBQzVCLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBTUssWUFBWTs7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBQSxrQkFBVSxHQUFFLENBQUM7WUFDbEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFSyxRQUFROztZQUNWLHlCQUF5QjtZQUN6Qiw0QkFBNEI7WUFDNUIsd0JBQXdCO1lBRXhCLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQWMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTs7Z0JBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDakMsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFB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