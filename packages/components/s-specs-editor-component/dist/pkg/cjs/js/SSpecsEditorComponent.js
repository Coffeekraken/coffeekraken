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
    _update(e, propSpecs) {
        switch (e.target.tagName.toLowerCase()) {
            default:
                if (e.target.value === propSpecs.default) {
                    delete propSpecs.value;
                }
                else {
                    propSpecs.value = e.target.value;
                }
                break;
        }
        this.componentUtils.dispatchEvent('update', {
            detail: {
                propSpecs: Object.assign({}, propSpecs),
                propsSpecs: Object.assign({}, this.props.specs),
                values: this._specsToValues(Object.assign({}, this.props.specs)),
            },
        });
    }
    _specsToValues(specs) {
        const values = {};
        function treatProps(props, targetObj) {
            for (let [prop, value] of Object.entries(props)) {
                if (value.value !== undefined) {
                    targetObj[prop] = value.value;
                }
                else if (value.default !== undefined) {
                    targetObj[prop] = value.default;
                }
                else if (value.props) {
                    targetObj[prop] = {};
                    treatProps(value.props, targetObj[prop]);
                }
            }
        }
        treatProps(specs.props, values);
        console.log(values);
        return values;
    }
    _renderSelectElement(propObj) {
        var _a, _b, _c;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => this._update(e, propObj)}
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
                        @change=${(e) => this._update(e, propObj)}
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
                        @change=${(e) => this._update(e, propObj)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGdIQUEwRjtBQUUxRixhQUFhO0FBQ2Isb0hBQXFFLENBQUMsK0JBQStCO0FBRXJHLHNEQUFnQztBQWdYWCxpQkFoWGQsZ0JBQVEsQ0FnWFk7QUF4VzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUVILE1BQXFCLHVCQUF3QixTQUFRLHlCQUFlO0lBZ0JoRTtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFNBQVMsRUFBRSx3Q0FBZ0M7U0FDOUMsQ0FBQyxDQUNMLENBQUM7UUFSTixVQUFLLEdBQUcsRUFBRSxDQUFDO0lBU1gsQ0FBQztJQXRCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3Q0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxzQ0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBWUQsS0FBSyxLQUFJLENBQUM7SUFFVixPQUFPLENBQUMsQ0FBQyxFQUFFLFNBQVM7UUFDaEIsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNwQztnQkFDSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3RDLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0gsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENB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