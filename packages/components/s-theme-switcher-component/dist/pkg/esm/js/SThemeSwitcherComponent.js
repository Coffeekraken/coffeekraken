import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import { css, html, unsafeCSS } from 'lit';
import __SThemeSwitcherComponentInterface from './interface/SThemeSwitcherComponentInterface';
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
        return __SLitComponent.createProperties({}, __SThemeSwitcherComponentInterface);
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
        this.componentUtils.dispatchEvent('change', {
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
            <div class="${this.componentUtils.className('__root')}">
                ${themesKeys.length === 1
            ? html `
                          <input
                              type="checkbox"
                              @change=${() => this._toggleDarkMode()}
                              class="${this.componentUtils.className('__switch', 's-switch')}"
                              ?checked=${__STheme.isDark()}
                          />
                          ${this.props.darkModeIcon
                ? html `
                                    <i
                                        class="${this.componentUtils.className('__icon')} ${this.props.darkModeIconClass}"
                                    ></i>
                                `
                : ''}
                      `
            : html `
                          <div
                              class="${this.componentUtils.className('__dropdown-container')} s-dropdown-container"
                              tabindex="0"
                          >
                              <span class="s-typo:p">
                                  ${themeMetas.title} (${themeMetas.variant})
                              </span>
                              <div
                                  class="${this.componentUtils.className('__dropdown')} s-dropdown"
                              >
                                  ${themesKeys.map((theme) => {
                const themeObj = this._themes[theme];
                return html `
                                          <div
                                              class="${this.componentUtils.className('__dropdown-item', 's-dropdown-item')} ${activeTheme === theme
                    ? 'active'
                    : ''}"
                                              @click=${(e) => {
                    e.preventDefault();
                    this._setTheme(theme);
                }}
                                          >
                                              <div
                                                  class="${this.componentUtils.className('__theme-name')}"
                                              >
                                                  ${themeObj.metas.title}
                                              </div>
                                              <div
                                                  class="${this.componentUtils.className('__dark-mode')} ${activeTheme === theme
                    ? 'visible'
                    : ''}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${(e) => {
                    e.stopPropagation();
                    this._toggleDarkMode();
                }}
                                                      class="${this.componentUtils.className('__switch', 's-switch')}"
                                                      ?checked=${__STheme.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon
                    ? html `
                                                            <i
                                                                class="${this.componentUtils.className('__icon')} ${this.props
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
export function define(props = {}, tagName = 's-theme-switcher') {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SThemeSwitcherComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLGtDQUFrQyxNQUFNLDhDQUE4QyxDQUFDO0FBRTlGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwwQ0FBMEMsQ0FBQyxDQUFDLCtCQUErQjtBQU83Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyx1QkFBd0IsU0FBUSxlQUFlO0lBZ0JoRTtRQUNJLEtBQUssQ0FBQztZQUNGLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsU0FBUyxFQUFFLGtDQUFrQztTQUNoRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDL0IsK0NBQStDO1FBQy9DLCtDQUErQztJQUNuRCxDQUFDO0lBeEJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLGdCQUFnQixDQUNuQyxFQUFFLEVBQ0Ysa0NBQWtDLENBQ3JDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFlRCxlQUFlO1FBQ1gsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUksQ0FB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