// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';

import __css from './s-dashboard-web-vitals-component.css';

export interface ISDashboardWebVitalsComponentVital {
    good: number;
    medium: number;
    value: number;
    unit: 'ms' | 's' | '';
}

export default class SDashboardWebVitalsComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            _SDashboardComponentWidgetInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    _webVitals: any = null;

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
    get document(): Document {
        return window.parent?.document ?? document;
    }

    constructor() {
        super({
            shadowDom: false,
        });

        this.document.addEventListener('webVitals', (e) => {
            this._webVitals = e.detail;
            this.requestUpdate();
        });
        this._webVitals = this.document.webVitals;
    }

    firstUpdated() {}

    _renderVital(vitals: ISDashboardWebVitalsComponentVital): any {
        if (!vitals.value) {
            return html`
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

        const goodPercent = (100 / vitals.good) * vitals.value,
            mediumPercent =
                (100 / (vitals.medium - vitals.good)) * vitals.value,
            poorPercent =
                (100 / (vitals.medium + vitals.medium)) * vitals.value,
            globalPercent =
                (100 / 300) * (goodPercent + mediumPercent + poorPercent);

        let displayValue = vitals.value.toFixed(3);
        if (vitals.unit === 'ms') {
            displayValue = vitals.value.toFixed(0);
        } else if (vitals.unit === 's') {
            displayValue = (vitals.value / 1000).toFixed(2);
        }

        return html`
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
        return html`
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
                                value: this._webVitals?.lcp?.value,
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
                                value: this._webVitals?.fid?.value,
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
                                value: this._webVitals?.cls?.value,
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
                                value: this._webVitals?.fcp?.value,
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
                                value: this._webVitals?.ttfb?.value,
                                unit: 's',
                            })}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export function __define(props: any = {}, tagName = 's-dashboard-web-vitals') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardWebVitalsComponent);
}
