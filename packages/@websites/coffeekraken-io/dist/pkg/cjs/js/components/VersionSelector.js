"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const state_1 = require("../state/state");
class VersionSelector extends s_lit_component_1.default {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._versions = [];
        (() => __awaiter(this, void 0, void 0, function* () {
            const docmapJson = yield (0, state_1.loadDocmap)();
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
        return (0, lit_1.html) `
      <label class="s-select s-color:accent">
        <select @change="${this._change}">
          ${this._versions.map((snap) => (0, lit_1.html) `
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
    (0, decorators_js_1.property)()
], VersionSelector.prototype, "_currentVersion", void 0);
__decorate([
    (0, decorators_js_1.property)()
], VersionSelector.prototype, "_versions", void 0);
exports.default = VersionSelector;
function define(props = {}, tagName = "version-selector") {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, VersionSelector);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHZCw2QkFBMkI7QUFDM0IscURBQTZDO0FBQzdDLG9GQUE0RDtBQUU1RCwwQ0FBc0Q7QUFFdEQsTUFBcUIsZUFBZ0IsU0FBUSx5QkFBZTtJQU8xRDtRQUNFLEtBQUssQ0FBQztZQUNKLFlBQVksRUFBRTtnQkFDWixTQUFTLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUMsQ0FBQztRQVBMLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFRYixDQUFDLEdBQVMsRUFBRTtZQUNWLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBQSxrQkFBVSxHQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztZQUM1QyxvREFBb0Q7UUFDdEQsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1AsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3pDLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUMxQixtREFBbUQsQ0FDcEQsRUFDRDtnQkFDQSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUMxQyx5REFBeUQsRUFDekQsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUN6QixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDMUMsb0JBQW9CLEVBQ3BCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FDMUIsQ0FBQzthQUNIO1lBQ0QsUUFBUSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUNKLE9BQU8sSUFBQSxVQUFJLEVBQUE7OzJCQUVZLElBQUksQ0FBQyxPQUFPO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUNsQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7OzZCQUVHLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSTt5QkFDakMsSUFBSTs7a0JBRVgsSUFBSTs7YUFFVCxDQUNGOzs7S0FHTixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBeERDO0lBREMsSUFBQSx3QkFBUSxHQUFFO3dEQUNLO0FBR2hCO0lBREMsSUFBQSx3QkFBUSxHQUFFO2tEQUNJO0FBTGpCLGtDQTBEQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsa0JBQWtCO0lBQ2xFLHlCQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBSEQsd0JBR0MifQ==