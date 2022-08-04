// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import './s-dashboard-google-component.css';
export default class SDashboardGoogleComponent extends __SLitComponent {
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
        this.requestUpdate();
    }
    render() {
        var _a;
        return html `
            <div class="s-dashboard-analytics s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">Google</h2>

                <div class="ck-panel">
                    ${this._gtm
            ? html `
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
                </div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-dashboard-google') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardGoogleComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sb0NBQW9DLENBQUM7QUFFNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxlQUFlO0lBa0JsRTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuQkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksUUFBUTs7UUFDUixPQUFPLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxRQUFRLG1DQUFJLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBUUQsWUFBWTtRQUNSLE1BQU07UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDcEMsNERBQTRELENBQy9ELENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUksQ0FBQTs7Ozs7c0JBS0csSUFBSSxDQUFDLElBQUk7WUFDUCxDQUFDLENBQUMsSUFBSSxDQUFBOzs7Ozs7d0NBTVUsTUFBQSxJQUFJLENBQUMsSUFBSSxtQ0FBSSxXQUFXOzs7MkJBR3JDO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7OztTQUduQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsb0JBQW9CO0lBQ2xFLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDOUQsQ0FBQyJ9