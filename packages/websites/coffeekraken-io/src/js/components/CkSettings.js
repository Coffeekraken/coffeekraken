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
import { html } from 'lit';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import { setState, getState } from '../state/state';
export default class CkSettings extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._settings = {
            darkMode: true,
            colors: {
                accent: undefined,
                complementary: undefined,
            },
        };
        this._state = getState();
        this._theme = __STheme.getCurrentTheme();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $mainColorPicker = this.querySelector('#setting-main-color');
            const $accentColorPicker = this.querySelector('#setting-accent-color');
            const $complementaryColorPicker = this.querySelector('#setting-complementary-color');
            $mainColorPicker.addEventListener('change', (e) => {
                this._theme.setColor('main', e.detail.hex);
            });
            $accentColorPicker.addEventListener('change', (e) => {
                this._theme.setColor('accent', e.detail.hex);
            });
            $complementaryColorPicker.addEventListener('change', (e) => {
                console.log('com', e.detail.hex);
                this._theme.setColor('complementary', e.detail.hex);
            });
        });
    }
    // _restoreState() {
    //     const state = getState();
    // }
    toggleMode(dark) {
        this._state.darkMode = dark;
        if (dark) {
            this._theme = __STheme.setTheme('default', 'dark');
        }
        else {
            this._theme = __STheme.setTheme('default', 'light');
        }
        setState(this._state);
    }
    // _saveState() {
    //     setState({
    //         ...this._settings,
    //     });
    // }
    render() {
        return html `
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
                                    value="${this._theme.color('main').toHex()}"
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
                                    value="${this._theme
            .color('accent')
            .toHex()}"
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
                                    value="${this._theme
            .color('complementary')
            .toHex()}"
                                />
                            </s-color-picker>
                        </label>
                    </li>
                </ul>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 'ck-settings') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CkSettings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNrU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBU25EO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBYlAsY0FBUyxHQUFHO1lBQ1IsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLGFBQWEsRUFBRSxTQUFTO2FBQzNCO1NBQ0osQ0FBQztRQVFFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVLLFlBQVk7O1lBQ2QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdkUsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNoRCw4QkFBOEIsQ0FDakMsQ0FBQztZQUVGLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNILGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztZQUNILHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVELG9CQUFvQjtJQUNwQixnQ0FBZ0M7SUFDaEMsSUFBSTtJQUVKLFVBQVUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN2RDtRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsNkJBQTZCO0lBQzdCLFVBQVU7SUFDVixJQUFJO0lBQ0osTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRDQXNCeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFROzJDQUNyQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7Ozs7Ozs7Ozs7Ozs7OzZDQWNZLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRTs7Ozs7Ozs7Ozs7Ozs7OzZDQWVqQyxJQUFJLENBQUMsTUFBTTthQUNmLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixLQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs2Q0FlSCxJQUFJLENBQUMsTUFBTTthQUNmLEtBQUssQ0FBQyxlQUFlLENBQUM7YUFDdEIsS0FBSyxFQUFFOzs7Ozs7O1NBT3ZDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxhQUFhO0lBQzNELGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLENBQUMifQ==