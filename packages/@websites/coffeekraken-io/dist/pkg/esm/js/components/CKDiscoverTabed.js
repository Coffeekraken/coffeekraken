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
import __SInterface from '@coffeekraken/s-interface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
class SCKDiscoverTabedPropsInterface extends __SInterface {
    static get _definition() {
        return {
            platform: {
                type: 'String',
            },
        };
    }
}
export default class CKDiscoverTabed extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKDiscoverTabedPropsInterface);
    }
    constructor() {
        super({
            shadowDom: false,
        });
        this._tabs = [
            {
                id: 'js',
                title: 'JS',
            },
            {
                id: 'css',
                title: 'CSS',
            },
            {
                id: 'node',
                title: 'NodeJS',
            },
            {
                id: 'php',
                title: 'PHP',
            },
        ];
        this.state = {
            activeTabId: 'js',
        };
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._$discover = this.querySelector('ck-discover');
        });
    }
    render() {
        return html `
      <div class="ck-discover-tabed">
        <ul class="s-tabs s-color:accent s-mbe:50 @mobile s-tabs:grow">
          ${this._tabs.map((tab) => html `
              <li
                class="${this.state.activeTabId === tab.id ? 'active' : ''}"
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
export function define(props = {}, tagName = 'ck-discover-tabed') {
    __SLitComponent.define(tagName, CKDiscoverTabed, props);
    // __SLitComponent.setDefaultProps(tagName, props);
    // customElements.define(tagName, CKDiscoverTabed);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sOEJBQStCLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2FBQ2Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUFDMUQsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzVDLEVBQUUsRUFDRiw4QkFBOEIsQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRDtRQUNFLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztRQUdMLFVBQUssR0FBRztZQUNOO2dCQUNFLEVBQUUsRUFBRSxJQUFJO2dCQUNSLEtBQUssRUFBRSxJQUFJO2FBQ1o7WUFDRDtnQkFDRSxFQUFFLEVBQUUsS0FBSztnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRDtnQkFDRSxFQUFFLEVBQUUsS0FBSztnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1NBQ0YsQ0FBQztRQUVGLFVBQUssR0FBRztZQUNOLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUM7SUF2QkYsQ0FBQztJQTJCSyxZQUFZOztZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFBOzs7WUFHSCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDZCxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzt5QkFFQSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7eUJBQ2pELEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QixDQUFDOztrQkFFQyxHQUFHLENBQUMsS0FBSzs7YUFFZCxDQUNGOztpQ0FFc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXOztLQUVsRCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsbUJBQW1CO0lBQ25FLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV4RCxtREFBbUQ7SUFDbkQsbURBQW1EO0FBQ3JELENBQUMifQ==