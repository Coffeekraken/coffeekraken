"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const lit_1 = require("lit");
require("../../../../../../src/js/partials/s-dashboard-browserstack-component/s-dashboard-browserstack-component.css");
const chrome_svg_1 = __importDefault(require("../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/chrome.svg"));
const edge_svg_1 = __importDefault(require("../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/edge.svg"));
const firefox_svg_1 = __importDefault(require("../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/firefox.svg"));
const opera_svg_1 = __importDefault(require("../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/opera.svg"));
const safari_svg_1 = __importDefault(require("../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/safari.svg"));
const samsung_svg_1 = __importDefault(require("../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/samsung.svg"));
const yandex_svg_1 = __importDefault(require("../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/yandex.svg"));
class SDashboardBrowserstackComponent extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
        this._maxVersions = 10;
        this._credentials = {
            username: 'operations@buzzbrothers.ch',
            password: 'flatcar-naples-upwards-AVIONIC-naughty',
        };
        this._browsers = {};
        this._browserSvgs = {
            safari: safari_svg_1.default,
            'Mobile Safari': safari_svg_1.default,
            'Android Browser': samsung_svg_1.default,
            'IE Mobile': edge_svg_1.default,
            edge: edge_svg_1.default,
            firefox: firefox_svg_1.default,
            opera: opera_svg_1.default,
            chrome: chrome_svg_1.default,
            yandex: yandex_svg_1.default,
        };
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa('olivierbossel:yOBXOfHyasdoFUqqHVNs'));
        headers.set('TargetUrl', 'https://api.browserstack.com/5/browsers?all=true&flat=false');
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers,
        };
        // get browsers list on browserstack
        fetch(s_sugar_config_1.default.get('frontendServer.corsProxy.url'), requestOptions)
            .then((response) => response.text())
            .then((result) => {
            var _a;
            const browsers = {};
            for (let [os, osData] of Object.entries(JSON.parse(result))) {
                for (let [osVersion, osVersionData] of Object.entries(osData)) {
                    for (let [idx, browser] of Object.entries(osVersionData)) {
                        if (!browsers[browser.browser]) {
                            browsers[browser.browser] = {};
                        }
                        browsers[browser.browser][(_a = browser.browser_version) !== null && _a !== void 0 ? _a : 'default'] = Object.assign(Object.assign({}, browser), { os, os_version: osVersion });
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
                if (browser.toLocaleLowerCase() === 'ie')
                    continue;
                if (!finalBrowsers[browser]) {
                    finalBrowsers[browser] = [];
                }
                const keys = Object.keys(browserData).sort((a, b) => {
                    const ba = browserData[a], bb = browserData[b];
                    return (parseFloat(ba.browser_version) -
                        parseFloat(bb.browser_version));
                });
                for (let i = keys.length - 1; i >= 0; i--) {
                    finalBrowsers[browser].push(browserData[keys[i]]);
                    if (finalBrowsers[browser].length >= this._maxVersions) {
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
    firstUpdated() { }
    render() {
        return (0, lit_1.html) `
            <div class="s-dashboard-browserstack s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Browserstack</h2>

                <div class="_browsers ck-panel">
                    ${Object.keys(this._browsers).length
            ? (0, lit_1.html) `
                              ${Object.entries(this._browsers).map(([browser, browserObj]) => (0, lit_1.html) `
                                      <div
                                          class="s-dropdown-container"
                                          tabindex="-1"
                                      >
                                          <div class="s-tooltip-container">
                                              <img
                                                  class="_browser-svg"
                                                  alt="${browser}"
                                                  src="${this._browserSvgs[browser]}"
                                              />
                                              <div class="s-tooltip">
                                                  ${browser}
                                              </div>
                                          </div>
                                          <div class="s-dropdown">
                                              <ol class="ck-list">
                                                  ${Object.entries(browserObj).map(([idx, obj]) => {
                var _a;
                return (0, lit_1.html) `
                                                          <li
                                                              class="ck-list__item"
                                                          >
                                                              <a
                                                                  href="https://live.browserstack.com/dashboard#os=${obj.os}&os_version=${obj.os_version}&browser=${obj.browser}&browser_version=${obj.browser_version}&zoom_to_fit=true&full_screen=true&url=https://google.com"
                                                                  target="_blank"
                                                              >
                                                                  ${(_a = obj.browser_version) !== null && _a !== void 0 ? _a : obj.browser}
                                                              </a>
                                                          </li>
                                                      `;
            })}
                                              </ol>
                                          </div>
                                      </div>
                                  `)}
                          `
            : (0, lit_1.html) `
                              <div
                                  class="s-loader:spinner s-color:accent"
                              ></div>
                          `}
                </div>
            </div>
        `;
    }
}
exports.default = SDashboardBrowserstackComponent;
function define(props = {}, tagName = 's-dashboard-browserstack') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardBrowserstackComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsa0ZBQTBEO0FBQzFELDZCQUEyQjtBQUUzQix1SEFBcUg7QUFFckgscUlBQThHO0FBQzlHLGlJQUEwRztBQUMxRyx1SUFBZ0g7QUFDaEgsbUlBQTRHO0FBQzVHLHFJQUE4RztBQUM5Ryx1SUFBZ0g7QUFDaEgscUlBQThHO0FBRTlHLE1BQXFCLCtCQUFnQyxTQUFRLHlCQUFlO0lBc0J4RTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQXhCUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFHO1lBQ1gsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsd0NBQXdDO1NBQ3JELENBQUM7UUFFRixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBRXBCLGlCQUFZLEdBQUc7WUFDWCxNQUFNLEVBQUUsb0JBQVc7WUFDbkIsZUFBZSxFQUFFLG9CQUFXO1lBQzVCLGlCQUFpQixFQUFFLHFCQUFZO1lBQy9CLFdBQVcsRUFBRSxrQkFBUztZQUN0QixJQUFJLEVBQUUsa0JBQVM7WUFDZixPQUFPLEVBQUUscUJBQVk7WUFDckIsS0FBSyxFQUFFLG1CQUFVO1lBQ2pCLE1BQU0sRUFBRSxvQkFBVztZQUNuQixNQUFNLEVBQUUsb0JBQVc7U0FDdEIsQ0FBQztRQU9FLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxlQUFlLEVBQ2YsUUFBUSxHQUFHLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUN4RCxDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxXQUFXLEVBQ1gsNkRBQTZELENBQ2hFLENBQUM7UUFFRixJQUFJLGNBQWMsR0FBRztZQUNqQixNQUFNLEVBQUUs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