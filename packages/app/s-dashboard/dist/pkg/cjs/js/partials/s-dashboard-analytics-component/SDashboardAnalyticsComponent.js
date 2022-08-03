"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
require("./s-dashboard-browserstack-component.css");
class SDashboardAnalyticsComponent extends s_lit_component_1.default {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }
    firstUpdated() { }
    render() {
        return (0, lit_1.html) `
            <div class="s-dashboard-analytics s-width:100">
                <h2 class="s-typo:h6 s-mbe:30">Google</h2>
            </div>
        `;
    }
}
exports.default = SDashboardAnalyticsComponent;
function define(props = {}, tagName = 's-dashboard-analytics') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardAnalyticsComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLG9EQUFrRDtBQU1sRCxNQUFxQiw0QkFBNkIsU0FBUSx5QkFBZTtJQUNyRTtRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZLEtBQUksQ0FBQztJQUVqQixNQUFNO1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTs7OztTQUlWLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFsQkQsK0NBa0JDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyx1QkFBdUI7SUFDckUseUJBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDRCQUE0QixDQUFDLENBQUM7QUFDakUsQ0FBQztBQUhELHdCQUdDIn0=