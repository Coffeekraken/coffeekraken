"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("../../../../../../src/js/partials/s-dashboard-frontend-checker-component/s-dashboard-frontend-checker-component.css");
const s_frontend_checker_1 = __importDefault(require("@coffeekraken/s-frontend-checker"));
class SDashboardFrontendCheckerComponent extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
        this._checkResults = [];
        this._displayStatus = ['warning', 'error'];
        this._level = 1;
        this._level = parseInt(window.localStorage.getItem('ck-dashboard-level') || 2);
        this._displayStatus = JSON.parse(window.localStorage.getItem('ck-dashboard-frontend-checker-display-status') || `["warning","error"]`);
    }
    firstUpdated() {
        var _a, _b;
        const checker = new s_frontend_checker_1.default();
        const pro = checker.check((_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document);
        pro.on('check', (checkResult) => {
            this._checkResults.push(checkResult);
            this.requestUpdate();
        });
    }
    _chooseLevel(level) {
        this._level = level;
        window.localStorage.setItem('ck-dashboard-level', level.toString());
        this.requestUpdate();
    }
    _toggleStatus(status) {
        if (this._displayStatus.includes(status)) {
            this._displayStatus = this._displayStatus.filter((s) => s !== status);
        }
        else {
            this._displayStatus.push(status);
        }
        window.localStorage.setItem('ck-dashboard-frontend-checker-display-status', JSON.stringify(this._displayStatus));
        this.requestUpdate();
    }
    render() {
        return (0, lit_1.html) `
            <div class="s-dashboard-frontend-checker s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Frontend checker</h2>

                <div class="ck-panel">
                    <div class="ck-tabs">
                        <div
                            class=" ck-tabs__item ${this._level === 0
            ? 'active'
            : ''}"
                            @click=${() => this._chooseLevel(0)}
                        >
                            <i class="s-icon:low"></i> <span>Low</span>
                        </div>
                        <div
                            class=" ck-tabs__item ${this._level === 1
            ? 'active'
            : ''}"
                            @click=${() => this._chooseLevel(1)}
                        >
                            <i class="s-icon:medium"></i> <span>Medium</span>
                        </div>
                        <div
                            class=" ck-tabs__item ${this._level === 2
            ? 'active'
            : ''}"
                            @click=${() => this._chooseLevel(2)}
                        >
                            <i class="s-icon:high"></i> <span>High</span>
                        </div>
                    </div>
                    <div class="_filters">
                        <div
                            class="_filter ${this._displayStatus.includes('success')
            ? 'active'
            : ''}"
                            @click=${() => this._toggleStatus('success')}
                        >
                            <i class="s-icon:success s-tc:success"></i>
                            Success
                            <span class="ck-count"
                                >${this._checkResults.filter((r) => r.level <= this._level &&
            r.result.status === 'success').length}</span
                            >
                        </div>
                        <div
                            class="_filter ${this._displayStatus.includes('warning')
            ? 'active'
            : ''}"
                            @click=${() => this._toggleStatus('warning')}
                        >
                            <i class="s-icon:warning s-tc:warning"></i>
                            Warning
                            <span class="ck-count"
                                >${this._checkResults.filter((r) => r.level <= this._level &&
            r.result.status === 'warning').length}</span
                            >
                        </div>
                        <div
                            class="_filter ${this._displayStatus.includes('error')
            ? 'active'
            : ''}"
                            @click=${() => this._toggleStatus('error')}
                        >
                            <i class="s-icon:error s-tc:error"></i>
                            Error
                            <span class="ck-count"
                                >${this._checkResults.filter((r) => r.level <= this._level &&
            r.result.status === 'error').length}</span
                            >
                        </div>
                    </div>

                    <ul class="ck-list">
                        ${this._checkResults
            .filter((check) => check.level <= this._level &&
            this._displayStatus.includes(check.result.status))
            .map((check) => (0, lit_1.html) `
                                    <li
                                        class="ck-list__item s-color:${check
            .result.status}"
                                        tabindex="-1"
                                    >
                                        <h2
                                            class="s-typo:p:bold s-flex:align:center"
                                        >
                                            <span class="s-flex:align-center">
                                                <i
                                                    class="s-icon:${check.result
            .status} s-mie:10 s-tc:${check
            .result.status}"
                                                ></i>
                                            </span>
                                            <span class="s-flex-item:grow">
                                                ${check.name}
                                            </span>
                                            <span
                                                class="s-badge:outline s-scale:08 s-color:main"
                                            >
                                                ${check.level === 0
            ? 'LOW'
            : check.level === 1
                ? 'MEDIUM'
                : 'HIGH'}
                                            </span>
                                        </h2>
                                        <div class="_details">
                                            <p
                                                class="_description s-typo:p s-mbs:10"
                                            >
                                                ${check.description}
                                            </p>
                                            ${check.result.example
            ? (0, lit_1.html) `
                                                      <p
                                                          class="s-typo:code s-mbs:10"
                                                      >
                                                          ${check.result
                .example}
                                                      </p>
                                                  `
            : ''}
                                            <div
                                                class="s-flex:align-center ${check
            .result.moreLink ||
            check.result.action
            ? 's-mbs:20'
            : ''}"
                                            >
                                                <div class="s-flex-item:grow">
                                                    ${check.result.moreLink
            ? (0, lit_1.html) `
                                                              <a
                                                                  href="${check
                .result
                .moreLink}"
                                                                  alt="More info"
                                                                  class="_more-link"
                                                                  target="_blank"
                                                                  rel="noopener"
                                                                  >More info</a
                                                              >
                                                          `
            : ''}
                                                </div>
                                                ${check.result.action
            ? (0, lit_1.html) `
                                                          <div>
                                                              <button
                                                                  class="s-btn s-color:complementary"
                                                                  @click=${() => check.result.action.handler()}
                                                              >
                                                                  ${typeof check
                .result
                .action
                .label ===
                'function'
                ? check.result.action.label()
                : check
                    .result
                    .action
                    .label}
                                                              </button>
                                                          </div>
                                                      `
            : ''}
                                            </div>
                                        </div>
                                    </li>
                                `)}
                    </ul>
                </div>
            </div>
        `;
    }
}
exports.default = SDashboardFrontendCheckerComponent;
function define(props = {}, tagName = 's-dashboard-frontend-checker') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBRTNCLCtIQUE2SDtBQUU3SCwwRkFFMEM7QUFFMUMsTUFBcUIsa0NBQW1DLFNBQVEseUJBQWU7SUFDM0U7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFXUCxrQkFBYSxHQUFtQyxFQUFFLENBQUM7UUFDbkQsbUJBQWMsR0FBd0MsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0UsV0FBTSxHQUFHLENBQUMsQ0FBQztRQVpQLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUNsQixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FDekQsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDNUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ3ZCLDhDQUE4QyxDQUNqRCxJQUFJLHFCQUFxQixDQUM3QixDQUFDO0lBQ04sQ0FBQztJQU1ELFlBQVk7O1FBQ1IsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBa0IsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUF5QyxFQUFFLEVBQUU7WUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlB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