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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importStar(require("@coffeekraken/s-lit-component"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class CkSettings extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
        this._theme = s_theme_1.default.getCurrentTheme();
        s_theme_1.default.whenLodChange((e) => {
            // console.log('CHANGe', e.detail);
        });
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface();
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
        s_theme_1.default.setLod(level);
    }
    render() {
        return (0, s_lit_component_1.html) `
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
                                    value=${s_theme_1.default.lod - 1}
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
exports.default = CkSettings;
CkSettings.state = {};
function define(props = {}, tagName = 'ck-settings') {
    s_lit_component_1.default.define(tagName, CkSettings, Object.assign({ id: 'ck-settings' }, props));
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLGlGQUFzRTtBQUN0RSxvRUFBNkM7QUFFN0MsTUFBcUIsVUFBVyxTQUFRLHlCQUFlO0lBU25EO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBWFAsV0FBTSxHQUFHLGlCQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFhaEMsaUJBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QixtQ0FBbUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBZEQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDckQsQ0FBQztJQWNLLFlBQVk7O1lBQ2QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdkUsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNoRCw4QkFBOEIsQ0FDakMsQ0FBQztZQUNGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVoRSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENB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