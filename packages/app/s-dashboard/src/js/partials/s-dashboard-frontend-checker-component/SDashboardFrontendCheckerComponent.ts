// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import './s-dashboard-frontend-checker-component.css';

import __SFrontendChecker, {
    ISFrontendCheckerCheckResult,
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

    _checkResults: ISFrontendCheckerCheckResult[] = [];
    _displayStatus: ('success' | 'warning' | 'error')[] = ['warning', 'error'];
    _level = 1;

    firstUpdated() {
        const checker = new __SFrontendChecker();
        const pro = checker.check(window.parent?.document ?? document);
        pro.on('check', (checkResult: ISFrontendCheckerCheckResult) => {
            this._checkResults.push(checkResult);
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
                    <div class="__levels">
                        <div
                            class="__level ${this._level === 0 ? 'active' : ''}"
                            @click=${() => this._chooseLevel(0)}
                        >
                            <i class="s-icon:low"></i> Low
                        </div>
                        <div
                            class="__level ${this._level === 1 ? 'active' : ''}"
                            @click=${() => this._chooseLevel(1)}
                        >
                            <i class="s-icon:medium"></i> Medium
                        </div>
                        <div
                            class="__level ${this._level === 2 ? 'active' : ''}"
                            @click=${() => this._chooseLevel(2)}
                        >
                            <i class="s-icon:high"></i> High
                        </div>
                    </div>
                    <div class="__filters">
                        <div
                            class="__filter ${this._displayStatus.includes(
                                'success',
                            )
                                ? 'active'
                                : ''}"
                            @click=${() => this._toggleStatus('success')}
                        >
                            <i class="s-icon:success s-tc:success"></i>
                            Success
                            <span class="ck-count"
                                >${this._checkResults.filter(
                                    (r) =>
                                        r.level <= this._level &&
                                        r.result.status === 'success',
                                ).length}</span
                            >
                        </div>
                        <div
                            class="__filter ${this._displayStatus.includes(
                                'warning',
                            )
                                ? 'active'
                                : ''}"
                            @click=${() => this._toggleStatus('warning')}
                        >
                            <i class="s-icon:warning s-tc:warning"></i>
                            Warning
                            <span class="ck-count"
                                >${this._checkResults.filter(
                                    (r) =>
                                        r.level <= this._level &&
                                        r.result.status === 'warning',
                                ).length}</span
                            >
                        </div>
                        <div
                            class="__filter ${this._displayStatus.includes(
                                'error',
                            )
                                ? 'active'
                                : ''}"
                            @click=${() => this._toggleStatus('error')}
                        >
                            <i class="s-icon:error s-tc:error"></i>
                            Error
                            <span class="ck-count"
                                >${this._checkResults.filter(
                                    (r) =>
                                        r.level <= this._level &&
                                        r.result.status === 'error',
                                ).length}</span
                            >
                        </div>
                    </div>

                    <ul class="ck-list">
                        ${this._checkResults
                            .filter(
                                (check) =>
                                    check.level <= this._level &&
                                    this._displayStatus.includes(
                                        check.result.status,
                                    ),
                            )
                            .map(
                                (check) => html`
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
                                                class="s-badge:outline s-scale:08 s-color:${check.level ==
                                                0
                                                    ? 'main'
                                                    : 'main'}"
                                            >
                                                ${check.level === 0
                                                    ? 'LOW'
                                                    : check.level === 1
                                                    ? 'MEDIUM'
                                                    : 'HIGH'}
                                            </span>
                                        </h2>
                                        <div class="__details">
                                            <p
                                                class="__description s-typo:p s-mbs:10"
                                            >
                                                ${check.description}
                                            </p>
                                            ${check.result.example
                                                ? html`
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
                                                        ? html`
                                                              <a
                                                                  href="${check
                                                                      .result
                                                                      .moreLink}"
                                                                  alt="More info"
                                                                  class="__more-link"
                                                                  target="_blank"
                                                                  rel="noopener"
                                                                  >More info</a
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
                                        </div>
                                    </li>
                                `,
                            )}
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
