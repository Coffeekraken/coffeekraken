"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const lit_1 = require("lit");
const state_1 = __importDefault(require("../state/state"));
class CkSettings extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
        this._settings = {
            darkMode: true,
            colors: {
                accent: undefined,
                complementary: undefined,
            },
        };
        this._theme = s_theme_1.default.getCurrentTheme();
        this.state = state_1.default.define("ck-settings", {
            darkMode: false,
        });
    }
    static get properties() {
        return s_lit_component_1.default.createProperties();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $baseColorPicker = this.querySelector("#setting-base-color");
            const $mainColorPicker = this.querySelector("#setting-main-color");
            const $accentColorPicker = this.querySelector("#setting-accent-color");
            const $complementaryColorPicker = this.querySelector("#setting-complementary-color");
            const $fontSizeRange = this.querySelector("#setting-font-size");
            $baseColorPicker.addEventListener("s-color-picker.change", (e) => {
                this._theme.setColor("base", e.detail.hex);
            });
            $mainColorPicker.addEventListener("s-color-picker.change", (e) => {
                this._theme.setColor("main", e.detail.hex);
            });
            $accentColorPicker.addEventListener("s-color-picker.change", (e) => {
                this._theme.setColor("accent", e.detail.hex);
            });
            $complementaryColorPicker.addEventListener("s-color-picker.change", (e) => {
                this._theme.setColor("complementary", e.detail.hex);
            });
            $fontSizeRange.addEventListener("change", (e) => {
                this._theme.set("scale.default", `${e.target.value}`);
            });
        });
    }
    render() {
        return (0, lit_1.html) `
      <div class="ck-settings">
        <div class="s-p:100 s-mbe:40">
          <h1 class="s-typo:h3 s-mbe:40">Settings</h1>
          <p class="s-typo:p">
            These settings allows you to customize your Coffeekraken experience
            as well as feature some of the capabilities that our toolkit has to
            offer.
          </p>
        </div>

        <form>
          <ul class="__settings s-bg:odd">
            <li class="s-bg:main-surface">
              <label class="s-label s-pi:100 s-pb:30">
                <span> Dark mode </span>
                <s-theme-switcher class="s-color:accent"></s-theme-switcher>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label class="s-label s-pi:100 s-pb:30" for="setting-base-color">
                <span> Base color </span>
                <s-color-picker id="setting-base-color">
                  <div class="s-group">
                    <input
                      type="text"
                      class="s-input"
                      value="${this._theme.getColor("base").toHex()}"
                    />
                    <button class="s-btn s-color:base">
                      <i class="s-icon:color"></i>
                    </button>
                  </div>
                </s-color-picker>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label class="s-label s-pi:100 s-pb:30" for="setting-main-color">
                <span> Main color </span>
                <s-color-picker id="setting-main-color">
                  <div class="s-group">
                    <input
                      type="text"
                      class="s-input"
                      value="${this._theme.getColor("main").toHex()}"
                    />
                    <button class="s-btn s-color:main">
                      <i class="s-icon:color"></i>
                    </button>
                  </div>
                </s-color-picker>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label
                class="s-label s-pi:100 s-pb:30"
                for="setting-accent-color"
              >
                <span> Accent color </span>
                <s-color-picker
                  style="position:relative"
                  id="setting-accent-color"
                >
                  <div class="s-group">
                    <input
                      type="text"
                      class="s-input"
                      value="${this._theme.getColor("accent").toHex()}"
                    />
                    <button class="s-btn s-color:accent">
                      <i class="s-icon:color"></i>
                    </button>
                  </div>
                </s-color-picker>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label
                class="s-label s-pi:100 s-pb:30"
                for="setting-complementary-color"
              >
                <span> Complementary color </span>
                <s-color-picker id="setting-complementary-color">
                  <div class="s-group">
                    <input
                      type="text"
                      class="s-input"
                      value="${this._theme.getColor("complementary").toHex()}"
                    />
                    <button class="s-btn s-color:complementary">
                      <i class="s-icon:color"></i>
                    </button>
                  </div>
                </s-color-picker>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label class="s-label s-pi:100 s-pb:30" for="setting-font-size">
                Document scale
                <s-range
                  class="s-color:accent"
                  id="setting-font-size"
                  min="0.5"
                  max="1.5"
                  value="1"
                  tooltip
                  step="0.1"
                >
                </s-range>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label
                class="s-label s-pi:100 s-pb:30"
                for="setting-complementary-color"
              >
                Restore default settings!
                <button
                  type="reset"
                  class="s-btn s-color:accent"
                  @click=${() => {
            this._theme.clear();
        }}
                >
                  Restore!
                </button>
              </label>
            </li>
          </ul>
        </form>
      </div>
    `;
    }
}
exports.default = CkSettings;
function define(props = {}, tagName = "ck-settings") {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, CkSettings);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsb0VBQTZDO0FBQzdDLDZCQUEyQjtBQUUzQiwyREFBcUM7QUFFckMsTUFBcUIsVUFBVyxTQUFRLHlCQUFlO0lBa0JyRDtRQUNFLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztRQXBCTCxjQUFTLEdBQUc7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRTtnQkFDTixNQUFNLEVBQUUsU0FBUztnQkFDakIsYUFBYSxFQUFFLFNBQVM7YUFDekI7U0FDRixDQUFDO1FBRUYsV0FBTSxHQUFHLGlCQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDcEMsVUFBSyxHQUFHLGVBQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3BDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQVVILENBQUM7SUFSRCxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLHlCQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBUUssWUFBWTs7WUFDaEIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdkUsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNsRCw4QkFBOEIsQ0FDL0IsQ0FBQztZQUNGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVoRSxnQkFBZ0IsQ0FBQyxn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