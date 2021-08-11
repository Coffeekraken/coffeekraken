import __SRequest from '@coffeekraken/s-request';
import { html, LitElement, property } from 'lit-element';
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

    constructor() {
        super();
        (async () => {
            this._currentVersion = await getCurrentVersion();
        })();

        this._restoreState();

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
                    <li class="s-flex s-bg:main-surface s-p:20">
                        <label class="s-flex-item:grow" for="theme-switcher">
                            Dark mode
                        </label>
                        <label for="theme-switcher" class="s-switch:accent">
                            <input type="checkbox" id="theme-switcher" ?checked="${this._settings.darkMode}" @change="${ (e) => {
                                this.setDarkMode(e.target.checked);
                            } }" />
                            <div class="s-switch-handler"></div>
                            <script>
                            </script>
                        </label>
                    </li>
                    <li class="s-flex s-bg:main-surface s-p:20">
                        <label class="s-flex-item:grow" for="setting-accent-color">
                            Accent color
                        </label>
                        <label for="setting-accent-color">
                            <s-color-picker color="#ff0000" />
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