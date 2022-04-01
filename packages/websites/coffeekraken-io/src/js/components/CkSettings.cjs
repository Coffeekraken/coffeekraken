import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CkSettings_exports = {};
__export(CkSettings_exports, {
  default: () => CkSettings,
  define: () => define
});
module.exports = __toCommonJS(CkSettings_exports);
var import_lit = require("lit");
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_state = require("../state/state");
class CkSettings extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
    this._settings = {
      darkMode: true,
      colors: {
        accent: void 0,
        complementary: void 0
      }
    };
    this._state = (0, import_state.getState)();
    this._theme = import_s_theme.default.getCurrentTheme();
  }
  async firstUpdated() {
    const $mainColorPicker = this.querySelector("#setting-main-color");
    const $accentColorPicker = this.querySelector("#setting-accent-color");
    const $complementaryColorPicker = this.querySelector("#setting-complementary-color");
    $mainColorPicker.addEventListener("change", (e) => {
      this._theme.setColor("main", e.detail.hex);
    });
    $accentColorPicker.addEventListener("change", (e) => {
      this._theme.setColor("accent", e.detail.hex);
    });
    $complementaryColorPicker.addEventListener("change", (e) => {
      console.log("com", e.detail.hex);
      this._theme.setColor("complementary", e.detail.hex);
    });
  }
  toggleMode(dark) {
    this._state.darkMode = dark;
    if (dark) {
      this._theme = import_s_theme.default.setThemeVariant("dark");
    } else {
      this._theme = import_s_theme.default.setThemeVariant("light");
    }
    (0, import_state.setState)(this._state);
  }
  render() {
    return import_lit.html`
            <div class="ck-settings">
                <div class="s-p:40 s-mbe:40">
                    <h1 class="s-typo:h3 s-mbe:40">Settings</h1>
                    <p class="s-typo:p">
                        These settings allows you to customize your Coffeekraken
                        experience as well as feature some of the capabilities
                        that our toolkit has to offer.
                    </p>
                </div>

                <ul class="__settings s-bg:odd">
                    <li class="s-bg:main-surface">
                        <label
                            class="s-label s-pi:40 s-pb:30"
                            for="theme-switcher"
                        >
                            Dark mode
                            <input
                                class="s-switch"
                                type="checkbox"
                                id="theme-switcher"
                                ?checked="${this._state.darkMode}"
                                @change="${(e) => {
      this.toggleMode(e.target.checked);
    }}"
                            />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label
                            class="s-label s-pi:40 s-pb:30"
                            for="setting-main-color"
                        >
                            Main color
                            <s-color-picker id="setting-main-color">
                                <input
                                    type="text"
                                    class="s-input"
                                    value="${this._theme.getColor("main").toHex()}"
                                />
                            </s-color-picker>
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label
                            class="s-label s-pi:40 s-pb:30"
                            for="setting-accent-color"
                        >
                            Accent color
                            <s-color-picker id="setting-accent-color">
                                <input
                                    type="text"
                                    class="s-input"
                                    value="${this._theme.getColor("accent").toHex()}"
                                />
                            </s-color-picker>
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label
                            class="s-label s-pi:40 s-pb:30"
                            for="setting-complementary-color"
                        >
                            Complementary color
                            <s-color-picker id="setting-complementary-color">
                                <input
                                    type="text"
                                    class="s-input"
                                    value="${this._theme.getColor("complementary").toHex()}"
                                />
                            </s-color-picker>
                        </label>
                    </li>
                </ul>
            </div>
        `;
  }
}
function define(props = {}, tagName = "ck-settings") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, CkSettings);
}
