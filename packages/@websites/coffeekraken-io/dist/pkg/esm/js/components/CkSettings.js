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
import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import { html } from 'lit';
export default class CkSettings extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
        this._theme = __STheme.getCurrentTheme();
        __STheme.whenLodChange((e) => {
            // console.log('CHANGe', e.detail);
        });
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $baseColorPicker = this.querySelector('#setting-base-color');
            const $mainColorPicker = this.querySelector('#setting-main-color');
            const $accentColorPicker = this.querySelector('#setting-accent-color');
            const $complementaryColorPicker = this.querySelector('#setting-complementary-color');
            const $fontSizeRange = this.querySelector('#setting-font-size');
            $baseColorPicker.addEventListener('s-color-picker.change', (e) => {
                this._theme.setColor('base', e.detail.hex);
            });
            $mainColorPicker.addEventListener('s-color-picker.change', (e) => {
                this._theme.setColor('main', e.detail.hex);
            });
            $accentColorPicker.addEventListener('s-color-picker.change', (e) => {
                this._theme.setColor('accent', e.detail.hex);
            });
            $complementaryColorPicker.addEventListener('s-color-picker.change', (e) => {
                this._theme.setColor('complementary', e.detail.hex);
            });
            $fontSizeRange.addEventListener('change', (e) => {
                this._theme.set('scale.default', `${e.target.value}`);
            });
        });
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    _setLod(level) {
        __STheme.setLod(level);
    }
    render() {
        return html `
      <div s-deps css="ckSettings">
        <div class="s-p:50 s-mbe:40 @mobile s-p:40 s-mbe:10">
          <h1 class="s-typo:h3 s-mbe:40 @mobile s-mbe:0">Settings</h1>
          <p class="s-typo:p @mobile s-hide">
            These settings allows you to customize your Coffeekraken experience
            as well as feature some of the capabilities that our toolkit has to
            offer.
          </p>
        </div>

        <form>
          <ul class="__settings s-bg:odd">
            <!-- <li class="s-bg:main-surface">
                            <label
                                class="s-label s-pi:50 s-pb:30 @mobile s-pi:40"
                            >
                                <span> Dark mode </span>
                                <s-theme-switcher
                                    class="s-color:accent"
                                ></s-theme-switcher>
                            </label>
                        </li> -->
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
                  max="4"
                  value=${__STheme.lod}
                  values='["Bare","Low","Medium","High","Extrem"]'
                  tooltip
                  step="1"
                  @change=${(e) => {
            this._setLod(e.target.value);
        }}
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
                      value="${this._theme.getColor('base').toHex()}"
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
                      value="${this._theme.getColor('main').toHex()}"
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
                      value="${this._theme.getColor('accent').toHex()}"
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
                      value="${this._theme.getColor('complementary').toHex()}"
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
                class="s-label s-pi:50 s-pb:30 @mobile s-pi:40"
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
CkSettings.state = {};
export function define(props = {}, tagName = 'ck-settings') {
    __SLitComponent.define(tagName, CkSettings, Object.assign({ id: 'ck-settings' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFTckQ7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFYTCxXQUFNLEdBQUcsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBYWxDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMzQixtQ0FBbUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBZEQsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBY0ssWUFBWTs7WUFDaEIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdkUsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNsRCw4QkFBOEIsQ0FDL0IsQ0FBQztZQUNGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVoRSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMvRCxJQUFJ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