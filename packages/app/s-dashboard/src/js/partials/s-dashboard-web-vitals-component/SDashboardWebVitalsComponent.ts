// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-web-vitals-component/s-dashboard-web-vitals-component.css';

export default class SDashboardWebVitalsComponent extends __SLitComponent {
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

    render() {
        return html`
            <div class="s-dashboard-web-vitals s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Web Vitals</h2>

                <div class="ck-panel">
                    <div class="_stats">
                        <div class="ck-stat">
                            <h3 class="ck-stat_label">LCP</h3>
                            ${this._webVitals.lcp
                                ? html`
                                      <p class="ck-stat_value">
                                          ${(
                                              this._webVitals.lcp.value / 1000
                                          ).toFixed(2)}s
                                          ${this._webVitals.lcp.value <= 2500
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                                              : this._webVitals.lcp.value <=
                                                4000
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                                              : html`
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
                                : html`
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">FID</h3>
                            ${this._webVitals.fid
                                ? html`
                                      <p class="ck-stat_value">
                                          ${Math.round(
                                              this._webVitals.fid.value,
                                          )}ms
                                          ${this._webVitals.fid.value <= 100
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                                              : this._webVitals.fid.value <= 300
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                                              : html`
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
                                : html`
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">CLS</h3>
                            ${this._webVitals.cls
                                ? html`
                                      <p class="ck-stat_value">
                                          ${this._webVitals.cls.value.toFixed(
                                              2,
                                          )}
                                          ${this._webVitals.cls.value <= 0.1
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                                              : this._webVitals.cls.value <=
                                                0.25
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                                              : html`
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
                                : html`
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">FCP</h3>
                            ${this._webVitals.fcp
                                ? html`
                                      <p class="ck-stat_value">
                                          ${(
                                              this._webVitals.fcp.value / 1000
                                          ).toFixed(2)}s
                                          ${this._webVitals.fcp.value <= 1.8
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                                              : this._webVitals.fcp.value <= 3
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                                              : html`
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
                                : html`
                                      <div
                                          class="s-loader:spinner s-mbs:20 s-color:accent"
                                      ></div>
                                  `}
                        </div>

                        <div class="ck-stat">
                            <h3 class="ck-stat_label">TTFB</h3>
                            ${this._webVitals.ttfb
                                ? html`
                                      <p class="ck-stat_value">
                                          ${(
                                              this._webVitals.ttfb.value / 1000
                                          ).toFixed(2)}s
                                          ${this._webVitals.ttfb.value <= 200
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                    ></i>
                                                `
                                              : this._webVitals.ttfb.value <=
                                                500
                                              ? html`
                                                    <i
                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                    ></i>
                                                `
                                              : html`
                                                    <i
                                                        class="fa-solid fa-xmark s-tc:error"
                                                    ></i>
                                                `}
                                      </p>
                                  `
                                : html`
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

export function define(props: any = {}, tagName = 's-dashboard-web-vitals') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardWebVitalsComponent);
}
