// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';

import '../../../../../../src/js/partials/s-dashboard-frontend-checker-component/s-dashboard-frontend-checker-component.css';

import __SFrontendChecker, {
    ISFrontendCheckerCheckObj,
} from '@coffeekraken/s-frontend-checker';

export default class SDashboardFrontendCheckerComponent extends __SLitComponent {
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
    }

    _checks: Record<string, ISFrontendCheckerCheckObj> = {};
    _displayStatus: ('success' | 'warning' | 'error')[] = ['warning', 'error'];
    _level = 1;

    firstUpdated() {
        const checker = new __SFrontendChecker();

        // _console.log('ch', checker.checks);

        const pro = checker.check(window.parent?.document ?? document);
        pro.on('start', (checks: Record<string, ISFrontendCheckerCheckObj>) => {
            this._checks = checks;
            this.requestUpdate();
        });
        pro.on('check.complete', (checkObj: ISFrontendCheckerCheckObj) => {
            this.requestUpdate();
        });
    }

    _chooseLevel(level: number) {
        this._level = level;
        window.localStorage.setItem('ck-dashboard-level', level.toString());
        this.requestUpdate();
    }

    _toggleStatus(status: 'success' | 'warning' | 'error') {
        if (this._displayStatus.includes(status)) {
            this._displayStatus = this._displayStatus.filter(
                (s) => s !== status,
            );
        } else {
            this._displayStatus.push(status);
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
                            <i class="fa-solid fa-battery-quarter"></i>
                            <span>Low</span>
                        </div>
                        <div
                            class=" ck-tabs_item ${this._level === 1
                                ? 'active'
                                : ''}"
                            @click=${() => this._chooseLevel(1)}
                        >
                            <i class="fa-solid fa-battery-half"></i>
                            <span>Medium</span>
                        </div>
                        <div
                            class=" ck-tabs_item ${this._level === 2
                                ? 'active'
                                : ''}"
                            @click=${() => this._chooseLevel(2)}
                        >
                            <i class="fa-solid fa-battery-full"></i>
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
                            @click=${() => this._toggleStatus('success')}
                        >
                            <i class="fa-solid fa-thumbs-up s-tc:success"></i>
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
                            @click=${() => this._toggleStatus('warning')}
                        >
                            <i
                                class="fa-solid fa-triangle-exclamation s-tc:warning"
                            ></i>
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
                            @click=${() => this._toggleStatus('error')}
                        >
                            <i class="fa-solid fa-xmark s-tc:error"></i>
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

                    <ul class="ck-list">
                        ${Object.keys(this._checks)
                            .filter((checkId) => {
                                const check = this._checks[checkId];
                                if (!check.result) return true;
                                return (
                                    check.level <= this._level &&
                                    this._displayStatus.includes(
                                        check.result?.status,
                                    )
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
                                        <h2 class="s-flex:align:center">
                                            <span class="s-flex:align-center">
                                                ${check.result
                                                    ? html`
                                                          ${check.result
                                                              .status ===
                                                          'success'
                                                              ? html`
                                                                    <i
                                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                                    ></i>
                                                                `
                                                              : check.result
                                                                    .status ===
                                                                'warning'
                                                              ? html`
                                                                    <i
                                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                                    ></i>
                                                                `
                                                              : html`
                                                                    <i
                                                                        class="fa-solid fa-xmark s-tc:error"
                                                                    ></i>
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
                                                class="s-badge s-badge--outline s-scale--08 level--${check.level}"
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

export function define(
    props: any = {},
    tagName = 's-dashboard-frontend-checker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
