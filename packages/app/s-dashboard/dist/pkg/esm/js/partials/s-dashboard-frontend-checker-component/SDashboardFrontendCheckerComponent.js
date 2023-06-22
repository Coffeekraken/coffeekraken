// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import __css from './s-dashboard-frontend-checker-component.css';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __SFrontendChecker from '@coffeekraken/s-frontend-checker';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
export default class SDashboardFrontendCheckerComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    constructor() {
        super({
            shadowDom: false,
        });
        this._checksResult = {
            score: null,
            duration: null,
            checks: {},
        };
        this._displayStatus = [
            'warning',
            'error',
            __SFrontendChecker.CATEGORY_ACCESSIBILITY,
            __SFrontendChecker.CATEGORY_BEST_PRACTICES,
            __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
            __SFrontendChecker.CATEGORY_PERFORMANCE,
            __SFrontendChecker.CATEGORY_SEO,
            __SFrontendChecker.CATEGORY_SOCIAL,
        ];
        this._level = 1;
        this._level = parseInt(window.localStorage.getItem('ck-dashboard-level') || 2);
        this._displayStatus = JSON.parse(window.localStorage.getItem('ck-dashboard-frontend-checker-display-status') || `["warning","error"]`);
        this._frontendChecker = new __SFrontendChecker();
    }
    firstUpdated() {
        this._check();
    }
    _check() {
        var _a, _b;
        const pro = this._frontendChecker.check((_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document, this.props.settings.checks);
        pro.on('checks.start', (checksResult) => {
            this._checksResult = checksResult;
            this.requestUpdate();
        });
        pro.on('check.start', (checkObj) => {
            this.requestUpdate();
        });
        pro.on('check.complete', (checkObj) => {
            this.requestUpdate();
        });
        pro.on('checks.complete', (checksResult) => {
            _console.log('ch', checksResult);
            this.requestUpdate();
        });
    }
    _chooseLevel(level) {
        this._level = level;
        window.localStorage.setItem('ck-dashboard-level', level.toString());
        this.requestUpdate();
    }
    _toggleDisplay(display) {
        if (this._displayStatus.includes(display)) {
            this._displayStatus = this._displayStatus.filter((s) => s !== display);
        }
        else {
            this._displayStatus.push(display);
        }
        window.localStorage.setItem('ck-dashboard-frontend-checker-display-status', JSON.stringify(this._displayStatus));
        this.requestUpdate();
    }
    render() {
        var _a, _b;
        return html `
            <div class="s-dashboard-frontend-checker s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Frontend checker</h2>

                <div class="ck-panel">
                    <div class="ck-panel_section">
                        <div class="_header">
                            <div class="_score">
                                <span class="_score-label"
                                    >Front<span class="s-tc:accent"
                                        >score</span
                                    ></span
                                >
                                <span class="_score-checks-count">
                                    ${this._frontendChecker.checksCount}<span
                                        class="_score-checks-count-label"
                                        >test${this._frontendChecker
            .checksCount > 1
            ? 's'
            : ''}</span
                                    >
                                </span>
                                <button
                                    ?disabled=${this._frontendChecker.isChecking()}
                                    class="s-btn s-btn--text"
                                    @click=${(e) => {
            this._check();
        }}
                                >
                                    <i class="fa-solid fa-arrows-rotate"></i>
                                </button>
                                <span
                                    class="_score-value ${this._checksResult
            .score >= 66
            ? '_score-high'
            : this._checksResult.score >= 33
                ? '_score-medium'
                : '_score-low'}"
                                >
                                    ${this._frontendChecker.isChecking()
            ? html `
                                              <i class="s-loader:spinner"></i>
                                          `
            : html `
                                              ${(_b = (_a = this._checksResult) === null || _a === void 0 ? void 0 : _a.score) !== null && _b !== void 0 ? _b : '...'}
                                          `}
                                </span>
                                <span class="_score-unit">pts</span>
                            </div>
                        </div>

                        <div class="_filters _filters-tabs">
                            ${this._frontendChecker.levels.map((level) => html `
                                    <div
                                        class="_filter ${this._level === level
            ? 'active'
            : ''}"
                                        @click=${() => this._chooseLevel(level)}
                                    >
                                        ${unsafeHTML(this._frontendChecker.icons[level])}
                                    </div>
                                `)}
                        </div>
                        <div class="_filters">
                            ${this._frontendChecker.statuses.map((status) => html `
                                    <div
                                        class="_filter ${this._displayStatus.includes(status)
            ? 'active'
            : ''}"
                                        @click=${() => this._toggleDisplay(status)}
                                    >
                                        ${unsafeHTML(this._frontendChecker.icons[status])}
                                        <span>${__upperFirst(status)}</span>
                                        <span class="ck-count"
                                            >${Object.keys(this._checksResult.checks).filter((checkId) => {
            var _a;
            const check = this._checksResult.checks[checkId];
            return (check.level <=
                this._level &&
                ((_a = check.result) === null || _a === void 0 ? void 0 : _a.status) ===
                    status);
        }).length}</span
                                        >
                                    </div>
                                `)}
                        </div>

                        <div class="_filters">
                            ${[
            __SFrontendChecker.CATEGORY_ACCESSIBILITY,
            __SFrontendChecker.CATEGORY_BEST_PRACTICES,
            __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
            __SFrontendChecker.CATEGORY_PERFORMANCE,
            __SFrontendChecker.CATEGORY_SEO,
            __SFrontendChecker.CATEGORY_SOCIAL,
        ].map((categoryId) => html `
                                    <div
                                        class="_filter s-tooltip-container ${this._displayStatus.includes(categoryId)
            ? 'active'
            : ''}"
                                        @click=${() => this._toggleDisplay(categoryId)}
                                    >
                                        ${unsafeHTML(this._frontendChecker.icons[categoryId])}
                                        <span class="ck-count"
                                            >${Object.keys(this._checksResult.checks).filter((checkId) => {
            const check = this._checksResult.checks[checkId];
            return (check.category ===
                categoryId);
        }).length}</span
                                        >
                                        <div class="s-tooltip">
                                            ${__upperFirst(categoryId)}
                                        </div>
                                    </div>
                                `)}
                        </div>
                    </div>

                    <div class="ck-panel_section ck-panel_section-scrollable">
                        <ul class="ck-list">
                            ${Object.keys(this._checksResult.checks)
            .filter((checkId) => {
            var _a;
            const check = this._checksResult.checks[checkId];
            if (!check.result)
                return true;
            return (check.level <= this._level &&
                this._displayStatus.includes((_a = check.result) === null || _a === void 0 ? void 0 : _a.status) &&
                this._displayStatus.includes(check.category));
        })
            .map((checkId) => {
            var _a, _b;
            const checkObj = this._checksResult.checks[checkId];
            return html `
                                        <li class="ck-list_item" tabindex="-1">
                                            <h2 class="s-flex:align-center">
                                                <span
                                                    class="s-flex:align-center"
                                                >
                                                    ${checkObj.result
                ? html `
                                                              ${checkObj.result
                    .status ===
                    'success'
                    ? html `
                                                                        ${unsafeHTML(this
                        ._frontendChecker
                        .icons[__SFrontendChecker
                        .STATUS_SUCCESS])}
                                                                    `
                    : checkObj
                        .result
                        .status ===
                        'warning'
                        ? html `
                                                                        ${unsafeHTML(this
                            ._frontendChecker
                            .icons[__SFrontendChecker
                            .STATUS_WARNING])}
                                                                    `
                        : html `
                                                                        ${unsafeHTML(this
                            ._frontendChecker
                            .icons[__SFrontendChecker
                            .STATUS_ERROR])}
                                                                    `}
                                                          `
                : html `<i
                                                              class="s-loader:spinner s-color:accent"
                                                          ></i>`}
                                                </span>
                                                <span
                                                    class="s-flex-item:grow s-typo:p:bold"
                                                >
                                                    ${checkObj.name}
                                                </span>
                                                <button
                                                    ?disabled=${checkObj.isChecking}
                                                    class="s-btn:text"
                                                    @click=${(e) => {
                const promise = checkObj.check();
                promise.on('start', () => {
                    this.requestUpdate();
                });
                promise.on('complete', () => {
                    this.requestUpdate();
                });
            }}
                                                >
                                                    <i
                                                        class="fa-solid fa-arrows-rotate"
                                                    ></i>
                                                </button>
                                                <span
                                                    class="_level level--${checkObj.level}"
                                                >
                                                </span>
                                            </h2>
                                            <div class="_details">
                                                <p
                                                    class="_description s-typo:p s-mbs:20"
                                                >
                                                    ${(_b = (_a = checkObj.result) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : checkObj.description}
                                                </p>

                                                ${checkObj.result
                ? html `
                                                          ${checkObj.result
                    .example
                    ? html `
                                                                    <p
                                                                        class="s-typo:code s-mb:20"
                                                                    >
                                                                        ${checkObj
                        .result
                        .example}
                                                                    </p>
                                                                `
                    : ''}
                                                          <div
                                                              class="s-flex:align-center ${checkObj
                    .result
                    .moreLink ||
                    checkObj.result
                        .action
                    ? 's-mbs:20'
                    : ''}"
                                                          >
                                                              <div
                                                                  class="s-flex-item:grow"
                                                              >
                                                                  ${checkObj
                    .result
                    .moreLink
                    ? html `
                                                                            <a
                                                                                href="${checkObj
                        .result
                        .moreLink}"
                                                                                alt="More info"
                                                                                class="_more-link"
                                                                                target="_blank"
                                                                                rel="noopener"
                                                                                >More
                                                                                info</a
                                                                            >
                                                                        `
                    : ''}
                                                              </div>
                                                              ${checkObj.result
                    .action
                    ? html `
                                                                        <div>
                                                                            <button
                                                                                class="s-btn s-color:complementary"
                                                                                @click=${() => checkObj.result.action.handler()}
                                                                            >
                                                                                ${typeof checkObj
                        .result
                        .action
                        .label ===
                        'function'
                        ? checkObj.result.action.label()
                        : checkObj
                            .result
                            .action
                            .label}
                                                                            </button>
                                                                        </div>
                                                                    `
                    : ''}
                                                          </div>
                                                      `
                : ''}
                                            </div>
                                        </li>
                                    `;
        })}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}
export function __define(props = {}, tagName = 's-dashboard-frontend-checker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0MsT0FBTyxtQ0FBbUMsTUFBTSxvREFBb0QsQ0FBQztBQUVyRyxPQUFPLEtBQUssTUFBTSw4Q0FBOEMsQ0FBQztBQUVqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxrQkFHTixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU0zRCxNQUFNLENBQUMsT0FBTyxPQUFPLGtDQUFtQyxTQUFRLGVBQWU7SUFDM0UsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBY1Asa0JBQWEsR0FBaUM7WUFDMUMsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUNGLG1CQUFjLEdBQWE7WUFDdkIsU0FBUztZQUNULE9BQU87WUFDUCxrQkFBa0IsQ0FBQyxzQkFBc0I7WUFDekMsa0JBQWtCLENBQUMsdUJBQXVCO1lBQzFDLGtCQUFrQixDQUFDLHFCQUFxQjtZQUN4QyxrQkFBa0IsQ0FBQyxvQkFBb0I7WUFDdkMsa0JBQWtC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