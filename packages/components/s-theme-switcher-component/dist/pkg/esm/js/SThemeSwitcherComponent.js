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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLGtDQUFrQyxNQUFNLDhDQUE4QyxDQUFDO0FBRTlGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwwQ0FBMEMsQ0FBQyxDQUFDLCtCQUErQjtBQUU3RixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFPaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q0c7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHVCQUF3QixTQUFRLGVBQWU7SUFDaEUsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixrQ0FBa0MsQ0FDckMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUlEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixTQUFTLEVBQUUsa0NBQWtDO1NBQ2hELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25CLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNILFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsTUFBTSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNuQixRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUN4QyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUNyQyxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7a0JBQy9CLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUNyQixDQUFDLENBQUMsSUFBSSxDQUFBOzs7d0NBR2MsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTt1Q0FDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQzt5Q0FDbkMsUUFBUSxDQUFDLE1BQU0sRUFBRTs7NEJBRTlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtnQkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7aURBRWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtxQkFDbkMsS0FBSyxDQUFDLGlCQUFpQjs7aUNBRW5DO2dCQUNILENBQUMsQ0FBQyxFQUFFO3VCQUNYO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTs7dUNBRWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLHFCQUFxQixDQUN4Qjs7OztvQ0FJSyxVQUFVLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxPQUFPOzs7MkNBR2hDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixXQUFXLENBQ2Q7O29DQUVDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsT0FBTyxJQUFJLENBQUE7O3VEQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixnQkFBZ0IsRUFDaEIsaUJBQWlCLENBQ3BCLElBQUksV0FBVyxLQUFLLEtBQUs7b0JBQ3RCLENBQUMsQ0FBQyxRQUFRO29CQUNWLENBQUMsQ0FBQyxFQUFFO3VEQUNDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1gsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixDQUFDOzs7MkRBR1ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLGFBQWEsQ0FDaEI7O29EQUVDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSzs7OzJEQUdiLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixZQUFZLENBQ2YsSUFBSSxXQUFXLEtBQUssS0FBSztvQkFDdEIsQ0FBQyxDQUFDLFNBQVM7b0JBQ1gsQ0FBQyxDQUFDLEVBQUU7Ozs7Z0VBSU0sQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDWixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQzsrREFDUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsU0FBUyxFQUNULFVBQVUsQ0FDYjtpRUFDVSxRQUFRLENBQUMsTUFBTSxFQUFFOztvREFFOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO29CQUNyQixDQUFDLENBQUMsSUFBSSxDQUFBOzt5RUFFYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsT0FBTyxDQUNWLElBQUksSUFBSSxDQUFDLEtBQUs7eUJBQ1YsaUJBQWlCOzt5REFFN0I7b0JBQ0gsQ0FBQyxDQUFDLEVBQUU7Ozt1Q0FHbkIsQ0FBQztZQUNOLENBQUMsQ0FBQzs7O3VCQUdiOztTQUVkLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxPQUFPLEVBQUUsUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFDIn0=