// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';

import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';

import __css from './s-dashboard-frontend-checker-component.css';

import __SFrontendChecker, {
    ISFrontendCheckerCheckObj,
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
    _checks: Record<string, ISFrontendCheckerCheckObj> = {};
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
        const pro = this._frontendChecker.check(
            window.parent?.document ?? document,
            this.props.settings.checks,
        );

        pro.on(
            'checks.start',
            (checks: Record<string, ISFrontendCheckerCheckObj>) => {
                this._checks = checks;
                this.requestUpdate();
            },
        );
        pro.on('check.complete', (checkObj: ISFrontendCheckerCheckObj) => {
            this.requestUpdate();
        });
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
                    <div class="ck-tabs">
                        <div
                            class=" ck-tabs_item ${this._level === 0
                                ? 'active'
                                : ''}"
                            @click=${() => this._chooseLevel(0)}
                        >
                            ${unsafeHTML(
                                this._frontendChecker.icons[
                                    __SFrontendChecker.LEVEL_LOW
                                ],
                            )}
                            <span>Low</span>
                        </div>
                        <div
                            class=" ck-tabs_item ${this._level === 1
                                ? 'active'
                                : ''}"
                            @click=${() => this._chooseLevel(1)}
                        >
                            ${unsafeHTML(
                                this._frontendChecker.icons[
                                    __SFrontendChecker.LEVEL_MEDIUM
                                ],
                            )}
                            <span>Medium</span>
                        </div>
                        <div
                            class=" ck-tabs_item ${this._level === 2
                                ? 'active'
                                : ''}"
                            @click=${() => this._chooseLevel(2)}
                        >
                            ${unsafeHTML(
                                this._frontendChecker.icons[
                                    __SFrontendChecker.LEVEL_HIGH
                                ],
                            )}
                            <span>High</span>
                        </div>
                    </div>
                    <div class="_filters">
                        <div
                            class="_filter ${this._displayStatus.includes(
                                'success',
                            )
                                ? 'active'
                                : ''}"
                            @click=${() => this._toggleDisplay('success')}
                        >
                            ${unsafeHTML(
                                this._frontendChecker.icons[
                                    __SFrontendChecker.STATUS_SUCCESS
                                ],
                            )}
                            Success
                            <span class="ck-count"
                                >${Object.keys(this._checks).filter(
                                    (checkId) => {
                                        const check = this._checks[checkId];
                                        return (
                                            check.level <= this._level &&
                                            check.result?.status === 'success'
                                        );
                                    },
                                ).length}</span
                            >
                        </div>
                        <div
                            class="_filter ${this._displayStatus.includes(
                                'warning',
                            )
                                ? 'active'
                                : ''}"
                            @click=${() => this._toggleDisplay('warning')}
                        >
                            ${unsafeHTML(
                                this._frontendChecker.icons[
                                    __SFrontendChecker.STATUS_WARNING
                                ],
                            )}
                            Warning
                            <span class="ck-count"
                                >${Object.keys(this._checks).filter(
                                    (checkId) => {
                                        const check = this._checks[checkId];
                                        return (
                                            check.level <= this._level &&
                                            check.result?.status === 'warning'
                                        );
                                    },
                                ).length}</span
                            >
                        </div>
                        <div
                            class="_filter ${this._displayStatus.includes(
                                'error',
                            )
                                ? 'active'
                                : ''}"
                            @click=${() => this._toggleDisplay('error')}
                        >
                            ${unsafeHTML(
                                this._frontendChecker.icons[
                                    __SFrontendChecker.STATUS_ERROR
                                ],
                            )}
                            Error
                            <span class="ck-count"
                                >${Object.keys(this._checks).filter(
                                    (checkId) => {
                                        const check = this._checks[checkId];
                                        return (
                                            check.level <= this._level &&
                                            check.result?.status === 'error'
                                        );
                                    },
                                ).length}</span
                            >
                        </div>
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
                                    class="_filter ${this._displayStatus.includes(
                                        categoryId,
                                    )
                                        ? 'active'
                                        : ''}"
                                    @click=${() =>
                                        this._toggleDisplay(categoryId)}
                                >
                                    ${unsafeHTML(
                                        this._frontendChecker.icons[categoryId],
                                    )}
                                    <span class="ck-count"
                                        >${Object.keys(this._checks).filter(
                                            (checkId) => {
                                                const check =
                                                    this._checks[checkId];
                                                return (
                                                    check.category ===
                                                    categoryId
                                                );
                                            },
                                        ).length}</span
                                    >
                                </div>
                            `,
                        )}
                    </div>

                    <ul class="ck-list">
                        ${Object.keys(this._checks)
                            .filter((checkId) => {
                                const check = this._checks[checkId];
                                if (!check.result) return true;
                                return (
                                    check.level <= this._level &&
                                    this._displayStatus.includes(
                                        check.result?.status,
                                    ) &&
                                    this._displayStatus.includes(check.category)
                                );
                            })
                            .map((checkId) => {
                                const check = this._checks[checkId];
                                return html`
                                    <li
                                        class="ck-list_item s-color:${check
                                            .result?.status}"
                                        tabindex="-1"
                                    >
                                        <h2 class="s-flex:align-center">
                                            <span class="s-flex:align-center">
                                                ${check.result
                                                    ? html`
                                                          ${check.result
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
                                                              : check.result
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
                                                ${check.name}
                                            </span>
                                            <span
                                                class="_level level--${check.level}"
                                            >
                                            </span>
                                        </h2>
                                        <div class="_details">
                                            <p
                                                class="_description s-typo:p s-mbs:10"
                                            >
                                                ${check.result?.message ??
                                                check.description}
                                            </p>

                                            ${check.result
                                                ? html`
                                                      ${check.result.example
                                                          ? html`
                                                                <p
                                                                    class="s-typo:code s-mbs:10"
                                                                >
                                                                    ${check
                                                                        .result
                                                                        .example}
                                                                </p>
                                                            `
                                                          : ''}
                                                      <div
                                                          class="s-flex:align-center ${check
                                                              .result
                                                              .moreLink ||
                                                          check.result.action
                                                              ? 's-mbs:20'
                                                              : ''}"
                                                      >
                                                          <div
                                                              class="s-flex-item:grow"
                                                          >
                                                              ${check.result
                                                                  .moreLink
                                                                  ? html`
                                                                        <a
                                                                            href="${check
                                                                                .result
                                                                                .moreLink}"
                                                                            alt="More info"
                                                                            class="_more-link s-mbs:10"
                                                                            target="_blank"
                                                                            rel="noopener"
                                                                            >More
                                                                            info</a
                                                                        >
                                                                    `
                                                                  : ''}
                                                          </div>
                                                          ${check.result.action
                                                              ? html`
                                                                    <div>
                                                                        <button
                                                                            class="s-btn s-color:complementary"
                                                                            @click=${() =>
                                                                                check.result.action.handler()}
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
                                                  `
                                                : ''}
                                        </div>
                                    </li>
                                `;
                            })}
                    </ul>
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
