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
import { html, LitElement, property } from 'lit-element';
import { loadDocmap, getCurrentVersion } from '../state/state';
export default class VersionSelector extends LitElement {
    constructor() {
        super();
        this._versions = [];
        (() => __awaiter(this, void 0, void 0, function* () {
            const docmapJson = yield loadDocmap();
            this._versions = docmapJson.snapshots || [];
            this._currentVersion = yield getCurrentVersion();
        }))();
    }
    createRenderRoot() {
        return this;
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
            <label class="s-select">
                <select @change="${this._change}">
                    ${this._versions.map((snap) => html `
                            <option ?selected="${this._currentVersion === snap}" value="${snap}">${snap}</option>
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
export function webcomponent(tagName = 'version-selector') {
    customElements.define(tagName, VersionSelector);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvblNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVmVyc2lvblNlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHZCxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBT25EO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFIWixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBSVgsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLFVBQVUsR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLGlCQUFpQixFQUFFLENBQUM7UUFDckQsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQztRQUNMLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN6QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxFQUFFO2dCQUNuRixXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUN4Qyx5REFBeUQsRUFDekQsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUMzQixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQzthQUNqRztZQUNELFFBQVEsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTs7bUNBRWdCLElBQUksQ0FBQyxPQUFPO3NCQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDaEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTtpREFDVyxJQUFJLENBQUMsZUFBZSxLQUFLLElBQUksWUFBWSxJQUFJLEtBQUssSUFBSTt5QkFDOUUsQ0FDSjs7O1NBR1osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTNDRztJQURDLFFBQVEsRUFBRTt3REFDSztBQUdoQjtJQURDLFFBQVEsRUFBRTtrREFDSTtBQTBDbkIsTUFBTSxVQUFVLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCO0lBQ3JELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3BELENBQUMifQ==