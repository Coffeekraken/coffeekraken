"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("../../../../../../src/js/partials/s-dashboard-project-component/s-dashboard-project-component.css");
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
                    <div class="ck-tabs">
                        ${Object.entries((_a = this._project.environments) !== null && _a !== void 0 ? _a : {}).map(([name, obj]) => (0, lit_1.html) `
                                <div
                                    class="ck-tabs__item s-tooltip-container ${name ===
            this._activeEnvironmentId
            ? 'active'
            : ''}"
                                    @click=${() => {
            this._activeEnvironmentId = name;
            this._activeEnvironment =
                this._project.environments[name];
            this.requestUpdate();
        }}
                                >
                                    <i class="s-icon:${name}"></i>
                                    <div class="s-tooltip">${name}</div>
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
                        <div class="s-flex s-gap:10">
                            ${Object.entries((_c = this._project.environments[this._activeEnvironmentId].urls) !== null && _c !== void 0 ? _c : {}).map(([name, urlObj]) => (0, lit_1.html) `
                                    <a
                                        href="${urlObj.url}"
                                        target="_blank"
                                        rel="noopener"
                                        class="ck-action s-tooltip-container"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLDZHQUEyRztBQUUzRyxNQUFxQiwwQkFBMkIsU0FBUSx5QkFBZTtJQW9CbkU7O1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUV2RCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2xFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksRUFBRSxDQUFDLEVBQUU7Z0JBQzdELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxRCxNQUFNO2lCQUNUO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFuQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksUUFBUTs7UUFDUixPQUFPLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxRQUFRLG1DQUFJLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBd0JELFlBQVksS0FBSSxDQUFDO0lBRWpCLE1BQU07O1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMzQixPQUFPLElBQUEsVUFBSSxFQUFBOzs7Ozs7OzswQkFRTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbEQsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7OytFQUU4QixJQUFJO1lBQy9DLElBQUksQ0FBQyxvQkFBb0I7WUFDckIsQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTs2Q0FDQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDOzt1REFFa0IsSUFBSTs2REFDRSxJQUFJOzs2QkFFcEMsQ0FDSjs7OzsrQkFJTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTTs7OzhCQUcvQixDQUFBLE1BQUEsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sMENBQUUsSUFBSTtZQUNsQyxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7OzZDQUVPLElBQUksSUFBSSxDQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN0QyxDQUFDLGtCQUFrQixFQUFFOzs7NkNBR25CLElBQUksSUFBSSxDQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN0QyxDQUFDLGtCQUFrQixFQUFFOzttQ0FFN0I7WUFDSCxDQUFDLENBQUMsRUFBRTs7OzhCQUdOLE1BQU0sQ0FBQyxPQUFPLENBQ1osTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FDdEIsSUFBSSxDQUFDLG9CQUFvQixDQUM1QixDQUFDLElBQUksbUNBQUksRUFBRSxDQUNmLENBQUMsR0FBRyxDQUNELENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUEsVUFBSSxFQUFBOztnREFFUixNQUFNLENBQUMsR0FBRzs7Ozs7MkRBS0MsSUFBSTs7OENBRWpCLE1BQU0sQ0FBQyxLQUFLOzs7aUNBR3pCLENBQ0o7Ozs7O1NBS3BCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFwSEQsNkNBb0hDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxxQkFBcUI7SUFDbkUseUJBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUhELHdCQUdDIn0=