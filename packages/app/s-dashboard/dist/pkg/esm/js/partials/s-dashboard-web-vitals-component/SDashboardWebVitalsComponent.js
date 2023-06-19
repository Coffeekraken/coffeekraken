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
export function __define(props = {}, tagName = 's-dashboard-web-vitals') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardWebVitalsComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyx5R0FBeUcsQ0FBQztBQVNqSCxNQUFNLENBQUMsT0FBTyxPQUFPLDRCQUE2QixTQUFRLGVBQWU7SUFDckUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFJRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFFRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQXBCUCxlQUFVLEdBQVEsSUFBSSxDQUFDO1FBc0JuQixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQzlDLENBQUM7SUFFRCxZQUFZLEtBQUksQ0FBQztJQUVqQixZQUFZLENBQUMsTUFBMEM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQTs7Ozs7Ozs7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