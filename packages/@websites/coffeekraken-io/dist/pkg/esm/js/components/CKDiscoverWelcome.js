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
class SCKDiscoverWelcomePropsInterface extends __SInterface {
    static get _definition() {
        return {
            platform: {
                type: 'String',
            },
        };
    }
}
export default class CKDiscoverWelcome extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKDiscoverWelcomePropsInterface);
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
        return html `
      <div class="ck-discover-welcome">
        ${!this.item
            ? html ``
            : html `
              ${!this.timeout
                ? html `
                    <s-code-example lines="8" s-deps css="codeExample">
                      <code lang="${this.item.example[0].language}">
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
export function define(props = {}, tagName = 'ck-discover-welcome') {
    __SLitComponent.define(tagName, CKDiscoverWelcome, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDcEIsT0FBTztZQUNMLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsZUFBZTtJQVE1RDtRQUNFLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFYRCxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDNUMsRUFBRSxFQUNGLGdDQUFnQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQVlLLFlBQVk7O1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxVQUFVLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRUssUUFBUTs7WUFDWix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLHdCQUF3QjtZQUV4QixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7O2dCQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDdEUsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzVDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUE7O1VBRUwsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUEsRUFBRTtZQUNSLENBQUMsQ0FBQyxJQUFJLENBQUE7Z0JBQ0EsQ0FBQyxJQUFJLENBQUMsT0FBTztnQkFDYixDQUFDLENBQUMsSUFBSSxDQUFBOztvQ0FFYyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFROzBCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJOzs7bUJBR2hDO2dCQUNILENBQUMsQ0FBQyxFQUFFO2FBQ1A7O0tBRVIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLHFCQUFxQjtJQUNyRSxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFDIn0=