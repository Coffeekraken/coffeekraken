import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import { css, html, unsafeCSS } from 'lit';
import __SThemeSwitcherComponentInterface from './interface/SThemeSwitcherComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-theme-switcher.css'; // relative to /dist/pkg/esm/js

export interface ISThemeSwitcherComponentProps {
    darkModeIcon: boolean;
    darkModeIconClass: string;
}

/**
 * @name                SThemeSwitcherComponent
 * @as                  Theme switcher
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SThemeSwitcherComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-theme-switcher
 * @platform            html
 * @status              beta
 *
 * This component represent a simple theme-switcher that allows you to switch between light and dark mode easily as well as choosing between
 * all of your themes if you have more than 1 available...
 *
 * @feature           Switch between light and dark mode
 * @feaute            Switch between multiple theme if more than 1 are available
 *
 * @event             s-theme-switcher.change            Dispatched when the theme has been changed
 * @event           s-theme-switcher                       Dispatched for every events of this component. Check the detail.eventType prop for event type
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-theme-switcher-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-theme-switcher-component';
 * define();
 *
 * @example         html        Simple dark mode switcher
 * <s-theme-switcher></s-theme-switcher>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SThemeSwitcherComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.createProperties(
            {},
            __SThemeSwitcherComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    _themes;

    constructor() {
        super({
            name: 's-theme-switcher',
            interface: __SThemeSwitcherComponentInterface,
        });

        this._themes = __STheme.themes;
        // this._themes['coco'] = this._themes.default;
        // this._themes['plop'] = this._themes.default;
    }

    _toggleDarkMode(): void {
        if (__STheme.isDark()) {
            __STheme.setThemeVariant('light');
        } else {
            __STheme.setThemeVariant('dark');
        }

        this.componentUtils.dispatchEvent('change', {
            detail: __STheme,
        });

        this.requestUpdate();
    }

    _setTheme(theme: string): void {
        __STheme.setTheme(theme);
        this.requestUpdate();
    }

    render() {
        const themesKeys = Object.keys(this._themes),
            themeMetas = __STheme.getThemeMetas(),
            activeTheme = __STheme.theme;

        return html`
            <div class="${this.componentUtils.className('__root')}">
                ${themesKeys.length === 1
                    ? html`
                          <input
                              type="checkbox"
                              @change=${() => this._toggleDarkMode()}
                              class="${this.componentUtils.className(
                                  '__switch',
                                  's-switch',
                              )}"
                              ?checked=${__STheme.isDark()}
                          />
                          ${this.props.darkModeIcon
                              ? html`
                                    <i
                                        class="${this.componentUtils.className(
                                            '__icon',
                                        )} ${this.props.darkModeIconClass}"
                                    ></i>
                                `
                              : ''}
                      `
                    : html`
                          <div
                              class="${this.componentUtils.className(
                                  '__dropdown-container',
                              )} s-dropdown-container"
                              tabindex="0"
                          >
                              <span class="s-typo:p">
                                  ${themeMetas.title} (${themeMetas.variant})
                              </span>
                              <div
                                  class="${this.componentUtils.className(
                                      '__dropdown',
                                  )} s-dropdown"
                              >
                                  ${themesKeys.map((theme) => {
                                      const themeObj = this._themes[theme];
                                      return html`
                                          <div
                                              class="${this.componentUtils.className(
                                                  '__dropdown-item',
                                                  's-dropdown-item',
                                              )} ${activeTheme === theme
                                                  ? 'active'
                                                  : ''}"
                                              @click=${(e) => {
                                                  e.preventDefault();
                                                  this._setTheme(theme);
                                              }}
                                          >
                                              <div
                                                  class="${this.componentUtils.className(
                                                      '__theme-name',
                                                  )}"
                                              >
                                                  ${themeObj.metas.title}
                                              </div>
                                              <div
                                                  class="${this.componentUtils.className(
                                                      '__dark-mode',
                                                  )} ${activeTheme === theme
                                                      ? 'visible'
                                                      : ''}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${(e) => {
                                                          e.stopPropagation();
                                                          this._toggleDarkMode();
                                                      }}
                                                      class="${this.componentUtils.className(
                                                          '__switch',
                                                          's-switch',
                                                      )}"
                                                      ?checked=${__STheme.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon
                                                      ? html`
                                                            <i
                                                                class="${this.componentUtils.className(
                                                                    '__icon',
                                                                )} ${this.props
                                                                    .darkModeIconClass}"
                                                            ></i>
                                                        `
                                                      : ''}
                                              </div>
                                          </div>
                                      `;
                                  })}
                              </div>
                          </div>
                      `}
            </div>
        `;
    }
}

export function define(
    props: Partial<ISThemeSwitcherComponentProps> = {},
    tagName = 's-theme-switcher',
) {
    __SLitComponent.define(SThemeSwitcherComponent, props, tagName);

    // __SLitComponent.setDefaultProps(tagName, props);
    // // @ts-ignore
    // customElements.define(tagName, SThemeSwitcherComponent);
}
