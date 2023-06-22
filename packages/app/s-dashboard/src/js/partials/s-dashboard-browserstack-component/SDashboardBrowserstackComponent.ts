// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';

import { __upperFirst } from '@coffeekraken/sugar/string';

import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';

import __css from './s-dashboard-browserstack-component.css';

import __chromeSvg from './svg/chrome.svg';
import __edgeSvg from './svg/edge.svg';
import __firefoxSvg from './svg/firefox.svg';
import __operaSvg from './svg/opera.svg';
import __safariSvg from './svg/safari.svg';
import __samsumgSvg from './svg/samsung.svg';
import __yandexSvg from './svg/yandex.svg';

export default class SDashboardBrowserstackComponent extends __SLitComponent {
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

    _maxVersions = 10;

    _credentials = {
        username: 'operations@buzzbrothers.ch',
        password: 'flatcar-naples-upwards-AVIONIC-naughty',
    };

    _browsers: any = {
        opera: {},
        safari: {},
        chrome: {},
        firefox: {},
        yandex: {},
        edge: {},
        'IE Mobile': {},
        'Android Browser': {},
        'Mobile Safari': {},
    };

    _browserSvgs = {
        safari: __safariSvg,
        'Mobile Safari': __safariSvg,
        'Android Browser': __samsumgSvg,
        'IE Mobile': __edgeSvg,
        edge: __edgeSvg,
        firefox: __firefoxSvg,
        opera: __operaSvg,
        chrome: __chromeSvg,
        yandex: __yandexSvg,
    };

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

        let headers = new Headers();
        headers.set(
            'Authorization',
            'Basic ' + btoa('olivierbossel:yOBXOfHyasdoFUqqHVNs'),
        );
        headers.set(
            'TargetUrl',
            'https://api.browserstack.com/5/browsers?all=true&flat=false',
        );
    }

    // href="https://live.browserstack.com/dashboard#os=${obj.os}&os_version=${obj.os_version}&browser=${obj.browser}&browser_version=${obj.browser_version}&zoom_to_fit=true&full_screen=true&url=https://google.com"

    firstUpdated() {}

    render() {
        return html`
            <div class="s-dashboard-browserstack s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Browserstack</h2>

                <div class="ck-panel">
                    <div class="ck-panel_section _browsers">
                        ${Object.keys(this._browsers).length
                            ? html`
                                  ${Object.entries(this._browsers).map(
                                      ([browser, browserObj]) => html`
                                          <a
                                              href="https://live.browserstack.com/dashboard#browser=${browser}&&zoom_to_fit=true&full_screen=true&url=${this
                                                  .document.location.href}"
                                              target="_blank"
                                          >
                                              <div class="s-tooltip-container">
                                                  <img
                                                      class="_browser-svg"
                                                      alt="${browser}"
                                                      src="${this._browserSvgs[
                                                          browser
                                                      ]}"
                                                  />
                                                  <div class="s-tooltip">
                                                      ${__upperFirst(browser)}
                                                  </div>
                                              </div>
                                          </a>
                                      `,
                                  )}
                              `
                            : html`
                                  <div
                                      class="s-loader:spinner s-color:accent"
                                  ></div>
                              `}
                    </div>
                </div>
            </div>
        `;
    }
}

export function __define(
    props: any = {},
    tagName = 's-dashboard-browserstack',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardBrowserstackComponent);
}
