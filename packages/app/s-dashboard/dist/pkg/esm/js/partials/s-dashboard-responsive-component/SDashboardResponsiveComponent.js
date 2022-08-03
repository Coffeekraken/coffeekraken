// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import './s-dashboard-responsive-component.css';
export default class SDashboardResponsiveComponent extends __SLitComponent {
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
                    <div class="__list">
                        ${Object.entries((_c = (_b = this._mediaConfig) === null || _b === void 0 ? void 0 : _b.queries) !== null && _c !== void 0 ? _c : {}).map(([name, obj]) => html `
                                <div
                                    class="__list-item s-tooltip-container ${name ===
            this._activeQuery
            ? 'active'
            : ''}"
                                    @click=${() => {
            this._activeQuery = name;
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
                        ${this._displayType !== 'sugar'
            ? html `
                                  <p class="s-typo:code">
                                      ${this._theme.constructor.buildMediaQuery(this._activeQuery)}
                                      {...}
                                  </p>
                              `
            : html `
                                  <p class="s-typo:code">
                                      @sugar.media ${this._activeQuery} {...}
                                  </p>
                              `}
                        <button
                            class="__switch"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sd0NBQXdDLENBQUM7QUFFaEQsTUFBTSxDQUFDLE9BQU8sT0FBTyw2QkFBOEIsU0FBUSxlQUFlO0lBcUJ0RTs7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFSUCxpQkFBWSxHQUFHLE9BQU8sQ0FBQztRQVVuQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBQSxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssQ0FBQztRQUU5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQTlCRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFtQkQsWUFBWSxLQUFJLENBQUM7SUFFakIsTUFBTTs7UUFDRixPQUFPLElBQUksQ0FBQTs7Ozs7MkJBS1EsQ0FBQSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxjQUFjO1lBQ2hCLENBQUMsQ0FBQyxlQUFlOzs7Ozs7MEJBTW5CLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBQSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUNsRCxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7OzZFQUU0QixJQUFJO1lBQzdDLElBQUksQ0FBQyxZQUFZO1lBQ2IsQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTs2Q0FDQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7dURBRWtCLElBQUk7OzBDQUVqQixJQUFJOzs7NkJBR2pCLENBQ0o7OzswQkFHQyxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU87WUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQTs7d0NBRU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUNyQyxJQUFJLENBQUMsWUFBWSxDQUNwQjs7OytCQUdSO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTs7cURBRW1CLElBQUksQ0FBQyxZQUFZOzsrQkFFdkM7OztxQ0FHTSxHQUFHLEVBQUU7WUFDVixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTyxFQUFFO2dCQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDOzs7Ozs7O1NBT3BCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyx3QkFBd0I7SUFDdEUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztBQUNsRSxDQUFDIn0=