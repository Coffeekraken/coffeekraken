"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("../../../../../../src/js/partials/s-dashboard-responsive-component/s-dashboard-responsive-component.css");
class SDashboardResponsiveComponent extends s_lit_component_1.default {
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
        return (0, lit_1.html) `
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
                        ${Object.entries((_c = (_b = this._mediaConfig) === null || _b === void 0 ? void 0 : _b.queries) !== null && _c !== void 0 ? _c : {}).map(([name, obj]) => (0, lit_1.html) `
                                <div
                                    class="ck-tabs__item s-tooltip-container ${name ===
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
                    <div class="__details">
                        <p>
                            ${this._displayType !== 'sugar'
            ? (0, lit_1.html) `
                                      ${this._theme.constructor.buildMediaQuery(this._activeQuery)}
                                      {...}
                                  `
            : (0, lit_1.html) `
                                      @sugar.media ${this._activeQuery} {...}
                                  `}
                        </p>
                        <button
                            class="__switch ck-action"
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
exports.default = SDashboardResponsiveComponent;
function define(props = {}, tagName = 's-dashboard-responsive') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardResponsiveComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLG1IQUFpSDtBQUVqSCxNQUFxQiw2QkFBOEIsU0FBUSx5QkFBZTtJQXFCdEU7O1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBUlAsaUJBQVksR0FBRyxPQUFPLENBQUM7UUFVbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLENBQUM7UUFFOUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUE5QkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksUUFBUTs7UUFDUixPQUFPLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxRQUFRLG1DQUFJLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBbUJELFlBQVksS0FBSSxDQUFDO0lBRWpCLE1BQU07O1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTs7Ozs7MkJBS1EsQ0FBQSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxjQUFjO1lBQ2hCLENBQUMsQ0FBQyxlQUFlOzs7Ozs7MEJBTW5CLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBQSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUNsRCxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTs7K0VBRThCLElBQUk7WUFDL0MsSUFBSSxDQUFDLFlBQVk7WUFDYixDQUFDLENBQUMsUUFBUTtZQUNWLENBQUMsQ0FBQyxFQUFFOzZDQUNDLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDOzt1REFFa0IsSUFBSTs2REFDRSxJQUFJOzs2QkFFcEMsQ0FDSjs7Ozs4QkFJSyxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU87WUFDM0IsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO3dDQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FDckMsSUFBSSxDQUFDLFlBQVksQ0FDcEI7O21DQUVKO1lBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO3FEQUNlLElBQUksQ0FBQyxZQUFZO21DQUNuQzs7OztxQ0FJRSxHQUFHLEVBQUU7WUFDVixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTyxFQUFFO2dCQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDOzs7Ozs7O1NBT3BCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFsR0QsZ0RBa0dDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyx3QkFBd0I7SUFDdEUseUJBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDZCQUE2QixDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUhELHdCQUdDIn0=