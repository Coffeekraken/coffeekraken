// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-google-component/s-dashboard-google-component.css';
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
        // GA
        const $ga = this.document.querySelector('script[src^="https://www.googletagmanager.com/gtag/js?id="]');
        this._ga = $ga === null || $ga === void 0 ? void 0 : $ga.src.match(/id=([a-zA-Z0-9_-]+)/)[1];
        this.requestUpdate();
    }
    render() {
        var _a, _b;
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
                    ${this._ga
            ? html `
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
            ? html `
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
export function define(props = {}, tagName = 's-dashboard-google') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardGoogleComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8saUdBQWlHLENBQUM7QUFFekcsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxlQUFlO0lBbUJsRTtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuQkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksUUFBUTs7UUFDUixPQUFPLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxRQUFRLG1DQUFJLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBUUQsWUFBWTtRQUNSLE1BQU07UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDcEMsNERBQTRELENBQy9ELENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRELEtBQUs7UUFDTCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDbkMsNkRBQTZELENBQ2hFLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUksQ0FBQTs7Ozs7c0JBS0csSUFBSSxDQUFDLElBQUk7WUFDUCxDQUFDLENBQUMsSUFBSSxDQUFBOzs7Ozs7d0NBTVUsTUFBQSxJQUFJLENBQUMsSUFBSSxtQ0FBSSxXQUFXOzs7MkJBR3JDO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7c0JBQ04sSUFBSSxDQUFDLEdBQUc7WUFDTixDQUFDLENBQUMsSUFBSSxDQUFBOzs7Ozs7d0NBTVUsTUFBQSxJQUFJLENBQUMsR0FBRyxtQ0FBSSxXQUFXOzs7MkJBR3BDO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7c0JBQ04sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs7MkJBS0g7WUFDSCxDQUFDLENBQUMsRUFBRTs7O1NBR25CLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxvQkFBb0I7SUFDbEUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQztBQUM5RCxDQUFDIn0=