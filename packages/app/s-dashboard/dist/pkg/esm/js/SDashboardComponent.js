import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import __css from '../css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface';
import { define as __SDashboardBrowserstackComponent } from './partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent';
import { define as __SDashboardFrontendCheckerComponent } from './partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent';
import { define as __SDashboardGoogleComponent } from './partials/s-dashboard-google-component/SDashboardGoogleComponent';
import { define as __SDashboardPagesComponent, events as __SDashboardPagesComponentEvents, } from './partials/s-dashboard-pages-component/SDashboardPagesComponent';
import { define as __SDashboardProjectComponent } from './partials/s-dashboard-project-component/SDashboardProjectComponent';
import { define as __SDashboardResponsiveComponent } from './partials/s-dashboard-responsive-component/SDashboardResponsiveComponent';
import { define as __SDashboardWebVitalsComponent } from './partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent';
import __logoSvg from './partials/logo';
// external components
__SDashboardPagesComponent();
__SDashboardFrontendCheckerComponent();
__SDashboardBrowserstackComponent();
__SDashboardGoogleComponent();
__SDashboardWebVitalsComponent();
__SDashboardResponsiveComponent();
__SDashboardProjectComponent();
export default class SDashboardComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            interface: __SDashboardComponentInterface,
            shadowDom: false,
        }));
        this._pipedEvents = [...__SDashboardPagesComponentEvents];
        // @ts-ignore
        this._dashboardSettings = this.document.dashboard.settings.dashboard;
        // listen shortcuts
        this._listenShortcuts();
        // pipe events
        this._pipeEvents();
        this._dashboardConfig = __SSugarConfig.get('dashboard');
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
    /**
     * Pipe events
     */
    _pipeEvents() {
        this._pipedEvents.forEach((event) => {
            // @ts-ignore
            this.addEventListener(event, (e) => {
                this.document.dispatchEvent(new CustomEvent(e.type, {
                    detail: e.detail,
                }));
            });
        });
    }
    /**
     * Listen shortcuts
     */
    _listenShortcuts() {
        // ctrl+s
        __hotkey('ctrl+s').on('press', () => {
            var _a;
            // @ts-ignore
            (_a = this.document.dashboard) === null || _a === void 0 ? void 0 : _a.open();
        });
        // escape
        __hotkey('escape').on('press', () => {
            var _a;
            // @ts-ignore
            (_a = this.document.dashboard) === null || _a === void 0 ? void 0 : _a.close();
        });
    }
    render() {
        return html `
            <div class="${this.componentUtils.className('')}">
                <header class="header">
                    <div class="s-container:wide">
                        <div class="__toolbar">
                            <div class="__logo">${unsafeHTML(__logoSvg)}</div>
                            <h1 class="s-typo:h5">Dashboard</h1>
                            <div class="__grow"></div>
                        </div>
                    </div>
                </header>
                <section class="content">
                    <div class="s-container:wide">
                        <div
                            class="s-layout:${[
            ...Array(this._dashboardConfig.layout.length + 1).keys(),
        ]
            .filter((n) => n !== 0)
            .join('')} s-gap:30"
                        >
                            ${this._dashboardConfig.layout.map((column) => html `
                                    <div
                                        class="__column __column-${column.length}"
                                    >
                                        ${column.map((component) => {
            var _a;
            return component === 's-dashboard-pages'
                ? html `
                                                      <s-dashboard-pages
                                                          .settings=${this
                    ._dashboardSettings
                    .components[component]}
                                                      ></s-dashboard-pages>
                                                  `
                : html `
                                                      ${unsafeHTML(`<${component} settings="${JSON.stringify((_a = this
                    ._dashboardSettings
                    .components[component]) !== null && _a !== void 0 ? _a : {})}"></${component}>`)}
                                                  `;
        })}
                                    </div>
                                `)}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-dashboard') {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SDashboardComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsYUFBYTtBQUNiLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEtBQUssTUFBTSx3QkFBd0IsQ0FBQyxDQUFDLCtCQUErQjtBQUMzRSxPQUFPLDhCQUE4QixNQUFNLDBDQUEwQyxDQUFDO0FBRXRGLE9BQU8sRUFBRSxNQUFNLElBQUksaUNBQWlDLEVBQUUsTUFBTSwrRUFBK0UsQ0FBQztBQUM1SSxPQUFPLEVBQUUsTUFBTSxJQUFJLG9DQUFvQyxFQUFFLE1BQU0sc0ZBQXNGLENBQUM7QUFDdEosT0FBTyxFQUFFLE1BQU0sSUFBSSwyQkFBMkIsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQzFILE9BQU8sRUFDSCxNQUFNLElBQUksMEJBQTBCLEVBQ3BDLE1BQU0sSUFBSSxnQ0FBZ0MsR0FDN0MsTUFBTSxpRUFBaUUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxJQUFJLDRCQUE0QixFQUFFLE1BQU0scUVBQXFFLENBQUM7QUFDN0gsT0FBTyxFQUFFLE1BQU0sSUFBSSwrQkFBK0IsRUFBRSxNQUFNLDJFQUEyRSxDQUFDO0FBQ3RJLE9BQU8sRUFBRSxNQUFNLElBQUksOEJBQThCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUVwSSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxzQkFBc0I7QUFDdEIsMEJBQTBCLEVBQUUsQ0FBQztBQUM3QixvQ0FBb0MsRUFBRSxDQUFDO0FBQ3ZDLGlDQUFpQyxFQUFFLENBQUM7QUFDcEMsMkJBQTJCLEVBQUUsQ0FBQztBQUM5Qiw4QkFBOEIsRUFBRSxDQUFDO0FBQ2pDLCtCQUErQixFQUFFLENBQUM7QUFDbEMsNEJBQTRCLEVBQUUsQ0FBQztBQUkvQixNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUE0QjVEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFNBQVMsRUFBRSw4QkFBOEI7WUFDekMsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUNMLENBQUM7UUFaTixpQkFBWSxHQUFHLENBQUMsR0FBRyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBRXJELGFBQWE7UUFDYix1QkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBVzVELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixjQUFjO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUExQ0QsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUF5QkQ7O09BRUc7SUFDSCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNoQyxhQUFhO1lBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDdkIsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtvQkFDcEIsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO2lCQUNuQixDQUFDLENBQ0wsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDWixTQUFTO1FBQ1QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFOztZQUNoQyxhQUFhO1lBQ2IsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsMENBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxTQUFTO1FBQ1QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFOztZQUNoQyxhQUFhO1lBQ2IsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsMENBQUUsS0FBSyxFQUFFLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7OztrREFJVCxVQUFVLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7OENBU3pCO1lBQ2QsR0FBRyxLQUFLLENBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUMxQyxDQUFDLElBQUksRUFBRTtTQUNYO2FBQ0ksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUM7OzhCQUVYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUM5QixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzttRUFFbUIsTUFBTSxDQUFDLE1BQU07OzBDQUV0QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7O1lBQ3ZCLE9BQUEsU0FBUyxLQUFLLG1CQUFtQjtnQkFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQTs7c0VBRWdCLElBQUk7cUJBQ1gsa0JBQWtCO3FCQUNsQixVQUFVLENBQ1gsU0FBUyxDQUNaOzttREFFUjtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFBO3dEQUNFLFVBQVUsQ0FDUixJQUFJLFNBQVMsY0FBYyxJQUFJLENBQUMsU0FBUyxDQUNyQyxNQUFBLElBQUk7cUJBQ0Msa0JBQWtCO3FCQUNsQixVQUFVLENBQ1gsU0FBUyxDQUNaLG1DQUFJLEVBQUUsQ0FDVixPQUFPLFNBQVMsR0FBRyxDQUN2QjttREFDSixDQUFBO1NBQUEsQ0FDVjs7aUNBRVIsQ0FDSjs7Ozs7U0FLcEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQ2xCLFFBQTRDLEVBQUUsRUFDOUMsT0FBTyxHQUFHLGFBQWE7SUFFdkIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsYUFBYTtJQUNiLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDeEQsQ0FBQyJ9