// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import __SLitComponent from "@coffeekraken/s-lit-component";
import { loadDocmap } from "../state/state";
export default class VersionSelector extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._versions = [];
        (() => __awaiter(this, void 0, void 0, function* () {
            const docmapJson = yield loadDocmap();
            this._versions = docmapJson.snapshots || [];
            // this._currentVersion = await getCurrentVersion();
        }))();
    }
    _change(e) {
        setTimeout(() => {
            let newLocation = document.location.href;
            if (document.location.href.match(/^https?:\/\/v[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\./)) {
                newLocation = document.location.href.replace(/^(https?:\/\/v)[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.(.*)/, `$1${e.target.value}.$2`);
            }
            else {
                newLocation = document.location.href.replace(/^(https?:\/\/)(.*)/, `$1v${e.target.value}.$2`);
            }
            document.location = newLocation;
        });
    }
    render() {
        return html `
      <label class="s-select s-color:accent">
        <select @change="${this._change}">
          ${this._versions.map((snap) => html `
              <option
                ?selected="${this._currentVersion === snap}"
                value="${snap}"
              >
                ${snap}
              </option>
            `)}
        </select>
      </label>
    `;
    }
}
__decorate([
    property()
], VersionSelector.prototype, "_currentVersion", void 0);
__decorate([
    property()
], VersionSelector.prototype, "_versions", void 0);
export function define(props = {}, tagName = "version-selector") {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, VersionSelector);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUFPMUQ7UUFDRSxLQUFLLENBQUM7WUFDSixZQUFZLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLEtBQUs7YUFDakI7U0FDRixDQUFDLENBQUM7UUFQTCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBUWIsQ0FBQyxHQUFTLEVBQUU7WUFDVixNQUFNLFVBQVUsR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDNUMsb0RBQW9EO1FBQ3RELENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQztRQUNQLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN6QyxJQUNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDMUIsbURBQW1ELENBQ3BELEVBQ0Q7Z0JBQ0EsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDMUMseURBQXlELEVBQ3pELEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FDekIsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQzFDLG9CQUFvQixFQUNwQixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQzFCLENBQUM7YUFDSDtZQUNELFFBQVEsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQTs7MkJBRVksSUFBSSxDQUFDLE9BQU87WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQ2xCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7OzZCQUVHLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSTt5QkFDakMsSUFBSTs7a0JBRVgsSUFBSTs7YUFFVCxDQUNGOzs7S0FHTixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBeERDO0lBREMsUUFBUSxFQUFFO3dEQUNLO0FBR2hCO0lBREMsUUFBUSxFQUFFO2tEQUNJO0FBdURqQixNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxrQkFBa0I7SUFDbEUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9