// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import '../../../../../../src/js/partials/s-dashboard-google-component/s-dashboard-google-component.css';
export default class SDashboardGoogleComponent extends __SLitComponent {
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
                                  <h3 class="ck-stat_label">
                                      Google Tag Manager
                                  </h3>
                                  <p class="ck-stat_value ck-stat_value-code">
                                      ${(_a = this._gtm) !== null && _a !== void 0 ? _a : 'Undefined'}
                                  </p>
                              </div>
                          `
            : ''}
                    ${this._ga
            ? html `
                              <div class="ck-stat">
                                  <h3 class="ck-stat_label">
                                      Google Analytics
                                  </h3>
                                  <p class="ck-stat_value ck-stat_value-code">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sbUNBQW1DLE1BQU0sb0RBQW9ELENBQUM7QUFFckcsT0FBTyxpR0FBaUcsQ0FBQztBQUV6RyxNQUFNLENBQUMsT0FBTyxPQUFPLHlCQUEwQixTQUFRLGVBQWU7SUFDbEUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFLRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxRQUFROztRQUNSLE9BQU8sTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLFFBQVEsbUNBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFFRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTTtRQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUNwQyw0REFBNEQsQ0FDL0QsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdEQsS0FBSztRQUNMLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUNuQyw2REFBNkQsQ0FDaEUsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNOztRQUNGLE9BQU8sSUFBSSxDQUFBOzs7OztzQkFLRyxJQUFJLENBQUMsSUFBSTtZQUNQLENBQUMsQ0FBQyxJQUFJLENBQUE7Ozs7Ozt3Q0FNVSxNQUFBLElBQUksQ0FBQyxJQUFJLG1DQUFJLFdBQVc7OzsyQkFHckM7WUFDSCxDQUFDLENBQUMsRUFBRTtzQkFDTixJQUFJLENBQUMsR0FBRztZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUE7Ozs7Ozt3Q0FNVSxNQUFBLElBQUksQ0FBQyxHQUFHLG1DQUFJLFdBQVc7OzsyQkFHcEM7WUFDSCxDQUFDLENBQUMsRUFBRTtzQkFDTixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztZQUNyQixDQUFDLENBQUMsSUFBSSxDQUFBOzs7OzsyQkFLSDtZQUNILENBQUMsQ0FBQyxFQUFFOzs7U0FHbkIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLG9CQUFvQjtJQUNsRSxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQzlELENBQUMifQ==