import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import __css from '../../../../src/css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface';
import { define as __SDashboardBrowserstackComponent } from './partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent';
import { define as __SDashboardFrontendCheckerComponent } from './partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent';
import { define as __SDashboardGoogleComponent } from './partials/s-dashboard-google-component/SDashboardGoogleComponent';
import { define as __SDashboardPagesComponent, events as __SDashboardPagesComponentEvents } from './partials/s-dashboard-pages-component/SDashboardPagesComponent';
import { define as __SDashboardProjectComponent } from './partials/s-dashboard-project-component/SDashboardProjectComponent';
import { define as __SDashboardResponsiveComponent } from './partials/s-dashboard-responsive-component/SDashboardResponsiveComponent';
import { define as __SDashboardWebVitalsComponent } from './partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent';
import __logoSvg from '../../../../src/js/partials/logo';
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
            name: 's-dashboard',
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
    open() {
        var _a;
        // @ts-ignore
        (_a = this.document.dashboard) === null || _a === void 0 ? void 0 : _a.open();
    }
    close() {
        var _a;
        // @ts-ignore
        (_a = this.document.dashboard) === null || _a === void 0 ? void 0 : _a.close();
    }
    /**
     * Listen shortcuts
     */
    _listenShortcuts() {
        // ctrl+s
        __hotkey('ctrl+s').on('press', () => {
            this.open();
        });
        // escape
        __hotkey('escape').on('press', () => {
            this.close();
        });
    }
    render() {
        return html `
            <div class="${this.cu.cls('')}">
                <header class="header">
                    <div class="s-container:wide">
                        <div class="__toolbar">
                            <div class="__logo" @click=${() => this.close()}>
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
    __SLitComponent.define(tagName, SDashboardComponent, props, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELGFBQWE7QUFDYixPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxLQUFLLE1BQU0scUNBQXFDLENBQUMsQ0FBQywrQkFBK0I7QUFDeEYsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixPQUFPLEVBQUUsTUFBTSxJQUFJLGlDQUFpQyxFQUFFLE1BQU0sK0VBQStFLENBQUM7QUFDNUksT0FBTyxFQUFFLE1BQU0sSUFBSSxvQ0FBb0MsRUFBRSxNQUFNLHNGQUFzRixDQUFDO0FBQ3RKLE9BQU8sRUFBRSxNQUFNLElBQUksMkJBQTJCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUMxSCxPQUFPLEVBQ0gsTUFBTSxJQUFJLDBCQUEwQixFQUNwQyxNQUFNLElBQUksZ0NBQWdDLEVBQzdDLE1BQU0saUVBQWlFLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sSUFBSSw0QkFBNEIsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQzdILE9BQU8sRUFBRSxNQUFNLElBQUksK0JBQStCLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUN0SSxPQUFPLEVBQUUsTUFBTSxJQUFJLDhCQUE4QixFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFFcEksT0FBTyxTQUFTLE1BQU0sa0NBQWtDLENBQUM7QUFFekQsc0JBQXNCO0FBQ3RC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