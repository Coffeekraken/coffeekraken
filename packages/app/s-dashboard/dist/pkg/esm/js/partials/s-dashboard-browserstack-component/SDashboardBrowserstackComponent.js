// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-browserstack-component/s-dashboard-browserstack-component.css';
import __chromeSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/chrome.svg';
import __edgeSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/edge.svg';
import __firefoxSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/firefox.svg';
import __operaSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/opera.svg';
import __safariSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/safari.svg';
import __samsumgSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/samsung.svg';
import __yandexSvg from '../../../../../../src/js/partials/s-dashboard-browserstack-component/svg/yandex.svg';
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
                                                  ${browser}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sNkdBQTZHLENBQUM7QUFFckgsT0FBTyxXQUFXLE1BQU0scUZBQXFGLENBQUM7QUFDOUcsT0FBTyxTQUFTLE1BQU0sbUZBQW1GLENBQUM7QUFDMUcsT0FBTyxZQUFZLE1BQU0sc0ZBQXNGLENBQUM7QUFDaEgsT0FBTyxVQUFVLE1BQU0sb0ZBQW9GLENBQUM7QUFDNUcsT0FBTyxXQUFXLE1BQU0scUZBQXFGLENBQUM7QUFDOUcsT0FBTyxZQUFZLE1BQU0sc0ZBQXNGLENBQUM7QUFDaEgsT0FBTyxXQUFXLE1BQU0scUZBQXFGLENBQUM7QUFFOUcsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxlQUFlO0lBc0J4RTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQXhCUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFHO1lBQ1gsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsd0NBQXdDO1NBQ3JELENBQUM7UUFFRixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBRXBCLGlCQUFZLEdBQUc7WUFDWCxNQUFNLEVBQUUsV0FBVztZQUNuQixlQUFlLEVBQUUsV0FBVztZQUM1QixpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFLFlBQVk7WUFDckIsS0FBSyxFQUFFLFVBQVU7WUFDakIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsTUFBTSxFQUFFLFdBQVc7U0FDdEIsQ0FBQztRQU9FLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxlQUFlLEVBQ2YsUUFBUSxHQUFHLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUN4RCxDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxXQUFXLEVBQ1gsNkRBQTZELENBQ2hFLENBQUM7UUFFRixJQUFJLGNBQWMsR0FBRztZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU87U0FDVixDQUFDO1FBRUYsb0NBQW9DO1FBQ3BDLEtBQUssQ0FDRCxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLEVBQ2xELGNBQWMsQ0FDakI7YUFDSSxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNuQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7WUFDYixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFFcEIsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO2dCQUN6RCxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDakQsTUFBTSxDQUNULEVBQUU7b0JBQ0MsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3JDLGFBQWEsQ0FDaEIsRUFBRTt3QkFDQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDNUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7eUJBQ2xDO3dCQUNELFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3JCLE1BQUEsT0FBTyxDQUFDLGVBQWUsbUNBQUksU0FBUyxDQUN2QyxtQ0FDTSxPQUFPLEtBQ1YsRUFBRSxFQUNGLFVBQVUsRUFBRSxTQUFTLEdBQ3hCLENBQUM7cUJBQ0w7aUJBQ0o7YUFDSjtZQUVELEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN6RCxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDcEQsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO3dCQUNsQixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEVBQUU7d0JBQ3pDLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCwyREFBMkQ7b0JBQzNELHlDQUF5QztvQkFDekMsSUFBSTtpQkFDUDthQUNKO1lBRUQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBRXZCLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN6RCxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLElBQUk7b0JBQUUsU0FBUztnQkFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDekIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDL0I7Z0JBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2hELE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDckIsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsT0FBTyxDQUNILFVBQVUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDO3dCQUM5QixVQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUNqQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdkMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEQsSUFDSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQ3BEO3dCQUNFLE1BQU07cUJBQ1Q7aUJBQ0o7Z0JBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUNmLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUM3QjtpQkFDSjthQUNKO1lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDL0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsWUFBWSxLQUFJLENBQUM7SUFFakIsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7OztzQkFLRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUE7Z0NBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUNoQyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7Ozs7Ozs7O3lEQVFSLE9BQU87eURBQ1AsSUFBSSxDQUFDLFlBQVksQ0FDcEIsT0FBTyxDQUNWOzs7b0RBR0MsT0FBTzs7Ozs7b0RBS1AsTUFBTSxDQUFDLE9BQU8sQ0FDWixVQUFVLENBQ2IsQ0FBQyxHQUFHLENBQ0QsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFOztnQkFBQyxPQUFBLElBQUksQ0FBQTs7Ozs7cUhBSzJDLEdBQUcsQ0FBQyxFQUFFLGVBQWUsR0FBRyxDQUFDLFVBQVUsWUFBWSxHQUFHLENBQUMsT0FBTyxvQkFBb0IsR0FBRyxDQUFDLGVBQWU7OztvRUFHbEosTUFBQSxHQUFHLENBQUMsZUFBZSxtQ0FDckIsR0FBRyxDQUFDLE9BQU87Ozt1REFHdEIsQ0FBQTthQUFBLENBQ0o7Ozs7bUNBSWhCLENBQ0o7MkJBQ0o7WUFDSCxDQUFDLENBQUMsSUFBSSxDQUFBOzs7OzJCQUlIOzs7U0FHbEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLDBCQUEwQjtJQUN4RSxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO0FBQ3BFLENBQUMifQ==