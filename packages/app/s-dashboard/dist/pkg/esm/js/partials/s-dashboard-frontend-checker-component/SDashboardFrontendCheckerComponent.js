// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import './s-dashboard-frontend-checker-component.css';
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
                            class="__filter ${this._displayStatus.includes('success')
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
                            class="__filter ${this._displayStatus.includes('warning')
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
                            class="__filter ${this._displayStatus.includes('error')
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
                                                                  class="__more-link"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sOENBQThDLENBQUM7QUFFdEQsT0FBTyxrQkFFTixNQUFNLGtDQUFrQyxDQUFDO0FBRTFDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQW1DLFNBQVEsZUFBZTtJQUMzRTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQVdQLGtCQUFhLEdBQW1DLEVBQUUsQ0FBQztRQUNuRCxtQkFBYyxHQUF3QyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBWlAsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQ2xCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUN6RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUM1QixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDdkIsOENBQThDLENBQ2pELElBQUkscUJBQXFCLENBQzdCLENBQUM7SUFDTixDQUFDO0lBTUQsWUFBWTs7UUFDUixNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQXlDLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FB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