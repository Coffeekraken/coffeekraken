// @ts-nocheck

import __SFront from '@coffeekraken/s-front';
import __SLitComponent, { html } from '@coffeekraken/s-lit-component';
import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';

__SThemeSwitcherComponentDefine();

export default class CkSettings extends __SLitComponent {
    _front = __SFront.instance;

    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }

    static state = {};

    constructor() {
        super({
            shadowDom: false,
        });

        document.addEventListener('s-front.legal.change', () => {
            this.requestUpdate();
        });
    }

    async firstUpdated() {
        const $baseColorPicker = this.querySelector('#setting-base-color');
        const $mainColorPicker = this.querySelector('#setting-main-color');
        const $accentColorPicker = this.querySelector('#setting-accent-color');
        const $complementaryColorPicker = this.querySelector(
            '#setting-complementary-color',
        );

        const $fontSizeRange = this.querySelector('#setting-font-size');

        $baseColorPicker.addEventListener('s-color-picker.change', (e) => {
            this._front.theme.setColor('base', e.detail.hex);
        });
        $mainColorPicker.addEventListener('s-color-picker.change', (e) => {
            this._front.theme.setColor('main', e.detail.hex);
        });
        $accentColorPicker.addEventListener('s-color-picker.change', (e) => {
            this._front.theme.setColor('accent', e.detail.hex);
        });
        $complementaryColorPicker.addEventListener(
            's-color-picker.change',
            (e) => {
                this._front.theme.setColor('complementary', e.detail.hex);
            },
        );
        $fontSizeRange.addEventListener('change', (e) => {
            this._front.theme.set('scale.default', `${e.target.value}`);
        });
    }

    async mount() {}

    _setLod(level: number) {
        this._front.setLod(level);
    }

    render() {
        return html`
      <div s-deps css="ckSettings">
        <div class="s-p:50 s-mbe:40 @mobile s-p:40 s-mbe:10">
          <h1 class="s-typo:h3 s-gradient:text:accent s-mbe:40 @mobile s-mbe:0">Settings</h1>
          <p class="s-typo:p @mobile s-hide">
            These settings allows you to customize your Coffeekraken experience
            as well as feature some of the capabilities that our toolkit has to
            offer.
          </p>
        </div>

        <form>
          <ul class="_settings s-bg:odd">
            <li class="s-bg:main-surface">
                            <label
                                class="s-label s-pi:50 s-pb:30 @mobile s-pi:40"
                            >
                                <span> Dark mode </span>
                                <div>
                                  <i class="s-icon:dark-mode s-mie:20"></i>
                                  <s-theme-switcher
                                      class="s-color:accent"
                                  ></s-theme-switcher>
                                </div>
                            </label>
                        </li>
            <li class="s-bg:main-surface">
              <label
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
                for="setting-font-size"
              >
                <span>Level of details</span>
                <s-range
                  class="s-color:accent"
                  id="setting-lod"
                  min="0"
                  max="2"
                  value=${this._front.lod.level - 2}
                  values='["Low","Medium","High"]'
                  tooltip
                  step="1"
                  @change=${(e) => this._setLod(parseInt(e.target.value) + 2)}
                >
                </s-range>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
                for="setting-base-color"
              >
                <span> Base color </span>
                <s-color-picker id="setting-base-color">
                  <div class="s-group">
                    <input
                      type="text"
                      class="s-input"
                      value="${this._front.theme.getColor('base').toHex()}"
                    />
                    <button class="s-btn s-color:base">
                      <i class="s-icon:color"></i>
                    </button>
                  </div>
                </s-color-picker>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
                for="setting-main-color"
              >
                <span> Main color </span>
                <s-color-picker id="setting-main-color">
                  <div class="s-group">
                    <input
                      type="text"
                      class="s-input"
                      value="${this._front.theme.getColor('main').toHex()}"
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
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
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
                      value="${this._front.theme.getColor('accent').toHex()}"
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
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
                for="setting-complementary-color"
              >
                <span> Complementary color </span>
                <s-color-picker id="setting-complementary-color">
                  <div class="s-group">
                    <input
                      type="text"
                      class="s-input"
                      value="${this._front.theme
                          .getColor('complementary')
                          .toHex()}"
                    />
                    <button class="s-btn s-color:complementary">
                      <i class="s-icon:color"></i>
                    </button>
                  </div>
                </s-color-picker>
              </label>
            </li>
            <li class="s-bg:main-surface">
              <label
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
                for="setting-font-size"
              >
                <span>Document scale</span>
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
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
                for="setting-complementary-color"
              >
                <span>Restore default settings!</span>
                <button
                  type="reset"
                  class="s-btn s-color:accent"
                  @click=${() => {
                      this._front.theme.clear();
                  }}
                >
                  Restore!
                </button>
              </label>
              <li class="s-bg:main-surface">
              <label
                class="s-label:responsive s-pi:50 s-pb:30 @mobile s-pi:40"
                for="setting-complementary-color"
              >
                <span>
                    Legals condition agreement&nbsp;&nbsp;${
                        this._front.isLegalAgree()
                            ? html`
                                  <span class="s-badge s-color:success">
                                      Agreed
                                  </span>
                              `
                            : html`
                                  <span class="s-badge s-color:error">
                                      Disagreed
                                  </span>
                              `
                    }
                </span>
                    <button
                    type="reset"
                    class="s-btn s-color:complementary"
                    @click=${() => {
                        document.querySelector('#legal').activate();
                    }}
                    >

                    Review conditions
                    </button>
              </label>
            </li>
            </li>
          </ul>
        </form>
      </div>
    `;
    }
}

export function define(props: any = {}, tagName = 'ck-settings') {
    __SLitComponent.define(tagName, CkSettings, {
        id: 'ck-settings',
        ...props,
    });
}
