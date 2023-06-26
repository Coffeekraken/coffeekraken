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
        var _a, _b;
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
        this._$context = (_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document;
        this._defaultIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/></svg>';
        this._level = parseInt(window.localStorage.getItem('ck-dashboard-level') || 2);
        this._displayStatus = JSON.parse(window.localStorage.getItem('ck-dashboard-frontend-checker-display-status') || `["warning","error"]`);
        this._frontendChecker = new __SFrontendChecker();
    }
    firstUpdated() {
        this._check();
    }
    _handleCheckStart(checkObj) {
        var _a, _b;
        if (checkObj.lazy) {
            this.dispatchEvent(new CustomEvent('dashboard.hide', {
                bubbles: true,
                detail: {},
            }));
            this.dispatchEvent(new CustomEvent('notification', {
                bubbles: true,
                detail: {
                    id: checkObj.id,
                    title: (_a = checkObj.name) !== null && _a !== void 0 ? _a : checkObj.title,
                    type: 'running',
                    description: null,
                    icon: (_b = checkObj.icon) !== null && _b !== void 0 ? _b : this._defaultIcon,
                },
            }));
        }
    }
    _handleCheckComplete(checkObj) {
        var _a, _b, _c, _d;
        if (checkObj.lazy) {
            this.dispatchEvent(new CustomEvent('notification', {
                bubbles: true,
                detail: {
                    id: checkObj.id,
                    title: (_a = checkObj.name) !== null && _a !== void 0 ? _a : checkObj.title,
                    type: (_c = (_b = checkObj.result) === null || _b === void 0 ? void 0 : _b.status) !== null && _c !== void 0 ? _c : 'success',
                    description: null,
                    icon: (_d = checkObj.icon) !== null && _d !== void 0 ? _d : this._defaultIcon,
                    timeout: 2000,
                },
            }));
        }
    }
    _check() {
        const pro = this._frontendChecker.check({
            $context: this._$context,
        });
        pro.on('checks.start', (checksResult) => {
            this._checksResult = checksResult;
            this.requestUpdate();
        });
        pro.on('check.start', (checkObj) => {
            this._handleCheckStart(checkObj);
            this.requestUpdate();
        });
        pro.on('check.complete', (checkObj) => {
            this.requestUpdate();
        });
        pro.on('checks.complete', (checksResult) => {
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
                : checkObj.lazy
                    ? html `<i
                                                              class="fa-regular fa-circle-play"
                                                          ></i>`
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
                promise.on('start', (checkObj) => {
                    this._handleCheckStart(checkObj);
                    this.requestUpdate();
                });
                promise.on('complete', () => {
                    this._handleCheckComplete(checkObj);
                    this.requestUpdate();
                });
            }}
                                                >
                                                    ${checkObj.lazy
                ? html `
                                                              <i
                                                                  class="fa-regular fa-circle-play"
                                                              ></i>
                                                          `
                : html `
                                                              <i
                                                                  class="fa-solid fa-arrows-rotate"
                                                              ></i>
                                                          `}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0MsT0FBTyxtQ0FBbUMsTUFBTSxvREFBb0QsQ0FBQztBQUVyRyxPQUFPLEtBQUssTUFBTSw4Q0FBOEMsQ0FBQztBQUVqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxrQkFHTixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU0zRCxNQUFNLENBQUMsT0FBTyxPQUFPLGtDQUFtQyxTQUFRLGVBQWU7SUFDM0UsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVEOztRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQWNQLGtCQUFhLEdBQWlDO1lBQzFDLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFDRixtQkFBYyxHQUFhO1lBQ3ZCLFNBQVM7WUFDVCxPQUFPO1lBQ1Asa0JBQWtCLENBQUMsc0JBQXNCO1lBQ3pDLGtCQUFrQixDQUFDLHVCQUF1QjtZQUMxQyxrQkFBa0IsQ0FBQyxxQkFBcUI7WUFDeEMsa0JBQWtCLENBQUMsb0JBQW9CO1lBQ3ZDLGtCQUFr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