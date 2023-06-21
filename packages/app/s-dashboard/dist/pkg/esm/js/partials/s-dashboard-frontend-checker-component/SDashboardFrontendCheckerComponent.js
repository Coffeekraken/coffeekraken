// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import __css from './s-dashboard-frontend-checker-component.css';
import __SFrontendChecker from '@coffeekraken/s-frontend-checker';
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
        this._checks = {};
        this._displayStatus = ['warning', 'error'];
        this._level = 1;
        this._level = parseInt(window.localStorage.getItem('ck-dashboard-level') || 2);
        this._displayStatus = JSON.parse(window.localStorage.getItem('ck-dashboard-frontend-checker-display-status') || `["warning","error"]`);
    }
    firstUpdated() {
        var _a, _b;
        const checker = new __SFrontendChecker();
        const pro = checker.check((_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document, this.props.settings.checks);
        pro.on('checks.start', (checks) => {
            this._checks = checks;
            this.requestUpdate();
        });
        pro.on('check.complete', (checkObj) => {
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
                            class="_filter ${this._displayStatus.includes('success')
            ? 'active'
            : ''}"
                            @click=${() => this._toggleStatus('success')}
                        >
                            <i class="fa-solid fa-thumbs-up s-tc:success"></i>
                            Success
                            <span class="ck-count"
                                >${Object.keys(this._checks).filter((checkId) => {
            var _a;
            const check = this._checks[checkId];
            return (check.level <= this._level &&
                ((_a = check.result) === null || _a === void 0 ? void 0 : _a.status) === 'success');
        }).length}</span
                            >
                        </div>
                        <div
                            class="_filter ${this._displayStatus.includes('warning')
            ? 'active'
            : ''}"
                            @click=${() => this._toggleStatus('warning')}
                        >
                            <i
                                class="fa-solid fa-triangle-exclamation s-tc:warning"
                            ></i>
                            Warning
                            <span class="ck-count"
                                >${Object.keys(this._checks).filter((checkId) => {
            var _a;
            const check = this._checks[checkId];
            return (check.level <= this._level &&
                ((_a = check.result) === null || _a === void 0 ? void 0 : _a.status) === 'warning');
        }).length}</span
                            >
                        </div>
                        <div
                            class="_filter ${this._displayStatus.includes('error')
            ? 'active'
            : ''}"
                            @click=${() => this._toggleStatus('error')}
                        >
                            <i class="fa-solid fa-xmark s-tc:error"></i>
                            Error
                            <span class="ck-count"
                                >${Object.keys(this._checks).filter((checkId) => {
            var _a;
            const check = this._checks[checkId];
            return (check.level <= this._level &&
                ((_a = check.result) === null || _a === void 0 ? void 0 : _a.status) === 'error');
        }).length}</span
                            >
                        </div>
                    </div>

                    <ul class="ck-list">
                        ${Object.keys(this._checks)
            .filter((checkId) => {
            var _a;
            const check = this._checks[checkId];
            if (!check.result)
                return true;
            return (check.level <= this._level &&
                this._displayStatus.includes((_a = check.result) === null || _a === void 0 ? void 0 : _a.status));
        })
            .map((checkId) => {
            var _a, _b, _c;
            const check = this._checks[checkId];
            return html `
                                    <li
                                        class="ck-list_item s-color:${(_a = check
                .result) === null || _a === void 0 ? void 0 : _a.status}"
                                        tabindex="-1"
                                    >
                                        <h2 class="s-flex:align:center">
                                            <span class="s-flex:align-center">
                                                ${check.result
                ? html `
                                                          ${check.result
                    .status ===
                    'success'
                    ? html `
                                                                    <i
                                                                        class="fa-solid fa-thumbs-up s-tc:success"
                                                                    ></i>
                                                                `
                    : check.result
                        .status ===
                        'warning'
                        ? html `
                                                                    <i
                                                                        class="fa-solid fa-triangle-exclamation s-tc:warning"
                                                                    ></i>
                                                                `
                        : html `
                                                                    <i
                                                                        class="fa-solid fa-xmark s-tc:error"
                                                                    ></i>
                                                                `}
                                                      `
                : html `<i
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
                                                ${(_c = (_b = check.result) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : check.description}
                                            </p>

                                            ${check.result
                ? html `
                                                      ${check.result.example
                    ? html `
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
                    ? html `
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
export function __define(props = {}, tagName = 's-dashboard-frontend-checker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0MsT0FBTyxtQ0FBbUMsTUFBTSxvREFBb0QsQ0FBQztBQUVyRyxPQUFPLEtBQUssTUFBTSw4Q0FBOEMsQ0FBQztBQUVqRSxPQUFPLGtCQUVOLE1BQU0sa0NBQWtDLENBQUM7QUFNMUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQ0FBbUMsU0FBUSxlQUFlO0lBQzNFLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsbUNBQW1DLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQVdQLFlBQU8sR0FBOEMsRUFBRSxDQUFDO1FBQ3hELG1CQUFjLEdBQXdDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFaUCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FDbEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQ3pELENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzVCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUN2Qiw4Q0FBOEMsQ0FDakQsSUFBSSxxQkFBcUIsQ0FDN0IsQ0FBQztJQUNOLENBQUM7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