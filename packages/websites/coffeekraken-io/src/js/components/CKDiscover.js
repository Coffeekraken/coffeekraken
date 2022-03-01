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
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import { loadDocmap } from '../state/state';
import __filterObject from '@coffeekraken/sugar/shared/object/filter';
import __wait from '@coffeekraken/sugar/shared/time/wait';
export default class CKDiscover extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._docmap = yield loadDocmap();
            this.grabItem();
        });
    }
    grabItem() {
        return __awaiter(this, void 0, void 0, function* () {
            this.item = undefined;
            this.requestUpdate();
            yield __wait();
            const newMap = __filterObject(this._docmap.map, (key, item) => {
                if (!item.platform)
                    return false;
                if (item.platform[0].name !== this.props.platform)
                    return false;
                if (!item.example)
                    return false;
                return true;
            });
            const mapCount = Object.keys(newMap).length;
            const mapKeys = Object.keys(newMap);
            const itemIdx = Math.floor(Math.random() * mapCount);
            this.item = newMap[mapKeys[itemIdx]];
            this.requestUpdate();
        });
    }
    render() {
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
                    ` : html `
                        <a
                            @click="${this.grabItem}"
                            class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
                        >
                            <i class="s-icon:refresh"></i>
                        </a>
                         ${this.item.async
            ? html `
                                    <span
                                        class="s-badge:outline s-color:accent"
                                        >Async</span
                                    >&nbsp;
                                `
            : ''}
                        <span class="s-badge s-color:complementary">${this.item.type}</span>
                        <br/>
                        <br/>
                          <h1 class="s-typo:h3 s-mbe:30">
                              ${this.item.name}
                          </h1>
                          <p class="s-typo:p s-mbe:30">
                              ${this.item.description}
                          </p>
                          <s-code-example>
                              <code
                                  lang="${this.props.platform === 'ts' ||
            this.props.platform === 'node'
            ? 'js'
            : this.props.platform === 'postcss' ? 'css' : this.props.platform}">
                                ${this.item.example[0].code}
                              </code>
                          </s-code-example>
                          <div
                              class="s-until:sibling:mounted s-code-example-loader"
                          >
                              <i class="s-loader:spinner s-color:accent"></i>
                              &nbsp;
                              <p class="s-typo:p s-display:inline-block">
                                  Loading code example. Please wait...
                              </p>
                          </div>
                      `}
            </div>
        `;
    }
}
export function define(props = {}, tagName = 'ck-discover') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKDiscover);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tEaXNjb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNLRGlzY292ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBR3RFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFDbkQ7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBS0ssWUFBWTs7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLE1BQU0sTUFBTSxFQUFFLENBQUM7WUFFZixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDaEMsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUM1QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7O2tCQUVELENBQUMsSUFBSSxDQUFDLElBQUk7WUFDUixDQUFDLENBQUMsSUFBSSxDQUFBOzs7Ozs7OztxQkFRTCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7O3NDQUVVLElBQUksQ0FBQyxRQUFROzs7OzsyQkFLeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs7aUNBS0Q7WUFDTCxDQUFDLENBQUMsRUFBRTtzRUFDc0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJOzs7O2dDQUlwRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7OztnQ0FHZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7Ozs7MENBSVgsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSTtZQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQzFCLENBQUMsQ0FBQyxJQUFJO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7a0NBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Ozs7Ozs7Ozs7Ozt1QkFZcEM7O1NBRWQsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLGFBQWE7SUFDM0QsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsQ0FBQyJ9