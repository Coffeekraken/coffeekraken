"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
// @ts-ignore
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const hotkey_1 = __importDefault(require("@coffeekraken/sugar/js/keyboard/hotkey"));
const s_dashboard_css_1 = __importDefault(require("../css/s-dashboard.css")); // relative to /dist/pkg/esm/js
const SDashboardComponentInterface_1 = __importDefault(require("./interface/SDashboardComponentInterface"));
const SDashboardBrowserstackComponent_1 = require("./partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent");
const SDashboardFrontendCheckerComponent_1 = require("./partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent");
const SDashboardGoogleComponent_1 = require("./partials/s-dashboard-google-component/SDashboardGoogleComponent");
const SDashboardPagesComponent_1 = require("./partials/s-dashboard-pages-component/SDashboardPagesComponent");
const SDashboardProjectComponent_1 = require("./partials/s-dashboard-project-component/SDashboardProjectComponent");
const SDashboardResponsiveComponent_1 = require("./partials/s-dashboard-responsive-component/SDashboardResponsiveComponent");
const SDashboardWebVitalsComponent_1 = require("./partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent");
const logo_1 = __importDefault(require("./partials/logo"));
// external components
(0, SDashboardPagesComponent_1.define)();
(0, SDashboardFrontendCheckerComponent_1.define)();
(0, SDashboardBrowserstackComponent_1.define)();
(0, SDashboardGoogleComponent_1.define)();
(0, SDashboardWebVitalsComponent_1.define)();
(0, SDashboardResponsiveComponent_1.define)();
(0, SDashboardProjectComponent_1.define)();
class SDashboardComponent extends s_lit_component_1.default {
    constructor() {
        super((0, deepMerge_1.default)({
            interface: SDashboardComponentInterface_1.default,
            shadowDom: false,
        }));
        this._pipedEvents = [...SDashboardPagesComponent_1.events];
        // @ts-ignore
        this._dashboardSettings = this.document.dashboard.settings.dashboard;
        // listen shortcuts
        this._listenShortcuts();
        // pipe events
        this._pipeEvents();
        this._dashboardConfig = s_sugar_config_1.default.get('dashboard');
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_dashboard_css_1.default)}
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
        (0, hotkey_1.default)('ctrl+s').on('press', () => {
            var _a;
            // @ts-ignore
            (_a = this.document.dashboard) === null || _a === void 0 ? void 0 : _a.open();
        });
        // escape
        (0, hotkey_1.default)('escape').on('press', () => {
            var _a;
            // @ts-ignore
            (_a = this.document.dashboard) === null || _a === void 0 ? void 0 : _a.close();
        });
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('')}">
                <header class="header">
                    <div class="s-container:wide">
                        <div class="__toolbar">
                            <div class="__logo">
                                ${(0, unsafe_html_js_1.unsafeHTML)(logo_1.default)}
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
                            ${this._dashboardConfig.layout.map((column) => (0, lit_1.html) `
                                    <div
                                        class="__column __column-${column.length}"
                                    >
                                        ${column.map((component) => {
            var _a;
            return component === 's-dashboard-pages'
                ? (0, lit_1.html) `
                                                      <s-dashboard-pages
                                                          .settings=${this
                    ._dashboardSettings
                    .components[component]}
                                                      ></s-dashboard-pages>
                                                  `
                : (0, lit_1.html) `
                                                      ${(0, unsafe_html_js_1.unsafeHTML)(`<${component} settings="${JSON.stringify((_a = this
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
exports.default = SDashboardComponent;
function define(props = {}, tagName = 's-dashboard') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SDashboardComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUM1RCw0RkFBc0U7QUFDdEUsNkJBQTJDO0FBQzNDLGtFQUEyRDtBQUMzRCxhQUFhO0FBQ2Isa0ZBQTBEO0FBQzFELG9GQUE4RDtBQUM5RCw2RUFBMkMsQ0FBQywrQkFBK0I7QUFDM0UsNEdBQXNGO0FBRXRGLG1JQUE0STtBQUM1SSw2SUFBc0o7QUFDdEosaUhBQTBIO0FBQzFILDhHQUd5RTtBQUN6RSxvSEFBNkg7QUFDN0gsNkhBQXNJO0FBQ3RJLDJIQUFvSTtBQUVwSSwyREFBd0M7QUFFeEMsc0JBQXNCO0FBQ3RCLElBQUEsaUNBQTBCLEdBQUUsQ0FBQztBQUM3QixJQUFBLDJDQUFvQyxHQUFFLENBQUM7QUFDdkMsSUFBQSx3Q0FBaUMsR0FBRSxDQUFDO0FBQ3BDLElBQUEsa0NBQTJCLEdBQUUsQ0FBQztBQUM5QixJQUFBLHFDQUE4QixHQUFFLENBQUM7QUFDakMsSUFBQSxzQ0FBK0IsR0FBRSxDQUFDO0FBQ2xDLElBQUEsbUNBQTRCLEdBQUUsQ0FBQztBQUkvQixNQUFxQixtQkFBb0IsU0FBUSx5QkFBZTtJQTRCNUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxtQkFBVyxFQUFDO1lBQ1IsU0FBUyxFQUFFLHNDQUE4QjtZQUN6QyxTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQ0wsQ0FBQztRQVpOLGlCQUFZLEdBQUcsQ0FBQyxHQUFHLGlDQUFnQyxDQUFDLENBQUM7UUFFckQsYUFBYTtRQUNiLHVCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFXNUQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLGNBQWM7UUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLGdCQUFn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