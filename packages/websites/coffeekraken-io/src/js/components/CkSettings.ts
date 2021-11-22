// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import { html } from 'lit';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import __STheme from '@coffeekraken/s-theme';

import { loadDocmap, setState, getState } from '../state/state';

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
        // (async () => {
        //     this._currentVersion = await getCurrentVersion();
        // })();

        console.log('theme', __STheme.getTheme());

        this._restoreState();
    }

    async firstUpdated() {
        const $root = document.querySelector(':root'),
            $darkRoot = document.querySelector('.s-theme--coffeekrakenDark'),
            $theme = <HTMLElement>($darkRoot ?? $root);

        const $mainColorPicker = this.querySelector('#setting-main-color');
        const $accentColorPicker = this.querySelector('#setting-accent-color');

        $mainColorPicker.addEventListener('change', (e) => {
            $theme.style.setProperty('--s-theme-color-main-h', e.detail.hsla.h);
            $theme.style.setProperty('--s-theme-color-main-s', e.detail.hsla.s);
            $theme.style.setProperty('--s-theme-color-main-l', e.detail.hsla.l);
        });

        $accentColorPicker.addEventListener('change', (e) => {
            $theme.style.setProperty(
                '--s-theme-color-accent-h',
                e.detail.hsla.h,
            );
            $theme.style.setProperty(
                '--s-theme-color-accent-s',
                e.detail.hsla.s,
            );
            $theme.style.setProperty(
                '--s-theme-color-accent-l',
                e.detail.hsla.l,
            );
        });
    }

    _restoreState() {
        const state = getState();
        this.setDarkMode(state.darkMode);
    }
    _saveState() {
        setState({
            ...this._settings,
        });
    }

    setDarkMode(mode) {
        this._settings.darkMode = mode;
        if (mode) {
            document.body.classList.add('s-theme--coffeekraken-dark');
        } else {
            document.body.classList.remove('s-theme--coffeekraken-dark');
        }
        this._saveState();
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

export function define(props: any = {}, tagName = 'ck-settings') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CkSettings);
}
