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
    _highlightElement($elm) {
        _console.log('Highlighted element', $elm);
        this.dispatchEvent(new CustomEvent('dashboard.hide', {
            bubbles: true,
        }));
        $elm.scrollIntoView();
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
            var _a, _b, _c, _d;
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
                                                    ${unsafeHTML(((_b = (_a = checkObj.result) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : checkObj.description).replace(/\n/gm, '<br/>'))}
                                                </p>

                                                ${checkObj.result
                ? html `
                                                          ${checkObj.result
                    .example
                    ? html `
                                                                    <h3
                                                                        class="s-typo:h4 s-mb:20"
                                                                    >
                                                                        Example
                                                                    </h3>
                                                                    <p
                                                                        class="s-typo:code s-mb:20"
                                                                    >
                                                                        ${checkObj
                        .result
                        .example}
                                                                    </p>
                                                                `
                    : ''}
                                                          ${((_c = checkObj.result
                    .elements) === null || _c === void 0 ? void 0 : _c.length)
                    ? html `
                                                                    <h3
                                                                        class="s-typo:h4 s-mb:20"
                                                                    >
                                                                        Element${checkObj
                        .result
                        .elements
                        .length >
                        1
                        ? `s (${checkObj.result.elements.length})`
                        : ''}
                                                                    </h3>
                                                                    ${Array.from((_d = checkObj
                        .result
                        .elements) !== null && _d !== void 0 ? _d : []).map(($elm) => {
                        const clonedElm = $elm.cloneNode();
                        clonedElm.innerHTML =
                            '';
                        return html `
                                                                                <p
                                                                                    @dblclick=${(e) => {
                            this._highlightElement($elm);
                        }}
                                                                                    class="s-typo:code s-mb:20"
                                                                                >
                                                                                    ${clonedElm.outerHTML}
                                                                                </p>
                                                                            `;
                    })}
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