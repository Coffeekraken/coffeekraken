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
import { loadDocmap, getCurrentVersion, setState } from '../state/state';
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
        setState({
            version: e.target.value
        });
        setTimeout(() => {
            document.location.reload();
        });
    }
    render() {
        return html `
            <label class="s-select">
                <select @change="${this._change}">
                    ${this._versions.map(snap => html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvblNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVmVyc2lvblNlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBUW5EO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFIWixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBSVgsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLFVBQVUsR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLGlCQUFpQixFQUFFLENBQUM7UUFDckQsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQztRQUNMLFFBQVEsQ0FBQztZQUNMLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzttQ0FFZ0IsSUFBSSxDQUFDLE9BQU87c0JBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFBOzZDQUNSLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxZQUFZLElBQUksS0FBSyxJQUFJO3FCQUM5RSxDQUFDOzs7U0FHYixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbkNHO0lBREMsUUFBUSxFQUFFO3dEQUNLO0FBR2hCO0lBREMsUUFBUSxFQUFFO2tEQUNJO0FBa0NuQixNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0I7SUFDckQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDcEQsQ0FBQyJ9