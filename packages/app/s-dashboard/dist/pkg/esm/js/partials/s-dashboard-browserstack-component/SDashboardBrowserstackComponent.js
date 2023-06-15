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
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
    }
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
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa('olivierbossel:yOBXOfHyasdoFUqqHVNs'));
        headers.set('TargetUrl', 'https://api.browserstack.com/5/browsers?all=true&flat=false');
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            headers,
        };
        // get browsers list on browserstack
        fetch(__SSugarConfig.get('frontendServer.corsProxy.url'), requestOptions)
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
        return html `
            <div class="s-dashboard-browserstack s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Browserstack</h2>

                <div class="_browsers ck-panel">
                    ${Object.keys(this._browsers).length
            ? html `
                              ${Object.entries(this._browsers).map(([browser, browserObj]) => html `
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
                                                  ${__upperFirst(browser)}
                                              </div>
                                          </div>
                                          <div class="s-dropdown">
                                              <ol class="ck-list">
                                                  ${Object.entries(browserObj).map(([idx, obj]) => {
                var _a;
                return html `
                                                          <li
                                                              class="ck-list_item"
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
            : html `
                              <div
                                  class="s-loader:spinner s-color:accent"
                              ></div>
                          `}
                </div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-dashboard-browserstack') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardBrowserstackComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxPQUFPLG1DQUFtQyxNQUFNLG9EQUFvRCxDQUFDO0FBRXJHLE9BQU8sNkdBQTZHLENBQUM7QUFFckgsT0FBTyxXQUFXLE1BQU0scUZBQXFGLENBQUM7QUFDOUcsT0FBTyxTQUFTLE1BQU0sbUZBQW1GLENBQUM7QUFDMUcsT0FBTyxZQUFZLE1BQU0sc0ZBQXNGLENBQUM7QUFDaEgsT0FBTyxVQUFVLE1BQU0sb0ZBQW9GLENBQUM7QUFDNUcsT0FBTyxXQUFXLE1BQU0scUZBQXFGLENBQUM7QUFDOUcsT0FBTyxZQUFZLE1BQU0sc0ZBQXNGLENBQUM7QUFDaEgsT0FBTyxXQUFXLE1BQU0scUZBQXFGLENBQUM7QUFFOUcsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxlQUFlO0lBQ3hFLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsbUNBQW1DLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBdUJEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBeEJQLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLGlCQUFZLEdBQUc7WUFDWCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFFBQVEsRUFBRSx3Q0FBd0M7U0FDckQsQ0FBQztRQUVGLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFFcEIsaUJBQVksR0FBRztZQUNYLE1BQU0sRUFBRSxXQUFXO1lB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