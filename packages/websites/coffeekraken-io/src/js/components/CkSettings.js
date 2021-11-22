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
        // (async () => {
        //     this._currentVersion = await getCurrentVersion();
        // })();
        console.log('theme', __STheme.getTheme());
        this._restoreState();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $root = document.querySelector(':root'), $darkRoot = document.querySelector('.s-theme--coffeekrakenDark'), $theme = ($darkRoot !== null && $darkRoot !== void 0 ? $darkRoot : $root);
            const $mainColorPicker = this.querySelector('#setting-main-color');
            const $accentColorPicker = this.querySelector('#setting-accent-color');
            $mainColorPicker.addEventListener('change', (e) => {
                $theme.style.setProperty('--s-theme-color-main-h', e.detail.hsla.h);
                $theme.style.setProperty('--s-theme-color-main-s', e.detail.hsla.s);
                $theme.style.setProperty('--s-theme-color-main-l', e.detail.hsla.l);
            });
            $accentColorPicker.addEventListener('change', (e) => {
                $theme.style.setProperty('--s-theme-color-accent-h', e.detail.hsla.h);
                $theme.style.setProperty('--s-theme-color-accent-s', e.detail.hsla.s);
                $theme.style.setProperty('--s-theme-color-accent-l', e.detail.hsla.l);
            });
        });
    }
    _restoreState() {
        const state = getState();
        this.setDarkMode(state.darkMode);
    }
    _saveState() {
        setState(Object.assign({}, this._settings));
    }
    setDarkMode(mode) {
        this._settings.darkMode = mode;
        if (mode) {
            document.body.classList.add('s-theme--coffeekraken-dark');
        }
        else {
            document.body.classList.remove('s-theme--coffeekraken-dark');
        }
        this._saveState();
    }
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
                                ?checked="${this._settings.darkMode}"
                                @change="${(e) => {
            this.setDarkMode(e.target.checked);
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
                            <s-color-picker
                                id="setting-main-color"
                                value="#ff0000"
                            />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label
                            class="s-label s-pi:40 s-pb:30"
                            for="setting-accent-color"
                        >
                            Accent color
                            <s-color-picker
                                id="setting-accent-color"
                                value="#ff0000"
                            />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label
                            class="s-label s-pi:40 s-pb:30"
                            for="setting-accent-color"
                        >
                            Complementary color
                            <s-color-picker
                                id="setting-complementary-color"
                                value="#ff0000"
                            />
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNrU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFjLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBU25EO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBYlAsY0FBUyxHQUFHO1lBQ1IsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLGFBQWEsRUFBRSxTQUFTO2FBQzNCO1NBQ0osQ0FBQztRQVFFLGlCQUFpQjtRQUNqQix3REFBd0Q7UUFDeEQsUUFBUTtRQUVSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUssWUFBWTs7WUFDZCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUN6QyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxFQUNoRSxNQUFNLEdBQWdCLENBQUMsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksS0FBSyxDQUFDLENBQUM7WUFFL0MsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkUsTUFBTSxr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