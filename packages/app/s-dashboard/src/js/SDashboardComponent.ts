import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import __css from '../../../../src/css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface';

import { __define as __SDashboardAssetsComponent } from './partials/s-dashboard-assets-component/SDashboardAssetsComponent';
import { __define as __SDashboardBrowserstackComponent } from './partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent';
import { __define as __SDashboardFrontendCheckerComponent } from './partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent';
import { __define as __SDashboardGoogleComponent } from './partials/s-dashboard-google-component/SDashboardGoogleComponent';
import {
    __define as __SDashboardPagesComponent,
    events as __SDashboardPagesComponentEvents,
} from './partials/s-dashboard-pages-component/SDashboardPagesComponent';
import { __define as __SDashboardProjectComponent } from './partials/s-dashboard-project-component/SDashboardProjectComponent';
import { __define as __SDashboardResponsiveComponent } from './partials/s-dashboard-responsive-component/SDashboardResponsiveComponent';
import { __define as __SDashboardWebVitalsComponent } from './partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent';

import __logoSvg from '../../../../src/js/partials/logo';

// external components
__SDashboardPagesComponent();
__SDashboardFrontendCheckerComponent();
__SDashboardBrowserstackComponent();
__SDashboardGoogleComponent();
__SDashboardWebVitalsComponent();
__SDashboardResponsiveComponent();
__SDashboardProjectComponent();
__SDashboardAssetsComponent();

export interface ISDashboardComponentProps {}

export default class SDashboardComponent extends __SLitComponent {
    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SDashboardComponentInterface,
        );
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
    get document(): Document {
        return window.parent?.document ?? document;
    }

    _pipedEvents = [...__SDashboardPagesComponentEvents];

    // @ts-ignore
    _dashboardSettings = this.document.dashboard?.settings;

    constructor() {
        super(
            __deepMerge({
                name: 's-dashboard',
                interface: __SDashboardComponentInterface,
                shadowDom: false,
            }),
        );
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
                this.document.dispatchEvent(
                    new CustomEvent(e.type, {
                        detail: e.detail,
                    }),
                );
            });
        });
    }

    open() {
        // @ts-ignore
        this.document.dashboard?.open();
    }

    close() {
        // @ts-ignore
        this.document.dashboard?.close();
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
        return html`
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
                                return html`
                                    <div
                                        class="_column __column-${column.length}"
                                    >
                                        ${column.map((component) =>
                                            component === 's-dashboard-pages'
                                                ? html`
                                                      <!-- <s-dashboard-pages
                                                          .settings=${this
                                                          ._dashboardSettings
                                                          .components?.[
                                                          component
                                                      ] ?? {}}
                                                      ></s-dashboard-pages> -->
                                                  `
                                                : unsafeHTML(`
                                                          <${component} settings="${JSON.stringify(
                                                      this.props.widgets[
                                                          component
                                                      ] ?? {},
                                                  ).replace(
                                                      /\"/gm,
                                                      '&quot;',
                                                  )}"></${component}>
                                                  `),
                                        )}
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

export function __define(
    props: Partial<ISDashboardComponentProps> = {},
    tagName = 's-dashboard',
) {
    __SLitComponent.define(tagName, SDashboardComponent, props, {});
}
