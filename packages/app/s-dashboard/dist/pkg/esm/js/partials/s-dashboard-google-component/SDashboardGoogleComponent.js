// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-google-component/s-dashboard-google-component.css';
export default class SDashboardGoogleComponent extends __SLitComponent {
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
        super({
            shadowDom: false,
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8saUdBQWlHLENBQUM7QUFFekcsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxlQUFlO0lBSWxFOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7UUFDUixNQUFNO1FBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLDREQUE0RCxDQUMvRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV0RCxLQUFLO1FBQ0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQ25DLDZEQUE2RCxDQUNoRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU07O1FBQ0YsT0FBTyxJQUFJLENBQUE7Ozs7O3NCQUtHLElBQUksQ0FBQyxJQUFJO1lBQ1AsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs7O3dDQU1VLE1BQUEsSUFBSSxDQUFDLElBQUksbUNBQUksV0FBVzs7OzJCQUdyQztZQUNILENBQUMsQ0FBQyxFQUFFO3NCQUNOLElBQUksQ0FBQyxHQUFHO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs7O3dDQU1VLE1BQUEsSUFBSSxDQUFDLEdBQUcsbUNBQUksV0FBVzs7OzJCQUdwQztZQUNILENBQUMsQ0FBQyxFQUFFO3NCQUNOLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUE7Ozs7OzJCQUtIO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7OztTQUduQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsb0JBQW9CO0lBQ2xFLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDOUQsQ0FBQyJ9