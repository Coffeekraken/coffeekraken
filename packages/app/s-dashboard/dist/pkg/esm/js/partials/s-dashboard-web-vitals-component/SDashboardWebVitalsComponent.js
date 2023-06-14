// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-web-vitals-component/s-dashboard-web-vitals-component.css';
export default class SDashboardWebVitalsComponent extends __SLitComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8seUdBQXlHLENBQUM7QUFFakgsTUFBTSxDQUFDLE9BQU8sT0FBTyw0QkFBNkIsU0FBUSxlQUFlO0lBR3JFOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBcEJQLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFzQm5CLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUVELFlBQVksS0FBSSxDQUFDO0lBRWpCLE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTs7Ozs7Ozs7OEJBUVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUE7OzRDQUVNLENBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FDbkMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzRDQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsR0FB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