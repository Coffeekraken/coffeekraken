// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import { html } from 'lit';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import __STheme from '@coffeekraken/s-theme';

import { setState, getState } from '../state/state';

export default class CkSettings extends __SLitComponent {
    _settings = {
        darkMode: true,
        colors: {
            accent: undefined,
            complementary: undefined,
        },
    };

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._state = getState();
        this._theme = __STheme.getCurrentTheme();
    }

    async firstUpdated() {
        const $mainColorPicker = this.querySelector('#setting-main-color');
        const $accentColorPicker = this.querySelector('#setting-accent-color');
        const $complementaryColorPicker = this.querySelector(
            '#setting-complementary-color',
        );
        const $fontSizeRange = this.querySelector('#setting-font-size');

        $mainColorPicker.addEventListener('change', (e) => {
            this._theme.setColor('main', e.detail.hex);
        });
        $accentColorPicker.addEventListener('change', (e) => {
            this._theme.setColor('accent', e.detail.hex);
        });
        $complementaryColorPicker.addEventListener('change', (e) => {
            this._theme.setColor('complementary', e.detail.hex);
        });
        $fontSizeRange.addEventListener('change', (e) => {
            this._theme.set('scale.default', `${e.target.value}`);
        });

        // setTimeout(() => {
        //     this._theme.set('padding.default', '8rem');
        // }, 3000);
    }

    toggleMode(dark) {
        this._state.darkMode = dark;

        if (dark) {
            this._theme = __STheme.setThemeVariant('dark');
        } else {
            this._theme = __STheme.setThemeVariant('light');
        }
        setState(this._state);
    }
    render() {
        return html`
            <div class="ck-settings">
                <div class="s-p:40 s-mbe:40">
                    <h1 class="s-typo:h3 s-mbe:40">Settings</h1>
                    <p class="s-typo:p">
                        These settings allows you to customize your Coffeekraken
                        experience as well as feature some of the capabilities
                        that our toolkit has to offer.
                    </p>
                </div>

                <form>
                    <ul class="__settings s-bg:odd">
                        <li class="s-bg:main-surface">
                            <label
                                class="s-label s-pi:40 s-pb:30"
                                for="theme-switcher"
                            >
                                Dark mode
                                <input
                                    class="s-switch s-color:accent"
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
                                        value="${this._theme
                                            .getColor('main')
                                            .toHex()}"
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
                                            .getColor('accent')
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
                                <s-color-picker
                                    id="setting-complementary-color"
                                >
                                    <input
                                        type="text"
                                        class="s-input"
                                        value="${this._theme
                                            .getColor('complementary')
                                            .toHex()}"
                                    />
                                </s-color-picker>
                            </label>
                        </li>
                        <li class="s-bg:main-surface">
                            <label
                                class="s-label s-pi:40 s-pb:30"
                                for="setting-font-size"
                            >
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
                                class="s-label s-pi:40 s-pb:30"
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

export function define(props: any = {}, tagName = 'ck-settings') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CkSettings);
}
