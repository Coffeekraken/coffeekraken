"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("./s-dashboard-project-component.css");
class SDashboardProjectComponent extends s_lit_component_1.default {
    constructor() {
        var _a;
        super({
            shadowDom: false,
        });
        this._project = this.document.env.SUGAR.config.project;
        for (let [env, envObj] of Object.entries(this._project.environments)) {
            for (let [urlName, urlObj] of Object.entries((_a = envObj.urls) !== null && _a !== void 0 ? _a : {})) {
                if (document.location.href.includes(urlObj.url)) {
                    this._activeEnvironmentId = env;
                    this._activeEnvironment = this._project.environments[env];
                    break;
                }
            }
        }
    }
    /**
     * @name            document
     * @type            Document
     * @get
     *
     * Access the document that the dashboard is using.
     * If in an iframe, take the parent document, otherwise, the document itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get document() {
        var _a, _b;
        return (_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document;
    }
    firstUpdated() { }
    render() {
        var _a, _b, _c;
        if (!this._project)
            return;
        return (0, lit_1.html) `
            <div class="s-dashboard-project s-width:100">
                <div class="s-flex s-mbe:20">
                    <h2 class="s-typo:h6">Project</h2>
                </div>

                <div class="ck-panel">
                    <div class="__list">
                        ${Object.entries((_a = this._project.environments) !== null && _a !== void 0 ? _a : {}).map(([name, obj]) => (0, lit_1.html) `
                                <div
                                    class="__list-item s-tooltip-container ${name ===
            this._activeEnvironmentId
            ? 'active'
            : ''}"
                                    @click=${() => {
            this._activeEnvironmentId = name;
            this._activeEnvironment = this._project.environments[name];
            this.requestUpdate();
        }}
                                >
                                    <i class="s-icon:${name}"></i>
                                    <div class="s-tooltip">
                                        ${name}
                                    </div>
                                </div>
                            `)}
                    </div>
                    <div class="__details">
                        <span class="ck-branch"
                            >${this._activeEnvironment.branch}</span
                        >
                        <span class="__commit-time">
                            ${((_b = this._activeEnvironment.commit) === null || _b === void 0 ? void 0 : _b.time)
            ? (0, lit_1.html) `
                                      <span class="__commit-time-time"
                                          >${new Date(this._activeEnvironment.commit.time).toLocaleTimeString()}</span
                                      >
                                      <span class="__commit-time-date"
                                          >${new Date(this._activeEnvironment.commit.time).toLocaleDateString()}</span
                                      >
                                  `
            : ''}
                        </span>
                        <div class="__list __list-urls">
                            ${Object.entries((_c = this._project.environments[this._activeEnvironmentId].urls) !== null && _c !== void 0 ? _c : {}).map(([name, urlObj]) => (0, lit_1.html) `
                                    <a
                                        href="${urlObj.url}"
                                        target="_blank"
                                        rel="noopener"
                                        class="__list-item s-tooltip-container"
                                    >
                                        <i class="s-icon:${name}"></i>
                                        <div class="s-tooltip">
                                            ${urlObj.label}
                                        </div>
                                    </a>
                                `)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
exports.default = SDashboardProjectComponent;
function define(props = {}, tagName = 's-dashboard-project') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardProjectComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLCtDQUE2QztBQUU3QyxNQUFxQiwwQkFBMkIsU0FBUSx5QkFBZTtJQW9CbkU7O1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUV2RCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2xFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksRUFBRSxDQUFDLEVBQUU7Z0JBQzdELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxRCxNQUFNO2lCQUNUO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFuQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksUUFBUTs7UUFDUixPQUFPLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxRQUFRLG1DQUFJLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBd0JELFlBQVksS0FBSSxDQUFDO0lBRWpCLE1BQU07O1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMzQixPQUFPLElBQUEsVUFBSSxFQUFBOzs7Ozs7OzswQkFRTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbEQsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7OzZFQUU0QixJQUFJO1lBQzdDLElBQUksQ0FBQyxvQkFBb0I7WUFDckIsQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTs2Q0FDQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FDaEQsSUFBSSxDQUNQLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7dURBRWtCLElBQUk7OzBDQUVqQixJQUFJOzs7NkJBR2pCLENBQ0o7Ozs7K0JBSU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU07Ozs4QkFHL0IsQ0FBQSxNQUFBLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLDBDQUFFLElBQUk7WUFDbEMsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs2Q0FFTyxJQUFJLElBQUksQ0FDUCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdEMsQ0FBQyxrQkFBa0IsRUFBRTs7OzZDQUduQixJQUFJLElBQUksQ0FDUCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdEMsQ0FBQyxrQkFBa0IsRUFBRTs7bUNBRTdCO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7Ozs4QkFHTixNQUFNLENBQUMsT0FBTyxDQUNaLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FDNUIsQ0FBQyxJQUFJLG1DQUFJLEVBQUUsQ0FDZixDQUFDLEdBQUcsQ0FDRCxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Z0RBRVIsTUFBTSxDQUFDLEdBQUc7Ozs7OzJEQUtDLElBQUk7OzhDQUVqQixNQUFNLENBQUMsS0FBSzs7O2lDQUd6QixDQUNKOzs7OztTQUtwQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBdkhELDZDQXVIQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcscUJBQXFCO0lBQ25FLHlCQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFIRCx3QkFHQyJ9