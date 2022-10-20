import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SSpecsEditorComponentInterface from './interface/SSpecsEditorComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-specs-editor-component.css'; // relative to /dist/pkg/esm/js
import __define from './define';
/**
 * @name                SClipboardCopyComponent
 * @as                  Clipboard copy
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SClipboardCopyComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-clipboard-copy
 * @platform            html
 * @status              beta
 *
 * This component represent a simple "copy to clipboard" component that will copy a "from" target when clicked.
 *
 * @feature           Copy to clipboard
 * @feature           Specify a "from" target to copy using a simple css selector
 * @feature           Default icons for "copy", "copied" and "error"
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-clipboard-copy-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-clipboard-copy-component';
 * define();
 *
 * @example         html        Copy from an input
 * <div class="s-flex:align-center">
 *      <input class="s-input s-width:30" type="text" value="Hello world" id="my-input" />
 *      <s-clipboard-copy class="s-mis:20" from="my-input"></s-clipboard-copy>
 * </div>
 *
 * @example         html        Using the input container addon
 * <label class="s-label">
 *      <span>Enter something and copy it!</span>
 *      <div class="s-input-container:addon s-width:40">
 *          <input class="s-input" type="text" value="Hello world" id="my-input" />
 *          <div>
 *              <s-clipboard-copy class="s-mis:20" from="my-input"></s-clipboard-copy>
 *          </div>
 *      </div>
 * </span>
 *
 * @example         html        Copy from a paragraph
 * <div class="s-flex:align-center">
 *      <p class="s-typo:p" id="my-paragraph">Hello world</p>
 *      <s-clipboard-copy class="s-mis:20" from="my-paragraph"></s-clipboard-copy>
 * </div>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SClipboardCopyComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-specs-editor',
            interface: __SSpecsEditorComponentInterface,
        }));
        this.state = {};
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SSpecsEditorComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    mount() { }
    _renderSelectElement(propObj) {
        var _a, _b, _c;
        return html `
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <select
                        onChange=${(e) => this._update(e, v)}
                        name="${propObj.id}"
                        class="${this.componentUtils.className('__select', 's-select')}"
                        placeholder="${(_b = (_a = propObj.default) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}"
                        prop="${JSON.stringify(propObj)}"
                    >
                        ${propObj.options.map((option) => html `
                                <option value="${option.value}">
                                    ${option.name}
                                </option>
                            `)}
                    </select>
                    <span>
                        ${(_c = propObj.title) !== null && _c !== void 0 ? _c : propObj.id}
                        ${propObj.description
            ? html `
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div class="s-tooltip s-tooltip--left">
                                          ${propObj.description}
                                      </div>
                                  </span>
                              `
            : ''}
                    </span>
                </label>
            </div>
        `;
    }
    _renderCheckboxElement(propObj) {
        var _a;
        return html `
            <div class="${this.componentUtils.className('__prop--checkbox')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label')}"
                >
                    <input
                        onChange=${(e) => this._update(e, v)}
                        type="checkbox"
                        name="${propObj.id}"
                        class="${this.componentUtils.className('__checkbox', 's-switch')}"
                        checked?=${propObj.value}
                    />
                    <span>
                        ${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}
                        ${propObj.description
            ? html `
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div class="s-tooltip s-tooltip--left">
                                          ${propObj.description}
                                      </div>
                                  </span>
                              `
            : ''}
                    </span>
                </label>
            </div>
        `;
    }
    _renderTextElement(propObj) {
        var _a, _b, _c;
        return html `
            <div class="${this.componentUtils.className('__prop--text')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <input
                        onChange=${(e) => this._update(e, propObj)}
                        type="text"
                        name="${propObj.id}"
                        class="${this.componentUtils.className('__input', 's-input')}"
                        placeholder="${(_b = (_a = propObj.default) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}"
                        value="${propObj.value}"
                    />
                    <span>
                        ${(_c = propObj.title) !== null && _c !== void 0 ? _c : propObj.id}
                        ${propObj.description
            ? html `
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div class="s-tooltip s-tooltip--left">
                                          ${propObj.description}
                                      </div>
                                  </span>
                              `
            : ''}
                    </span>
                </label>
            </div>
        `;
    }
    _renderElements(specs) {
        // console.log('props', specs.props);
        // console.log('keys', Object.keys(specs.props));
        // const sortedKeys = Object.keys(specs.props).sort((a, b) => {
        //     if (specs.props[a].props) {
        //         console.log('a', a, b);
        //         return 1;
        //     }
        //     return -1;
        // });
        // console.log('sorte', sortedKeys);
        return html `
            ${Object.keys(specs.props).map((prop) => {
            const propObj = specs.props[prop];
            if (propObj.props) {
                return html `
                        <div
                            class="${this.componentUtils.className('__child')}"
                        >
                            <h3
                                class="${this.componentUtils.className('__child-title', 's-typo--h5')}"
                            >
                                ${propObj.title}
                            </h3>
                            <p
                                class="${this.componentUtils.className('__child-description', 's-typo--p')}"
                            >
                                ${propObj.description}
                            </p>
                            ${this._renderElements(propObj)}
                        </div>
                    `;
            }
            else {
                return html `
                        <div
                            prop="${propObj.id}"
                            class="${this.componentUtils.className('__prop')}"
                        >
                            ${propObj.type.toLowerCase() === 'text'
                    ? this._renderTextElement(propObj)
                    : propObj.type.toLowerCase() === 'select'
                        ? this._renderSelectElement(propObj)
                        : propObj.type.toLowerCase() === 'checkbox'
                            ? this._renderCheckboxElement(propObj)
                            : ''}
                        </div>
                    `;
            }
        })}
        `;
    }
    render() {
        var _a;
        return html `
            <div
                class="${(_a = this.componentUtils) === null || _a === void 0 ? void 0 : _a.className('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
            ? html `
                          <div
                              class="${this.componentUtils.className('__root')}"
                          >
                              <div
                                  class="${this.componentUtils.className('__metas')}"
                              >
                                  <h3
                                      class="${this.componentUtils.className('__child-title', 's-typo--h3')}"
                                  >
                                      ${this.props.specs.title}
                                  </h3>
                                  <p
                                      class="${this.componentUtils.className('__child-description', 's-typo--p')}"
                                  >
                                      ${this.props.specs.description}
                                  </p>
                              </div>
                              ${this._renderElements(this.props.specs)}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUUxRixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sa0RBQWtELENBQUMsQ0FBQywrQkFBK0I7QUFFckcsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBUWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsZUFBZTtJQWdCaEU7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsZ0NBQWdDO1NBQzlDLENBQUMsQ0FDTCxDQUFDO1FBUk4sVUFBSyxHQUFHLEVBQUUsQ0FBQztJQVNYLENBQUM7SUF0QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixnQ0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQVlELEtBQUssS0FBSSxDQUFDO0lBRVYsb0JBQW9CLENBQUMsT0FBTzs7UUFDeEIsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7OzZCQUU1QyxJQUFJLENBQUMs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