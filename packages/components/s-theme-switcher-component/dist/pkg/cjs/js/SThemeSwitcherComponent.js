"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const lit_1 = require("lit");
const SThemeSwitcherComponentInterface_1 = __importDefault(require("./interface/SThemeSwitcherComponentInterface"));
// @ts-ignore
const s_theme_switcher_css_1 = __importDefault(require("../../../../src/css/s-theme-switcher.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
class SThemeSwitcherComponent extends s_lit_component_1.default {
    constructor() {
        super({
            name: 's-theme-switcher',
            interface: SThemeSwitcherComponentInterface_1.default,
        });
        this._themes = s_theme_1.default.themes;
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SThemeSwitcherComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_theme_switcher_css_1.default)}
        `;
    }
    _toggleDarkMode() {
        if (s_theme_1.default.isDark()) {
            s_theme_1.default.setThemeVariant('light');
        }
        else {
            s_theme_1.default.setThemeVariant('dark');
        }
        this.utils.dispatchEvent('change', {
            detail: s_theme_1.default,
        });
        this.requestUpdate();
    }
    _setTheme(theme) {
        s_theme_1.default.setTheme(theme);
        this.requestUpdate();
    }
    render() {
        const themesKeys = Object.keys(this._themes), themeMetas = s_theme_1.default.getThemeMetas(), activeTheme = s_theme_1.default.theme;
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_root')}">
                ${themesKeys.length === 1
            ? (0, lit_1.html) `
                          <input
                              type="checkbox"
                              @change=${() => this._toggleDarkMode()}
                              class="${this.utils.cls('_switch', 's-switch')}"
                              ?checked=${s_theme_1.default.isDark()}
                          />
                          ${this.props.darkModeIcon
                ? (0, lit_1.html) `
                                    <i
                                        class="${this.utils.cls('_icon')} ${this
                    .props.darkModeIconClass}"
                                    ></i>
                                `
                : ''}
                      `
            : (0, lit_1.html) `
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
                return (0, lit_1.html) `
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
                                                      ?checked=${s_theme_1.default.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon
                    ? (0, lit_1.html) `
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
exports.default = SThemeSwitcherComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUM1RCxvRUFBNkM7QUFDN0MsNkJBQTJDO0FBQzNDLG9IQUE4RjtBQUU5RixhQUFhO0FBQ2Isb0dBQTZELENBQUMsK0JBQStCO0FBRTdGLHNEQUFnQztBQStMWCxpQkEvTGQsZ0JBQVEsQ0ErTFk7QUF4TDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFFSCxNQUFxQix1QkFBd0IsU0FBUSx5QkFBZTtJQWdCaEU7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLFNBQVMsRUFBRSwwQ0FBa0M7U0FDaEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBdEJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLDBDQUFrQyxDQUNyQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLDhCQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFhRCxlQUFlO1FBQ1gsSUFBSSxpQkFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25CLGlCQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDSCxpQkFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUMvQixNQUFNLEVBQUUsaUJBQVE7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENB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