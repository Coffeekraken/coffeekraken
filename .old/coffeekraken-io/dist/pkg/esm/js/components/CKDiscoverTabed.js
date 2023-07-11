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
                                class="${this.state.activeTabId === tab.id
            ? 'active'
            : ''}"
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
export function __define(props = {}, tagName = 'ck-discover-tabed') {
    __SLitComponent.define(tagName, CKDiscoverTabed, props);
    // __SLitComponent.setDefaultProps(tagName, props);
    // customElements.define(tagName, CKDiscoverTabed);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sOEJBQStCLFNBQVEsWUFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBQ3hELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsOEJBQThCLENBQ2pDLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFHUCxVQUFLLEdBQUc7WUFDSjtnQkFDSSxFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFLLEVBQUUsSUFBSTthQUNkO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDZjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxNQUFNO2dCQUNWLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDZjtTQUNKLENBQUM7UUFFRixVQUFLLEdBQUc7WUFDSixXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDO0lBdkJGLENBQUM7SUEyQkssWUFBWTs7WUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7c0JBR0csSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ1osQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7eUNBRUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDdEMsQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTt5Q0FDQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsQ0FBQzs7a0NBRUMsR0FBRyxDQUFDLEtBQUs7O3lCQUVsQixDQUNKOzt5Q0FFb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXOztTQUV0RCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsbUJBQW1CO0lBQ25FLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV4RCxtREFBbUQ7SUFDbkQsbURBQW1EO0FBQ3ZELENBQUMifQ==