"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importStar(require("@coffeekraken/s-lit-component"));
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
class CkSettings extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface();
    }
    constructor() {
        super({
            shadowDom: false,
        });
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield this.fetchMenu();
            this._packages = json.packages;
            this.requestUpdate();
        });
    }
    fetchMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://cdnv2.coffeekraken.io/ck-menu.json', {
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
            }), json = yield response.json();
            return json;
        });
    }
    render() {
        if (!this._packages) {
            return;
        }
        const h = (0, s_lit_component_1.html) `
            <div class="s-dropdown-container">
                <button>
                    <i class="s-icon:ui-menu-grid-solid"></i>
                </button>
                <div class="s-dropdown:bottom-end">
                    <ul class="_packages">
                        ${this._packages.map((pkg) => (0, s_lit_component_1.html) `
                                <li class="_package">
                                    <a
                                        href="${pkg.url}"
                                        title="Coffeekraken ${pkg.title}"
                                    >
                                        <div class="_icon">
                                            ${(0, unsafe_html_js_1.unsafeHTML)(pkg.icon)}
                                        </div>
                                        <div class="_metas">
                                            <h3 class="_title">${pkg.title}</h3>
                                            <p class="_version">
                                                ${pkg.version}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            `)}
                    </ul>
                </div>
            </div>
        `;
        console.log('H', h);
        return h;
    }
}
exports.default = CkSettings;
CkSettings.state = {};
function define(props = {}, tagName = 'ck-menu') {
    s_lit_component_1.default.define(tagName, CkSettings, Object.assign({ id: 'ck-menu' }, props));
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLGlGQUFzRTtBQUN0RSxrRUFBMkQ7QUFFM0QsTUFBcUIsVUFBVyxTQUFRLHlCQUFlO0lBQ25ELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFNRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxLQUFLOztZQUNQLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssU0FBUzs7WUFDWCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FDcEIsNENBQTRDLEVBQzVDO2dCQUNJLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxVQUFVO2dCQUNqQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELGNBQWMsRUFBRSxhQUFhO2FBQ2hDLENBQ0osRUFDRCxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFakMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLE9BQU87U0FDVjtRQUNELE1BQU0sQ0FBQyxHQUFHLElBQUEsc0JBQUksRUFBQTs7Ozs7OzswQkFPSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDaEIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUEsc0JBQUksRUFBQTs7O2dEQUdPLEdBQUcsQ0FBQyxHQUFHOzhEQUNPLEdBQUcsQ0FBQyxLQUFLOzs7OENBR3pCLElBQUEsMkJBQVUsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDOzs7aUVBR0QsR0FBRyxDQUFDLEtBQUs7O2tEQUV4QixHQUFHLENBQUMsT0FBTzs7Ozs7NkJBS2hDLENBQ0o7Ozs7U0FJaEIsQ0FBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBCLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7QUE5RUwsNkJBK0VDO0FBMUVVLGdCQUFLLEdBQUcsRUFBRSxDQUFDO0FBNEV0QixTQUFnQixNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLFNBQVM7SUFDdkQseUJBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsa0JBQ3RDLEVBQUUsRUFBRSxTQUFTLElBQ1YsS0FBSyxFQUNWLENBQUM7QUFDUCxDQUFDO0FBTEQsd0JBS0MifQ==