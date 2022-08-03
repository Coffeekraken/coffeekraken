// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { html } from 'lit';
import './s-dashboard-browserstack-component.css';
import __chromeSvg from './svg/chrome.svg';
import __edgeSvg from './svg/edge.svg';
import __firefoxSvg from './svg/firefox.svg';
import __operaSvg from './svg/opera.svg';
import __safariSvg from './svg/safari.svg';
import __samsumgSvg from './svg/samsung.svg';
import __yandexSvg from './svg/yandex.svg';
export default class SDashboardBrowserstackComponent extends __SLitComponent {
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
            redirect: 'follow',
            headers,
        };
        // get browsers list on browserstack
        fetch(__SSugarConfig.get('frontendServer.corsProxy.url'), requestOptions)
            .then((response) => response.text())
            .then((result) => {
            var _a;
            const browsers = {};
            console.log(JSON.parse(result));
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
            }
            this._browsers = finalBrowsers;
            console.log(this._browsers);
            this.requestUpdate();
        })
            .catch((error) => console.log('error', error));
    }
    firstUpdated() { }
    render() {
        return html `
            <div class="s-dashboard-browserstack s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Browserstack</h2>

                <div class="__browsers ck-panel">
                    ${Object.keys(this._browsers).length
            ? html `
                              ${Object.entries(this._browsers).map(([browser, browserObj]) => html `
                                      <div
                                          class="s-dropdown-container"
                                          tabindex="-1"
                                      >
                                          <img
                                              class="__browser-svg"
                                              alt="${browser}"
                                              src="${this._browserSvgs[browser]}"
                                          />
                                          <div class="s-dropdown">
                                              <ol class="ck-list">
                                                  ${Object.entries(browserObj).map(([idx, obj]) => html `
                                                          <li
                                                              class="ck-list__item"
                                                          >
                                                              <a
                                                                  href="https://live.browserstack.com/dashboard#os=${obj.os}&os_version=${obj.os_version}&browser=${obj.browser}&browser_version=${obj.browser_version}&zoom_to_fit=true&full_screen=true&url=https://google.com"
                                                                  target="_blank"
                                                              >
                                                                  ${obj.browser_version}
                                                              </a>
                                                          </li>
                                                      `)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sMENBQTBDLENBQUM7QUFFbEQsT0FBTyxXQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFDM0MsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxZQUFZLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxVQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxXQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFDM0MsT0FBTyxZQUFZLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFFM0MsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxlQUFlO0lBc0J4RTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQXhCUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFHO1lBQ1gsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsd0NBQXdDO1NBQ3JELENBQUM7UUFFRixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBRXBCLGlCQUFZLEdBQUc7WUFDWCxNQUFNLEVBQUUsV0FBVztZQUNuQixlQUFlLEVBQUUsV0FBVztZQUM1QixpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFLFlBQVk7WUFDckIsS0FBSyxFQUFFLFVBQVU7WUFDakIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsTUFBTSxFQUFFLFdBQVc7U0FD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