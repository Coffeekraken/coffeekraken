"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const s_asset_picker_component_1 = require("@coffeekraken/s-asset-picker-component");
const s_dropzone_component_1 = require("@coffeekraken/s-dropzone-component");
const dom_1 = require("@coffeekraken/sugar/dom");
const object_2 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SSpecsEditorComponentInterface_1 = __importDefault(require("./interface/SSpecsEditorComponentInterface"));
// @ts-ignore
const s_specs_editor_component_css_1 = __importDefault(require("../../../../src/css/s-specs-editor-component.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
const imageWidget_1 = __importDefault(require("./widgets/imageWidget"));
// components
(0, s_asset_picker_component_1.define)();
(0, s_dropzone_component_1.define)();
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
        this._widgets = {};
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SSpecsEditorComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_specs_editor_component_css_1.default)}
        `;
    }
    updated(changedProperties) {
        console.log('up', changedProperties);
        if (changedProperties.has('media')) {
            console.log('UP', this.props.media);
            this.requestUpdate();
        }
        // super.update(changedProperties);
    }
    mount() {
        console.log(this.props);
    }
    isPathResponsive(path) {
        const currentPath = [];
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            currentPath.push(part);
            const propObj = (0, object_1.__get)(this.props.specs, currentPath.join('.'));
            if (propObj.responsive) {
                return true;
            }
        }
        return false;
    }
    getValuePathFromPath(path, settings) {
        var _a, _b, _c;
        const finalSettings = Object.assign({ media: null, returnDefault: true, force: false }, (settings !== null && settings !== void 0 ? settings : {}));
        const currentPath = [], noneMediaValuePath = [], mediaValuePath = [], defaultMediaValuePath = [];
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            if (part !== 'props') {
                noneMediaValuePath.push(part);
                mediaValuePath.push(part);
                defaultMediaValuePath.push(part);
            }
            currentPath.push(part);
            const propObj = (0, object_1.__get)(this.props.specs, currentPath.join('.'));
            if (propObj.responsive) {
                if (finalSettings.media) {
                    mediaValuePath.push('media');
                    mediaValuePath.push(finalSettings.media);
                }
                defaultMediaValuePath.push('media');
                defaultMediaValuePath.push((_c = (_b = (_a = this.props.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.defaultMedia) !== null && _c !== void 0 ? _c : 'desktop');
            }
        }
        // current media value
        if (finalSettings.media) {
            const mediaScopedValue = (0, object_1.__get)(this.props.specs.values, mediaValuePath.join('.'));
            if (finalSettings.force || mediaScopedValue !== undefined) {
                return mediaValuePath;
            }
        }
        // continue only if we want to get the default
        // media/value returned
        if (!finalSettings.force && !finalSettings.returnDefault) {
            return;
        }
        if (finalSettings.media) {
            // default media value
            const defaultMediaValue = (0, object_1.__get)(this.props.specs.values, defaultMediaValuePath.join('.'));
            if (defaultMediaValue !== undefined) {
                return defaultMediaValuePath;
            }
        }
        // non media "responsive"
        const noneMediaValue = (0, object_1.__get)(this.props.specs.values, noneMediaValuePath.join('.'));
        if (finalSettings.force || noneMediaValue !== undefined) {
            return noneMediaValuePath;
        }
    }
    getValueFromPath(path, settings) {
        if (this.isPathResponsive(path)) {
            console.log('respionsive', path, this.props.media);
            const valuePath = this.getValuePathFromPath(path, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { media: this.props.media }));
            if (valuePath !== undefined) {
                return (0, object_1.__get)(this.props.specs.values, valuePath.join('.'));
            }
        }
        else {
            const valuePath = this.getValuePathFromPath(path, settings);
            if (valuePath !== undefined) {
                return (0, object_1.__get)(this.props.specs.values, valuePath.join('.'));
            }
        }
    }
    setValueFromPath(path, value, settings) {
        var _a;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { media: this.props.media, force: true }));
            console.log('va', valuePath, value);
            (0, object_1.__set)((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath.join('.'), value);
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            (0, object_1.__set)(this.props.specs.values, valuePath, value);
        }
        this.requestUpdate();
    }
    getWidget(type) {
        if (!SSpecsEditorComponent.widgetMap[type]) {
            return;
        }
        if (!this._widgets[type]) {
            this._widgets[type] = SSpecsEditorComponent.widgetMap[type](this);
        }
        if (!this._widgets[type]._eventsInited && this._widgets[type].events) {
            for (let [event, cb] of Object.entries(this._widgets[type].events)) {
                this.addEventListener(event, (e) => {
                    e.$scope = (0, dom_1.__querySelectorUp)(e.target, ($elm) => {
                        return $elm.classList.contains(this.componentUtils.className('__child'));
                    });
                    this._widgets[type].events[event](e);
                });
            }
            this._widgets[type]._eventsInited = true;
        }
        return this._widgets[type];
    }
    _update(e, path, propSpecs) {
        // value path
        const valuePath = path.filter((v) => v !== 'props').join('.');
        switch (e.target.tagName.toLowerCase()) {
            default:
                if (e.target.value === propSpecs.default) {
                    (0, object_1.__delete)(this.props.specs.values, valuePath);
                }
                else {
                    this.setValueFromPath(path, e.target.value);
                }
                break;
        }
        this.componentUtils.dispatchEvent('update', {
            detail: {
                propSpecs: Object.assign({}, propSpecs),
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
    }
    _toggle(id) {
        if (!this.state.actives[id]) {
            this.state.actives[id] = true;
        }
        else {
            this.state.actives[id] = false;
        }
        this.requestUpdate();
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
        // @ts-ignore
        this.requestUpdate();
    }
    /**
     * Remove an item in a repeatable one
     */
    _removeItem(stack, item, specs) {
        if (Array.isArray(stack)) {
            stack.splice(stack.indexOf(item), 1);
        }
        // @ts-ignore
        this.requestUpdate();
    }
    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    _renderLabel(propObj, path) {
        var _a, _b, _c;
        return (0, lit_1.html) `
            <span>
                ${propObj.description
            ? (0, lit_1.html) `
                          <span
                              class="${this.componentUtils.className('__help-icon')} s-tooltip-container"
                          >
                              <i class="fa-solid fa-circle-question"></i>
                              <div
                                  class="s-tooltip s-tooltip--left s-color s-color--accent"
                              >
                                  ${propObj.description}
                              </div>
                          </span>
                      `
            : ''}
                ${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}
                ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) &&
            this.isPathResponsive(path)
            ? (0, lit_1.html) `
                          <div
                              class="${this.componentUtils.className('__media-icons')}"
                          >
                              ${Object.keys(this.props.frontspec.media.queries).map((media) => {
                const mediaValue = this.getValueFromPath(path, {
                    media,
                    returnDefault: false,
                });
                return (0, lit_1.html) `
                                      <span
                                          class="${this.componentUtils.className('__media-icon')} ${mediaValue !== undefined
                    ? 'active'
                    : ''} ${this.props.media === media
                    ? 'current'
                    : ''}"
                                      >
                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[media])}
                                      </span>
                                  `;
            })}
                          </div>
                      `
            : ''}
            </span>
        `;
    }
    _renderSelectElement(propObj, path) {
        var _a, _b, _c;
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => this._update(e, path, propObj)}
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className('__select', 's-select')}"
                        placeholder="${(_c = (_b = propObj.default) !== null && _b !== void 0 ? _b : propObj.title) !== null && _c !== void 0 ? _c : propObj.id}"
                        path="${path.join('.')}"
                    >
                        ${propObj.options.map((option) => (0, lit_1.html) `
                                <option
                                    value="${option.value}"
                                    ?selected=${option.value === String(value)}
                                >
                                    ${option.name}
                                </option>
                            `)}
                    </select>
                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
    _renderCheckboxElement(propObj, path) {
        var _a, _b;
        const value = (_b = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.value) !== null && _b !== void 0 ? _b : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--checkbox')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label')}"
                >
                    <input
                        @change=${(e) => this._update(e, path, propObj)}
                        type="checkbox"
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className('__checkbox', 's-switch')}"
                        path="${path.join('.')}"
                        checked?=${value}
                    />
                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
    _renderTextElement(propObj, path) {
        var _a, _b, _c, _d;
        const value = (_b = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.value) !== null && _b !== void 0 ? _b : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--text')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => this._update(e, path, propObj)}
                        type="text"
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className('__input', 's-input')}"
                        placeholder="${(_d = (_c = propObj.default) !== null && _c !== void 0 ? _c : propObj.title) !== null && _d !== void 0 ? _d : propObj.id}"
                        path="${path.join('.')}"
                        value="${value}"
                    />
                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
    /**
     * Render the proper widget depending on the "type" propObj property
     */
    _renderEditWidget(propObj, path) {
        var _a;
        const type = propObj.type.toLowerCase(), widget = this.getWidget(type);
        if (!widget) {
            return '';
        }
        return widget.html(propObj, (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : {});
    }
    _renderElement(propObj, path) {
        return (0, lit_1.html) `
            ${propObj.type.toLowerCase() === 'text'
            ? this._renderTextElement(propObj, path)
            : propObj.type.toLowerCase() === 'select'
                ? this._renderSelectElement(propObj, path)
                : propObj.type.toLowerCase() === 'checkbox'
                    ? this._renderCheckboxElement(propObj, path)
                    : ''}
        `;
    }
    _renderElements(specs, path = [], forceNoRepeat = false) {
        var _a;
        // const _specs = __get(specs, path.join('.'));
        const _specs = specs;
        if (!forceNoRepeat && _specs.type.match(/(\{\}|\[\])/)) {
            const loopOn = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : [];
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
                                    ${this._renderElements(specs, [...path, i], true)}
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

                                ${this._renderEditWidget(propObj, !forceNoRepeat
                        ? [...path, 'props', prop]
                        : path)}
                                ${this._renderElements(propObj, [...path, 'props', prop], forceNoRepeat)}
                            </div>
                        `;
                }
                else {
                    return (0, lit_1.html) `
                            <div
                                prop="${propObj.id}"
                                class="${this.componentUtils.className('__prop')}"
                            >
                                ${this._renderElement(propObj, [
                        ...path,
                        'props',
                        prop,
                    ])}
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
                              ${this._renderElements(this.props.specs, [])}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponent;
SSpecsEditorComponent.widgetMap = {
    image: imageWidget_1.default,
};
SSpecsEditorComponent.state = {
    actives: {},
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBb0U7QUFFcEUscUZBQWlHO0FBQ2pHLDZFQUEwRjtBQUUxRixpREFBNEQ7QUFDNUQsdURBQXlEO0FBQ3pELHVEQUEwRDtBQUMxRCw2QkFBMkM7QUFDM0Msa0VBQTJEO0FBQzNELGdIQUEwRjtBQUUxRixhQUFhO0FBQ2Isb0hBQXFFLENBQUMsK0JBQStCO0FBRXJHLHNEQUFnQztBQW90QlgsaUJBcHRCZCxnQkFBUSxDQW90Qlk7QUFsdEIzQix3RUFBa0Q7QUFFbEQsYUFBYTtBQUNiLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQUNoQyxJQUFBLDZCQUEwQixHQUFFLENBQUM7QUFnQjdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUVILE1BQXFCLHFCQUFzQixTQUFRLHlCQUFlO0lBd0I5RDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFNBQVMsRUFBRSx3Q0FBZ0M7U0FDOUMsQ0FBQyxDQUNMLENBQUM7UUFSTixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBU2QsQ0FBQztJQTlCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3Q0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFNRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxzQ0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBaUJELE9BQU8sQ0FBQyxpQkFBdUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVyQyxJQUFJLGlC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