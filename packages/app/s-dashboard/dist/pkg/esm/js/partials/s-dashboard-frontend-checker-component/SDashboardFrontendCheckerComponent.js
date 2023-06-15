// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import '../../../../../../src/js/partials/s-dashboard-frontend-checker-component/s-dashboard-frontend-checker-component.css';
import __SFrontendChecker from '@coffeekraken/s-frontend-checker';
export default class SDashboardFrontendCheckerComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
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
            var _a;
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
                                                ${check.description}
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
export function define(props = {}, tagName = 's-dashboard-frontend-checker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyxxSEFBcUgsQ0FBQztBQUU3SCxPQUFPLGtCQUVOLE1BQU0sa0NBQWtDLENBQUM7QUFNMUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQ0FBbUMsU0FBUSxlQUFlO0lBQzNFLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsbUNBQW1DLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFXUCxZQUFPLEdBQThDLEVBQUUsQ0FBQztRQUN4RCxtQkFBYyxHQUF3QyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBWlAsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQ2xCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUN6RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUM1QixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDdkIsOENBQThDLENBQ2pELElBQUkscUJBQXFCLENBQzdCLENBQUM7SUFDTixDQUFDO0lBTUQsWUFBWTs7UUFDUixNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FDckIsTUFBQSxNQUFBLE1BQU0sQ0FBQyxN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