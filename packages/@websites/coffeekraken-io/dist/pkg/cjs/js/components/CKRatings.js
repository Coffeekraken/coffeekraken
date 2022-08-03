"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
const analytics_1 = require("firebase/analytics");
const app_1 = require("firebase/app");
class CKRatings extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
        this._settings = {};
        // TODO: Replace the following with your app's Firebase project configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDT-OwhiWreRMdNFj61uQ4ukIftBvXyaQQ",
            authDomain: "coffeekraken-ratings.firebaseapp.com",
            projectId: "coffeekraken-ratings",
            storageBucket: "coffeekraken-ratings.appspot.com",
            messagingSenderId: "1050427238214",
            appId: "1:1050427238214:web:612d485c9735997c28a747",
            measurementId: "G-9S85NZNJB7",
        };
        const app = (0, app_1.initializeApp)(firebaseConfig);
        const analytics = (0, analytics_1.getAnalytics)(app);
        // const $meta = document.createElement('meta');
        // $meta.setAttribute('name', 'google-signin-client_id');
        // $meta.setAttribute(
        //     'content',
        //     `YOUR_CLIENT_ID.apps.googleusercontent.com`,
        // );
        // document.head.appendChild($meta);
    }
    //   state = __state.define("ck-ratings", {});
    static get properties() {
        return s_lit_component_1.default.createProperties();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    render() {
        return (0, lit_1.html) `
      <div class="ck-ratings">
        <h2 class="s-typo:h4">
          We'd <span class="s-tc:accent">love</span><br />to hear
          <span class="s-tc:complementary">from you</span>! iwefj
        </h2>
      </div>
    `;
    }
}
exports.default = CKRatings;
console.log("plop");
function define(props = {}, tagName = "ck-ratings") {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, CKRatings);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBRTNCLGtEQUFrRDtBQUNsRCxzQ0FBNkM7QUFFN0MsTUFBcUIsU0FBVSxTQUFRLHlCQUFlO0lBU3BEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBWEwsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQWFiLDZFQUE2RTtRQUM3RSxNQUFNLGNBQWMsR0FBRztZQUNyQixNQUFNLEVBQUUseUNBQXlDO1lBQ2pELFVBQVUsRUFBRSxzQ0FBc0M7WUFDbEQsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxhQUFhLEVBQUUsa0NBQWtDO1lBQ2pELGlCQUFpQixFQUFFLGVBQWU7WUFDbEMsS0FBSyxFQUFFLDRDQUE0QztZQUNuRCxhQUFhLEVBQUUsY0FBYztTQUM5QixDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBYSxFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUEsd0JBQVksRUFBQyxHQUFHLENBQUMsQ0FBQztRQUVwQyxnREFBZ0Q7UUFDaEQseURBQXlEO1FBQ3pELHNCQUFzQjtRQUN0QixpQkFBaUI7UUFDakIsbURBQW1EO1FBQ25ELEtBQUs7UUFDTCxvQ0FBb0M7SUFDdEMsQ0FBQztJQWhDRCw4Q0FBOEM7SUFFOUMsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyx5QkFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQThCSyxZQUFZOzhEQUFJLENBQUM7S0FBQTtJQUV2QixNQUFNO1FBQ0osT0FBTyxJQUFBLFVBQUksRUFBQTs7Ozs7OztLQU9WLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFqREQsNEJBaURDO0FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVwQixTQUFnQixNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLFlBQVk7SUFDNUQseUJBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFIRCx3QkFHQyJ9