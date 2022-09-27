"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("../../../../../../src/js/partials/s-dashboard-web-vitals-component/s-dashboard-web-vitals-component.css");
class SDashboardWebVitalsComponent extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
        this._webVitals = null;
        this.document.addEventListener('webVitals', (e) => {
            this._webVitals = e.detail;
            this.requestUpdate();
        });
        this._webVitals = this.document.webVitals;
    }
    /**
     * @name            document
     * @type            Document
     * @get
     *
     * Access the document that the dashboard is using.
     * If in an iframe, take the parent document, otherwise, the document itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get document() {
        var _a, _b;
        return (_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document;
    }
    firstUpdated() { }
    render() {
        return (0, lit_1.html) `
            <div class="s-dashboard-web-vitals s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Web Vitals</h2>

                <div class="ck-panel">
                    <div class="__stats">
                        <div class="ck-stat">
                            <h3 class="ck-stat__label">LCP</h3>
                            ${this._webVitals.lcp
            ? (0, lit_1.html) `
                                      <p class="ck-stat__value">
                                          ${(this._webVitals.lcp.value / 1000).toFixed(2)}s
                                          ${this._webVitals.lcp.value <= 2500
                ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.lcp.value <=
                    4000
                    ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:error s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : (0, lit_1.html) `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat__label">FID</h3>
                            ${this._webVitals.fid
            ? (0, lit_1.html) `
                                      <p class="ck-stat__value">
                                          ${Math.round(this._webVitals.fid.value)}ms
                                          ${this._webVitals.fid.value <= 100
                ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.fid.value <= 300
                    ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:error s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : (0, lit_1.html) `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat__label">CLS</h3>
                            ${this._webVitals.cls
            ? (0, lit_1.html) `
                                      <p class="ck-stat__value">
                                          ${this._webVitals.cls.value.toFixed(2)}
                                          ${this._webVitals.cls.value <= 0.1
                ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.cls.value <=
                    0.25
                    ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:error s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : (0, lit_1.html) `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat__label">FCP</h3>
                            ${this._webVitals.fcp
            ? (0, lit_1.html) `
                                      <p class="ck-stat__value">
                                          ${(this._webVitals.fcp.value / 1000).toFixed(2)}s
                                          ${this._webVitals.fcp.value <= 1.8
                ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.fcp.value <= 3
                    ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:error s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : (0, lit_1.html) `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat__label">TTFB</h3>
                            ${this._webVitals.ttfb
            ? (0, lit_1.html) `
                                      <p class="ck-stat__value">
                                          ${(this._webVitals.ttfb.value / 1000).toFixed(2)}s
                                          ${this._webVitals.ttfb.value <= 200
                ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.ttfb.value <=
                    500
                    ? (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : (0, lit_1.html) `
                                                    <i
                                                        class="s-icon:error s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : (0, lit_1.html) `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
exports.default = SDashboardWebVitalsComponent;
function define(props = {}, tagName = 's-dashboard-web-vitals') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardWebVitalsComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLG1IQUFpSDtBQUVqSCxNQUFxQiw0QkFBNkIsU0FBUSx5QkFBZTtJQWtCckU7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFwQlAsZUFBVSxHQUFRLElBQUksQ0FBQztRQXNCbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztJQUM5QyxDQUFDO0lBekJEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQWNELFlBQVksS0FBSSxDQUFDO0lBRWpCLE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzs7Ozs7Ozs4QkFRVyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFDakIsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs0Q0FFTSxDQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQ25DLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0Q0FDVixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSTtnQkFDL0IsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFB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