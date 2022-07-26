// @ts-nocheck

import __SLitComponent from "@coffeekraken/s-lit-component";
import __STheme from "@coffeekraken/s-theme";
import { html } from "lit";

import __state from "../state/state";

export default class CkSettings extends __SLitComponent {
  _settings = {
    darkMode: true,
    colors: {
      accent: undefined,
      complementary: undefined,
    },
  };

  _theme = __STheme.getCurrentTheme();
  state = __state.define("ck-settings", {
    darkMode: false,
  });

  static get properties() {
    return __SLitComponent.createProperties();
  }

  constructor() {
    super({
      shadowDom: false,
    });
  }

  async firstUpdated() {
    const $baseColorPicker = this.querySelector("#setting-base-color");
    const $mainColorPicker = this.querySelector("#setting-main-color");
    const $accentColorPicker = this.querySelector("#setting-accent-color");
    const $complementaryColorPicker = this.querySelector(
      "#setting-complementary-color"
    );
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
  }

  render() {
    return html`
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

export function define(props: any = {}, tagName = "ck-settings") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, CkSettings);
}
