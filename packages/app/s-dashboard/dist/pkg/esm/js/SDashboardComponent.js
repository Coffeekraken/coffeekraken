import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import __css from '../../../../src/css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface';
import { define as __SDashboardBrowserstackComponent } from './partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent';
import { define as __SDashboardFrontendCheckerComponent } from './partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent';
import { define as __SDashboardGoogleComponent } from './partials/s-dashboard-google-component/SDashboardGoogleComponent';
import { define as __SDashboardPagesComponent, events as __SDashboardPagesComponentEvents, } from './partials/s-dashboard-pages-component/SDashboardPagesComponent';
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
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SDashboardComponentInterface);
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
        var _a;
        super(__deepMerge({
            name: 's-dashboard',
            interface: __SDashboardComponentInterface,
            shadowDom: false,
        }));
        this._pipedEvents = [...__SDashboardPagesComponentEvents];
        // @ts-ignore
        this._dashboardSettings = (_a = this.document.dashboard) === null || _a === void 0 ? void 0 : _a.settings;
    }
    mount() {
        // if dashboard settings exists, mean that we are using the dashboard through the "SDashboard" class
        // we then extends the component props with these settings
        if (this._dashboardSettings) {
            for (let [prop, value] of Object.entries(this._dashboardSettings)) {
                this.props[prop] = value;
            }
        }
        // listen shortcuts
        this._listenShortcuts();
        // pipe events
        this._pipeEvents();
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
            <div class="${this.utils.cls('')}">
                <header class="header">
                    <div class="s-container">
                        <div class="_toolbar">
                            <div class="_logo" @click=${() => this.close()}>
                                ${unsafeHTML(__logoSvg)}
                            </div>
                            <h1 class="s-typo:h5">Dashboard</h1>
                            <div class="_grow"></div>
                        </div>
                    </div>
                </header>
                <section class="content">
                    <div class="s-container">
                        <div
                            class="s-layout:${[
            ...Array(this.props.layout.length + 1).keys(),
        ]
            .filter((n) => n !== 0)
            .join('')} s-gap:30"
                        >
                            ${this.props.layout.map((column) => {
            return html `
                                    <div
                                        class="_column __column-${column.length}"
                                    >
                                        ${column.map((component) => {
                var _a, _b, _c;
                return component === 's-dashboard-pages'
                    ? html `
                                                      <!-- <s-dashboard-pages
                                                          .settings=${(_b = (_a = this
                        ._dashboardSettings
                        .components) === null || _a === void 0 ? void 0 : _a[component]) !== null && _b !== void 0 ? _b : {}}
                                                      ></s-dashboard-pages> -->
                                                  `
                    : unsafeHTML(`
                                                          <${component} settings="${JSON.stringify((_c = this.props.widgets[component]) !== null && _c !== void 0 ? _c : {}).replace(/\"/gm, '&quot;')}"></${component}>
                                                  `);
            })}
                                    </div>
                                `;
        })}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELGFBQWE7QUFDYixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxLQUFLLE1BQU0scUNBQXFDLENBQUMsQ0FBQywrQkFBK0I7QUFDeEYsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixPQUFPLEVBQUUsTUFBTSxJQUFJLGlDQUFpQyxFQUFFLE1BQU0sK0VBQStFLENBQUM7QUFDNUksT0FBTyxFQUFFLE1BQU0sSUFBSSxvQ0FBb0MsRUFBRSxNQUFNLHNGQUFzRixDQUFDO0FBQ3RKLE9BQU8sRUFBRSxNQUFNLElBQUksMkJBQTJCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUMxSCxPQUFPLEVBQ0gsTUFBTSxJQUFJLDBCQUEwQixFQUNwQyxNQUFNLElBQUksZ0NBQWdDLEdBQzdDLE1BQU0saUVBQWlFLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sSUFBSSw0QkFBNEIsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQzdILE9BQU8sRUFBRSxNQUFNLElBQUksK0JBQStCLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUN0SSxPQUFPLEVBQUUsTUFBTSxJQUFJLDhCQUE4QixFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFFcEksT0FBTyxTQUFTLE1BQU0sa0NBQWtDLENBQUM7QUFFekQsc0JBQXNCO0FBQ3RCLDBCQUEwQixFQUFFLENBQUM7QUFDN0Isb0NBQW9DLEVB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