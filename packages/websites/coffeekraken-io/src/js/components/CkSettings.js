// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import { html, queryAsync } from 'lit-element';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { getCurrentVersion, setState, getState } from '../state/state';
export default class CkSettings extends __SLitComponent {
    constructor() {
        super({
            sLitComponent: {
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
        (() => __awaiter(this, void 0, void 0, function* () {
            this._currentVersion = yield getCurrentVersion();
        }))();
        this._restoreState();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $root = document.querySelector(':root'), $darkRoot = document.querySelector('.s-theme--dark'), $theme = ($darkRoot !== null && $darkRoot !== void 0 ? $darkRoot : $root);
            const $mainColorPicker = yield this._$mainColorPicker;
            const $accentColorPicker = yield this._$accentColorPicker;
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
            document.body.classList.add('s-theme--dark');
        }
        else {
            document.body.classList.remove('s-theme--dark');
        }
        this._saveState();
    }
    render() {
        return html `
            <div class="s-p:10">
                <ul class="__settings s-bg:odd">
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="theme-switcher">
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
                        <label class="s-label s-p:20" for="theme-switcher">
                            Dark mode
                            <input
                                class="s-switch s-ui:accent"
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
                        <label class="s-label s-p:20" for="setting-main-color">
                            Main color
                            <s-color-picker id="setting-main-color" value="#ff0000" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Accent color
                            <s-color-picker id="setting-accent-color" value="#ff0000" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Complementary color
                            <s-color-picker id="setting-complementary-color" value="#ff0000" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Spread
                            <s-range
                                name="hello"
                                class="s-range s-ui"
                                id="setting-spread"
                                tooltip
                                min="0"
                                max="100"
                                step="10"
                            ></s-range>
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Spread
                            <s-range
                                name="coco"
                                class="s-ui:accent"
                                id="setting-spread"
                                tooltip
                                min="0"
                                max="100"
                                step="10"
                            ></s-range>
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Spread
                            <input type="text" class="s-input" id="setting-spread" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Spread
                            <input type="text" class="s-input s-ui:accent" id="setting-spread" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Spread
                            <input type="text" class="s-input" id="setting-spread" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Spread
                            <input type="text" class="s-input" id="setting-spread" />
                        </label>
                    </li>
                </ul>
            </div>
        `;
    }
}
__decorate([
    queryAsync('#setting-main-color')
], CkSettings.prototype, "_$mainColorPicker", void 0);
__decorate([
    queryAsync('#setting-accent-color')
], CkSettings.prototype, "_$accentColorPicker", void 0);
export function define(props = {}, tagName = 'ck-settings') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CkSettings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNrU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7OztBQUdkLE9BQU8sRUFBRSxJQUFJLEVBQStCLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1RSxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUc1RCxPQUFPLEVBQWMsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5GLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFlbkQ7UUFDSSxLQUFLLENBQUM7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFuQlAsY0FBUyxHQUFHO1lBQ1IsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLGFBQWEsRUFBRSxTQUFTO2FBQzNCO1NBQ0osQ0FBQztRQWNFLENBQUMsR0FBUyxFQUFFO1lBQ1IsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLGlCQUFpQixFQUFFLENBQUM7UUFDckQsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO1FBRUwsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFSyxZQUFZOztZQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQ3pDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEVBQ3BELE1BQU0sR0FBZ0IsQ0FBQyxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxLQUFLLENBQUMsQ0FBQztZQUUvQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3RELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJ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