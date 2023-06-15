// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import '../../../../../../src/js/partials/s-dashboard-web-vitals-component/s-dashboard-web-vitals-component.css';
export default class SDashboardWebVitalsComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
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
    firstUpdated() { }
    render() {
        return html `
            <div class="s-dashboard-web-vitals s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Web Vitals</h2>

                <div class="ck-panel">
                    <div class="_stats">
                        <div class="ck-stat">
                            <h3 class="ck-stat_label">LCP</h3>
                            ${this._webVitals.lcp
            ? html `
                                      <p class="ck-stat_value">
                                          ${(this._webVitals.lcp.value / 1000).toFixed(2)}s
                                          ${this._webVitals.lcp.value <= 2500
                ? html `
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.lcp.value <=
                    4000
                    ? html `
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : html `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">FID</h3>
                            ${this._webVitals.fid
            ? html `
                                      <p class="ck-stat_value">
                                          ${Math.round(this._webVitals.fid.value)}ms
                                          ${this._webVitals.fid.value <= 100
                ? html `
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.fid.value <= 300
                    ? html `
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : html `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">CLS</h3>
                            ${this._webVitals.cls
            ? html `
                                      <p class="ck-stat_value">
                                          ${this._webVitals.cls.value.toFixed(2)}
                                          ${this._webVitals.cls.value <= 0.1
                ? html `
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.cls.value <=
                    0.25
                    ? html `
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : html `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">FCP</h3>
                            ${this._webVitals.fcp
            ? html `
                                      <p class="ck-stat_value">
                                          ${(this._webVitals.fcp.value / 1000).toFixed(2)}s
                                          ${this._webVitals.fcp.value <= 1.8
                ? html `
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.fcp.value <= 3
                    ? html `
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : html `
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">TTFB</h3>
                            ${this._webVitals.ttfb
            ? html `
                                      <p class="ck-stat_value">
                                          ${(this._webVitals.ttfb.value / 1000).toFixed(2)}s
                                          ${this._webVitals.ttfb.value <= 200
                ? html `
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.ttfb.value <=
                    500
                    ? html `
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
            : html `
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
export function define(props = {}, tagName = 's-dashboard-web-vitals') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardWebVitalsComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyx5R0FBeUcsQ0FBQztBQUVqSCxNQUFNLENBQUMsT0FBTyxPQUFPLDRCQUE2QixTQUFRLGVBQWU7SUFDckUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFJRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFFRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQXBCUCxlQUFVLEdBQVEsSUFBSSxDQUFDO1FBc0JuQixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQzlDLENBQUM7SUFFRCxZQUFZLEtBQUksQ0FBQztJQUVqQixNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7Ozs7Ozs7OzhCQVFXLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRztZQUNqQixDQUFDLENBQUMs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