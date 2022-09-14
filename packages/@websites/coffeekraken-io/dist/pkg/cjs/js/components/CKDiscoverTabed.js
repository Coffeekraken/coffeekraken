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
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
class SCKDiscoverTabedPropsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            platform: {
                type: 'String',
            },
        };
    }
}
class CKDiscoverTabed extends s_lit_component_1.default {
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
    static get properties() {
        return s_lit_component_1.default.createProperties({}, SCKDiscoverTabedPropsInterface);
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._$discover = this.querySelector('ck-discover');
        });
    }
    render() {
        return (0, lit_1.html) `
      <div class="ck-discover-tabed">
        <ul class="s-tabs s-color:accent s-mbe:50 @mobile s-tabs:grow">
          ${this._tabs.map((tab) => (0, lit_1.html) `
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
exports.default = CKDiscoverTabed;
function define(props = {}, tagName = 'ck-discover-tabed') {
    s_lit_component_1.default.define(CKDiscoverTabed, props, tagName);
    // __SLitComponent.setDefaultProps(tagName, props);
    // customElements.define(tagName, CKDiscoverTabed);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELDZCQUEyQjtBQUUzQixNQUFNLDhCQUErQixTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ3BCLE9BQU87WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7YUFDZjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFxQixlQUFnQixTQUFRLHlCQUFlO0lBSzFEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBR0wsVUFBSyxHQUFHO1lBQ047Z0JBQ0UsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNEO2dCQUNFLEVBQUUsRUFBRSxLQUFLO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRDtnQkFDRSxFQUFFLEVBQUUsTUFBTTtnQkFDVixLQUFLLEVBQUUsUUFBUTthQUNoQjtZQUNEO2dCQUNFLEVBQUUsRUFBRSxLQUFLO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7U0FDRixDQUFDO1FBRUYsVUFBSyxHQUFHO1lBQ04sV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQztJQXZCRixDQUFDO0lBUkQsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyx5QkFBZSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFpQ0ssWUFBWTs7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELENBQUM7S0FBQTtJQUVELE1BQU07UUFDSixPQUFPLElBQUEsVUFBSSxFQUFBOzs7WUFHSCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDZCxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7O3lCQUVBLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTt5QkFDakQsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7O2tCQUVDLEdBQUcsQ0FBQyxLQUFLOzthQUVkLENBQ0Y7O2lDQUVzQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7O0tBRWxELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE5REQsa0NBOERDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxtQkFBbUI7SUFDbkUseUJBQWUsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV4RCxtREFBbUQ7SUFDbkQsbURBQW1EO0FBQ3JELENBQUM7QUFMRCx3QkFLQyJ9