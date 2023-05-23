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
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKDiscoverPropsInterface);
    }
    constructor() {
        super({
            shadowDom: false,
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._docmap = yield loadDocmap();
            _console.log('DOC', this._docmap);
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
                if (this.props.platform &&
                    item.platform[0].name !== this.props.platform)
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
                                    <span class="s-badge:outline s-color:accent"
                                        >Async</span
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
                                    <s-code-example
                                        lines="8"
                                        s-deps
                                        css="codeExample"
                                    >
                                        <code
                                            lang="${this.props.platform ===
                    'ts' ||
                    this.props.platform === 'node'
                    ? 'js'
                    : this.props.platform ===
                        'postcss'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxNQUFNLHlCQUEwQixTQUFRLFlBQVk7SUFDaEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBQ25ELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YseUJBQXlCLENBQzVCLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBTUssWUFBWTs7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUM7WUFDbEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFSyxRQUFROztZQUNWLHlCQUF5QjtZQUN6Qiw0QkFBNEI7WUFDNUIsd0JBQXdCO1lBRXhCLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFD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