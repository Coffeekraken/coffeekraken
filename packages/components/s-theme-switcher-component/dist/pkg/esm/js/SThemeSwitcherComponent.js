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
        // this._themes['coco'] = this._themes.default;
        // this._themes['plop'] = this._themes.default;
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
        this.cu.dispatchEvent('change', {
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
            <div class="${this.cu.cls('__root')}">
                ${themesKeys.length === 1
            ? html `
                          <input
                              type="checkbox"
                              @change=${() => this._toggleDarkMode()}
                              class="${this.cu.cls('__switch', 's-switch')}"
                              ?checked=${__STheme.isDark()}
                          />
                          ${this.props.darkModeIcon
                ? html `
                                    <i
                                        class="${this.cu.cls('__icon')} ${this
                    .props.darkModeIconClass}"
                                    ></i>
                                `
                : ''}
                      `
            : html `
                          <div
                              class="${this.cu.cls('__dropdown-container')} s-dropdown-container"
                              tabindex="0"
                          >
                              <span class="s-typo:p">
                                  ${themeMetas.title} (${themeMetas.variant})
                              </span>
                              <div
                                  class="${this.cu.cls('__dropdown')} s-dropdown"
                              >
                                  ${themesKeys.map((theme) => {
                const themeObj = this._themes[theme];
                return html `
                                          <div
                                              class="${this.cu.cls('__dropdown-item', 's-dropdown-item')} ${activeTheme === theme
                    ? 'active'
                    : ''}"
                                              @click=${(e) => {
                    e.preventDefault();
                    this._setTheme(theme);
                }}
                                          >
                                              <div
                                                  class="${this.cu.cls('__theme-name')}"
                                              >
                                                  ${themeObj.metas.title}
                                              </div>
                                              <div
                                                  class="${this.cu.cls('__dark-mode')} ${activeTheme === theme
                    ? 'visible'
                    : ''}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${(e) => {
                    e.stopPropagation();
                    this._toggleDarkMode();
                }}
                                                      class="${this.cu.cls('__switch', 's-switch')}"
                                                      ?checked=${__STheme.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon
                    ? html `
                                                            <i
                                                                class="${this.cu.cls('__icon')} ${this.props
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLGtDQUFrQyxNQUFNLDhDQUE4QyxDQUFDO0FBRTlGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwwQ0FBMEMsQ0FBQyxDQUFDLCtCQUErQjtBQUU3RixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFPaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsZUFBZTtJQWdCaEU7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLFNBQVMsRUFBRSxrQ0FBa0M7U0FDaEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQy9CLCtDQUErQztRQUMvQywrQ0FBK0M7SUFDbkQsQ0FBQztJQXhCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLGtDQUFrQyxDQUNyQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBZUQsZUFBZTtRQUNYLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25CLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNILFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFB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