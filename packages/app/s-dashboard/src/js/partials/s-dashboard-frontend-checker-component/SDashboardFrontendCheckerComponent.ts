// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';

import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';

import __css from './s-dashboard-frontend-checker-component.css';

import { __upperFirst } from '@coffeekraken/sugar/string';

import __SFrontendChecker, {
    ISFrontendCheckerCheckObj,
    ISFrontendCheckerCheckResult,
} from '@coffeekraken/s-frontend-checker';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface ISDashboardFrontendCheckerComponentSettings {
    checks: string[];
}

export default class SDashboardFrontendCheckerComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            _SDashboardComponentWidgetInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    constructor() {
        super({
            shadowDom: false,
        });
        this._level = parseInt(
            window.localStorage.getItem('ck-dashboard-level') || 2,
        );
        this._displayStatus = JSON.parse(
            window.localStorage.getItem(
                'ck-dashboard-frontend-checker-display-status',
            ) || `["warning","error"]`,
        );

        this._frontendChecker = new __SFrontendChecker();
    }

    _frontendChecker: __SFrontendChecker;
    _checksResult: ISFrontendCheckerCheckResult = {
        score: null,
        duration: null,
        checks: {},
    };
    _displayStatus: string[] = [
        'warning',
        'error',
        __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
        __SFrontendChecker.CATEGORY_PERFORMANCE,
        __SFrontendChecker.CATEGORY_SEO,
        __SFrontendChecker.CATEGORY_SOCIAL,
    ];
    _level = 1;

    firstUpdated() {
        this._check();
    }

    _check() {
        const pro = this._frontendChecker.check(
            window.parent?.document ?? document,
            this.props.settings.checks,
        );

        pro.on('checks.start', (checksResult: ISFrontendCheckerCheckResult) => {
            this._checksResult = checksResult;
            this.requestUpdate();
        });
        pro.on('check.start', (checkObj: ISFrontendCheckerCheckObj) => {
            this.requestUpdate();
        });
        pro.on('check.complete', (checkObj: ISFrontendCheckerCheckObj) => {
            this.requestUpdate();
        });
        pro.on(
            'checks.complete',
            (checksResult: ISFrontendCheckerCheckResult) => {
                _console.log('ch', checksResult);
                this.requestUpdate();
            },
        );
    }

    _chooseLevel(level: number) {
        this._level = level;
        window.localStorage.setItem('ck-dashboard-level', level.toString());
        this.requestUpdate();
    }

    _toggleDisplay(display: string) {
        if (this._displayStatus.includes(display)) {
            this._displayStatus = this._displayStatus.filter(
                (s) => s !== display,
            );
        } else {
            this._displayStatus.push(display);
        }
        window.localStorage.setItem(
            'ck-dashboard-frontend-checker-display-status',
            JSON.stringify(this._displayStatus),
        );
        this.requestUpdate();
    }

    render() {
        return html`
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
                                        ? html`
                                              <i class="s-loader:spinner"></i>
                                          `
                                        : html`
                                              ${this._checksResult?.score ??
                                              '...'}
                                          `}
                                </span>
                                <span class="_score-unit">pts</span>
                            </div>
                        </div>

                        <div class="_filters _filters-tabs">
                            ${this._frontendChecker.levels.map(
                                (level) => html`
                                    <div
                                        class="_filter ${this._level === level
                                            ? 'active'
                                            : ''}"
                                        @click=${() => this._chooseLevel(level)}
                                    >
                                        ${unsafeHTML(
                                            this._frontendChecker.icons[level],
                                        )}
                                    </div>
                                `,
                            )}
                        </div>
                        <div class="_filters">
                            ${this._frontendChecker.statuses.map(
                                (status) => html`
                                    <div
                                        class="_filter ${this._displayStatus.includes(
                                            status,
                                        )
                                            ? 'active'
                                            : ''}"
                                        @click=${() =>
                                            this._toggleDisplay(status)}
                                    >
                                        ${unsafeHTML(
                                            this._frontendChecker.icons[status],
                                        )}
                                        <span>${__upperFirst(status)}</span>
                                        <span class="ck-count"
                                            >${Object.keys(
                                                this._checksResult.checks,
                                            ).filter((checkId) => {
                                                const check =
                                                    this._checksResult.checks[
                                                        checkId
                                                    ];
                                                return (
                                                    check.level <=
                                                        this._level &&
                                                    check.result?.status ===
                                                        status
                                                );
                                            }).length}</span
                                        >
                                    </div>
                                `,
                            )}
                        </div>

                        <div class="_filters">
                            ${[
                                __SFrontendChecker.CATEGORY_ACCESSIBILITY,
                                __SFrontendChecker.CATEGORY_BEST_PRACTICES,
                                __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
                                __SFrontendChecker.CATEGORY_PERFORMANCE,
                                __SFrontendChecker.CATEGORY_SEO,
                                __SFrontendChecker.CATEGORY_SOCIAL,
                            ].map(
                                (categoryId) => html`
                                    <div
                                        class="_filter s-tooltip-container ${this._displayStatus.includes(
                                            categoryId,
                                        )
                                            ? 'active'
                                            : ''}"
                                        @click=${() =>
                                            this._toggleDisplay(categoryId)}
                                    >
                                        ${unsafeHTML(
                                            this._frontendChecker.icons[
                                                categoryId
                                            ],
                                        )}
                                        <span class="ck-count"
                                            >${Object.keys(
                                                this._checksResult.checks,
                                            ).filter((checkId) => {
                                                const check =
                                                    this._checksResult.checks[
                                                        checkId
                                                    ];
                                                return (
                                                    check.category ===
                                                    categoryId
                                                );
                                            }).length}</span
                                        >
                                        <div class="s-tooltip">
                                            ${__upperFirst(categoryId)}
                                        </div>
                                    </div>
                                `,
                            )}
                        </div>
                    </div>

                    <div class="ck-panel_section ck-panel_section-scrollable">
                        <ul class="ck-list">
                            ${Object.keys(this._checksResult.checks)
                                .filter((checkId) => {
                                    const check =
                                        this._checksResult.checks[checkId];
                                    if (!check.result) return true;
                                    return (
                                        check.level <= this._level &&
                                        this._displayStatus.includes(
                                            check.result?.status,
                                        ) &&
                                        this._displayStatus.includes(
                                            check.category,
                                        )
                                    );
                                })
                                .map((checkId) => {
                                    const checkObj =
                                        this._checksResult.checks[checkId];
                                    return html`
                                        <li class="ck-list_item" tabindex="-1">
                                            <h2 class="s-flex:align-center">
                                                <span
                                                    class="s-flex:align-center"
                                                >
                                                    ${checkObj.result
                                                        ? html`
                                                              ${checkObj.result
                                                                  .status ===
                                                              'success'
                                                                  ? html`
                                                                        ${unsafeHTML(
                                                                            this
                                                                                ._frontendChecker
                                                                                .icons[
                                                                                __SFrontendChecker
                                                                                    .STATUS_SUCCESS
                                                                            ],
                                                                        )}
                                                                    `
                                                                  : checkObj
                                                                        .result
                                                                        .status ===
                                                                    'warning'
                                                                  ? html`
                                                                        ${unsafeHTML(
                                                                            this
                                                                                ._frontendChecker
                                                                                .icons[
                                                                                __SFrontendChecker
                                                                                    .STATUS_WARNING
                                                                            ],
                                                                        )}
                                                                    `
                                                                  : html`
                                                                        ${unsafeHTML(
                                                                            this
                                                                                ._frontendChecker
                                                                                .icons[
                                                                                __SFrontendChecker
                                                                                    .STATUS_ERROR
                                                                            ],
                                                                        )}
                                                                    `}
                                                          `
                                                        : html`<i
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
                                                        const promise =
                                                            checkObj.check();
                                                        promise.on(
                                                            'start',
                                                            () => {
                                                                this.requestUpdate();
                                                            },
                                                        );
                                                        promise.on(
                                                            'complete',
                                                            () => {
                                                                this.requestUpdate();
                                                            },
                                                        );
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
                                                    ${checkObj.result
                                                        ?.message ??
                                                    checkObj.description}
                                                </p>

                                                ${checkObj.result
                                                    ? html`
                                                          ${checkObj.result
                                                              .example
                                                              ? html`
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
                                                                      ? html`
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
                                                                  ? html`
                                                                        <div>
                                                                            <button
                                                                                class="s-btn s-color:complementary"
                                                                                @click=${() =>
                                                                                    checkObj.result.action.handler()}
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

export function __define(
    props: any = {},
    tagName = 's-dashboard-frontend-checker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
