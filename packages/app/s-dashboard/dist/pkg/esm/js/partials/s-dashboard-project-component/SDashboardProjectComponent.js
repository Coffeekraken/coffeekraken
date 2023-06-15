// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import '../../../../../../src/js/partials/s-dashboard-project-component/s-dashboard-project-component.css';
export default class SDashboardProjectComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
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
    firstUpdated() { }
    render() {
        var _a, _b, _c;
        if (!this._project)
            return;
        return html `
            <div class="s-dashboard-project s-width:100">
                <div class="s-flex s-mbe:20">
                    <h2 class="s-typo:h6">Project</h2>
                </div>

                <div class="ck-panel">
                    <div class="ck-tabs">
                        ${Object.entries((_a = this._project.environments) !== null && _a !== void 0 ? _a : {}).map(([name, obj]) => html `
                                <div
                                    class="ck-tabs_item s-tooltip-container ${name ===
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
                    <div class="_details">
                        <span class="ck-branch"
                            >${this._activeEnvironment.branch}</span
                        >
                        <span class="_commit-time">
                            ${((_b = this._activeEnvironment.commit) === null || _b === void 0 ? void 0 : _b.time)
            ? html `
                                      <span class="_commit-time-time"
                                          >${new Date(this._activeEnvironment.commit.time).toLocaleTimeString()}</span
                                      >
                                      <span class="_commit-time-date"
                                          >${new Date(this._activeEnvironment.commit.time).toLocaleDateString()}</span
                                      >
                                  `
            : ''}
                        </span>
                        <div class="s-flex s-gap:10">
                            ${Object.entries((_c = this._project.environments[this._activeEnvironmentId].urls) !== null && _c !== void 0 ? _c : {}).map(([name, urlObj]) => html `
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
export function define(props = {}, tagName = 's-dashboard-project') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardProjectComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyxtR0FBbUcsQ0FBQztBQUUzRyxNQUFNLENBQUMsT0FBTyxPQUFPLDBCQUEyQixTQUFRLGVBQWU7SUFDbkUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFNRDs7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRXZELEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbEUsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM3QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDO29CQUNoQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFELE1BQU07aUJBQ1Q7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELFlBQVksS0FBSSxDQUFDO0lBRWpCLE1BQU07O1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMzQixPQUFPLElBQUksQ0FBQTs7Ozs7Ozs7MEJBUU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQ2xELENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7OEVBRTZCLElBQUk7WUFDOUMsSUFBSSxDQUFDLG9CQUFvQjtZQUNyQixDQUFDLENBQUMsUUFBUTtZQUNWLENBQUMsQ0FBQyxFQUFFOzZDQUNDLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLGtCQUFrQjtnQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7O3VEQUVrQixJQUFJOzZEQUNFLElBQUk7OzZCQUVwQyxDQUNKOzs7OytCQUlNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNOzs7OEJBRy9CLENBQUEsTUFBQSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSwwQ0FBRSxJQUFJO1lBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUE7OzZDQUVPLElBQUksSUFBSSxDQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN0QyxDQUFDLGtCQUFrQixFQUFFOzs7NkNBR25CLElBQUksSUFBSSxDQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN0QyxDQUFDLGtCQUFrQixFQUFFOzttQ0FFN0I7WUFDSCxDQUFDLENBQUMsRUFBRTs7OzhCQUdOLE1BQU0sQ0FBQyxPQUFPLENBQ1osTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FDdEIsSUFBSSxDQUFDLG9CQUFvQixDQUM1QixDQUFDLElBQUksbUNBQUksRUFBRSxDQUNmLENBQUMsR0FBRyxDQUNELENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7Z0RBRVIsTUFBTSxDQUFDLEdBQUc7Ozs7OzJEQUtDLElBQUk7OzhDQUVqQixNQUFNLENBQUMsS0FBSzs7O2lDQUd6QixDQUNKOzs7OztTQUtwQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcscUJBQXFCO0lBQ25FLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7QUFDL0QsQ0FBQyJ9