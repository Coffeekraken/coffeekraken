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
import __filterObject from '@coffeekraken/sugar/shared/object/filter';
import { html } from 'lit';
import { loadDocmap } from '../state/state';
class SCKDiscoverPropsInterface extends __SInterface {
    static get _definition() {
        return {
            platform: {
                type: 'String',
            },
        };
    }
}
export default class CKDiscover extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKDiscoverPropsInterface);
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._docmap = yield loadDocmap();
            this.grabItem();
        });
    }
    grabItem() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.item = undefined;
            // this.timeout = undefined;
            // this.requestUpdate();
            const newMap = __filterObject(this._docmap.map, (key, item) => {
                var _a, _b;
                if (!item.platform)
                    return false;
                if (!((_b = (_a = item.example) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.code))
                    return false;
                if (this.props.platform && item.platform[0].name !== this.props.platform)
                    return false;
                return true;
            });
            const mapCount = Object.keys(newMap).length;
            const mapKeys = Object.keys(newMap);
            const itemIdx = Math.floor(Math.random() * mapCount);
            this.item = newMap[mapKeys[itemIdx]];
            this.requestUpdate();
            this.timeout = setTimeout(() => {
                this.timeout = undefined;
                this.requestUpdate();
            }, 200);
        });
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        return html `
      <div class="ck-discover">
        ${!this.item
            ? html `
              <div class="s-code-example-loader">
                <i class="s-loader:spinner s-color:accent"></i>
                &nbsp;
                <p class="s-typo:p s-display:inline-block">
                  Loading code example. Please wait...
                </p>
              </div>
            `
            : html `
              <a
                @click="${this.grabItem}"
                class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
              >
                <i class="s-icon:ui-refresh"></i>
              </a>
              ${this.item.async
                ? html `
                    <span class="s-badge:outline s-color:accent">Async</span
                    >&nbsp;
                  `
                : ''}
              ${((_b = (_a = this.item.type) === null || _a === void 0 ? void 0 : _a.types) === null || _b === void 0 ? void 0 : _b[0].type) || this.item.type
                ? html `
                    <span class="s-badge s-color:complementary"
                      >${(_f = (_e = (_d = (_c = this.item.type) === null || _c === void 0 ? void 0 : _c.types) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.type) !== null && _f !== void 0 ? _f : this.item.type}</span
                    >
                  `
                : ''}
              <br />
              <br />
              <h1 class="s-typo:h3 s-mbe:30">${this.item.name}</h1>
              <p class="s-typo:p s-mbe:30 s-truncate:3">
                ${this.item.description}
              </p>
              ${!this.timeout
                ? html `
                    <s-code-example lines="8" s-deps css="codeExample">
                      <code
                        lang="${this.props.platform === 'ts' ||
                    this.props.platform === 'node'
                    ? 'js'
                    : this.props.platform === 'postcss'
                        ? 'css'
                        : this.props.platform}"
                      >
                        ${this.item.example[0].code}
                      </code>
                    </s-code-example>
                  `
                : ''}
            `}
      </div>
    `;
    }
}
export function define(props = {}, tagName = 'ck-discover') {
    __SLitComponent.define(tagName, CKDiscover, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxNQUFNLHlCQUEwQixTQUFRLFlBQVk7SUFDbEQsTUFBTSxLQUFLLFdBQVc7UUFDcEIsT0FBTztZQUNMLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFRckQ7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBWEQsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzVDLEVBQUUsRUFDRix5QkFBeUIsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFZSyxZQUFZOztZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1oseUJBQXlCO1lBQ3pCLDRCQUE0QjtZQUM1Qix3QkFBd0I7WUFFeEIsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFOztnQkFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO29C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