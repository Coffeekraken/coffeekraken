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
import __SLitComponent from "@coffeekraken/s-lit-component";
import { html } from "lit";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
export default class CKRatings extends __SLitComponent {
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
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
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
        return __SLitComponent.createProperties();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    render() {
        return html `
      <div class="ck-ratings">
        <h2 class="s-typo:h4">
          We'd <span class="s-tc:accent">love</span><br />to hear
          <span class="s-tc:complementary">from you</span>! iwefj
        </h2>
      </div>
    `;
    }
}
console.log("plop");
export function define(props = {}, tagName = "ck-ratings") {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKRatings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLGVBQWU7SUFTcEQ7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFYTCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBYWIsNkVBQTZFO1FBQzdFLE1BQU0sY0FBYyxHQUFHO1lBQ3JCLE1BQU0sRUFBRSx5Q0FBeUM7WUFDakQsVUFBVSxFQUFFLHNDQUFzQztZQUNsRCxTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLGFBQWEsRUFBRSxrQ0FBa0M7WUFDakQsaUJBQWlCLEVBQUUsZUFBZTtZQUNsQyxLQUFLLEVBQUUsNENBQTRDO1lBQ25ELGFBQWEsRUFBRSxjQUFjO1NBQzlCLENBQUM7UUFFRixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBDLGdEQUFnRDtRQUNoRCx5REFBeUQ7UUFDekQsc0JBQXNCO1FBQ3RCLGlCQUFpQjtRQUNqQixtREFBbUQ7UUFDbkQsS0FBSztRQUNMLG9DQUFvQztJQUN0QyxDQUFDO0lBaENELDhDQUE4QztJQUU5QyxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUE4QkssWUFBWTs4REFBSSxDQUFDO0tBQUE7SUFFdkIsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFBOzs7Ozs7O0tBT1YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFcEIsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsWUFBWTtJQUM1RCxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1QyxDQUFDIn0=