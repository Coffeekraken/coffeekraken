"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_i18n_1 = require("@coffeekraken/s-i18n");
const object_1 = require("@coffeekraken/sugar/object");
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const dom_1 = require("@coffeekraken/sugar/dom");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_dropzone_component_1 = require("@coffeekraken/s-dropzone-component");
const s_wysiwyg_component_1 = require("@coffeekraken/s-wysiwyg-component");
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const object_2 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SSpecsEditorComponentInterface_1 = __importDefault(require("./interface/SSpecsEditorComponentInterface"));
// @ts-ignore
const s_specs_editor_component_css_1 = __importDefault(require("../../../../src/css/s-specs-editor-component.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
const checkboxWidget_1 = __importDefault(require("./widgets/checkboxWidget"));
const colorPickerWidget_1 = __importDefault(require("./widgets/colorPickerWidget"));
const datetimePickerWidget_1 = __importDefault(require("./widgets/datetimePickerWidget"));
const htmlWidget_1 = __importDefault(require("./widgets/htmlWidget"));
const imageWidget_1 = __importDefault(require("./widgets/imageWidget"));
const integerWidget_1 = __importDefault(require("./widgets/integerWidget"));
const numberWidget_1 = __importDefault(require("./widgets/numberWidget"));
const selectWidget_1 = __importDefault(require("./widgets/selectWidget"));
const spacesWidget_1 = __importDefault(require("./widgets/spacesWidget"));
const switchWidget_1 = __importDefault(require("./widgets/switchWidget"));
const textWidget_1 = __importDefault(require("./widgets/textWidget"));
const videoWidget_1 = __importDefault(require("./widgets/videoWidget"));
const wysiwygWidget_1 = __importDefault(require("./widgets/wysiwygWidget"));
// components
(0, s_dropzone_component_1.define)();
(0, s_color_picker_component_1.define)();
(0, s_datetime_picker_component_1.define)();
(0, s_wysiwyg_component_1.define)();
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
 * @event           s-specs-editor.change               Dispatched when the user has changed some properties
 * @event           s-specs-editor.error                Dispatched when an error has occured in any widget
 * @event           s-specs-editor.warning                Dispatched when a warning has occured in any widget
 * @event           s-spect-editor.valid                Dispathched when theirs no more errors in the editor
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
        this.status = {
            pristine: true,
            valid: true,
        };
        this._isValid = true;
        this._isPristine = true;
        this._widgets = {};
    }
    mount() {
        var _a, _b;
        if (!this._values) {
            this._values = Object.assign({}, (_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {});
        }
        for (let [key, propObj] of Object.entries(this.props.specs.props)) {
            if (this._values[key] === undefined) {
                if ((_b = propObj.type) === null || _b === void 0 ? void 0 : _b.match(/\[\]$/)) {
                    this._values[key] = [];
                }
                else {
                    this._values[key] = {};
                }
            }
        }
    }
    firstUpdated() {
        var _a;
        for (let [dotPath, widget] of Object.entries(this._widgets)) {
            (_a = widget.firstUpdated) === null || _a === void 0 ? void 0 : _a.call(widget);
        }
    }
    isPathResponsive(path) {
        const currentPath = [];
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            currentPath.push(part);
            const propObj = (0, object_1.__get)(this.props.specs, currentPath.join('.'));
            if (propObj === null || propObj === void 0 ? void 0 : propObj.responsive) {
                return true;
            }
        }
        return false;
    }
    isPathRepeatable(path) {
        const propObj = (0, object_1.__get)(this.props.specs, path.join('.'));
        if (!(propObj === null || propObj === void 0 ? void 0 : propObj.type)) {
            return false;
        }
        return propObj.type.match(/\[\]$/) !== null;
    }
    hasErrors() {
        if (this.status.pristine) {
            _console.log('Pristing');
            return false;
        }
        let hasErrors = false;
        for (let [dotpath, widget] of Object.entries(this._widgets)) {
            if (widget.hasErrors()) {
                hasErrors = true;
            }
        }
        return hasErrors;
    }
    getValuePath(path, settings) {
        if (!Array.isArray(path)) {
            path = path.split('.');
        }
        const finalSettings = Object.assign({ media: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        let currentPath = [], noneMediaValuePath = [], mediaValuePath = [];
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            if (part !== 'props') {
                noneMediaValuePath.push(part);
                mediaValuePath.push(part);
            }
            currentPath.push(part);
            const propObj = (0, object_1.__get)(this.props.specs, currentPath.join('.'));
            if (typeof path[i + 1] === 'number') {
                // repeatable
                mediaValuePath.push(path[i + 1]);
                currentPath.push(path[i + 1]);
                // skip the repeatable number path part
                i++;
            }
            if (propObj === null || propObj === void 0 ? void 0 : propObj.responsive) {
                if (finalSettings.media) {
                    mediaValuePath.push('media');
                    mediaValuePath.push(finalSettings.media);
                }
            }
        }
        noneMediaValuePath = noneMediaValuePath.filter((p) => p !== 'props');
        mediaValuePath = mediaValuePath.filter((p) => p !== 'props');
        if (finalSettings.noneResponsive) {
            return noneMediaValuePath;
        }
        return mediaValuePath !== null && mediaValuePath !== void 0 ? mediaValuePath : noneMediaValuePath;
    }
    getValue(path, settings) {
        const finalSettings = Object.assign({ default: undefined, media: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        let value;
        // specify the media if the path is responsive
        if (!finalSettings.media && this.isPathResponsive(path)) {
            finalSettings.media = this.props.media;
        }
        let valuePath = this.getValuePath(path, finalSettings);
        // if (path.includes('images')) {
        //     _console.log('AAA', path, valuePath, finalSettings);
        // }
        if (this.isPathRepeatable(path)) {
            value = (0, object_1.__get)(this._values, valuePath);
            if (value === undefined && finalSettings.default) {
                value = (0, object_1.__set)(this._values, valuePath, finalSettings.default);
            }
            return value;
        }
        // if (path.includes('images')) {
        //     _console.log('value path', path, valuePath);
        // }
        value = (0, object_1.__get)(this._values, valuePath);
        if (value === undefined && finalSettings.default) {
            value = (0, object_1.__set)(this._values, valuePath, finalSettings.default);
        }
        return value;
    }
    clearValue(path, settings) {
        this.setValue(path, null, settings);
        this.requestUpdate();
    }
    setValue(path, value, settings) {
        if (!Array.isArray(path)) {
            path = path.split('.');
        }
        const finalSettings = Object.assign({ media: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        if (!(finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.media) && this.isPathResponsive(path)) {
            finalSettings.media = this.props.media;
        }
        // handle responsive values
        const valuePath = this.getValuePath(path, Object.assign({ media: this.props.media }, finalSettings));
        // _console.log('SET', value, path, valuePath, finalSettings);
        const currentValue = (0, object_1.__get)(this._values, valuePath);
        if (finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.merge) {
            (0, object_1.__set)(this._values, valuePath, (0, object_2.__deepMerge)(currentValue, value), {
                preferAssign: true,
            });
        }
        else {
            // _console.log('SSSSSSSSS', this._values, valuePath, value);
            (0, object_1.__set)(this._values, valuePath, value, {
                preferAssign: true,
            });
        }
        this.requestUpdate();
    }
    getWidget(type, path, propObj, settings) {
        var _a;
        const dotPath = path.filter((l) => l !== 'props').join('.');
        if (this._widgets[dotPath]) {
            return this._widgets[dotPath];
        }
        if (!SSpecsEditorComponent.widgetMap[type]) {
            return;
        }
        const finalSettings = Object.assign({ label: !propObj.repeatable || ((_a = propObj.type) === null || _a === void 0 ? void 0 : _a.match(/\[\]$/)) !== null }, (settings !== null && settings !== void 0 ? settings : {}));
        const values = (0, object_1.__get)(this._values, dotPath);
        this._widgets[dotPath] = new SSpecsEditorComponent.widgetMap[type]({
            editor: this,
            values,
            propObj,
            path,
            settings: finalSettings,
        });
        return this._widgets[dotPath];
    }
    /**
     * Apply changes
     */
    apply() {
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this._values),
            },
        });
        this.requestUpdate();
    }
    /**
     * Save the data.
     * This will dispatch en event "s-specs-editor.save" with as detail the current values object
     */
    save() {
        // no more pristine....
        this.status.pristine = false;
        this.requestUpdate();
        if (this.hasErrors()) {
            return this.requestUpdate();
        }
        const data = {
            specs: Object.assign({}, this.props.specs),
            values: Object.assign({}, this._values),
        };
        _console.log('SAVE', data);
        this.utils.dispatchEvent('save', {
            bubbles: true,
            detail: data,
        });
    }
    /**
     * Check if the passed media is the default one specified in the props.defaultMedia
     */
    isDefaultMedia(media = this.props.media) {
        return media === this.props.defaultMedia;
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
    _addItem(stack, specs, path) {
        _console.log('add', stack, specs, path);
        switch (specs.type.toLowerCase()) {
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
        this.apply();
    }
    /**
     * Changing media
     */
    _changeMedia(media) {
        this.props.media = media;
        this.utils.dispatchEvent('changeMedia', {
            detail: media,
        });
        this.requestUpdate();
    }
    /**
     * Render the media selector
     */
    _renderMediaSelector(path) {
        var _a;
        if (!((_a = this.props.frontspec) === null || _a === void 0 ? void 0 : _a.media)) {
            return '';
        }
        const widget = this._widgets[path.filter((l) => l !== 'props').join('.')];
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_media-icons')}">
                ${Object.keys(s_theme_1.default.sortMedia(this.props.frontspec.media).queries)
            .reverse()
            .map((media) => {
            return (0, lit_1.html) `
                            <span
                                class="${this.utils.cls('_media-icon')} ${(widget === null || widget === void 0 ? void 0 : widget.hasValuesForMedia(media))
                ? 'active'
                : ''} ${this.props.media === media
                ? 'current'
                : ''} s-tooltip-container"
                            >
                                <span
                                    @pointerup=${() => this._changeMedia(media)}
                                >
                                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[media])}
                                </span>
                                <span class="s-tooltip"
                                    >${(0, string_1.__upperFirst)(media)}</span
                                >
                            </span>
                        `;
        })}
            </div>
        `;
    }
    /**
     * Render an error inside the specs editor
     */
    renderError(propObj, path, message) {
        if (!message) {
            return '';
        }
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_error')}">
                <p class="_message">${message}</p>
            </div>
        `;
    }
    /**
     * Render a warning inside the specs editor
     */
    renderWarning(propObj, path, message) {
        if (!message) {
            return '';
        }
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_warning')}">
                <p class="_message">${message}</p>
            </div>
        `;
    }
    /**
     * Render a copy button
     */
    renderCopyButton(text, tooltip = 'Copy') {
        return (0, lit_1.html) `
            <button
                class="copy-btn s-tooltip-container"
                @pointerup=${(e) => {
            // copy url
            (0, clipboard_1.__copy)(text);
            (0, dom_1.__addClassTimeout)('success', e.currentTarget, 1000);
        }}
            >
                <span class="_pending"
                    >${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.copy)}</span
                >
                <span class="_success"
                    >${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.success)}</span
                >
                ${tooltip
            ? (0, lit_1.html) ` <div class="s-tooltip">${tooltip}</div> `
            : ''}
            </button>
        `;
    }
    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    renderLabel(propObj, path, settings) {
        var _a, _b, _c;
        const finalSettings = Object.assign({ tooltip: 'left' }, (settings !== null && settings !== void 0 ? settings : {}));
        return (0, lit_1.html) `
            <span>
                <h3 class="_title">
                    ${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}
                    ${propObj.required
            ? (0, lit_1.html) ` <span class="_required">*</span> `
            : ''}
                </h3>
                ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) &&
            this.isPathResponsive(path)
            ? this._renderMediaSelector(path)
            : ''}
                ${propObj.description
            ? (0, lit_1.html) `
                          <span class="_help-icon s-tooltip-container">
                              <i class="fa-solid fa-circle-question"></i>
                              <div
                                  class="s-tooltip s-tooltip--${finalSettings.tooltip}"
                              >
                                  ${propObj.description}
                              </div>
                          </span>
                      `
            : ''}
            </span>
        `;
    }
    updated(changedProperties) {
        if (this.hasErrors()) {
            this.classList.add('error');
            this.utils.dispatchEvent('error', {
                detail: {},
            });
            if (this._isValid) {
                this._isValid = false;
                this.requestUpdate();
            }
        }
        else {
            this.classList.remove('error');
            this.utils.dispatchEvent('valid', {
                detail: {},
            });
            if (!this._isValid) {
                this._isValid = true;
                this.requestUpdate();
            }
        }
        if (changedProperties.has('media')) {
            this.requestUpdate();
        }
    }
    renderWidget(propObj, path, settings) {
        var _a, _b, _c;
        const type = (_c = (_b = (_a = propObj.widget) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : propObj.type.toLowerCase(), widget = this.getWidget(type, path, propObj, {});
        return (0, lit_1.html) `
            ${(widget === null || widget === void 0 ? void 0 : widget.render)
            ? (0, lit_1.html) ` <div class="${this.utils.cls('_widget')}">
                      ${widget.render()}
                  </div>`
            : ''}
            ${(widget === null || widget === void 0 ? void 0 : widget.hasErrors())
            ? this.renderError(propObj, path, widget.lastError)
            : ''}
            ${(widget === null || widget === void 0 ? void 0 : widget.hasWarnings())
            ? this.renderWarning(propObj, path, widget.lastWarning)
            : ''}
        `;
    }
    renderProp(propObj, path, settings) {
        const typeLower = propObj.type.toLowerCase();
        // handle repeatable props
        if (typeLower.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableProps(propObj, path);
        }
        // _console.log('p', path, propObj.responsive);
        return (0, lit_1.html) `
            <div
                prop="${propObj.id}"
                class="${this.utils.cls('_prop')} ${this.utils.cls(`_prop-${typeLower}`)}"
            >
                ${this.renderWidget(propObj, path, settings)}
            </div>
        `;
    }
    _renderRepeatableProps(propObj, path) {
        const loopOn = this.getValue(path, {
            default: [],
            noneResponsive: true,
        });
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_repeatable')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.renderLabel(propObj, path)}
                </label>

                ${loopOn.map((v, i) => {
            var _a, _b, _c;
            return (0, lit_1.html) `
                        <div
                            tabindex="0"
                            @pointerup=${(e) => {
                this._toggle(`${path.join('.')}-${i}`);
            }}
                            class="${this.utils.cls('_repeatable-title')} ${this._isActive(`${path.join('.')}-${i}`)
                ? 'active'
                : ''}"
                        >
                            <span>
                                ${(_c = (_b = (_a = v.title) !== null && _a !== void 0 ? _a : v.name) !== null && _b !== void 0 ? _b : v.id) !== null && _c !== void 0 ? _c : `${propObj.title} #${i}`}
                            </span>

                            <button
                                confirm="Confirm!"
                                @pointerup=${(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.currentTarget.needConfirmation)
                    return;
                this._removeItem(loopOn, v, propObj);
            }}
                                class="_remove"
                            >
                                <i class="fa-regular fa-trash-can"></i>
                            </button>

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
                                class="${this.utils.cls('_repeatable-item-props')}"
                            >
                                ${this.renderProps(Object.assign(Object.assign({}, propObj), { repeatable: true, type: propObj.type.replace(/\[\]$/, '') }), [...path, i], {
                repeatable: false,
            })}
                            </div>
                        </div>
                    `;
        })}

                <div class="${this.utils.cls('_repeatable-actions')}">
                    <button
                        @pointerup=${() => this._addItem(loopOn, propObj, [
            ...path,
            loopOn.length,
        ])}
                        class="_add"
                    >
                        Add a ${(0, string_1.__lowerFirst)(propObj.title).replace(/s$/, '')}
                        ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.add)}
                    </button>
                </div>
            </div>
        `;
    }
    renderProps(specs, path = [], settings) {
        const finalSettings = Object.assign({ repeatable: true, widgets: true }, (settings !== null && settings !== void 0 ? settings : {}));
        if (finalSettings.repeatable && specs.type.match(/(\[\])/)) {
            return this._renderRepeatableProps(specs, path);
        }
        else {
            if (!specs.props) {
                return this.renderProp(specs, path, finalSettings);
            }
            return (0, lit_1.html) `
                ${Object.keys(specs.props).map((prop) => {
                const propObj = specs.props[prop];
                if (propObj.props) {
                    return (0, lit_1.html) `
                            <div class="${this.utils.cls('_child')}">
                                <div class="${this.utils.cls('_child-metas')}">
                                    <div
                                        class="${this.utils.cls('_child-heading')}"
                                    >
                                        <h3
                                            class="${this.utils.cls('_child-title')}"
                                        >
                                            ${propObj.title}
                                        </h3>
                                        <div
                                            class="${this.utils.cls('_child-media')}"
                                        >
                                            ${this.isPathResponsive([
                        ...path,
                        'props',
                        prop,
                    ])
                        ? this._renderMediaSelector([
                            ...path,
                            'props',
                            prop,
                        ])
                        : ''}
                                        </div>
                                    </div>
                                    <!-- <p
                                        class="${this.utils.cls('_child-description')}"
                                    >
                                        ${propObj.description}
                                    </p> -->
                                </div>
                                <div
                                    prop="${propObj.id}"
                                    class="${this.utils.cls('_prop')}"
                                >
                                    ${this.renderProp(propObj, [...path, 'props', prop], finalSettings)}
                                </div>
                            </div>
                        `;
                }
                else {
                    return this.renderProp(propObj, [...path, 'props', prop], finalSettings);
                }
            })}
            `;
        }
    }
    render() {
        var _a, _b;
        return (0, lit_1.html) `
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
                                  ${((_a = this.props.features) === null || _a === void 0 ? void 0 : _a.delete)
                ? (0, lit_1.html) `
                                            <button
                                                class="_action _action-delete"
                                                confirm="Confirm?"
                                                @click=${() => {
                    this.save();
                }}
                                            >
                                                ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.delete)}
                                            </button>
                                        `
                : ''}
                                  ${((_b = this.props.features) === null || _b === void 0 ? void 0 : _b.save)
                ? (0, lit_1.html) `
                                            <button
                                                class="_action _action-save ${this.hasErrors()
                    ? 'error'
                    : ''}"
                                                @click=${() => {
                    this.save();
                }}
                                                ?disabled=${!this._isValid}
                                            >
                                                ${(0, s_i18n_1.__i18n)('Save', {
                    id: 's-specs-editor.actions.save',
                })}
                                            </button>
                                        `
                : ''}
                              </nav>
                          </div>
                          ${this.renderProps(this.props.specs, [])}
                      </div>
                  `
            : ''}
        `;
    }
}
exports.default = SSpecsEditorComponent;
SSpecsEditorComponent.widgetMap = {
    checkbox: checkboxWidget_1.default,
    html: htmlWidget_1.default,
    boolean: switchWidget_1.default,
    image: imageWidget_1.default,
    integer: integerWidget_1.default,
    number: numberWidget_1.default,
    spaces: spacesWidget_1.default,
    switch: switchWidget_1.default,
    color: colorPickerWidget_1.default,
    date: datetimePickerWidget_1.default,
    datetime: datetimePickerWidget_1.default,
    time: datetimePickerWidget_1.default,
    string: textWidget_1.default,
    text: textWidget_1.default,
    select: selectWidget_1.default,
    wysiwyg: wysiwygWidget_1.default,
    video: videoWidget_1.default,
};
SSpecsEditorComponent.state = {
    actives: {},
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxpREFBOEM7QUFFOUMsdURBQTBEO0FBRTFELDZEQUF1RDtBQUN2RCxpREFBNEQ7QUFFNUQscUZBQWlHO0FBQ2pHLDJGQUF1RztBQUN2Ryw2RUFBMEY7QUFDMUYsMkVBQXdGO0FBRXhGLG9FQUE2QztBQUk3Qyx1REFBeUQ7QUFDekQsdURBQXdFO0FBQ3hFLDZCQUEyQztBQUMzQyxrRUFBMkQ7QUFDM0QsZ0hBQTBGO0FBRTFGLGFBQWE7QUFDYixvSEFBcUUsQ0FBQywrQkFBK0I7QUFFckcsc0RBQWdDO0FBdTlCWCxpQkF2OUJkLGdCQUFRLENBdTlCWTtBQXI5QjNCLDhFQUF3RDtBQUN4RCxvRkFBOEQ7QUFDOUQsMEZBQW9FO0FBQ3BFLHNFQUFnRDtBQUNoRCx3RUFBa0Q7QUFDbEQsNEVBQXNEO0FBQ3RELDBFQUFvRDtBQUNwRCwwRUFBb0Q7QUFDcEQsMEVBQW9EO0FBQ3BELDBFQUFvRDtBQUNwRCxzRUFBZ0Q7QUFDaEQsd0VBQWtEO0FBQ2xELDRFQUFzRDtBQUV0RCxhQUFhO0FBQ2IsSUFBQSw2QkFBMEIsR0FBRSxDQUFDO0FBQzdCLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQUNoQyxJQUFBLG9DQUFnQyxHQUFFLENBQUM7QUFDbkMsSUFBQSw0QkFBeUIsR0FBRSxDQUFDO0FBcUQ1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvRUc7QUFFSCxNQUFxQixxQkFBc0IsU0FBUSx5QkFBZTtJQUM5RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3Q0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFzQkQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElB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