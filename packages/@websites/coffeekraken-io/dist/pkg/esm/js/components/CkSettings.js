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
import __SLitComponent, { html } from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
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
                        These settings allows you to customize your Coffeekraken
                        experience as well as feature some of the capabilities
                        that our toolkit has to offer.
                    </p>
                </div>

                <form>
                    <ul class="_settings s-bg:odd">
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
                                    max="3"
                                    value=${__STheme.lod - 1}
                                    values='["Low","Medium","High","Extrem"]'
                                    tooltip
                                    step="1"
                                    @change=${(e) => {
            this._setLod(parseInt(e.target.value) + 1);
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
                                            value="${this._theme
            .getColor('base')
            .toHex()}"
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
                                            value="${this._theme
            .getColor('main')
            .toHex()}"
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
                                            value="${this._theme
            .getColor('accent')
            .toHex()}"
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
                                <s-color-picker
                                    id="setting-complementary-color"
                                >
                                    <div class="s-group">
                                        <input
                                            type="text"
                                            class="s-input"
                                            value="${this._theme
            .getColor('complementary')
            .toHex()}"
                                        />
                                        <button
                                            class="s-btn s-color:complementary"
                                        >
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFTbkQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFYUCxXQUFNLEdBQUcsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBYWhDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QixtQ0FBbUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBZEQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBY0ssWUFBWTs7WUFDZCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuRSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuRSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN2RSxNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQ2hELDhCQUE4QixDQUNqQyxDQUFDO1lBQ0YsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRWhFLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxD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