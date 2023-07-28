// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface.js';
import __css from './s-dashboard-web-vitals-component.css';
export default class SDashboardWebVitalsComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
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
    _renderVital(vitals) {
        if (!vitals.value) {
            return html `
                <div class="_value">
                    <i class="s-loader:spinner"></i>
                </div>
                <div class="_vital loading">
                    <div class="_indicator"></div>
                    <div class="_scores">
                        <div class="_good"></div>
                        <div class="_medium"></div>
                        <div class="_poor"></div>
                    </div>
                </div>
            `;
        }
        const goodPercent = (100 / vitals.good) * vitals.value, mediumPercent = (100 / (vitals.medium - vitals.good)) * vitals.value, poorPercent = (100 / (vitals.medium + vitals.medium)) * vitals.value, globalPercent = (100 / 300) * (goodPercent + mediumPercent + poorPercent);
        let displayValue = vitals.value.toFixed(3);
        if (vitals.unit === 'ms') {
            displayValue = vitals.value.toFixed(0);
        }
        else if (vitals.unit === 's') {
            displayValue = (vitals.value / 1000).toFixed(2);
        }
        return html `
            <div class="_value">${displayValue}${vitals.unit}</div>
            <div
                class="_vital ${goodPercent <= 100
            ? 'good'
            : mediumPercent <= 100
                ? 'medium'
                : 'poor'}"
            >
                <div
                    class="_indicator"
                    style="--percent: ${globalPercent};"
                ></div>
                <div class="_scores">
                    <div class="_good"></div>
                    <div class="_medium"></div>
                    <div class="_poor"></div>
                </div>
            </div>
        `;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return html `
            <div class="s-dashboard-web-vitals s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Web Vitals</h2>

                <div class="ck-panel">
                    <div class="_stats">
                        <div class="_stat">
                            <h3 class="_label">
                                <a href="https://web.dev/lcp/" target="_blank">
                                    LCP
                                </a>
                            </h3>
                            ${this._renderVital({
            good: 2500,
            medium: 4000,
            value: (_b = (_a = this._webVitals) === null || _a === void 0 ? void 0 : _a.lcp) === null || _b === void 0 ? void 0 : _b.value,
            unit: 's',
        })}
                        </div>

                        <div class="_stat">
                            <h3 class="_label">
                                <a href="https://web.dev/fid/" target="_blank">
                                    FID
                                </a>
                            </h3>
                            ${this._renderVital({
            good: 100,
            medium: 300,
            value: (_d = (_c = this._webVitals) === null || _c === void 0 ? void 0 : _c.fid) === null || _d === void 0 ? void 0 : _d.value,
            unit: 'ms',
        })}
                        </div>

                        <div class="_stat">
                            <h3 class="_label">
                                <a href="https://web.dev/cls/" target="_blank">
                                    CLS
                                </a>
                            </h3>
                            ${this._renderVital({
            good: 100,
            medium: 250,
            value: (_f = (_e = this._webVitals) === null || _e === void 0 ? void 0 : _e.cls) === null || _f === void 0 ? void 0 : _f.value,
            unit: 's',
        })}
                        </div>

                        <div class="_stat">
                            <h3 class="_label">
                                <a href="https://web.dev/fcp/" target="_blank">
                                    FCP
                                </a>
                            </h3>
                            ${this._renderVital({
            good: 1800,
            medium: 3000,
            value: (_h = (_g = this._webVitals) === null || _g === void 0 ? void 0 : _g.fcp) === null || _h === void 0 ? void 0 : _h.value,
            unit: 's',
        })}
                        </div>

                        <div class="_stat">
                            <h3 class="_label">
                                <a href="https://web.dev/ttfb/" target="_blank">
                                    TTFB
                                </a>
                            </h3>
                            ${this._renderVital({
            good: 800,
            medium: 1800,
            value: (_k = (_j = this._webVitals) === null || _j === void 0 ? void 0 : _j.ttfb) === null || _k === void 0 ? void 0 : _k.value,
            unit: 's',
        })}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxtQ0FBbUMsTUFBTSx1REFBdUQsQ0FBQztBQUV4RyxPQUFPLEtBQUssTUFBTSx3Q0FBd0MsQ0FBQztBQVMzRCxNQUFNLENBQUMsT0FBTyxPQUFPLDRCQUE2QixTQUFRLGVBQWU7SUFDckUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUlEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBcEJQLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFzQm5CLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7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