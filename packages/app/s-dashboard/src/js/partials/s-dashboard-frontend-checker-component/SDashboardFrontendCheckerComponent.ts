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

    _$context = window.parent?.document ?? document;

    _defaultIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/></svg>';

    _handleCheckStart(checkObj: ISFrontendCheckerCheckObj) {
        if (checkObj.lazy) {
            this.dispatchEvent(
                new CustomEvent('dashboard.hide', {
                    bubbles: true,
                    detail: {},
                }),
            );
            this.dispatchEvent(
                new CustomEvent('notification', {
                    bubbles: true,
                    detail: {
                        id: checkObj.id,
                        title: checkObj.name ?? checkObj.title,
                        type: 'running',
                        description: null,
                        icon: checkObj.icon ?? this._defaultIcon,
                    },
                }),
            );
        }
    }

    _handleCheckComplete(checkObj: ISFrontendCheckerCheckObj) {
        if (checkObj.lazy) {
            this.dispatchEvent(
                new CustomEvent('notification', {
                    bubbles: true,
                    detail: {
                        id: checkObj.id,
                        title: checkObj.name ?? checkObj.title,
                        type: checkObj.result?.status ?? 'success',
                        description: null,
                        icon: checkObj.icon ?? this._defaultIcon,
                        timeout: 2000,
                    },
                }),
            );
        }
    }

    _check() {
        const pro = this._frontendChecker.check({
            $context: this._$context,
        });

        pro.on('checks.start', (checksResult: ISFrontendCheckerCheckResult) => {
            this._checksResult = checksResult;
            this.requestUpdate();
        });
        pro.on('check.start', (checkObj: ISFrontendCheckerCheckObj) => {
            this._handleCheckStart(checkObj);
            this.requestUpdate();
        });
        pro.on('check.complete', (checkObj: ISFrontendCheckerCheckObj) => {
            this.requestUpdate();
        });
        pro.on(
            'checks.complete',
            (checksResult: ISFrontendCheckerCheckResult) => {
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

    _highlightElement($elm: HTMLElement): void {
        _console.log('Highlighted element', $elm);

        this.dispatchEvent(
            new CustomEvent('dashboard.hide', {
                bubbles: true,
            }),
        );

        $elm.scrollIntoView();
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
                                                        : checkObj.lazy
                                                        ? html`<i
                                                              class="fa-regular fa-circle-play"
                                                          ></i>`
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
                                                            (checkObj) => {
                                                                this._handleCheckStart(
                                                                    checkObj,
                                                                );
                                                                this.requestUpdate();
                                                            },
                                                        );
                                                        promise.on(
                                                            'complete',
                                                            () => {
                                                                this._handleCheckComplete(
                                                                    checkObj,
                                                                );
                                                                this.requestUpdate();
                                                            },
                                                        );
                                                    }}
                                                >
                                                    ${checkObj.lazy
                                                        ? html`
                                                              <i
                                                                  class="fa-regular fa-circle-play"
                                                              ></i>
                                                          `
                                                        : html`
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
                                                    ${unsafeHTML(
                                                        (
                                                            checkObj.result
                                                                ?.message ??
                                                            checkObj.description
                                                        ).replace(
                                                            /\n/gm,
                                                            '<br/>',
                                                        ),
                                                    )}
                                                </p>

                                                ${checkObj.result
                                                    ? html`
                                                          ${checkObj.result
                                                              .example
                                                              ? html`
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
                                                          ${checkObj.result
                                                              .elements?.length
                                                              ? html`
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
                                                                    ${Array.from(
                                                                        checkObj
                                                                            .result
                                                                            .elements ??
                                                                            [],
                                                                    ).map(
                                                                        (
                                                                            $elm,
                                                                        ) => {
                                                                            const clonedElm =
                                                                                $elm.cloneNode();
                                                                            clonedElm.innerHTML =
                                                                                '';
                                                                            return html`
                                                                                <p
                                                                                    @dblclick=${(
                                                                                        e,
                                                                                    ) => {
                                                                                        this._highlightElement(
                                                                                            $elm,
                                                                                        );
                                                                                    }}
                                                                                    class="s-typo:code s-mb:20"
                                                                                >
                                                                                    ${clonedElm.outerHTML}
                                                                                </p>
                                                                            `;
                                                                        },
                                                                    )}
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
