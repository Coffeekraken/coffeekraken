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

import __logoSvg from './partials/logo';

// external components
__SDashboardPagesComponent();
__SDashboardFrontendCheckerComponent();
__SDashboardBrowserstackComponent();

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
            this.open();
        });
        // escape
        __hotkey('escape').on('press', () => {
            this.close();
        });
    }

    /**
     * @name            close
     * @type        Function
     *
     * Close the dashboard
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    close() {
        if (window.parent) {
            window.parent.document
                .querySelector('.s-dashboard-iframe')
                ?.classList.remove('active');
        } else {
            this.classList.remove('active');
        }
        // overflow
        this.document.querySelector('html').style.removeProperty('overflow');
    }

    /**
     * @name            open
     * @type        Function
     *
     * Close the dashboard
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    open() {
        if (window.parent) {
            window.parent.document
                .querySelector('.s-dashboard-iframe')
                ?.classList.add('active');
        } else {
            this.classList.add('active');
        }

        // overflow
        this.document.querySelector('html').style.overflow = 'hidden';
    }

    /**
     * @name           _injectWebVitals
     * @type            Function
     * @private
     *
     * Inject the webvitals in the document
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _webVitalsInjected = false;
    _injectWebVitals() {
        if (this._webVitalsInjected) return;
        this._webVitalsInjected = true;
        const $script = document.createElement('script');
        $script.setAttribute('type', 'module');
        $script.text = `
            import {getCLS, getFID, getLCP} from 'https://unpkg.com/web-vitals?module';
            getCLS(console.log, true);
            getFID(console.log, true);
            getLCP(console.log, true);
        `;
        console.log('APPEND', $script);
        this.document.body.appendChild($script);
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
