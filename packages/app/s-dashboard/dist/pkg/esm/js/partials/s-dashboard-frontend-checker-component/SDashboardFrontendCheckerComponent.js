// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import __css from './s-dashboard-frontend-checker-component.css';
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
        super({
            shadowDom: false,
        });
        this._checks = {};
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
        this._level = parseInt(window.localStorage.getItem('ck-dashboard-level') || 2);
        this._displayStatus = JSON.parse(window.localStorage.getItem('ck-dashboard-frontend-checker-display-status') || `["warning","error"]`);
        this._frontendChecker = new __SFrontendChecker();
    }
    firstUpdated() {
        var _a, _b;
        const pro = this._frontendChecker.check((_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document, this.props.settings.checks);
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
                            ${unsafeHTML(this._frontendChecker.icons[__SFrontendChecker.LEVEL_LOW])}
                            <span>Low</span>
                        </div>
                        <div
                            class=" ck-tabs_item ${this._level === 1
            ? 'active'
            : ''}"
                            @click=${() => this._chooseLevel(1)}
                        >
                            ${unsafeHTML(this._frontendChecker.icons[__SFrontendChecker.LEVEL_MEDIUM])}
                            <span>Medium</span>
                        </div>
                        <div
                            class=" ck-tabs_item ${this._level === 2
            ? 'active'
            : ''}"
                            @click=${() => this._chooseLevel(2)}
                        >
                            ${unsafeHTML(this._frontendChecker.icons[__SFrontendChecker.LEVEL_HIGH])}
                            <span>High</span>
                        </div>
                    </div>
                    <div class="_filters">
                        <div
                            class="_filter ${this._displayStatus.includes('success')
            ? 'active'
            : ''}"
                            @click=${() => this._toggleDisplay('success')}
                        >
                            ${unsafeHTML(this._frontendChecker.icons[__SFrontendChecker.STATUS_SUCCESS])}
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
                            @click=${() => this._toggleDisplay('warning')}
                        >
                            ${unsafeHTML(this._frontendChecker.icons[__SFrontendChecker.STATUS_WARNING])}
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
                            @click=${() => this._toggleDisplay('error')}
                        >
                            ${unsafeHTML(this._frontendChecker.icons[__SFrontendChecker.STATUS_ERROR])}
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
                                    class="_filter ${this._displayStatus.includes(categoryId)
            ? 'active'
            : ''}"
                                    @click=${() => this._toggleDisplay(categoryId)}
                                >
                                    ${unsafeHTML(this._frontendChecker.icons[categoryId])}
                                    <span class="ck-count"
                                        >${Object.keys(this._checks).filter((checkId) => {
            const check = this._checks[checkId];
            return (check.category ===
                categoryId);
        }).length}</span
                                    >
                                </div>
                            `)}
                    </div>

                    <ul class="ck-list">
                        ${Object.keys(this._checks)
            .filter((checkId) => {
            var _a;
            const check = this._checks[checkId];
            if (!check.result)
                return true;
            return (check.level <= this._level &&
                this._displayStatus.includes((_a = check.result) === null || _a === void 0 ? void 0 : _a.status) &&
                this._displayStatus.includes(check.category));
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
                                        <h2 class="s-flex:align-center">
                                            <span class="s-flex:align-center">
                                                ${check.result
                ? html `
                                                          ${check.result
                    .status ===
                    'success'
                    ? html `
                                                                    ${unsafeHTML(this
                        ._frontendChecker
                        .icons[__SFrontendChecker
                        .STATUS_SUCCESS])}
                                                                `
                    : check.result
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
                                                class="_level level--${check.level}"
                                            >
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0MsT0FBTyxtQ0FBbUMsTUFBTSxvREFBb0QsQ0FBQztBQUVyRyxPQUFPLEtBQUssTUFBTSw4Q0FBOEMsQ0FBQztBQUVqRSxPQUFPLGtCQUVOLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTTNELE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQW1DLFNBQVEsZUFBZTtJQUMzRSxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLG1DQUFtQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFjUCxZQUFPLEdBQThDLEVBQUUsQ0FBQztRQUN4RCxtQkFBYyxHQUFhO1lBQ3ZCLFNBQVM7WUFDVCxPQUFPO1lBQ1Asa0JBQWtCLENBQUMsc0JBQXNCO1lBQ3pDLGtCQUFrQixDQUFDLHVCQUF1QjtZQUMxQyxrQkFBa0IsQ0FBQyxxQkFBcUI7WUFDeEMsa0JBQWtCLENBQUMsb0JBQW9CO1lBQ3ZDLGtCQUFrQixDQUFDLFlBQVk7WUFDL0Isa0JBQWtCLENBQUMsZUFBZTtTQUNyQyxDQUFDO1FBQ0YsV0FBTSxHQUFHLENBQUMsQ0FBQztRQXhCUCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FD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