"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const s_dropzone_component_1 = require("@coffeekraken/s-dropzone-component");
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
const spacesWidget_1 = __importDefault(require("./widgets/spacesWidget"));
// components
(0, s_dropzone_component_1.define)();
/**
 * @name                SSpecsEditorComponent
 * @as                  Specs editor
 * @___namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSpecsEditorComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-clipboard-copy
 * @platform            html
 * @status              beta
 * @private
 *
 * This component represent a simple, fully features "specs" (properties) editor. With it you will be able to pass it a `.spec.json` object
 * and it will build for you a complete editor
 *
 * @feature           Framework agnostic (webcomponent)
 * @feature           Generate a fully featured specs (.spec.json) editor
 * @feature             And more...
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           s-specs-editor.update               Dispatched when the user has updated some properties
 * @event           s-specs-editor.changeMedia         Dispatched when the user has changed the media from the UI
 * @event           s-specs-editor                      Dispatched at any events. Check the "eventType" property for the event name
 *
 * @todo            documentation
 *
 * @import          import { define as __SSpecsEditorComponentDefine } from '@coffeekraken/s-clipboard-copy-component';
 *
 * @snippet         __SSpecsEditorComponentDegine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-clipboard-copy-component
 *
 * @install           js
 * import { define as __SSpecsEditorComponentDefine } from '@coffeekraken/s-clipboard-copy-component';
 * __SSpecsEditorComponentDefine();
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
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SSpecsEditorComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_specs_editor_component_css_1.default)}
        `;
    }
    constructor() {
        super((0, object_2.__deepMerge)({
            name: 's-specs-editor',
            interface: SSpecsEditorComponentInterface_1.default,
        }));
        this._widgets = {};
    }
    updated(changedProperties) {
        if (changedProperties.has('media')) {
            this.requestUpdate();
        }
    }
    mount() { }
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
        const finalSettings = Object.assign({ media: null, force: false }, (settings !== null && settings !== void 0 ? settings : {}));
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
        else {
            // non media "responsive"
            const noneMediaValue = (0, object_1.__get)(this.props.specs.values, noneMediaValuePath.join('.'));
            if (finalSettings.force || noneMediaValue !== undefined) {
                return noneMediaValuePath;
            }
        }
    }
    getValueFromPath(path, settings) {
        if (this.isPathResponsive(path)) {
            const finalSettings = Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {}));
            const valuePath = this.getValuePathFromPath(path, finalSettings);
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
    clearValueFromPath(path, settings) {
        var _a;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {})));
            (0, object_1.__deleteProperty)((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath.join('.'));
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            (0, object_1.__deleteProperty)(this.props.specs.values, valuePath);
        }
        this._update(path);
        this.requestUpdate();
    }
    setValueFromPath(path, value, settings) {
        var _a;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, Object.assign({ media: this.props.media, force: true }, (settings !== null && settings !== void 0 ? settings : {})));
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
                        return $elm.classList.contains(this.utils.cls('_child'));
                    });
                    this._widgets[type].events[event](e);
                });
            }
            this._widgets[type]._eventsInited = true;
        }
        return this._widgets[type];
    }
    /**
     * Save the data.
     * This will dispatch en event "s-specs-editor.save" with as detail the current values object
     */
    save() {
        this.utils.dispatchEvent('save', {
            bubbles: true,
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
    }
    _update(path, propSpecs = null, e = null) {
        // value path
        const valuePath = path.filter((v) => v !== 'props').join('.');
        if (e) {
            let finalValue = e.target.value;
            if (e.currentTarget.type === 'checkbox') {
                finalValue = e.currentTarget.checked;
            }
            switch (e.target.tagName.toLowerCase()) {
                default:
                    // @TODO            check to handle "default" in render part and not here...
                    // if (finalValue === propSpecs.default) {
                    //     __deleteProperty(this.props.specs.values, valuePath);
                    // } else {
                    this.setValueFromPath(path, finalValue);
                    // }
                    break;
            }
        }
        this.utils.dispatchEvent('update', {
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
        this.requestUpdate();
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
     * Changing media
     */
    _changeMedia(media) {
        this.props.media = media;
        this.utils.dispatchEvent('changeMedia', {
            detail: media,
        });
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
                              class="${this.utils.cls('_help-icon')} s-tooltip-container"
                          >
                              <i class="fa-solid fa-circle-question"></i>
                              <div class="s-tooltip s-tooltip--left">
                                  ${propObj.description}
                              </div>
                          </span>
                      `
            : ''}
                ${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}
                ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) &&
            this.isPathResponsive(path)
            ? (0, lit_1.html) `
                          <div class="${this.utils.cls('_media-icons')}">
                              ${Object.keys(s_theme_1.default.sortMedia(this.props.frontspec.media)
                .queries)
                .reverse()
                .map((media) => {
                const mediaValue = this.getValueFromPath(path, {
                    media,
                });
                return (0, lit_1.html) `
                                          <span
                                              class="${this.utils.cls('_media-icon')} ${mediaValue !== undefined &&
                    mediaValue !== null
                    ? 'active'
                    : ''} ${this.props.media ===
                    media
                    ? 'current'
                    : ''} s-tooltip-container"
                                          >
                                              <span
                                                  @pointerup=${() => this._changeMedia(media)}
                                              >
                                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[media])}
                                              </span>
                                              ${mediaValue !== undefined
                    ? (0, lit_1.html) `
                                                        <div
                                                            class="s-tooltip s-tooltip--interactive s-color s-color--accent ${this.utils.cls('_actions')}"
                                                        >
                                                            <button
                                                                class="_action"
                                                                @pointerup=${() => this.clearValueFromPath(path, {
                        media,
                    })}
                                                            >
                                                                ${(0, unsafe_html_js_1.unsafeHTML)(this.props
                        .icons
                        .clear)}
                                                            </button>
                                                        </div>
                                                    `
                    : ''}
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
            <div class="${this.utils.cls('_prop--select')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => this._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_select', 's-select')}"
                        placeholder="${(_c = (_b = propObj.default) !== null && _b !== void 0 ? _b : propObj.title) !== null && _c !== void 0 ? _c : propObj.id}"
                        path="${path.join('.')}"
                        .value="${value}"
                        value="${value}"
                    >
                        ${propObj.options.map((option) => (0, lit_1.html) `
                                <option
                                    .value="${option.value}"
                                    value="${option.value}"
                                    ?selected=${(!value &&
            option.value === null) ||
            option.value === String(value)}
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
        var _a;
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_prop--checkbox')}">
                <label class="${this.utils.cls('_label', 's-label')}">
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
                        type="checkbox"
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_checkbox', 's-switch')}"
                        path="${path.join('.')}"
                        ?checked=${value !== false &&
            value !== null &&
            value !== undefined}
                    />

                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
    _renderTextElement(propObj, path) {
        var _a, _b, _c;
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_prop--text')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
                        type="text"
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_input', 's-input')}"
                        placeholder="${(_c = (_b = propObj.default) !== null && _b !== void 0 ? _b : propObj.title) !== null && _c !== void 0 ? _c : propObj.id}"
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
    _getRenderedWidget(propObj, path) {
        var _a, _b, _c, _d;
        const type = (_c = (_b = (_a = propObj.widget) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : propObj.type.toLowerCase(), widget = this.getWidget(type);
        if (!widget) {
            return;
        }
        return {
            hideOriginals: widget.hideOriginals,
            html: widget.html(propObj, (_d = this.getValueFromPath(path)) !== null && _d !== void 0 ? _d : {}),
        };
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
                <div class="${this.utils.cls('_repeatable')}">
                    ${loopOn.map((v, i) => {
                var _a, _b, _c;
                return (0, lit_1.html) `
                            <div
                                tabindex="0"
                                @pointerup=${() => this._toggle(`${path.join('.')}-${i}`)}
                                class="${this.utils.cls('_repeatable-title')} ${this._isActive(`${path.join('.')}-${i}`)
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
                                class="${this.utils.cls('_repeatable-item')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                            >
                                <div
                                    class="${this.utils.cls('_repeatable-item-actions')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                                >
                                    <button
                                        @pointerup=${() => this._removeItem(loopOn, v, _specs)}
                                        class="${this.utils.cls('_repeatable-remove', 's-badge s-color s-color--error')}"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div
                                    class="${this.utils.cls('_repeatable-item-props')}"
                                >
                                    ${this._renderElements(specs, [...path, i], true)}
                                </div>
                            </div>
                        `;
            })}

                    <div class="${this.utils.cls('_repeatable-actions')}">
                        <button
                            @pointerup=${() => this._addItem(loopOn, _specs)}
                            class="${this.utils.cls('_btn', 's-btn')}"
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
                    const renderedWidget = this._getRenderedWidget(propObj, !forceNoRepeat ? [...path, 'props', prop] : path);
                    return (0, lit_1.html) `
                            <div class="${this.utils.cls('_child')}">
                                <h3
                                    class="${this.utils.cls('_child-title', 's-typo--h5')}"
                                >
                                    ${propObj.title}
                                </h3>
                                <p
                                    class="${this.utils.cls('_child-description', 's-typo--p')}"
                                >
                                    ${propObj.description}
                                </p>

                                ${renderedWidget
                        ? (0, lit_1.html) ` ${renderedWidget.html} `
                        : ''}

                                <div
                                    style="display: ${(renderedWidget === null || renderedWidget === void 0 ? void 0 : renderedWidget.hideOriginals)
                        ? 'none'
                        : 'block'}"
                                >
                                    ${this._renderElements(propObj, [...path, 'props', prop], forceNoRepeat)}
                                </div>
                            </div>
                        `;
                }
                else {
                    return (0, lit_1.html) `
                            <div
                                prop="${propObj.id}"
                                class="${this.utils.cls('_prop')}"
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
                class="${(_a = this.cu) === null || _a === void 0 ? void 0 : _a.cls('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
            ? (0, lit_1.html) `
                          <div class="${this.utils.cls('_root')}">
                              <div class="${this.utils.cls('_metas')}">
                                  <h3 class="_title s-typo--h3">
                                      ${this.props.specs.title}
                                  </h3>
                                  <!-- <p
                                      class="${this.utils.cls('_child-description', 's-typo--p')}"
                                  >
                                      ${this.props.specs.description}
                                  </p> -->

                                  <nav class="_actions">
                                      <button
                                          class="_action _action-save"
                                          @click=${() => {
                this.save();
            }}
                                      >
                                          Save
                                      </button>
                                      <button
                                          class="_action _action-delete"
                                          confirm="Confirm?"
                                          @click=${() => {
                this.save();
            }}
                                      >
                                          <i
                                              class="fa-regular fa-trash-can"
                                          ></i>
                                      </button>
                                  </nav>
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
    spaces: spacesWidget_1.default,
};
SSpecsEditorComponent.state = {
    actives: {},
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBNEU7QUFFNUUsNkVBQTBGO0FBRTFGLG9FQUE2QztBQUU3QyxpREFBNEQ7QUFDNUQsdURBQXlEO0FBQ3pELHVEQUEwRDtBQUMxRCw2QkFBMkM7QUFDM0Msa0VBQTJEO0FBQzNELGdIQUEwRjtBQUUxRixhQUFhO0FBQ2Isb0hBQXFFLENBQUMsK0JBQStCO0FBRXJHLHNEQUFnQztBQSt4QlgsaUJBL3hCZCxnQkFBUSxDQSt4Qlk7QUE3eEIzQix3RUFBa0Q7QUFDbEQsMEVBQW9EO0FBRXBELGFBQWE7QUFDYixJQUFBLDZCQUEwQixHQUFFLENBQUM7QUFpQjdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlFRztBQUVILE1BQXFCLHFCQUFzQixTQUFRLHlCQUFlO0lBQzlELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQU9ELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLHNDQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFRRDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFNBQVMsRUFBRSx3Q0FBZ0M7U0FDOUMsQ0FBQyxDQUNMLENBQUM7UUFSTixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBU2QsQ0FBQztJQUVELE9BQU8sQ0FBQyxpQkFBdUM7UUFDM0MsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGFBQWEsRUFB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