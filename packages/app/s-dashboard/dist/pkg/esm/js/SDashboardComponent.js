import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface.js';
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';
import { define as __SDashboardAssetsComponent } from './partials/s-dashboard-assets-component/SDashboardAssetsComponent.js';
import { define as __SDashboardBrowserstackComponent } from './partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent.js';
import { define as __SDashboardFrontendCheckerComponent } from './partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent.js';
import { define as __SDashboardGoogleComponent } from './partials/s-dashboard-google-component/SDashboardGoogleComponent.js';
import { define as __SDashboardPagesComponent, events as __SDashboardPagesComponentEvents, } from './partials/s-dashboard-pages-component/SDashboardPagesComponent.js';
import { define as __SDashboardProjectComponent } from './partials/s-dashboard-project-component/SDashboardProjectComponent.js';
import { define as __SDashboardResponsiveComponent } from './partials/s-dashboard-responsive-component/SDashboardResponsiveComponent.js';
import { define as __SDashboardWebVitalsComponent } from './partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent.js';
import { __injectStyle } from '@coffeekraken/sugar/dom';
// dev
// import __css from '../../../../src/css/s-dashboard.css'; // relative to /dist/pkg/esm/js
// import __logoSvg from '../../../../src/js/partials/logo.js';
// build
import __css from '../css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __logoSvg from './partials/logo.js';
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
        this._notifsById = {};
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
    notification(notification) {
        var _a, _b, _c;
        // init container
        if (!this._$notifications) {
            this._$notifications = document.createElement('div');
            this._$notifications.classList.add(this.utils.cls('_notifications'));
            __injectStyle(`

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
                .${this.utils.cls('_notifications')} ._notification.running ._icon {
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

            `, {
                rootNode: this.document.head,
            });
        }
        this.document.body.appendChild(this._$notifications);
        if (notification.id) {
            (_b = (_a = this._notifsById[notification.id]) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
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
                $notif.classList.add((_c = notification.type) !== null && _c !== void 0 ? _c : '');
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
                }
                else {
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
    _listenWidgetsEvents() {
        this.addEventListener('notification', (e) => {
            this.notification(e.detail);
        });
        this.addEventListener('notification.close', (e) => {
            var _a;
            this.notification(Object.assign({ action: 'hide' }, ((_a = e.detail) !== null && _a !== void 0 ? _a : {})));
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
export function define(props = {}, tagName = 's-dashboard') {
    __SLitComponent.define(tagName, SDashboardComponent, props, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELGFBQWE7QUFDYixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyw4QkFBOEIsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFN0QsT0FBTyxFQUFFLE1BQU0sSUFBSSwyQkFBMkIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQzdILE9BQU8sRUFBRSxNQUFNLElBQUksaUNBQWlDLEVBQUUsTUFBTSxrRkFBa0YsQ0FBQztBQUMvSSxPQUFPLEVBQUUsTUFBTSxJQUFJLG9DQUFvQyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDekosT0FBTyxFQUFFLE1BQU0sSUFBSSwyQkFBMkIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQzdILE9BQU8sRUFDSCxNQUFNLElBQUksMEJBQTBCLEVBQ3BDLE1BQU0sSUFBSSxnQ0FBZ0MsR0FDN0MsTUFBTSxvRUFBb0UsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxJQUFJLDRCQUE0QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDaEksT0FBTyxFQUFFLE1BQU0sSUFBSSwrQkFBK0IsRUFBRSxNQUFNLDhFQUE4RSxDQUFDO0FBQ3pJLE9BQU8sRUFBRSxNQUFNLElBQUksOEJBQThCLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUV2SSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0s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