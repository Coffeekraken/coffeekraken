"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const s_asset_picker_component_1 = require("@coffeekraken/s-asset-picker-component");
const object_2 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SSpecsEditorComponentInterface_1 = __importDefault(require("./interface/SSpecsEditorComponentInterface"));
// @ts-ignore
const s_specs_editor_component_css_1 = __importDefault(require("../../../../src/css/s-specs-editor-component.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// components
(0, s_asset_picker_component_1.define)();
/**
 * @name                SSpecsEditorComponent
 * @as                  Clipboard copy
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSpecsEditorComponentInterface.ts
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
class SSpecsEditorComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_2.__deepMerge)({
            name: 's-specs-editor',
            interface: SSpecsEditorComponentInterface_1.default,
        }));
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
    _toggle(id) {
        if (!this.state.actives[id]) {
            this.state.actives[id] = true;
        }
        {
            this.state.actives[id] = false;
        }
    }
    _isActive(id) {
        return this.state.actives[id];
    }
    /**
     * Add an item in a repeatable one
     */
    _addItem(stack, specs) {
        switch (specs.type.toLowerCase()) {
            case 'object{}':
            default:
                stack.push({});
                break;
        }
        this.requestUpdate();
    }
    /**
     * Remove an item in a repeatable one
     */
    _removeItem(stack, item, specs) {
        if (Array.isArray(stack)) {
            stack.splice(stack.indexOf(item), 1);
        }
        this.requestUpdate();
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
    _renderSelectElement(propObj, path, values) {
        var _a, _b, _c, _d, _e;
        const prop = path.at(-1), value = (_b = (_a = values[prop]) !== null && _a !== void 0 ? _a : propObj.value) !== null && _b !== void 0 ? _b : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => this._update(e, propObj)}
                        name="${propObj.id}"
                        class="${this.componentUtils.className('__select', 's-select')}"
                        placeholder="${(_d = (_c = propObj.default) !== null && _c !== void 0 ? _c : propObj.title) !== null && _d !== void 0 ? _d : propObj.id}"
                        value="${value}"
                    >
                        ${propObj.options.map((option) => (0, lit_1.html) `
                                <option
                                    value="${option.value}"
                                    ?selected=${option.value === value}
                                >
                                    ${option.name}
                                </option>
                            `)}
                    </select>
                    <span>
                        ${(_e = propObj.title) !== null && _e !== void 0 ? _e : propObj.id}
                        ${propObj.description
            ? (0, lit_1.html) `
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div
                                          class="s-tooltip s-tooltip--left s-color s-color--accent"
                                      >
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
    _renderCheckboxElement(propObj, path, values) {
        var _a, _b, _c;
        const prop = path.at(-1), value = (_b = (_a = values[prop]) !== null && _a !== void 0 ? _a : propObj.value) !== null && _b !== void 0 ? _b : propObj.default;
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
                        checked?=${value}
                    />
                    <span>
                        ${(_c = propObj.title) !== null && _c !== void 0 ? _c : propObj.id}
                        ${propObj.description
            ? (0, lit_1.html) `
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div
                                          class="s-tooltip s-tooltip--left s-color s-color--accent"
                                      >
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
    _renderTextElement(propObj, path, values) {
        var _a, _b, _c, _d, _e;
        const prop = path.at(-1), value = (_b = (_a = values[prop]) !== null && _a !== void 0 ? _a : propObj.value) !== null && _b !== void 0 ? _b : propObj.default;
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
                        placeholder="${(_d = (_c = propObj.default) !== null && _c !== void 0 ? _c : propObj.title) !== null && _d !== void 0 ? _d : propObj.id}"
                        value="${value}"
                    />
                    <span>
                        ${(_e = propObj.title) !== null && _e !== void 0 ? _e : propObj.id}
                        ${propObj.description
            ? (0, lit_1.html) `
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div
                                          class="s-tooltip s-tooltip--left s-color s-color--accent"
                                      >
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
    _renderElement(propObj, path, values) {
        console.log(path, values);
        return (0, lit_1.html) `
            ${propObj.type.toLowerCase() === 'text'
            ? this._renderTextElement(propObj, path, values)
            : propObj.type.toLowerCase() === 'select'
                ? this._renderSelectElement(propObj, path, values)
                : propObj.type.toLowerCase() === 'checkbox'
                    ? this._renderCheckboxElement(propObj, path, values)
                    : ''}
        `;
    }
    _renderElements(specs, path = [], values = {}, forceNoRepeat = false) {
        // const _specs = __get(specs, path.join('.'));
        const _specs = specs;
        if (!forceNoRepeat && _specs.type.match(/(\{\}|\[\])/)) {
            const valuesPath = `${path.filter((p) => p !== 'props').join('.')}`;
            const loopOn = (0, object_1.__get)(values, valuesPath);
            console.log('loop', values, valuesPath, specs.type);
            return (0, lit_1.html) `
                <div class="${this.componentUtils.className('__repeatable')}">
                    ${loopOn.map((v, i) => {
                var _a, _b, _c;
                return (0, lit_1.html) `
                            <div
                                tabindex="0"
                                @pointerup=${() => this._toggle(`${path.join('.')}-${i}`)}
                                class="${this.componentUtils.className('__repeatable-title')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                            >
                                ${(_c = (_b = (_a = v.title) !== null && _a !== void 0 ? _a : v.name) !== null && _b !== void 0 ? _b : v.id) !== null && _c !== void 0 ? _c : `${_specs.title} #${i}`}
                                ${this._isActive(`${path.join('.')}-${i}`)
                    ? (0, lit_1.html) `
                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.collapse)}
                                      `
                    : (0, lit_1.html) `
                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.expand)}
                                      `}
                            </div>
                            <div
                                tabindex="0"
                                class="${this.componentUtils.className('__repeatable-item')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                            >
                                <div
                                    class="${this.componentUtils.className('__repeatable-item-actions')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                                >
                                    <button
                                        @pointerup=${() => this._removeItem(loopOn, v, _specs)}
                                        class="${this.componentUtils.className('__repeatable-remove', 's-badge s-color s-color--error')}"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div
                                    class="${this.componentUtils.className('__repeatable-item-props')}"
                                >
                                    ${this._renderElements(specs, [...path], v, true)}
                                </div>
                            </div>
                        `;
            })}

                    <div
                        class="${this.componentUtils.className('__repeatable-actions')}"
                    >
                        <button
                            @pointerup=${() => this._addItem(loopOn, _specs)}
                            class="${this.componentUtils.className('__btn', 's-btn')}"
                        >
                            Add a
                            ${(0, string_1.__lowerFirst)(_specs.title).replace(/s$/, '')}
                            ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.add)}
                        </button>
                    </div>
                </div>
            `;
        }
        else {
            return (0, lit_1.html) `
                ${Object.keys(_specs.props).map((prop) => {
                const propObj = _specs.props[prop];
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
                                ${this._renderElements(propObj, !forceNoRepeat
                        ? [...path, 'props', prop]
                        : path, values, forceNoRepeat)}
                            </div>
                        `;
                }
                else {
                    return (0, lit_1.html) `
                            <div
                                prop="${propObj.id}"
                                class="${this.componentUtils.className('__prop')}"
                            >
                                ${this._renderElement(propObj, [...path, 'props', prop], values)}
                            </div>
                        `;
                }
            })}
            `;
        }
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
                              ${this._renderElements(this.props.specs, [], this.props.specs.values)}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponent;
SSpecsEditorComponent.state = {
    actives: {},
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBbUQ7QUFFbkQscUZBQWlHO0FBQ2pHLHVEQUF5RDtBQUN6RCx1REFBMEQ7QUFDMUQsNkJBQTJDO0FBQzNDLGtFQUEyRDtBQUMzRCxnSEFBMEY7QUFFMUYsYUFBYTtBQUNiLG9IQUFxRSxDQUFDLCtCQUErQjtBQUVyRyxzREFBZ0M7QUFraUJYLGlCQWxpQmQsZ0JBQVEsQ0FraUJZO0FBaGlCM0IsYUFBYTtBQUNiLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQVFoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFFSCxNQUFxQixxQkFBc0IsU0FBUSx5QkFBZTtJQWtCOUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsd0NBQWdDO1NBQzlDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQXhCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3Q0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxzQ0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBY0QsS0FBSyxLQUFJLENBQUM7SUFFVixPQUFPLENBQUMsQ0FBQyxFQUFFLFNBQVM7UUFDaEIsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNwQztnQkFDSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3RDLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0gsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDcEM7Z0JBQ0QsTUFBTTtTQUNiO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQ3hDLE1BQU0sRUFBRTtnQkFDSixTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO2dCQUN2QyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQy9DLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUN0QzthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFVO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNqQztRQUNEO1lBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUNELFNBQVMsQ0FBQyxFQUFVO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLO1FBQ2pCLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUM5QixLQUFLLFVBQVUsQ0FBQztZQUNoQjtnQkFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNmLE1BQU07U0FDYjtRQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLO1FBQzFCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVsQixTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUUsU0FBUztZQUNoQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDM0IsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ2pDO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUNuQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3JCLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUM1QzthQUNKO1FBQ0wsQ0FBQztRQUVELFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELG9CQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTTs7UUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNwQixLQUFLLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQUksT0FBTyxDQUFDLEtBQUssbUNBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM3RCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDOzs2QkFFNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFNBQVMsRUFDVCx3QkFBd0IsQ0FDM0I7OztrQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO2dDQUNqQyxPQUFPLENBQUMsRUFBRTtpQ0FDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsVUFBVSxFQUNWLFVBQVUsQ0FDYjt1Q0FDYyxNQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQzlCLE9BQU8sQ0FBQyxLQUFLLG1DQUNiLE9BQU8sQ0FBQyxFQUFFO2lDQUNELEtBQUs7OzBCQUVaLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNqQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7OzZDQUVDLE1BQU0sQ0FBQyxLQUFLO2dEQUNULE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSzs7c0NBRWhDLE1BQU0sQ0FBQyxJQUFJOzs2QkFFcEIsQ0FDSjs7OzBCQUdDLE1BQUEsT0FBTyxDQUFDLEtBQUssbUNBQUksT0FBTyxDQUFDLEVBQUU7MEJBQzNCLE9BQU8sQ0FBQyxXQUFXO1lBQ2pCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7Ozs7NENBUVUsT0FBTyxDQUFDLFdBQVc7OzsrQkFHaEM7WUFDSCxDQUFDLENBQUMsRUFBRTs7OztTQUl2QixDQUFDO0lBQ04sQ0FBQztJQUVELHNCQUFzQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTTs7UUFDeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNwQixLQUFLLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQUksT0FBTyxDQUFDLEtBQUssbUNBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM3RCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDOzs2QkFFOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFNBQVMsRUFDVCxTQUFTLENBQ1o7OztrQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDOztnQ0FFakMsT0FBTyxDQUFDLEVBQUU7aUNBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFlBQVksRUFDWixVQUFVLENBQ2I7bUNBQ1UsS0FBSzs7OzBCQUdkLE1BQUEsT0FBTyxDQUFDLEtBQUssbUNBQUksT0FBTyxDQUFDLEVBQUU7MEJBQzNCLE9BQU8sQ0FBQyxXQUFXO1lBQ2pCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7Ozs7NENBUVUsT0FBTyxDQUFDLFdBQVc7OzsrQkFHaEM7WUFDSCxDQUFDLENBQUMsRUFBRTs7OztTQUl2QixDQUFDO0lBQ04sQ0FBQztJQUVELGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTTs7UUFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNwQixLQUFLLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQUksT0FBTyxDQUFDLEtBQUssbUNBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM3RCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQzs7NkJBRTFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxTQUFTLEVBQ1Qsd0JBQXdCLENBQzNCOzs7a0NBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQzs7Z0NBRWpDLE9BQU8sQ0FBQyxFQUFFO2lDQUNULElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxTQUFTLEVBQ1QsU0FBUyxDQUNaO3VDQUNjLE1BQUEsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FDOUIsT0FBTyxDQUFDLEtBQUssbUNBQ2IsT0FBTyxDQUFDLEVBQUU7aUNBQ0QsS0FBSzs7OzBCQUdaLE1BQUEsT0FBTyxDQUFDLEtBQUssbUNBQUksT0FBTyxDQUFDLEVBQUU7MEJBQzNCLE9BQU8sQ0FBQyxXQUFXO1lBQ2pCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7Ozs7NENBUVUsT0FBTyxDQUFDLFdBQVc7OzsrQkFHaEM7WUFDSCxDQUFDLENBQUMsRUFBRTs7OztTQUl2QixDQUFDO0lBQ04sQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU07UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFMUIsT0FBTyxJQUFBLFVBQUksRUFBQTtjQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTTtZQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO1lBQ2hELENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVE7Z0JBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVU7b0JBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7b0JBQ3BELENBQUMsQ0FBQyxFQUFFO1NBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlLENBQ1gsS0FBVSxFQUNWLE9BQWlCLEVBQUUsRUFDbkIsU0FBYyxFQUFFLEVBQ2hCLGFBQWEsR0FBRyxLQUFLO1FBRXJCLCtDQUErQztRQUMvQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNwRCxNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNwRSxNQUFNLE1BQU0sR0FBRyxJQUFBLGNBQUssRUFBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEQsT0FBTyxJQUFBLFVBQUksRUFBQTs4QkFDTyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7c0JBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQ1IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUFDLE9BQUEsSUFBQSxVQUFJLEVBQUE7Ozs2Q0FHTyxHQUFHLEVBQUUsQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt5Q0FDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLG9CQUFvQixDQUN2QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUN6QyxDQUFDLENBQUMsUUFBUTtvQkFDVixDQUFDLENBQUMsRUFBRTs7a0NBRU4sTUFBQSxNQUFBLE1BQUEsQ0FBQyxDQUFDLEtBQUssbUNBQ1QsQ0FBQyxDQUFDLElBQUksbUNBQ04sQ0FBQyxDQUFDLEVBQUUsbUNBQ0osR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtrQ0FDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs0Q0FDRSxJQUFBLDJCQUFVLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUM1Qjt1Q0FDSjtvQkFDSCxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7NENBQ0UsSUFBQSwyQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt1Q0FDeEM7Ozs7eUNBSUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLG1CQUFtQixDQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUN6QyxDQUFDLENBQUMsUUFBUTtvQkFDVixDQUFDLENBQUMsRUFBRTs7OzZDQUdLLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQywyQkFBMkIsQ0FDOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUNmLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDM0I7b0JBQ0csQ0FBQyxDQUFDLFFBQVE7b0JBQ1YsQ0FBQyxDQUFDLEVBQUU7OztxREFHUyxHQUFHLEVBQUUsQ0FDZCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO2lEQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMscUJBQXFCLEVBQ3JCLGdDQUFnQyxDQUNuQzs7Ozs7Ozs2Q0FPSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMseUJBQXlCLENBQzVCOztzQ0FFQyxJQUFJLENBQUMsZUFBZSxDQUNsQixLQUFLLEVBQ0wsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUNULENBQUMsRUFDRCxJQUFJLENBQ1A7Ozt5QkFHWixDQUFBO2FBQUEsQ0FDSjs7O2lDQUdZLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxzQkFBc0IsQ0FDekI7Ozt5Q0FHZ0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO3FDQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsT0FBTyxFQUNQLE9BQU8sQ0FDVjs7OzhCQUdDLElBQUEscUJBQVksRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7OEJBQzVDLElBQUEsMkJBQVUsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Ozs7YUFJakQsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLElBQUEsVUFBSSxFQUFBO2tCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsT0FBTyxJQUFBLFVBQUksRUFBQTs7eUNBRU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFNBQVMsQ0FDWjs7OzZDQUdZLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxlQUFlLEVBQ2YsWUFBWSxDQUNmOztzQ0FFQyxPQUFPLENBQUMsS0FBSzs7OzZDQUdOLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxxQkFBcUIsRUFDckIsV0FBVyxDQUNkOztzQ0FFQyxPQUFPLENBQUMsV0FBVzs7a0NBRXZCLElBQUksQ0FBQyxlQUFlLENBQ2xCLE9BQU8sRUFDUCxDQUFDLGFBQWE7d0JBQ1YsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLElBQUksRUFDVixNQUFNLEVBQ04sYUFBYSxDQUNoQjs7eUJBRVIsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxPQUFPLElBQUEsVUFBSSxFQUFBOzt3Q0FFSyxPQUFPLENBQUMsRUFBRTt5Q0FDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsUUFBUSxDQUNYOztrQ0FFQyxJQUFJLENBQUMsY0FBYyxDQUNqQixPQUFPLEVBQ1AsQ0FBQyxHQUFHLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQ3hCLE1BQU0sQ0FDVDs7eUJBRVIsQ0FBQztpQkFDTDtZQUNMLENBQUMsQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNOztRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7O3lCQUVNLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO3NCQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7MEJBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNOztrQkFFekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ2QsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzt1Q0FFYSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7OzsyQ0FHbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFNBQVMsQ0FDWjs7OytDQUdZLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxlQUFlLEVBQ2YsWUFBWSxDQUNmOzt3Q0FFQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLOzs7K0NBR2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLHFCQUFxQixFQUNyQixXQUFXLENBQ2Q7O3dDQUVDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVc7OztnQ0FHcEMsSUFBSSxDQUFDLGVBQWUsQ0FDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQ2hCLEVBQUUsRUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQzFCOzt1QkFFUjtZQUNILENBQUMsQ0FBQyxFQUFFOztTQUVmLENBQUM7SUFDTixDQUFDOztBQTdkTCx3Q0E4ZEM7QUFoZFUsMkJBQUssR0FBRztJQUNYLE9BQU8sRUFBRSxFQUFFO0NBQ2QsQ0FBQyJ9