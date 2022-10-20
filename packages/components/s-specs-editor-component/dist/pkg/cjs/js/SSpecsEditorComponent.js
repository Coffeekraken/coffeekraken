"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SSpecsEditorComponentInterface_1 = __importDefault(require("./interface/SSpecsEditorComponentInterface"));
// @ts-ignore
const s_specs_editor_component_css_1 = __importDefault(require("../../../../src/css/s-specs-editor-component.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
class SClipboardCopyComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-specs-editor',
            interface: SSpecsEditorComponentInterface_1.default,
        }));
        this.state = {};
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SSpecsEditorComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_specs_editor_component_css_1.default)}
        `;
    }
    mount() { }
    _renderSelectElement(propObj) {
        var _a, _b, _c;
        return (0, lit_1.html) `
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
                        ${propObj.options.map((option) => (0, lit_1.html) `
                                <option value="${option.value}">
                                    ${option.name}
                                </option>
                            `)}
                    </select>
                    <span>
                        ${(_c = propObj.title) !== null && _c !== void 0 ? _c : propObj.id}
                        ${propObj.description
            ? (0, lit_1.html) `
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
        return (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
        return (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
        return (0, lit_1.html) `
            ${Object.keys(specs.props).map((prop) => {
            const propObj = specs.props[prop];
            if (propObj.props) {
                return (0, lit_1.html) `
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
                return (0, lit_1.html) `
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
        return (0, lit_1.html) `
            <div
                class="${(_a = this.componentUtils) === null || _a === void 0 ? void 0 : _a.className('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
            ? (0, lit_1.html) `
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
exports.default = SClipboardCopyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGdIQUEwRjtBQUUxRixhQUFhO0FBQ2Isb0hBQXFFLENBQUMsK0JBQStCO0FBRXJHLHNEQUFnQztBQW1VWCxpQkFuVWQsZ0JBQVEsQ0FtVVk7QUEzVDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUVILE1BQXFCLHVCQUF3QixTQUFRLHlCQUFlO0lBZ0JoRTtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFNBQVMsRUFBRSx3Q0FBZ0M7U0FDOUMsQ0FBQyxDQUNMLENBQUM7UUFSTixVQUFLLEdBQUcsRUFBRSxDQUFDO0lBU1gsQ0FBQztJQXRCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3Q0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxzQ0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBWUQsS0FBSyxLQUFJLENBQUM7SUFFVixvQkFBb0IsQ0FBQyxPQUFPOztRQUN4QixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDOzs2QkFFNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFNBQVMsRUFDVCx3QkFBd0IsQ0FDM0I7OzttQ0FHYyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFD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