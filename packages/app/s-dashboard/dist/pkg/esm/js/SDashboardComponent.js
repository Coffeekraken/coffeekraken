import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
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
                            <div class="__logo">
                                ${unsafeHTML(__logoSvg)}
                            </div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsYUFBYTtBQUNiLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlELE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFDLENBQUMsK0JBQStCO0FBQzNFLE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFFdEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQ0FBaUMsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQzVJLE9BQU8sRUFBRSxNQUFNLElBQUksb0NBQW9DLEVBQUUsTUFBTSxzRkFBc0YsQ0FBQztBQUN0SixPQUFPLEVBQUUsTUFBTSxJQUFJLDJCQUEyQixFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFDMUgsT0FBTyxFQUNILE1BQU0sSUFBSSwwQkFBMEIsRUFDcEMsTUFBTSxJQUFJLGdDQUFnQyxHQUM3QyxNQUFNLGlFQUFpRSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLElBQUksNEJBQTRCLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsTUFBTSxJQUFJLCtCQUErQixFQUFFLE1BQU0sMkVBQTJFLENBQUM7QUFDdEksT0FBTyxFQUFFLE1BQU0sSUFBSSw4QkFBOEIsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBRXBJLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBRXhDLHNCQUFzQjtBQUN0QiwwQkFBMEIsRUFBRSxDQUFDO0FB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