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
import { __filterObject } from '@coffeekraken/sugar/object';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUMsTUFBTSx5QkFBMEIsU0FBUSxZQUFZO0lBQ2hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsZUFBZTtJQUNuRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHlCQUF5QixDQUM1QixDQUFDO0lBQ04sQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU1LLFlBQVk7O1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztLQUFBO0lBRUssUUFBUTs7WUFDVix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLHdCQUF3QjtZQUV4QixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFH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