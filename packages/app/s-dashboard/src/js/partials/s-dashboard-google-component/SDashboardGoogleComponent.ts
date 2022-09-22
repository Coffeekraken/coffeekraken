// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';

import '../../../../../../src/js/partials/s-dashboard-google-component/s-dashboard-google-component.css';

export default class SDashboardGoogleComponent extends __SLitComponent {
    _gtm: string;
    _ga: string;

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
    }

    firstUpdated() {
        // GTM
        const $gtm = this.document.querySelector(
            'script[src^="https://www.googletagmanager.com/gtm.js?id="]',
        );
        this._gtm = $gtm?.src.match(/id=([a-zA-Z0-9_-]+)/)[1];

        // GA
        const $ga = this.document.querySelector(
            'script[src^="https://www.googletagmanager.com/gtag/js?id="]',
        );
        this._ga = $ga?.src.match(/id=([a-zA-Z0-9_-]+)/)[1];

        this.requestUpdate();
    }

    render() {
        return html`
            <div class="s-dashboard-analytics s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Google</h2>

                <div class="ck-panel">
                    ${this._gtm
                        ? html`
                              <div class="ck-stat">
                                  <h3 class="ck-stat__label">
                                      Google Tag Manager
                                  </h3>
                                  <p class="ck-stat__value ck-stat__value-code">
                                      ${this._gtm ?? 'Undefined'}
                                  </p>
                              </div>
                          `
                        : ''}
                    ${this._ga
                        ? html`
                              <div class="ck-stat">
                                  <h3 class="ck-stat__label">
                                      Google Analytics
                                  </h3>
                                  <p class="ck-stat__value ck-stat__value-code">
                                      ${this._ga ?? 'Undefined'}
                                  </p>
                              </div>
                          `
                        : ''}
                    ${!this._gtm && !this._ga
                        ? html`
                              <p class="s-typo:p">
                                  No google analytics or tag manager
                                  installed...
                              </p>
                          `
                        : ''}
                </div>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 's-dashboard-google') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardGoogleComponent);
}
