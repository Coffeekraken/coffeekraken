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
        this.state = state_1.default.define('ck-settings', {
            darkMode: false,
        });
        console.log('SETTIN');
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
    render() {
        return (0, lit_1.html) `
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
function define(props = {}, tagName = 'ck-settings') {
    s_lit_component_1.default.define(tagName, CkSettings, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsb0VBQTZDO0FBQzdDLDZCQUEyQjtBQUUzQiwyREFBcUM7QUFFckMsTUFBcUIsVUFBVyxTQUFRLHlCQUFlO0lBa0JuRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQXBCUCxjQUFTLEdBQUc7WUFDUixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsU0FBUztnQkFDakIsYUFBYSxFQUFFLFNBQVM7YUFDM0I7U0FDSixDQUFDO1FBRUYsV0FBTSxHQUFHLGlCQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDcEMsVUFBSyxHQUFHLGVBQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ2xDLFFBQVEsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQVVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQVRELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFTSyxZQUFZOztZQUNkLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsOEJBQThCLENBQ2pDLENBQUM7WUFDRixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFaEUsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNILGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDO1lBQ0gseUJBQXlCLENBQUMsZ0JBQWdCLENBQ3RDLHVCQUF1QixFQUN2QixDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FDSixDQUFDO1lBQ0YsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFrQ2tDLElBQUksQ0FBQyxNQUFNO2FBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQzthQUNoQixLQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQW9CSCxJQUFJLENBQUMsTUFBTTthQUNmLFFBQVEsQ0FBQyxNQUFNLENBQUM7YUFDaEIsS0FBSyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREF1QkgsSUFBSSxDQUFDLE1BQU07YUFDZixRQUFRLENBQUMsUUFBUSxDQUFDO2FBQ2xCLEtBQUssRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFzQkgsSUFBSSxDQUFDLE1BQU07YUFDZixRQUFRLENBQUMsZUFBZSxDQUFDO2FBQ3pCLEtBQUssRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkNBc0NYLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7Ozs7Ozs7O1NBUzVCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFyTkQsNkJBcU5DO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxhQUFhO0lBQzNELHlCQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUZELHdCQUVDIn0=