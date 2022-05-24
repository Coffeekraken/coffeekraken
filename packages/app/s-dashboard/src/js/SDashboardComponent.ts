import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property } from 'lit/decorators.js';
// @ts-ignore
import __css from '../css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

import { define as __SDashboardPagesComponent } from './partials/s-dashboard-pages-component/SDashboardPagesComponent';
import { define as __SDashboardFrontendCheckerComponent } from './partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent';
import { define as __SDashboardBrowserstackComponent } from './partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent';
import { define as __SDashboardGoogleComponent } from './partials/s-dashboard-google-component/SDashboardGoogleComponent';
import { define as __SDashboardWebVitalsComponent } from './partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent';
import { define as __SDashboardResponsiveComponent } from './partials/s-dashboard-responsive-component/SDashboardResponsiveComponent';

import __logoSvg from './partials/logo';

// external components
__SDashboardPagesComponent();
__SDashboardFrontendCheckerComponent();
__SDashboardBrowserstackComponent();
__SDashboardGoogleComponent();
__SDashboardWebVitalsComponent();
__SDashboardResponsiveComponent();

export interface ISDashboardComponentProps {}

export default class SDashboardComponent extends __SLitComponent {
    static get styles() {
        return css`
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
    get document(): Document {
        return window.parent?.document ?? document;
    }

    dashboardConfig;

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SDashboardComponentInterface,
                },
            }),
        );

        // listen shortcuts
        this._listenShortcuts();

        // inject web vitals if needed
        // this._injectWebVitals();

        this.dashboardConfig = __SSugarConfig.get('dashboard');
    }

    /**
     * Listen shortcuts
     */
    _listenShortcuts() {
        // ctrl+s
        __hotkey('ctrl+s').on('press', () => {
            // @ts-ignore
            this.document.dashboard?.open();
        });
        // escape
        __hotkey('escape').on('press', () => {
            // @ts-ignore
            this.document.dashboard?.close();
        });
    }

    render() {
        return html`
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
                                ...Array(
                                    this.dashboardConfig.layout.length + 1,
                                ).keys(),
                            ]
                                .filter((n) => n !== 0)
                                .join('')} s-gap:30"
                        >
                            ${this.dashboardConfig.layout.map(
                                (column) => html`
                                    <div>
                                        ${column.map(
                                            (component) => html`
                                                ${unsafeHTML(
                                                    `<${component}></${component}>`,
                                                )}
                                            `,
                                        )}
                                    </div>
                                `,
                            )}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
}

export function define(
    props: Partial<ISDashboardComponentProps> = {},
    tagName = 's-dashboard',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SDashboardComponent);
}
