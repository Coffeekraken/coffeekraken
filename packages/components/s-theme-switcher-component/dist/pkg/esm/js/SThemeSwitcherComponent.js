import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import { css, html, unsafeCSS } from 'lit';
import __SThemeSwitcherComponentInterface from './interface/SThemeSwitcherComponentInterface.js';
// @ts-ignore
import __css from '../../../../src/css/s-theme-switcher.css'; // relative to /dist/pkg/esm/js
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
 * @import          import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';
 *
 * @snippet             __SThemeSwitcherComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-theme-switcher-component
 *
 * @install           js
 * import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';
 * __SThemeSwitcherComponentDefine();
 *
 * @example         html        Simple dark mode switcher
 * <s-theme-switcher></s-theme-switcher>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SThemeSwitcherComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SThemeSwitcherComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    constructor() {
        super({
            name: 's-theme-switcher',
            interface: __SThemeSwitcherComponentInterface,
        });
        this._themes = __STheme.themes;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLGtDQUFrQyxNQUFNLGlEQUFpRCxDQUFDO0FBRWpHLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwwQ0FBMEMsQ0FBQyxDQUFDLCtCQUErQjtBQU83Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsZUFBZTtJQUNoRSxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLGtDQUFrQyxDQUNyQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBSUQ7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLFNBQVMsRUFBRSxrQ0FBa0M7U0FDaEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ25DLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFB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