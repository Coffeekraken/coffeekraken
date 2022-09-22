"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("../../../../../../src/js/partials/s-dashboard-google-component/s-dashboard-google-component.css");
class SDashboardGoogleComponent extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
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
    firstUpdated() {
        // GTM
        const $gtm = this.document.querySelector('script[src^="https://www.googletagmanager.com/gtm.js?id="]');
        this._gtm = $gtm === null || $gtm === void 0 ? void 0 : $gtm.src.match(/id=([a-zA-Z0-9_-]+)/)[1];
        // GA
        const $ga = this.document.querySelector('script[src^="https://www.googletagmanager.com/gtag/js?id="]');
        this._ga = $ga === null || $ga === void 0 ? void 0 : $ga.src.match(/id=([a-zA-Z0-9_-]+)/)[1];
        this.requestUpdate();
    }
    render() {
        var _a, _b;
        return (0, lit_1.html) `
            <div class="s-dashboard-analytics s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Google</h2>

                <div class="ck-panel">
                    ${this._gtm
            ? (0, lit_1.html) `
                              <div class="ck-stat">
                                  <h3 class="ck-stat__label">
                                      Google Tag Manager
                                  </h3>
                                  <p class="ck-stat__value ck-stat__value-code">
                                      ${(_a = this._gtm) !== null && _a !== void 0 ? _a : 'Undefined'}
                                  </p>
                              </div>
                          `
            : ''}
                    ${this._ga
            ? (0, lit_1.html) `
                              <div class="ck-stat">
                                  <h3 class="ck-stat__label">
                                      Google Analytics
                                  </h3>
                                  <p class="ck-stat__value ck-stat__value-code">
                                      ${(_b = this._ga) !== null && _b !== void 0 ? _b : 'Undefined'}
                                  </p>
                              </div>
                          `
            : ''}
                    ${!this._gtm && !this._ga
            ? (0, lit_1.html) `
                              <p class="s-typo:p">
                                  No google analytics or tag manager
                                  installed...
                              </p>
                          `
            : ''}
                </div>
            </div>
        `;
    }
}
exports.default = SDashboardGoogleComponent;
function define(props = {}, tagName = 's-dashboard-google') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardGoogleComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBRTNCLDJHQUF5RztBQUV6RyxNQUFxQix5QkFBMEIsU0FBUSx5QkFBZTtJQW1CbEU7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBbkJEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQVFELFlBQVk7UUFDUixNQUFNO1FBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLDREQUE0RCxDQUMvRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV0RCxLQUFLO1FBQ0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQ25DLDZEQUE2RCxDQUNoRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU07O1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTs7Ozs7c0JBS0csSUFBSSxDQUFDLElBQUk7WUFDUCxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7Ozs7Ozt3Q0FNVSxNQUFBLElBQUksQ0FBQyxJQUFJLG1DQUFJLFdBQVc7OzsyQkFHckM7WUFDSCxDQUFDLENBQUMsRUFBRTtzQkFDTixJQUFJLENBQUMsR0FBRztZQUNOLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7O3dDQU1VLE1BQUEsSUFBSSxDQUFDLEdBQUcsbUNBQUksV0FBVzs7OzJCQUdwQztZQUNILENBQUMsQ0FBQyxFQUFFO3NCQUNOLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ3JCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7MkJBS0g7WUFDSCxDQUFDLENBQUMsRUFBRTs7O1NBR25CLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuRkQsNENBbUZDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxvQkFBb0I7SUFDbEUseUJBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUhELHdCQUdDIn0=