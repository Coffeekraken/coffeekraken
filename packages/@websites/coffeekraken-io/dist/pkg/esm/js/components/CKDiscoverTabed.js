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
import __SInterface from "@coffeekraken/s-interface";
import __SLitComponent from "@coffeekraken/s-lit-component";
import { html } from "lit";
class SCKDiscoverTabedPropsInterface extends __SInterface {
    static get _definition() {
        return {
            platform: {
                type: "String",
            },
        };
    }
}
export default class CKDiscoverTabed extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
        this._tabs = [
            {
                id: "js",
                title: "JS",
            },
            {
                id: "css",
                title: "CSS",
            },
            {
                id: "node",
                title: "NodeJS",
            },
            {
                id: "php",
                title: "PHP",
            },
        ];
        this.state = {
            activeTabId: "js",
        };
    }
    static get properties() {
        return __SLitComponent.createProperties({}, SCKDiscoverTabedPropsInterface);
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._$discover = this.querySelector("ck-discover");
        });
    }
    render() {
        return html `
      <div class="ck-discover-tabed">
        <ul class="s-tabs s-color:accent s-mbe:50 @mobile s-tabs:grow">
          ${this._tabs.map((tab) => html `
              <li
                class="${this.state.activeTabId === tab.id ? "active" : ""}"
                @click=${() => {
            this.state.activeTabId = tab.id;
            this._$discover.grabItem();
        }}
              >
                ${tab.title}
              </li>
            `)}
        </ul>
        <ck-discover platform="${this.state.activeTabId}"></ck-discover>
      </div>
    `;
    }
}
export function define(props = {}, tagName = "ck-discover-tabed") {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKDiscoverTabed);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sOEJBQStCLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2FBQ2Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUFLMUQ7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFHTCxVQUFLLEdBQUc7WUFDTjtnQkFDRSxFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNEO2dCQUNFLEVBQUUsRUFBRSxNQUFNO2dCQUNWLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtTQUNGLENBQUM7UUFFRixVQUFLLEdBQUc7WUFDTixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDO0lBdkJGLENBQUM7SUFSRCxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsOEJBQThCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBaUNLLFlBQVk7O1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUE7OztZQUdILElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNkLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7O3lCQUVBLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTt5QkFDakQsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7O2tCQUVDLEdBQUcsQ0FBQyxLQUFLOzthQUVkLENBQ0Y7O2lDQUVzQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7O0tBRWxELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxtQkFBbUI7SUFDbkUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9