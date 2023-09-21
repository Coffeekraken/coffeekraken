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
import __SFront from '@coffeekraken/s-front';
import __SLitComponent, { html } from '@coffeekraken/s-lit-component';
import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';
__SThemeSwitcherComponentDefine();
export default class CkSettings extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }
    constructor() {
        super({
            shadowDom: false,
        });
        this._front = __SFront.instance;
        document.addEventListener('s-front.legal.change', () => {
            this.requestUpdate();
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $mainColorPicker = this.querySelector('#setting-main-color');
            const $accentColorPicker = this.querySelector('#setting-accent-color');
            const $complementaryColorPicker = this.querySelector('#setting-complementary-color');
            const $fontSizeRange = this.querySelector('#setting-font-size');
            $mainColorPicker.addEventListener('s-color-picker.change', (e) => {
                this._front.theme.setColor('main', e.detail.hex);
            });
            $accentColorPicker.addEventListener('s-color-picker.change', (e) => {
                this._front.theme.setColor('accent', e.detail.hex);
            });
            $complementaryColorPicker.addEventListener('s-color-picker.change', (e) => {
                this._front.theme.setColor('complementary', e.detail.hex);
            });
            $fontSizeRange.addEventListener('change', (e) => {
                this._front.theme.set('scale.default', `${e.target.value}`);
            });
        });
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    _setLod(level) {
        this._front.setWireframe(level <= 0);
        this._front.setLod(level);
        this.requestUpdate();
    }
    render() {
        return html `
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
                class="s-label:responsive s-pi:50 s-pbs:30 @mobile s-pi:40"
                for="setting-font-size"
              >
                <span>Level of details</span>
                <s-range
                  class="s-color:accent"
                  id="setting-lod"
                  min="0"
                  max="3"
                  value=${this._front.lod.level}
                  values='["Bare","Look and feel","Theme","High"]'
                  tooltip
                  step="1"
                  @change=${(e) => this._setLod(parseInt(e.target.value))}
                >
                </s-range>
              </label>
              <div class="s-flex s-text:right s-pi:50 s-pb:30 @mobile s-pi:40">
                <div class="s-flex-item:grow"></div>
                ${this._front.lod.level === 0
            ? html `
                              <p class="s-typo:p s-font:25">
                                  The
                                  <span class="s-typo:code">bare</span> level
                                  contains everything about positions, sizes,
                                  etc... It allows you to have a functional UI
                                  without the visual styling.
                              </p>
                          `
            : this._front.lod.level === 1
                ? html `
                              <p class="s-typo:p s-font:25">
                                  The <span class="s-typo:code">lnf</span> level
                                  contains the basic look and feel provided by
                                  Coffeekraken. It's usually a good starting
                                  point for most of your projects and everything
                                  can be customized.
                              </p>
                          `
                : this._front.lod.level === 2
                    ? html `
                              <p class="s-typo:p s-font:25">
                                  The
                                  <span class="s-typo:code">theme</span> level
                                  contains everything that is custom to this
                                  particular website.
                              </p>
                          `
                    : this._front.lod.level === 3
                        ? html `
                              <p class="s-typo:p s-font:25">
                                  The
                                  <span class="s-typo:code">high</span> level
                                  can be used to activate heavy things only for
                                  high performant systems. It can be CSS stuffs
                                  using the mixin
                                  <span class="s-typo:code"
                                      >@sugar.lod high { ... }</span
                                  >
                                  or even JS components/features.
                              </p>
                          `
                        : ''}
              </div>
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
                    Legals condition agreement&nbsp;&nbsp;${this._front.isLegalAgree()
            ? html `
                                  <span class="s-badge s-color:success">
                                      Agreed
                                  </span>
                              `
            : html `
                                  <span class="s-badge s-color:error">
                                      Disagreed
                                  </span>
                              `}
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
CkSettings.state = {};
export function define(props = {}, tagName = 'ck-settings') {
    __SLitComponent.define(tagName, CkSettings, Object.assign({ id: 'ck-settings' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLElBQUksK0JBQStCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUVyRywrQkFBK0IsRUFBRSxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFHbkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBSUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFYUCxXQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQWF2QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1lBQ25ELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxZQUFZOztZQUNkLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsOEJBQThCLENBQ2pDLENBQUM7WUFFRixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFaEUsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFB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