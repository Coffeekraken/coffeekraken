import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface';
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';
import { __define as __SDashboardAssetsComponent } from './partials/s-dashboard-assets-component/SDashboardAssetsComponent';
import { __define as __SDashboardBrowserstackComponent } from './partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent';
import { __define as __SDashboardFrontendCheckerComponent } from './partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent';
import { __define as __SDashboardGoogleComponent } from './partials/s-dashboard-google-component/SDashboardGoogleComponent';
import { __define as __SDashboardPagesComponent, events as __SDashboardPagesComponentEvents, } from './partials/s-dashboard-pages-component/SDashboardPagesComponent';
import { __define as __SDashboardProjectComponent } from './partials/s-dashboard-project-component/SDashboardProjectComponent';
import { __define as __SDashboardResponsiveComponent } from './partials/s-dashboard-responsive-component/SDashboardResponsiveComponent';
import { __define as __SDashboardWebVitalsComponent } from './partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent';
// dev
// import __css from '../../../../src/css/s-dashboard.css'; // relative to /dist/pkg/esm/js
// import __logoSvg from '../../../../src/js/partials/logo';
// build
import __css from '../css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __logoSvg from './partials/logo';
// external components
__SDashboardPagesComponent();
__SDashboardFrontendCheckerComponent();
__SDashboardBrowserstackComponent();
__SDashboardGoogleComponent();
__SDashboardWebVitalsComponent();
__SDashboardResponsiveComponent();
__SDashboardProjectComponent();
__SDashboardAssetsComponent();
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
        }, {
            title: 'Dashboard',
            description: 'Show sugar dashboard',
        });
        // escape
        __escapeQueue(() => {
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
export function __define(props = {}, tagName = 's-dashboard') {
    __SLitComponent.define(tagName, SDashboardComponent, props, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELGFBQWE7QUFDYixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsSUFBSSwyQkFBMkIsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQzVILE9BQU8sRUFBRSxRQUFRLElBQUksaUNBQWlDLEVBQUUsTUFBTSwrRUFBK0UsQ0FBQztBQUM5SSxPQUFPLEVBQUUsUUFBUSxJQUFJLG9DQUFvQyxFQUFFLE1BQU0sc0ZBQXNGLENBQUM7QUFDeEosT0FBTyxFQUFFLFFBQVEsSUFBSSwyQkFBMkIsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQzVILE9BQU8sRUFDSCxRQUFRLElBQUksMEJBQTBCLEVBQ3RDLE1BQU0sSUFBSSxnQ0FBZ0MsR0FDN0MsTUFBTSxpRUFBaUUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxJQUFJLDRCQUE0QixFQUFFLE1BQU0scUVBQXFFLENBQUM7QUFDL0gsT0FBTyxFQUFFLFFBQVEsSUFBSSwrQkFBK0IsRUFBRSxNQUFNLDJFQUEyRSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxRQUFRLElBQUksOEJBQThCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUV0SSxNQUFNO0FBQ04sMkZBQTJGO0FBQzNGLDRE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