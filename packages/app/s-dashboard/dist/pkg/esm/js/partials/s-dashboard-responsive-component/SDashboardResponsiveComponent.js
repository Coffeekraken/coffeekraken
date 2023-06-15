// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import '../../../../../../src/js/partials/s-dashboard-responsive-component/s-dashboard-responsive-component.css';
export default class SDashboardResponsiveComponent extends __SLitComponent {
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
        var _a, _b, _c, _d;
        super({
            shadowDom: false,
        });
        this._displayType = 'sugar';
        this._mediaConfig = (_b = (_a = this.document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme.get('media');
        this._theme = (_d = (_c = this.document.env) === null || _c === void 0 ? void 0 : _c.SUGAR) === null || _d === void 0 ? void 0 : _d.theme;
        const queries = Object.keys(this._mediaConfig.queries);
        this._activeQuery = queries[0];
    }
    firstUpdated() { }
    render() {
        var _a, _b, _c;
        return html `
            <div class="s-dashboard-responsive s-width:100">
                <div class="s-flex s-mbe:20">
                    <h2 class="s-typo:h6">Responsive</h2>
                    <span class="s-typo:p s-mis:20"
                        >${((_a = this._mediaConfig) === null || _a === void 0 ? void 0 : _a.defaultAction.match(/>/))
            ? 'Mobile first'
            : 'Desktop first'}</span
                    >
                </div>

                <div class="ck-panel">
                    <div class="ck-tabs">
                        ${Object.entries((_c = (_b = this._mediaConfig) === null || _b === void 0 ? void 0 : _b.queries) !== null && _c !== void 0 ? _c : {}).map(([name, obj]) => html `
                                <div
                                    class="ck-tabs_item s-tooltip-container ${name ===
            this._activeQuery
            ? 'active'
            : ''}"
                                    @click=${() => {
            this._activeQuery = name;
            this.requestUpdate();
        }}
                                >
                                    <i class="s-icon:${name}"></i>
                                    <div class="s-tooltip">${name}</div>
                                </div>
                            `)}
                    </div>
                    <div class="_details">
                        <p>
                            ${this._displayType !== 'sugar'
            ? html `
                                      ${this._theme.constructor.buildMediaQuery(this._activeQuery)}
                                      {...}
                                  `
            : html `
                                      @sugar.media ${this._activeQuery} {...}
                                  `}
                        </p>
                        <button
                            class="_switch ck-action"
                            @click=${() => {
            if (this._displayType === 'sugar') {
                this._displayType = '';
            }
            else {
                this._displayType = 'sugar';
            }
            this.requestUpdate();
        }}
                        >
                            <i class="s-icon:switch"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-dashboard-responsive') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardResponsiveComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyx5R0FBeUcsQ0FBQztBQUVqSCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLGVBQWU7SUFDdEUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFPRDs7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFSUCxpQkFBWSxHQUFHLE9BQU8sQ0FBQztRQVVuQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBQSxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssQ0FBQztRQUU5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFlBQVksS0FBSSxDQUFDO0lBRWpCLE1BQU07O1FBQ0YsT0FBTyxJQUFJLENBQUE7Ozs7OzJCQUtRLENBQUEsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUMxQyxDQUFDLENBQUMsY0FBYztZQUNoQixDQUFDLENBQUMsZUFBZTs7Ozs7OzBCQU1uQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbEQsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzs4RUFFNkIsSUFBSTtZQUM5QyxJQUFJLENBQUMsWUFBWTtZQUNiLENBQUMsQ0FBQyxRQUFRO1lBQ1YsQ0FBQyxDQUFDLEVBQUU7NkNBQ0MsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7O3VEQUVrQixJQUFJOzZEQUNFLElBQUk7OzZCQUVwQyxDQUNKOzs7OzhCQUlLLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTztZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFBO3dDQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FDckMsSUFBSSxDQUFDLFlBQVksQ0FDcEI7O21DQUVKO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTtxREFDZSxJQUFJLENBQUMsWUFBWTttQ0FDbkM7Ozs7cUNBSUUsR0FBRyxFQUFFO1lBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7YUFDL0I7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7Ozs7OztTQU9wQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsd0JBQXdCO0lBQ3RFLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDZCQUE2QixDQUFDLENBQUM7QUFDbEUsQ0FBQyJ9