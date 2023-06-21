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
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
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
        this._maxVersions = 10;
        this._credentials = {
            username: 'operations@buzzbrothers.ch',
            password: 'flatcar-naples-upwards-AVIONIC-naughty',
        };
        this._browsers = {
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
    }
    // href="https://live.browserstack.com/dashboard#os=${obj.os}&os_version=${obj.os_version}&browser=${obj.browser}&browser_version=${obj.browser_version}&zoom_to_fit=true&full_screen=true&url=https://google.com"
    firstUpdated() { }
    render() {
        return html `
            <div class="s-dashboard-browserstack s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Browserstack</h2>

                <div class="_browsers ck-panel">
                    ${Object.keys(this._browsers).length
            ? html `
                              ${Object.entries(this._browsers).map(([browser, browserObj]) => html `
                                      <a
                                          href="https://live.browserstack.com/dashboard#browser=${browser}&&zoom_to_fit=true&full_screen=true&url=${this
                .document.location.href}"
                                          target="_blank"
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
                                      </a>
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
export function __define(props = {}, tagName = 's-dashboard-browserstack') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardBrowserstackComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyxLQUFLLE1BQU0sMENBQTBDLENBQUM7QUFFN0QsT0FBTyxXQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFDM0MsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxZQUFZLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxVQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxXQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFDM0MsT0FBTyxZQUFZLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFFM0MsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxlQUFlO0lBQ3hFLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsbUNBQW1DLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFpQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksUUFBUTs7UUFDUixPQUFPLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxRQUFRLG1DQUFJLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFqRFAsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsaUJBQVksR0FBRztZQUNYLFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsUUFBUSxFQUFFLHdDQUF3QztTQUNyRCxDQUFDO1FBRUYsY0FBUyxHQUFRO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsRUFBRTtZQUNWLE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsRUFBRTtZQUNWLElBQUksRUFBRSxFQUFFO1lBQ1IsV0FBVyxFQUFFLEVBQUU7WUFDZixpQkFBaUIsRUFBRSxFQUFFO1lBQ3JCLGVBQWUsRUFBRSxFQUFFO1NBQ3RCLENBQUM7UUFFRixpQkFBWSxHQUFHO1lBQ1gsTUFBTSxFQUFFLFdBQVc7WUFDbkIsZUFBZSxFQUFFLFdBQVc7WUFDNUIsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixXQUFXLEVBQUUsU0FBUztZQUN0QixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE1BQU0sRUFBRSxXQUFXO1NBQ3RCLENBQUM7UUFzQkUsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsR0FBRyxDQUNQLGVBQWUsRUFDZixRQUFRLEdBQUcsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQ3hELENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUNQLFdBQVcsRUFDWCw2REFBNkQsQ0FDaEUsQ0FBQztJQUNOLENBQUM7SUFFRCxrTkFBa047SUFFbE4sWUFBWSxLQUFJLENBQUM7SUFFakIsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7OztzQkFLRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUE7Z0NBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUNoQyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7O2tHQUVpQyxPQUFPLDJDQUEyQyxJQUFJO2lCQUN6RyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7Ozt5REFNWixPQUFPO3lEQUNQLElBQUksQ0FBQyxZQUFZLENBQ3BCLE9BQU8sQ0FDVjs7O29EQUdDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7bUNBSXRDLENBQ0o7MkJBQ0o7WUFDSCxDQUFDLENBQUMsSUFBSSxDQUFBOzs7OzJCQUlIOzs7U0FHbEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxRQUFRLENBQ3BCLFFBQWEsRUFBRSxFQUNmLE9BQU8sR0FBRywwQkFBMEI7SUFFcEMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsK0JBQStCLENBQUMsQ0FBQztBQUNwRSxDQUFDIn0=