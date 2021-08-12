import __SRequest from '@coffeekraken/s-request';
import { html, LitElement, property, query, queryAsync } from 'lit-element';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';

import { loadDocmap, getCurrentVersion, setState, getState } from '../state/state';

export default class CkSettings extends LitElement {

    _settings = {
        darkMode: true,
        colors: {
            accent: undefined,
            complementary: undefined
        }
    };

    @queryAsync('#setting-main-color')
    _$mainColorPicker;
    
    @queryAsync('#setting-accent-color')
    _$accentColorPicker;

    constructor() {
        super();
        (async () => {
            this._currentVersion = await getCurrentVersion();
        })();

        this._restoreState();

    }

    async firstUpdated() {

        const $root = document.querySelector(':root'),
                $darkRoot = document.querySelector('.s-theme--dark'),
                $theme = $darkRoot ?? $root;

        const $mainColorPicker = await this._$mainColorPicker;
        const $accentColorPicker = await this._$accentColorPicker;

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
    }

    _restoreState() {
        const state = getState();
        this.setDarkMode(state.darkMode);
    }
    _saveState() {
        setState({
            ...this._settings
        });
    }

    setDarkMode(mode) {
        this._settings.darkMode = mode;
        if (mode) {
            document.body.classList.add('s-theme--dark');
        } else {
            document.body.classList.remove('s-theme--dark');
        }
        this._saveState();
    }

    createRenderRoot() {
        return this;
    }
    render() {
        return html`
            <div class="s-p:10">
                <ul class="__settings s-bg:odd">
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="theme-switcher">
                            Dark mode
                            <input class="s-switch" type="checkbox" id="theme-switcher" ?checked="${this._settings.darkMode}" @change="${ (e) => {
                                this.setDarkMode(e.target.checked);
                            } }" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-main-color">
                            Main color
                            <s-color-picker id="setting-main-color" color="#ff0000" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Accent color
                            <s-color-picker id="setting-accent-color" color="#ff0000" />
                        </label>
                    </li>
                    <li class="s-bg:main-surface">
                        <label class="s-label s-p:20" for="setting-accent-color">
                            Complementary color
                            <s-color-picker id="setting-complementary-color" color="#ff0000" />
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

export function webcomponent(tagName = 'ck-settings') {
    customElements.define(tagName, CkSettings);
}