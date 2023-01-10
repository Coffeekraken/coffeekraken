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
        // this._themes['coco'] = this._themes.default;
        // this._themes['plop'] = this._themes.default;
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
        this.cu.dispatchEvent('change', {
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
            <div class="${this.cu.cls('__root')}">
                ${themesKeys.length === 1
            ? (0, lit_1.html) `
                          <input
                              type="checkbox"
                              @change=${() => this._toggleDarkMode()}
                              class="${this.cu.cls('__switch', 's-switch')}"
                              ?checked=${s_theme_1.default.isDark()}
                          />
                          ${this.props.darkModeIcon
                ? (0, lit_1.html) `
                                    <i
                                        class="${this.cu.cls('__icon')} ${this
                    .props.darkModeIconClass}"
                                    ></i>
                                `
                : ''}
                      `
            : (0, lit_1.html) `
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
                return (0, lit_1.html) `
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
                                                      ?checked=${s_theme_1.default.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon
                    ? (0, lit_1.html) `
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
exports.default = SThemeSwitcherComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUM1RCxvRUFBNkM7QUFDN0MsNkJBQTJDO0FBQzNDLG9IQUE4RjtBQUU5RixhQUFhO0FBQ2Isb0dBQTZELENBQUMsK0JBQStCO0FBRTdGLHNEQUFnQztBQWlNWCxpQkFqTWQsZ0JBQVEsQ0FpTVk7QUExTDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFFSCxNQUFxQix1QkFBd0IsU0FBUSx5QkFBZTtJQWdCaEU7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLFNBQVMsRUFBRSwwQ0FBa0M7U0FDaEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUMvQiwrQ0FBK0M7UUFDL0MsK0NBQStDO0lBQ25ELENBQUM7SUF4QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsMENBQWtDLENBQ3JDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsOEJBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQWVELGVBQWU7UUFDWCxJQUFJLGlCQUFRLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkIsaUJBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNILGlCQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQzVCLE1BQU0sRUFBRSxpQkFBUTtTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENB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