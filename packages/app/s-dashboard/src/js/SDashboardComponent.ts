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
import {
    __define as __SDashboardPagesComponent,
    events as __SDashboardPagesComponentEvents,
} from './partials/s-dashboard-pages-component/SDashboardPagesComponent';
import { __define as __SDashboardProjectComponent } from './partials/s-dashboard-project-component/SDashboardProjectComponent';
import { __define as __SDashboardResponsiveComponent } from './partials/s-dashboard-responsive-component/SDashboardResponsiveComponent';
import { __define as __SDashboardWebVitalsComponent } from './partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent';

import { __injectStyle } from '@coffeekraken/sugar/dom';

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

export interface ISDashboardNotification {
    action: 'show' | 'hide';
    type?: 'default' | 'success' | 'warning' | 'error' | 'running';
    icon?: string;
    id?: string;
    title: string;
    description?: string;
    timeout?: number;
}

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

    _$notifications: HTMLElement;

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

        // listen for widget events
        this._listenWidgetsEvents();
    }

    _notifsById = {};
    notification(notification: ISDashboardNotification): void {
        // init container
        if (!this._$notifications) {
            this._$notifications = document.createElement('div');
            this._$notifications.classList.add(
                this.utils.cls('_notifications'),
            );
            __injectStyle(
                `

                @keyframes notification-running {
                    from {
                        transform: rotateZ(0);
                    }
                    to {
                        transform: rotateZ(360deg);
                    }
                }

                .${this.utils.cls('_notifications')} {
                    position: fixed;
                    z-index: 99999;
                    bottom: 20px; right: 20px;
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .${this.utils.cls('_notifications')} ._notification {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    background: rgba(0,0,0,0.2);
                    backdrop-filter: blur(40px);
                    color: white;
                    border-radius: 10px;
                    padding: 15px;
                }
                .${this.utils.cls('_notifications')} ._icon {
                    flex-grow: 0;
                }
                .${this.utils.cls(
                    '_notifications',
                )} ._notification.running ._icon {
                    animation: notification-running 1s linear infinite;
                }
                .${this.utils.cls('_notifications')} ._icon svg {
                    width: 1em;
                    height: 1em;
                    font-size: 50px;
                    padding: 10px;
                }
                .${this.utils.cls('_notifications')} ._icon svg path {
                    fill: rgb(255, 187, 0);
                }
                .${this.utils.cls('_notifications')} ._metas {
                    flex-grow: 1;
                }
                .${this.utils.cls('_notifications')} ._title {
                    font-weight: bold;
                }
                .${this.utils.cls('_notifications')} ._description {
                    color: rgba(255, 255, 255, 0.5);
                }

            `,
                {
                    rootNode: this.document.head,
                },
            );
        }
        this.document.body.appendChild(this._$notifications);

        if (notification.id) {
            this._notifsById[notification.id]?.remove?.();
            delete this._notifsById[notification.id];
        }

        // create notification
        let $notif;
        switch (notification.action) {
            case 'hide':
                break;
            case 'show':
            default:
                $notif = document.createElement('div');
                $notif.classList.add('_notification');
                $notif.classList.add(notification.type ?? '');
                if (notification.icon) {
                    const $icon = document.createElement('div');
                    $icon.classList.add('_icon');
                    $icon.innerHTML = notification.icon;
                    $notif.appendChild($icon);
                }
                const $metas = document.createElement('div');
                $metas.classList.add('_metas');
                $notif.appendChild($metas);
                const $title = document.createElement('h6');
                $title.classList.add('_title');
                $title.innerHTML = notification.title;
                $metas.appendChild($title);
                if (notification.description) {
                    const $desc = document.createElement('p');
                    $desc.classList.add('_description');
                    $desc.innerHTML = notification.description;
                    $metas.appendChild($desc);
                }
                if (notification.id && this._notifsById[notification.id]) {
                    this._notifsById[notification.id].after($notif);
                } else {
                    this._$notifications.appendChild($notif);
                }
                break;
        }

        // id
        if (notification.id && $notif.parentElement) {
            this._notifsById[notification.id] = $notif;
        }

        // timeout
        if (notification.timeout) {
            setTimeout(() => {
                $notif.remove();
                if (notification.id) {
                    delete this._notifsById[notification.id];
                }
            }, notification.timeout);
        }
    }

    /**
     * Listen for widgets events
     */
    _listenWidgetsEvents(): void {
        this.addEventListener('notification', (e) => {
            this.notification(e.detail);
        });
        this.addEventListener('notification.close', (e) => {
            this.notification({
                action: 'hide',
                ...(e.detail ?? {}),
            });
        });
        this.addEventListener('dashboard.hide', (e) => {
            this.close();
        });
        this.addEventListener('dashboard.show', (e) => {
            this.open();
        });
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
        __hotkey('ctrl+s').on(
            'press',
            () => {
                this.open();
            },
            {
                title: 'Dashboard',
                description: 'Show sugar dashboard',
            },
        );
        // escape
        __escapeQueue(() => {
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
