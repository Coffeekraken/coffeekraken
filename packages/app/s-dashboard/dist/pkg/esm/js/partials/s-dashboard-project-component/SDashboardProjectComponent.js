// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-project-component/s-dashboard-project-component.css';
export default class SDashboardProjectComponent extends __SLitComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sbUdBQW1HLENBQUM7QUFFM0csTUFBTSxDQUFDLE9BQU8sT0FBTywwQkFBMkIsU0FBUSxlQUFlO0lBQ25FOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQU1EOztRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNsRSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLEVBQUUsQ0FBQyxFQUFFO2dCQUM3RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUQsTUFBTTtpQkFDVDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsWUFBWSxLQUFJLENBQUM7SUFFakIsTUFBTTs7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQzNCLE9BQU8sSUFBSSxDQUFBOzs7Ozs7OzswQkFRTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbEQsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzs4RUFFNkIsSUFBSTtZQUM5QyxJQUFJLENBQUMsb0JBQW9CO1lBQ3JCLENBQUMsQ0FBQyxRQUFRO1lBQ1YsQ0FBQyxDQUFDLEVBQUU7NkNBQ0MsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsa0JBQWtCO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7dURBRWtCLElBQUk7NkRBQ0UsSUFBSTs7NkJBRXBDLENBQ0o7Ozs7K0JBSU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU07Ozs4QkFHL0IsQ0FBQSxNQUFBLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLDBDQUFFLElBQUk7WUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQTs7NkNBRU8sSUFBSSxJQUFJLENBQ1AsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3RDLENBQUMsa0JBQWtCLEVBQUU7Ozs2Q0FHbkIsSUFBSSxJQUFJLENBQ1AsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3RDLENBQUMsa0JBQWtCLEVBQUU7O21DQUU3QjtZQUNILENBQUMsQ0FBQyxFQUFFOzs7OEJBR04sTUFBTSxDQUFDLE9BQU8sQ0FDWixNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQzVCLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQ2YsQ0FBQyxHQUFHLENBQ0QsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOztnREFFUixNQUFNLENBQUMsR0FBRzs7Ozs7MkRBS0MsSUFBSTs7OENBRWpCLE1BQU0sQ0FBQyxLQUFLOzs7aUNBR3pCLENBQ0o7Ozs7O1NBS3BCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxxQkFBcUI7SUFDbkUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUMvRCxDQUFDIn0=