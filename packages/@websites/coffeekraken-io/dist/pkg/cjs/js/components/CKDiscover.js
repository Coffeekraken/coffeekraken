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
                    <span class="s-badge:outline s-color:accent">Async</span
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
                    <s-code-example lines="8" s-deps css="codeExample">
                      <code
                        hidden
                        lang="${this.props.platform === 'ts' ||
                    this.props.platform === 'node'
                    ? 'js'
                    : this.props.platform === 'postcss'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELHNGQUFzRTtBQUN0RSw2QkFBMkI7QUFDM0IsMENBQTRDO0FBRTVDLE1BQU0seUJBQTBCLFNBQVEscUJBQVk7SUFDbEQsTUFBTSxLQUFLLFdBQVc7UUFDcEIsT0FBTztZQUNMLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE1BQXFCLFVBQVcsU0FBUSx5QkFBZTtJQUtyRDtRQUNFLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFSRCxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLHlCQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDekUsQ0FBQztJQVlLLFlBQVk7O1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFBLGtCQUFVLEdBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRUssUUFBUTs7WUFDWix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLHdCQUF3QjtZQUV4QixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFjLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7O2dCQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBO29CQUFFLE9BQU8sS0FB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