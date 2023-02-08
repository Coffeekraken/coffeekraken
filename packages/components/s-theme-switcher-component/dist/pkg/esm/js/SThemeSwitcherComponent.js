import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import { css, html, unsafeCSS } from 'lit';
import __SThemeSwitcherComponentInterface from './interface/SThemeSwitcherComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-theme-switcher.css'; // relative to /dist/pkg/esm/js
import __define from './define';
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
    constructor() {
        super({
            name: 's-theme-switcher',
            interface: __SThemeSwitcherComponentInterface,
        });
        this._themes = __STheme.themes;
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SThemeSwitcherComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    _toggleDarkMode() {
        if (__STheme.isDark()) {
            __STheme.setThemeVariant('light');
        }
        else {
            __STheme.setThemeVariant('dark');
        }
        this.utils.dispatchEvent('change', {
            detail: __STheme,
        });
        this.requestUpdate();
    }
    _setTheme(theme) {
        __STheme.setTheme(theme);
        this.requestUpdate();
    }
    render() {
        const themesKeys = Object.keys(this._themes), themeMetas = __STheme.getThemeMetas(), activeTheme = __STheme.theme;
        return html `
            <div class="${this.utils.cls('_root')}">
                ${themesKeys.length === 1
            ? html `
                          <input
                              type="checkbox"
                              @change=${() => this._toggleDarkMode()}
                              class="${this.utils.cls('_switch', 's-switch')}"
                              ?checked=${__STheme.isDark()}
                          />
                          ${this.props.darkModeIcon
                ? html `
                                    <i
                                        class="${this.utils.cls('_icon')} ${this
                    .props.darkModeIconClass}"
                                    ></i>
                                `
                : ''}
                      `
            : html `
                          <div
                              class="${this.utils.cls('_dropdown-container')} s-dropdown-container"
                              tabindex="0"
                          >
                              <span class="s-typo:p">
                                  ${themeMetas.title} (${themeMetas.variant})
                              </span>
                              <div
                                  class="${this.utils.cls('_dropdown')} s-dropdown"
                              >
                                  ${themesKeys.map((theme) => {
                const themeObj = this._themes[theme];
                return html `
                                          <div
                                              class="${this.utils.cls('_dropdown-item', 's-dropdown-item')} ${activeTheme === theme
                    ? 'active'
                    : ''}"
                                              @click=${(e) => {
                    e.preventDefault();
                    this._setTheme(theme);
                }}
                                          >
                                              <div
                                                  class="${this.utils.cls('_theme-name')}"
                                              >
                                                  ${themeObj.metas.title}
                                              </div>
                                              <div
                                                  class="${this.utils.cls('_dark-mode')} ${activeTheme === theme
                    ? 'visible'
                    : ''}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${(e) => {
                    e.stopPropagation();
                    this._toggleDarkMode();
                }}
                                                      class="${this.utils.cls('_switch', 's-switch')}"
                                                      ?checked=${__STheme.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon
                    ? html `
                                                            <i
                                                                class="${this.utils.cls('_icon')} ${this.props
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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLGtDQUFrQyxNQUFNLDhDQUE4QyxDQUFDO0FBRTlGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwwQ0FBMEMsQ0FBQyxDQUFDLCtCQUErQjtBQUU3RixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFPaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsZUFBZTtJQWdCaEU7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLFNBQVMsRUFBRSxrQ0FBa0M7U0FDaEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ25DLENBQUM7SUF0QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixrQ0FBa0MsQ0FDckMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQWFELGVBQWU7UUFDWCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQixRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDSCxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFB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