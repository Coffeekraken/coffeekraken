"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("./s-dashboard-frontend-checker-component.css");
const s_frontend_checker_1 = __importDefault(require("@coffeekraken/s-frontend-checker"));
class SDashboardFrontendCheckerComponent extends s_lit_component_1.default {
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
        const checker = new s_frontend_checker_1.default();
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
        return (0, lit_1.html) `
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
            .map((check) => (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
exports.default = SDashboardFrontendCheckerComponent;
function define(props = {}, tagName = 's-dashboard-frontend-checker') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLHdEQUFzRDtBQUV0RCwwRkFFMEM7QUFFMUMsTUFBcUIsa0NBQW1DLFNBQVEseUJBQWU7SUFDM0U7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFXUCxrQkFBYSxHQUFtQyxFQUFFLENBQUM7UUFDbkQsbUJBQWMsR0FBd0MsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0UsV0FBTSxHQUFHLENBQUMsQ0FBQztRQVpQLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUNsQixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FDekQsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDNUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ3ZCLDhDQUE4QyxDQUNqRCxJQUFJLHFCQUFxQixDQUM3QixDQUFDO0lBQ04sQ0FBQztJQU1ELFlBQVk7O1FBQ1IsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBa0IsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUF5QyxFQUFFLEVBQUU7WUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQXVDO1FBQ2pELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxNQUFNLENBQ3RCLENBQUM7U0FDTDthQUFNO1lBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDdkIsOENBQThDLEVBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUN0QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTs7Ozs7Ozs2Q0FPMEIsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtxQ0FDekMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Ozs7OzZDQUtsQixJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO3FDQUN6QyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7NkNBS2xCLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7cUNBQ3pDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OzhDQU9qQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FDMUMsU0FBUyxDQUNaO1lBQ0csQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTtxQ0FDQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQzs7Ozs7bUNBS3JDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUN4QixDQUFDLENBQUMsRUFBRSxFQUFFLENBQ0YsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTTtZQUN0QixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQ3BDLENBQUMsTUFBTTs7Ozs4Q0FJTSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FDMUMsU0FBUyxDQUNaO1lBQ0csQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTtxQ0FDQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQzs7Ozs7bUNBS3JDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUN4QixDQUFDLENBQUMsRUFBRSxFQUFFLENBQ0YsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTTtZQUN0QixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQ3BDLENBQUMsTUFBTTs7Ozs4Q0FJTSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FDMUMsT0FBTyxDQUNWO1lBQ0csQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTtxQ0FDQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzs7Ozs7bUNBS25DLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUN4QixDQUFDLENBQUMsRUFBRSxFQUFFLENBQ0YsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTTtZQUN0QixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQ2xDLENBQUMsTUFBTTs7Ozs7OzBCQU1kLElBQUksQ0FBQyxhQUFhO2FBQ2YsTUFBTSxDQUNILENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDTixLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUN4QixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDdEIsQ0FDUjthQUNBLEdBQUcsQ0FDQSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7O3VFQUV3QixLQUFLO2FBQy9CLE1BQU0sQ0FBQyxNQUFNOzs7Ozs7OztvRUFRVSxLQUFLLENBQUMsTUFBTTthQUN2QixNQUFNLGtCQUFrQixLQUFLO2FBQzdCLE1BQU0sQ0FBQyxNQUFNOzs7O2tEQUlwQixLQUFLLENBQUMsSUFBSTs7OzRGQUdnQyxLQUFLLENBQUMsS0FBSztZQUN2RCxDQUFDO1lBQ0csQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsTUFBTTs7a0RBRVYsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLEtBQUs7WUFDUCxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDO2dCQUNuQixDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsTUFBTTs7Ozs7OztrREFPVixLQUFLLENBQUMsV0FBVzs7OENBRXJCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTztZQUNsQixDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7Ozs7NERBSU0sS0FBSyxDQUFDLE1BQU07aUJBQ1QsT0FBTzs7bURBRW5CO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7OzZFQUV5QixLQUFLO2FBQzdCLE1BQU0sQ0FBQyxRQUFRO1lBQ3BCLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUNmLENBQUMsQ0FBQyxVQUFVO1lBQ1osQ0FBQyxDQUFDLEVBQUU7OztzREFHRixLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDbkIsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzswRUFFWSxLQUFLO2lCQUNSLE1BQU07aUJBQ04sUUFBUTs7Ozs7OzsyREFPcEI7WUFDSCxDQUFDLENBQUMsRUFBRTs7a0RBRVYsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQ2pCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7OzsyRUFJaUIsR0FBRyxFQUFFLENBQ1YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFOztvRUFFL0IsT0FBTyxLQUFLO2lCQUNULE1BQU07aUJBQ04sTUFBTTtpQkFDTixLQUFLO2dCQUNWLFVBQVU7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDN0IsQ0FBQyxDQUFDLEtBQUs7cUJBQ0EsTUFBTTtxQkFDTixNQUFNO3FCQUNOLEtBQUs7Ozt1REFHM0I7WUFDSCxDQUFDLENBQUMsRUFBRTs7OztpQ0FJdkIsQ0FDSjs7OztTQUlwQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBclBELHFEQXFQQztBQUVELFNBQWdCLE1BQU0sQ0FDbEIsUUFBYSxFQUFFLEVBQ2YsT0FBTyxHQUFHLDhCQUE4QjtJQUV4Qyx5QkFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBTkQsd0JBTUMifQ==