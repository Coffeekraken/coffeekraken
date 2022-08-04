// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import './s-dashboard-web-vitals-component.css';
export default class SDashboardWebVitalsComponent extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
        this._webVitals = null;
        this.document.addEventListener('webVitals', (e) => {
            console.log('Vitals', e.detail);
            this._webVitals = e.detail;
            this.requestUpdate();
        });
        this._webVitals = this.document.webVitals;
        console.log(this._webVitals);
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
        return html `
            <div class="s-dashboard-web-vitals s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Web Vitals</h2>

                <div class="ck-panel">
                    <div class="__stats">
                        <div class="ck-stat">
                            <h3 class="ck-stat__label">
                                LCP
                            </h3>
                            ${this._webVitals.lcp
            ? html `
                                      <p class="ck-stat__value">
                                          ${(this._webVitals.lcp.value / 1000).toFixed(2)}s
                                          ${this._webVitals.lcp.value <= 2500
                ? html `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.lcp.value <=
                    4000
                    ? html `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="s-icon:error s-tc:error"
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
                            <h3 class="ck-stat__label">
                                FID
                            </h3>
                            ${this._webVitals.fid
            ? html `
                                      <p class="ck-stat__value">
                                          ${Math.round(this._webVitals.fid.value)}ms
                                          ${this._webVitals.fid.value <= 100
                ? html `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.fid.value <= 300
                    ? html `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="s-icon:error s-tc:error"
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
                            <h3 class="ck-stat__label">
                                CLS
                            </h3>
                            ${this._webVitals.cls
            ? html `
                                      <p class="ck-stat__value">
                                          ${this._webVitals.cls.value.toFixed(2)}
                                          ${this._webVitals.cls.value <= 0.1
                ? html `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.cls.value <=
                    0.25
                    ? html `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="s-icon:error s-tc:error"
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
                            <h3 class="ck-stat__label">
                                FCP
                            </h3>
                            ${this._webVitals.fcp
            ? html `
                                      <p class="ck-stat__value">
                                          ${(this._webVitals.fcp.value / 1000).toFixed(2)}s
                                          ${this._webVitals.fcp.value <= 1.8
                ? html `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.fcp.value <= 3
                    ? html `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="s-icon:error s-tc:error"
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
                            <h3 class="ck-stat__label">
                                TTFB
                            </h3>
                            ${this._webVitals.ttfb
            ? html `
                                      <p class="ck-stat__value">
                                          ${(this._webVitals.ttfb.value / 1000).toFixed(2)}s
                                          ${this._webVitals.ttfb.value <= 200
                ? html `
                                                    <i
                                                        class="s-icon:success s-tc:success"
                                                    ></i>
                                                `
                : this._webVitals.ttfb.value <=
                    500
                    ? html `
                                                    <i
                                                        class="s-icon:warning s-tc:warning"
                                                    ></i>
                                                `
                    : html `
                                                    <i
                                                        class="s-icon:error s-tc:error"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sd0NBQXdDLENBQUM7QUFFaEQsTUFBTSxDQUFDLE9BQU8sT0FBTyw0QkFBNkIsU0FBUSxlQUFlO0lBa0JyRTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQXBCUCxlQUFVLEdBQVEsSUFBSSxDQUFDO1FBc0JuQixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBNUJEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQWlCRCxZQUFZLEtBQUksQ0FBQztJQUVqQixNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7Ozs7Ozs7Ozs7OEJBVVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUE7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