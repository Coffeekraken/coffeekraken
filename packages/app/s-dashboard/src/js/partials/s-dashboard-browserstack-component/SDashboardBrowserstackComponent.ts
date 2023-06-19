// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { html } from 'lit';

import { __upperFirst } from '@coffeekraken/sugar/string';

import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';

import '../../../../../../src/js/partials/s-dashboard-browserstack-component/s-dashboard-browserstack-component.css';

import __chromeSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/chrome.svg';
import __edgeSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/edge.svg';
import __firefoxSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/firefox.svg';
import __operaSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/opera.svg';
import __safariSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/safari.svg';
import __samsumgSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/samsung.svg';
import __yandexSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/yandex.svg';

export default class SDashboardBrowserstackComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            _SDashboardComponentWidgetInterface,
        );
    }

    _maxVersions = 10;

    _credentials = {
        username: 'operations@buzzbrothers.ch',
        password: 'flatcar-naples-upwards-AVIONIC-naughty',
    };

    _browsers: any = {};

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

        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            headers,
        };

        // get browsers list on browserstack
        fetch(
            __SSugarConfig.get('frontendServer.corsProxy.url'),
            requestOptions,
        )
            .then((response) => response.text())
            .then((result) => {
                const browsers = {};

                for (let [os, osData] of Object.entries(JSON.parse(result))) {
                    for (let [osVersion, osVersionData] of Object.entries(
                        osData,
                    )) {
                        for (let [idx, browser] of Object.entries(
                            osVersionData,
                        )) {
                            if (!browsers[browser.browser]) {
                                browsers[browser.browser] = {};
                            }
                            browsers[browser.browser][
                                browser.browser_version ?? 'default'
                            ] = {
                                ...browser,
                                os,
                                os_version: osVersion,
                            };
                        }
                    }
                }

                for (let [browser, browserData] of Object.entries(browsers)) {
                    for (let [version, obj] of Object.entries(browserData)) {
                        if (browser === 'ie') {
                            delete browsers[browser][version];
                        }
                        if (version.match(/(alpha|beta|Dev|Metro)/)) {
                            delete browsers[browser][version];
                        }
                        // if (!obj.devices?.length && !obj.real_devices?.length) {
                        //     delete browsers[browser][version];
                        // }
                    }
                }

                let finalBrowsers = {};

                for (let [browser, browserData] of Object.entries(browsers)) {
                    if (browser.toLocaleLowerCase() === 'ie') continue;
                    if (!finalBrowsers[browser]) {
                        finalBrowsers[browser] = [];
                    }
                    const keys = Object.keys(browserData).sort((a, b) => {
                        const ba = browserData[a],
                            bb = browserData[b];
                        return (
                            parseFloat(ba.browser_version) -
                            parseFloat(bb.browser_version)
                        );
                    });
                    for (let i = keys.length - 1; i >= 0; i--) {
                        finalBrowsers[browser].push(browserData[keys[i]]);
                        if (
                            finalBrowsers[browser].length >= this._maxVersions
                        ) {
                            break;
                        }
                    }
                    for (let [key, value] of Object.entries(finalBrowsers)) {
                        if (!value.length) {
                            delete finalBrowsers[key];
                        }
                    }
                }

                this._browsers = finalBrowsers;
                this.requestUpdate();
            })
            .catch((error) => console.log('error', error));
    }

    firstUpdated() {}

    render() {
        return html`
            <div class="s-dashboard-browserstack s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Browserstack</h2>

                <div class="_browsers ck-panel">
                    ${Object.keys(this._browsers).length
                        ? html`
                              ${Object.entries(this._browsers).map(
                                  ([browser, browserObj]) => html`
                                      <div
                                          class="s-dropdown-container"
                                          tabindex="-1"
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
                                          <div class="s-dropdown">
                                              <ol class="ck-list">
                                                  ${Object.entries(
                                                      browserObj,
                                                  ).map(
                                                      ([idx, obj]) => html`
                                                          <li
                                                              class="ck-list_item"
                                                          >
                                                              <a
                                                                  href="https://live.browserstack.com/dashboard#os=${obj.os}&os_version=${obj.os_version}&browser=${obj.browser}&browser_version=${obj.browser_version}&zoom_to_fit=true&full_screen=true&url=https://google.com"
                                                                  target="_blank"
                                                              >
                                                                  ${obj.browser_version ??
                                                                  obj.browser}
                                                              </a>
                                                          </li>
                                                      `,
                                                  )}
                                              </ol>
                                          </div>
                                      </div>
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
