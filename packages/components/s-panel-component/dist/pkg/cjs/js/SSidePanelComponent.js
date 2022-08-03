"use strict";
// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const SSidePanelComponentInterface_1 = __importDefault(require("./interface/SSidePanelComponentInterface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const hotkey_1 = __importDefault(require("@coffeekraken/sugar/js/keyboard/hotkey"));
// @ts-ignore
const s_side_panel_css_1 = __importDefault(require("../../../../src/css/s-side-panel.css")); // relative to /dist/pkg/esm/js
class SSidePanel extends s_lit_component_1.default {
    constructor() {
        super((0, deepMerge_1.default)({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: SSidePanelComponentInterface_1.default,
            },
        }));
        if (this.props.closeOn.indexOf('click') !== -1) {
            this.addEventListener('click', (e) => {
                if (this._$container.contains(e.target))
                    return;
                if (this.constructor._activePanels.slice(-1)[0] !== this)
                    return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }
        if (this.props.closeOn.indexOf('escape') !== -1) {
            (0, hotkey_1.default)('escape').on('press', () => {
                if (this.constructor._activePanels.slice(-1)[0] !== this)
                    return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }
        this._$nodes = Array.from(this.children);
        if (this.props.triggerer) {
            const $triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
            $triggerers.forEach(($triggerer) => {
                $triggerer.addEventListener('click', (e) => {
                    this.open();
                });
            });
        }
    }
    static get properties() {
        return s_lit_component_1.default.properties({}, SSidePanelComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_side_panel_css_1.default)}
        `;
    }
    set active(value) {
        this._active = value;
        if (value && this.constructor._activePanels.indexOf(this) === -1) {
            this.constructor._activePanels.push(this);
        }
        if (value) {
            this.setAttribute('active', true);
        }
        else
            this.removeAttribute('active');
        this.requestUpdate();
    }
    get active() {
        return this._active;
    }
    firstUpdated() {
        this._$container = this.querySelector('.s-side-panel__container');
        this._$nodes.forEach(($node) => {
            var _a;
            (_a = this._$container) === null || _a === void 0 ? void 0 : _a.appendChild($node);
        });
    }
    open() {
        this.active = true;
    }
    close() {
        this.active = false;
    }
    render() {
        return (0, lit_1.html) `
            ${this.overlay
            ? (0, lit_1.html) `
                      <div
                          class="${this.componentUtils.className('__overlay')}"
                      ></div>
                  `
            : ''}
            <div class="${this.componentUtils.className('__container')}"></div>
        `;
    }
}
SSidePanel._activePanels = [];
__decorate([
    (0, decorators_js_1.property)()
], SSidePanel.prototype, "overlay", void 0);
exports.default = SSidePanel;
function define(props = {}, tagName = 's-side-panel') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SSidePanel);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7QUFFZCw0RkFBc0U7QUFDdEUsNkJBQTJDO0FBQzNDLHFEQUE2QztBQUM3Qyw0R0FBc0Y7QUFDdEYsb0ZBQTREO0FBRTVELG9GQUE4RDtBQUU5RCxhQUFhO0FBQ2IsNEZBQXlELENBQUMsK0JBQStCO0FBVXpGLE1BQXFCLFVBQVcsU0FBUSx5QkFBZTtJQWdDbkQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxtQkFBVyxFQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSxzQ0FBOEI7YUFDNUM7U0FDSixDQUFDLENBQ0wsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUFFLE9BQU87Z0JBQ2hELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSTtvQkFDcEQsT0FBTztnQkFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMs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