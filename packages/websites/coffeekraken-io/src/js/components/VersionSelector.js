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
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { loadDocmap } from '../state/state';
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
export function define(props = {}, tagName = 'version-selector') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, VersionSelector);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvblNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVmVyc2lvblNlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUFPeEQ7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFQUCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBUVgsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLFVBQVUsR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDNUMsb0RBQW9EO1FBQ3hELENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQztRQUNMLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN6QyxJQUNJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDeEIsbURBQW1ELENBQ3RELEVBQ0g7Z0JBQ0UsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDeEMseURBQXlELEVBQ3pELEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FDM0IsQ0FBQzthQUNMO2lCQUFNO2dCQUNILFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ3hDLG9CQUFvQixFQUNwQixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQzVCLENBQUM7YUFDTDtZQUNELFFBQVEsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTs7bUNBRWdCLElBQUksQ0FBQyxPQUFPO3NCQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDaEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7NkNBRU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJO3lDQUNqQyxJQUFJOztrQ0FFWCxJQUFJOzt5QkFFYixDQUNKOzs7U0FHWixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeERHO0lBREMsUUFBUSxFQUFFO3dEQUNLO0FBR2hCO0lBREMsUUFBUSxFQUFFO2tEQUNJO0FBdURuQixNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxrQkFBa0I7SUFDaEUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDcEQsQ0FBQyJ9