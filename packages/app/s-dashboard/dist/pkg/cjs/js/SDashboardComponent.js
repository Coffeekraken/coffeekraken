"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
// @ts-ignore
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const s_dashboard_css_1 = __importDefault(require("../../../../src/css/s-dashboard.css")); // relative to /dist/pkg/esm/js
const SDashboardComponentInterface_1 = __importDefault(require("./interface/SDashboardComponentInterface"));
const SDashboardBrowserstackComponent_1 = require("./partials/s-dashboard-browserstack-component/SDashboardBrowserstackComponent");
const SDashboardFrontendCheckerComponent_1 = require("./partials/s-dashboard-frontend-checker-component/SDashboardFrontendCheckerComponent");
const SDashboardGoogleComponent_1 = require("./partials/s-dashboard-google-component/SDashboardGoogleComponent");
const SDashboardPagesComponent_1 = require("./partials/s-dashboard-pages-component/SDashboardPagesComponent");
const SDashboardProjectComponent_1 = require("./partials/s-dashboard-project-component/SDashboardProjectComponent");
const SDashboardResponsiveComponent_1 = require("./partials/s-dashboard-responsive-component/SDashboardResponsiveComponent");
const SDashboardWebVitalsComponent_1 = require("./partials/s-dashboard-web-vitals-component/SDashboardWebVitalsComponent");
const logo_1 = __importDefault(require("../../../../src/js/partials/logo"));
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
        super((0, object_1.__deepMerge)({
            name: 's-dashboard',
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
        (0, keyboard_1.__hotkey)('ctrl+s').on('press', () => {
            this.open();
        });
        // escape
        (0, keyboard_1.__hotkey)('escape').on('press', () => {
            this.close();
        });
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.cu.cls('')}">
                <header class="header">
                    <div class="s-container:wide">
                        <div class="__toolbar">
                            <div class="__logo" @click=${() => this.close()}>
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
    s_lit_component_1.default.define(tagName, SDashboardComponent, props, {});
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUM1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGtFQUEyRDtBQUMzRCxhQUFhO0FBQ2Isa0ZBQTBEO0FBQzFELDJEQUF3RDtBQUN4RCwwRkFBd0QsQ0FBQywrQkFBK0I7QUFDeEYsNEdBQXNGO0FBRXRGLG1JQUE0STtBQUM1SSw2SUFBc0o7QUFDdEosaUhBQTBIO0FBQzFILDhHQUd5RTtBQUN6RSxvSEFBNkg7QUFDN0gsNkhBQXNJO0FBQ3RJLDJIQUFvSTtBQUVwSSw0RUFBeUQ7QUFFekQsc0JBQXNCO0FBQ3RCLElBQUEsaUNBQTBCLEdBQUUsQ0FBQztBQUM3QixJQUFBLDJDQUFvQyxHQUFFLENBQUM7QUFDdkMsSUFBQSx3Q0FBaUMsR0FBRSxDQUFDO0FBQ3BDLElBQUEsa0NBQTJCLEdBQUUsQ0FBQztBQUM5QixJQUFBLHFDQUE4QixHQUFFLENBQUM7QUFDakMsSUFBQSxzQ0FBK0IsR0FBRSxDQUFDO0FBQ2xDLElBQUEsbUNBQTRCLEdBQUUsQ0FBQztBQUkvQixNQUFxQixtQkFBb0IsU0FBUSx5QkFBZTtJQTRCNUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsU0FBUyxFQUFFLHNDQUE4QjtZQUN6QyxTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQ0wsQ0FBQztRQWJOLGlCQUFZLEdBQUcsQ0FBQyxHQUFHLGlDQUFnQyxDQUFDLENBQUM7UUFFckQsYUFBYTtRQUNiLHVCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFZNUQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLGNBQWM7UUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7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