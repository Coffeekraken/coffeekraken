// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-frontend-checker-component/s-dashboard-frontend-checker-component.css';
import __SFrontendChecker from '@coffeekraken/s-frontend-checker';
export default class SDashboardFrontendCheckerComponent extends __SLitComponent {
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
        const checker = new __SFrontendChecker();
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
        return html `
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
            .map((check) => html `
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
            ? html `
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
            ? html `
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
            ? html `
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
export function define(props = {}, tagName = 's-dashboard-frontend-checker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8scUhBQXFILENBQUM7QUFFN0gsT0FBTyxrQkFFTixNQUFNLGtDQUFrQyxDQUFDO0FBRTFDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQW1DLFNBQVEsZUFBZTtJQUMzRTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQVdQLGtCQUFhLEdBQW1DLEVBQUUsQ0FBQztRQUNuRCxtQkFBYyxHQUF3QyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBWlAsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQ2xCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUN6RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUM1QixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDdkIsOENBQThDLENBQ2pELElBQUkscUJBQXFCLENBQzdCLENBQUM7SUFDTixDQUFDO0lBTUQsWUFBWTs7UUFDUixNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQXlDLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FB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