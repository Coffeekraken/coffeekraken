"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_i18n_1 = require("@coffeekraken/s-i18n");
const array_1 = require("@coffeekraken/sugar/array");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const dom_1 = require("@coffeekraken/sugar/dom");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_dropzone_component_1 = require("@coffeekraken/s-dropzone-component");
const s_wysiwyg_component_1 = require("@coffeekraken/s-wysiwyg-component");
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const string_1 = require("@coffeekraken/sugar/string");
const object_2 = require("@coffeekraken/sugar/object");
const string_2 = require("@coffeekraken/sugar/string");
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
const layoutWidget_1 = __importDefault(require("./widgets/layoutWidget"));
const linkWidget_1 = __importDefault(require("./widgets/linkWidget"));
const numberWidget_1 = __importDefault(require("./widgets/numberWidget"));
const selectWidget_1 = __importDefault(require("./widgets/selectWidget"));
const spacesWidget_1 = __importDefault(require("./widgets/spacesWidget"));
const stringWidget_1 = __importDefault(require("./widgets/stringWidget"));
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
 * @event           s-specs-editor.ready                Dispatched when the editor is ready with the editor values
 * @event           s-specs-editor.save                 Dispatched when the user has clicked on the "Save" button on top of the editor
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
    static get state() {
        return {
            actives: {},
            status: {
                pristine: true,
                saving: false,
            },
        };
    }
    /**
     * @name            data
     * @type            Object
     * @get
     *
     * Get the current editor values
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get data() {
        const data = {
            values: (0, object_1.__deepClean)(this._values, {
                clone: true,
            }),
        };
        return {
            uid: this.props.uid,
            values: data.values,
        };
    }
    constructor() {
        super((0, object_2.__deepMerge)({
            name: 's-specs-editor',
            interface: SSpecsEditorComponentInterface_1.default,
        }));
        this._isValid = true;
        this._widgets = {};
        this._toggleStack = [];
        this._nonePathValues = {};
    }
    mount() {
        var _a, _b, _c;
        if (!this._values) {
            this._values = Object.assign({}, (_a = this.props.values) !== null && _a !== void 0 ? _a : {});
        }
        // make sure we have an id
        if (!this._values.id) {
            this._values.id = {
                value: (0, string_1.__uniqid)(),
            };
        }
        for (let [key, propObj] of Object.entries((_b = this.props.specs.props) !== null && _b !== void 0 ? _b : {})) {
            if (this._values[key] === undefined) {
                if ((_c = propObj.type) === null || _c === void 0 ? void 0 : _c.match(/\[\]$/)) {
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
        // notify that the editor is ready
        this._ready();
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
    hasUnsavedChanges() {
        let hasUnsaved = false;
        for (let [dotpath, widget] of Object.entries(this._widgets)) {
            if (hasUnsaved) {
                break;
            }
            if (widget.hasUnsavedChanges()) {
                hasUnsaved = true;
            }
        }
        return hasUnsaved;
    }
    hasErrors() {
        if (this.state.status.pristine) {
            return false;
        }
        let hasErrors = false;
        for (let [dotpath, widget] of Object.entries(this._widgets)) {
            if (hasErrors) {
                break;
            }
            if (widget.hasErrors() && !widget.canBeOverride()) {
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
        if (!finalSettings.responsive) {
            return noneMediaValuePath;
        }
        return mediaValuePath !== null && mediaValuePath !== void 0 ? mediaValuePath : noneMediaValuePath;
    }
    deleteValue(path) {
        (0, object_1.__delete)(this._values, path);
    }
    getValue(path, settings) {
        const finalSettings = Object.assign({ default: undefined, media: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        let value;
        // specify the media if the path is responsive
        if (!finalSettings.media && this.isPathResponsive(path)) {
            finalSettings.media = this.props.media;
        }
        let valuePath = this.getValuePath(path, finalSettings);
        value = (0, object_1.__get)(this._values, valuePath);
        if (value === undefined && finalSettings.default) {
            value = (0, object_1.__set)(this._values, valuePath, finalSettings.default);
        }
        return value;
    }
    getWidget(type, pathOrCallback, propObj, settings) {
        var _a, _b, _c;
        let path, callback, values, valuePath;
        if (typeof pathOrCallback === 'function') {
            callback = pathOrCallback;
        }
        else {
            path = pathOrCallback;
        }
        // when we have passed a value path
        if (path) {
            valuePath = path.filter((l) => l !== 'props');
            values = (0, object_1.__get)(this._values, valuePath);
            if (!values) {
                values = (0, object_1.__set)(this._values, valuePath, {}, {
                    preferAssign: true,
                });
            }
            else if (!(0, is_1.__isPlainObject)(values)) {
                console.error(`<red>[SSpecsEditorComponent]</red> It seems that your value "<cyan>${valuePath.join('.')}</cyan>" is a <yellow>${typeof values}</yellow> but it MUST be an object according to the following specs and values:`);
                console.warn(propObj, values);
                return;
            }
        }
        else {
            if (!this._nonePathValues[propObj.id]) {
                this._nonePathValues[propObj.id] = {};
            }
            values = this._nonePathValues[propObj.id];
        }
        let widgetId = values.id;
        if (!widgetId) {
            Object.defineProperty(values, 'id', {
                value: (0, string_1.__uniqid)(),
                writable: true,
                enumerable: false,
            });
            widgetId = values.id;
        }
        if (this._widgets[widgetId]) {
            return this._widgets[widgetId];
        }
        if (!SSpecsEditorComponent.widgetMap[type]) {
            return;
        }
        const isRepeatable = !propObj.repeatable || ((_a = propObj.type) === null || _a === void 0 ? void 0 : _a.match(/\[\]$/)) !== null;
        const finalSettings = Object.assign({ label: isRepeatable }, (settings !== null && settings !== void 0 ? settings : {}));
        this._widgets[widgetId] = new SSpecsEditorComponent.widgetMap[type]({
            editor: this,
            values,
            source: (0, object_1.__get)((_c = (_b = this.props.source) === null || _b === void 0 ? void 0 : _b.values) !== null && _c !== void 0 ? _c : {}, valuePath),
            propObj,
            pathOrCallback,
            valuePath,
            settings: finalSettings,
        });
        return this._widgets[widgetId];
    }
    apply() {
        clearTimeout(this._applyTimeout);
        this._applyTimeout = setTimeout(() => {
            this.utils.dispatchEvent('change', {
                bubbles: true,
                detail: this.data,
            });
            this.requestUpdate();
        });
    }
    /**
     * Notify through an event that the editor is ready
     */
    _ready() {
        this.utils.dispatchEvent('ready', {
            bubbles: true,
            detail: this.data,
        });
    }
    /**
     * Save the data.
     * This will dispatch en event "s-specs-editor.save" with as detail the current values object
     */
    save(force = false) {
        // no more pristine....
        this.state.status.pristine = false;
        if (!force && this.hasErrors()) {
            return this.requestUpdate();
        }
        // mark all widget as saved
        for (let [dotpath, widget] of Object.entries(this._widgets)) {
            widget.saved();
        }
        this.requestUpdate();
        this.state.status.saving = 'success';
        setTimeout(() => {
            this.state.status.saving = false;
        }, 1000);
        _console.log('save', this.data);
        this.utils.dispatchEvent('save', {
            bubbles: true,
            detail: this.data,
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
    _addItem(stack, propObj, path) {
        const newValue = {};
        Object.defineProperty(newValue, 'id', {
            value: (0, string_1.__uniqid)(),
            writable: true,
            enumerable: false,
        });
        stack.push(newValue);
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
                                    @pointerup=${(e) => {
                e.stopPropagation();
                this._changeMedia(media);
            }}
                                >
                                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[media])}
                                </span>
                                <span class="s-tooltip"
                                    >${(0, string_2.__upperFirst)(media)}</span
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
        var _a, _b, _c, _d, _e, _f;
        const finalSettings = Object.assign({ tooltip: 'left' }, (settings !== null && settings !== void 0 ? settings : {}));
        return (0, lit_1.html) `
            <span>
                <h3 class="_title">
                    ${(0, unsafe_html_js_1.unsafeHTML)((_b = (_a = finalSettings.title) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id)}
                    ${finalSettings.required || propObj.required
            ? (0, lit_1.html) ` <span class="_required">*</span> `
            : ''}
                </h3>
                ${((_d = (_c = this.props.frontspec) === null || _c === void 0 ? void 0 : _c.media) === null || _d === void 0 ? void 0 : _d.queries) && propObj.responsive
            ? this._renderMediaSelector(path)
            : ''}
                ${((_e = finalSettings.description) !== null && _e !== void 0 ? _e : propObj.description)
            ? (0, lit_1.html) `
                          <span class="_help-icon s-tooltip-container">
                              <i class="fa-solid fa-circle-question"></i>
                              <div
                                  class="s-tooltip s-tooltip--${finalSettings.tooltip}"
                              >
                                  ${(_f = finalSettings.description) !== null && _f !== void 0 ? _f : propObj.description}
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
        if (this.hasUnsavedChanges()) {
            this.classList.add('unsaved');
            this.utils.dispatchEvent('unsaved', {
                detail: {},
            });
        }
        else {
            this.classList.remove('unsaved');
            this.utils.dispatchEvent('unsaved', {
                detail: {},
            });
        }
        if (changedProperties.has('media')) {
            this.requestUpdate();
        }
    }
    renderWidget(propObj, pathOrCallback, settings) {
        var _a, _b, _c;
        const type = (_c = (_b = (_a = propObj.widget) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : propObj.type.toLowerCase(), widget = this.getWidget(type, pathOrCallback, propObj, {});
        return (0, lit_1.html) `
            ${(widget === null || widget === void 0 ? void 0 : widget.render)
            ? (0, lit_1.html) ` <div class="${this.utils.cls('_widget')}">
                      ${widget.render()}
                      ${widget.canBeOverride()
                ? (0, lit_1.html) `
                                <div class="_override">
                                    <button
                                        class="_override-btn"
                                        confirm="Are you sure?"
                                        @pointerup=${(e) => {
                    if (e.target.needConfirmation) {
                        return;
                    }
                    widget.override();
                    this.requestUpdate();
                }}
                                    >
                                        ${(0, s_i18n_1.__i18n)('Override', {
                    id: 's-specs-editor.override.button',
                    tokens: {
                        s: (0, string_2.__lowerFirst)(propObj.title),
                    },
                })}
                                    </button>
                                </div>
                            `
                : ''}
                  </div>`
            : ''}
            ${(widget === null || widget === void 0 ? void 0 : widget.hasErrors()) && !widget.canBeOverride()
            ? this.renderError(propObj, Array.isArray(pathOrCallback)
                ? pathOrCallback
                : [propObj.id], widget.lastError)
            : ''}
            ${(widget === null || widget === void 0 ? void 0 : widget.hasWarnings())
            ? this.renderWarning(propObj, Array.isArray(pathOrCallback)
                ? pathOrCallback
                : [propObj.id], widget.lastWarning)
            : ''}
        `;
    }
    renderProp(propObj, path, settings) {
        const typeLower = propObj.type.toLowerCase();
        // handle repeatable props
        if (typeLower.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableProps(propObj, path);
        }
        if (typeLower === 'object' && propObj.props) {
            return this.renderProps(propObj, path, settings);
        }
        return (0, lit_1.html) `
            <div
                class="${this.utils.cls('_prop')} ${this.utils.cls(`_prop-${typeLower}`)}"
            >
                ${this.renderWidget(propObj, path, settings)}
            </div>
        `;
    }
    _renderRepeatableProps(propObj, path) {
        let loopOn = this.getValue(path, {
            default: [],
            responsive: false,
        });
        let dropIndex;
        const _reorder = (item, to, callback) => {
            (0, array_1.__moveItem)(loopOn, item, to);
            this.requestUpdate();
            setTimeout(() => {
                callback === null || callback === void 0 ? void 0 : callback();
            }, 100);
        };
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_repeatable')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.renderLabel(propObj, path)}
                </label>

                ${loopOn.length
            ? (0, lit_1.html) `
                          ${loopOn.map((v, i) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                return (0, lit_1.html) `
                                  <div
                                      class="${this.utils.cls('_repeatable-item')}"
                                      id="${(_a = v.id) !== null && _a !== void 0 ? _a : i}"
                                      draggable="true"
                                      @dragstart=${(e) => {
                    e.target._isSorting = true;
                    if (!e.target._sortable) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    e.target.parentNode.classList.add('sort');
                    e.target.classList.add('sorting');
                }}
                                      @dragend=${(e) => {
                    e.target._isSorting = false;
                    if (!e.target._sortable) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    e.target.parentNode.classList.remove('sort');
                    e.target.classList.remove('sorting');
                    _reorder(v, dropIndex, () => {
                        (0, dom_1.__addClassTimeout)('sorted', this.querySelector(`#${v.id}`), 300);
                    });
                }}
                                  >
                                      <div
                                          tabindex="0"
                                          @pointerup=${(e) => {
                    var _a;
                    this._toggle(`${path.join('.')}-${(_a = v.id) !== null && _a !== void 0 ? _a : i}`);
                }}
                                          class="${this.utils.cls('_repeatable-title')} ${this._isActive(`${path.join('.')}-${(_b = v.id) !== null && _b !== void 0 ? _b : i}`)
                    ? 'active'
                    : ''}"
                                      >
                                          ${this._isActive(`${path.join('.')}-${(_c = v.id) !== null && _c !== void 0 ? _c : i}`)
                    ? (0, lit_1.html) `
                                                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.down)}
                                                `
                    : (0, lit_1.html) `
                                                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.right)}
                                                `}

                                          <span>
                                              ${(_j = (_h = (_g = (_e = (_d = v.title) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : (_f = v.name) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : v.id) !== null && _h !== void 0 ? _h : v.value) !== null && _j !== void 0 ? _j : `${propObj.title} #${i}`}
                                          </span>

                                          <button
                                              confirm="Confirm!"
                                              @pointerup=${(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.currentTarget
                        .needConfirmation)
                        return;
                    this._removeItem(loopOn, v, propObj);
                }}
                                              class="_remove"
                                          >
                                              <i
                                                  class="fa-regular fa-trash-can"
                                              ></i>
                                          </button>
                                          <button
                                              class="_reorder"
                                              @pointerover=${(e) => {
                    const $sortable = e.target.parentNode
                        .parentNode;
                    if ($sortable._isSorting)
                        return;
                    $sortable._sortable = true;
                }}
                                              @pointerout=${(e) => {
                    const $sortable = e.target.parentNode
                        .parentNode;
                    if ($sortable._isSorting)
                        return;
                    $sortable._sortable = false;
                }}
                                          >
                                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.reorder)}
                                          </button>
                                      </div>
                                      <div
                                          tabindex="0"
                                          class="${this.utils.cls('_repeatable-body')} ${this._isActive(`${path.join('.')}-${(_k = v.id) !== null && _k !== void 0 ? _k : i}`)
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
                                  </div>
                                  <div
                                      @dragleave=${(e) => {
                    const $target = e.currentTarget;
                    $target.classList.remove('sort-over');
                    //   setTimeout(() => {
                    //       dropIndex = undefined;
                    //   }, 2000);
                }}
                                      @dragover=${(e) => {
                    const $target = e.currentTarget;
                    $target.classList.add('sort-over');
                    dropIndex = i;
                }}
                                      class="${this.utils.cls('_repeatable-drop')}"
                                  ></div>
                              `;
            })}
                      `
            : (0, lit_1.html) `
                          <div class="${this.utils.cls('_repeatable-empty')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.repeatableEmpty)}
                              <p class="_text">
                                  ${(0, s_i18n_1.__i18n)('No item currently. Add some by clicking on the button bellow...', {
                id: 's-specs-editor.repeatable.empty',
            })}
                              </p>
                          </div>
                      `}

                <div class="${this.utils.cls('_repeatable-actions')}">
                    <button
                        @pointerup=${() => this._addItem(loopOn, propObj, [
            ...path,
            loopOn.length,
        ])}
                        class="_add"
                    >
                        Add a ${(0, string_2.__lowerFirst)(propObj.title).replace(/s$/, '')}
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
            if (this.constructor.widgetMap[specs.type.toLowerCase()]) {
                return this.renderProp(specs, path, finalSettings);
            }
            return (0, lit_1.html) `
                ${Object.keys(specs.props).map((prop) => {
                var _a;
                const propObj = specs.props[prop], propId = [...path, 'props', prop]
                    .filter((l) => l !== 'props')
                    .join('-');
                if (propObj.props &&
                    ((_a = propObj.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'object') {
                    return (0, lit_1.html) `
                            <div class="${this.utils.cls('_child')}">
                                <div class="${this.utils.cls('_child-metas')}">
                                    <a
                                        class="${this.utils.cls('_child-toggle')} ${this._toggleStack.includes(propId)
                        ? 'active'
                        : ''}"
                                        @pointerup=${(e) => {
                        if (this._toggleStack.includes(propId)) {
                            this._toggleStack.splice(this._toggleStack.indexOf(propId), 1);
                        }
                        else {
                            this._toggleStack.push(propId);
                        }
                        this.requestUpdate();
                    }}
                                    >
                                        <div
                                            class="${this.utils.cls('_child-heading')}"
                                        >
                                            ${this._toggleStack.includes(propId)
                        ? (0, lit_1.html) `
                                                      ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.down)}
                                                  `
                        : (0, lit_1.html) `
                                                      ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons
                            .right)}
                                                  `}
                                            <h3
                                                class="${this.utils.cls('_child-title')}"
                                            >
                                                ${propObj.title}
                                            </h3>
                                            <div
                                                class="${this.utils.cls('_child-media')}"
                                            >
                                                ${propObj.responsive
                        ? this._renderMediaSelector([
                            ...path,
                            'props',
                            prop,
                        ])
                        : ''}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div
                                    class="${this.utils.cls('_child-prop')} ${this._toggleStack.includes(propId)
                        ? 'active'
                        : ''}"
                                    prop="${propId}"
                                    id="prop-${propId}"
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
        var _a, _b, _c;
        return (0, lit_1.html) `
            ${this.props.specs
            ? (0, lit_1.html) `
                      <div class="${this.utils.cls('_root')}">
                          <div class="${this.utils.cls('_metas')}">
                              <div class="${this.utils.cls('_metas-heading')}">
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
                    _console.log('delete action to integrate');
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
                    : ''} ${this.state
                    .status.saving ===
                    'success'
                    ? 'success'
                    : this.state.status
                        .saving
                        ? 'loading'
                        : ''}"
                                                    @click=${() => {
                    this.save();
                }}
                                                    ?disabled=${!this
                    ._isValid ||
                    !this.hasUnsavedChanges()}
                                                >
                                                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.save)}
                                                    ${this.props.i18n
                    .saveButton}
                                                </button>
                                            `
                : ''}
                                  </nav>
                              </div>
                              ${Object.keys((_c = this.props.source) !== null && _c !== void 0 ? _c : {}).length
                ? (0, lit_1.html) `
                                        <div
                                            class="${this.utils.cls('_metas-source')}"
                                        >
                                            ${this.props.source.url
                    ? (0, lit_1.html) `
                                                      <a
                                                          href="${this.props
                        .source.url}"
                                                          target="_blank"
                                                          title="${this.props
                        .source.title}"
                                                      >
                                                      </a>
                                                  `
                    : ''}
                                            <p class="_text">
                                                ${(0, unsafe_html_js_1.unsafeHTML)((0, s_i18n_1.__i18n)('This content is linked to the %s one...', {
                    id: 's-specs-editor.source.link',
                    tokens: {
                        s: `<a class="_link" href="${this.props.source.url}" target="_blank">${this.props.source.title}</a>`,
                    },
                }))}
                                            </p>
                                        </div>
                                    `
                : ''}
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
    string: stringWidget_1.default,
    link: linkWidget_1.default,
    text: textWidget_1.default,
    select: selectWidget_1.default,
    wysiwyg: wysiwygWidget_1.default,
    video: videoWidget_1.default,
    layout: layoutWidget_1.default,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxpREFBOEM7QUFFOUMscURBQXVEO0FBQ3ZELCtDQUF5RDtBQUN6RCx1REFLb0M7QUFFcEMsNkRBQXVEO0FBQ3ZELGlEQUE0RDtBQUU1RCxxRkFBaUc7QUFDakcsMkZBQXVHO0FBQ3ZHLDZFQUEwRjtBQUMxRiwyRUFBd0Y7QUFFeEYsb0VBQTZDO0FBRTdDLHVEQUFzRDtBQUl0RCx1REFBeUQ7QUFDekQsdURBQXdFO0FBQ3hFLDZCQUEyQztBQUMzQyxrRUFBMkQ7QUFDM0QsZ0hBQTBGO0FBRTFGLGFBQWE7QUFDYixvSEFBcUUsQ0FBQywrQkFBK0I7QUFFckcsc0RBQWdDO0FBd3pDWCxpQkF4ekNkLGdCQUFRLENBd3pDWTtBQXR6QzNCLDhFQUF3RDtBQUN4RCxvRkFBOEQ7QUFDOUQsMEZBQW9FO0FBQ3BFLHNFQUFnRDtBQUNoRCx3RUFBa0Q7QUFDbEQsNEVBQXNEO0FBQ3RELDBFQUFvRDtBQUNwRCxzRUFBZ0Q7QUFDaEQsMEVBQW9EO0FBQ3BELDBFQUFvRDtBQUNwRCwwRUFBb0Q7QUFDcEQsMEVBQW9EO0FBQ3BELDBFQUFvRDtBQUNwRCxzRUFBZ0Q7QUFDaEQsd0VBQWtEO0FBQ2xELDRFQUFzRDtBQUV0RCxhQUFhO0FBQ2IsSUFBQSw2QkFBMEIsR0FBRSxDQUFDO0FBQzdCLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQUNoQyxJQUFBLG9DQUFnQyxHQUFFLENBQUM7QUFDbkMsSUFBQSw0QkFBeUIsR0FBRSxDQUFDO0FBb0Q1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNFRztBQUVILE1BQXFCLHFCQUFzQixTQUFRLHlCQUFlO0lBQzlELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQXdCRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxzQ0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLElBQUk7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztJQVFEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksSUFBSTtRQUNKLE1BQU0sSUFBSSxHQUFHO1lBQ1QsTUFBTSxFQUFFLElBQUEsb0JBQVcsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM5QixLQUFLLEVBQUUsSUFBSTthQUNkLENBQUM7U0FDTCxDQUFDO1FBQ0YsT0FBTztZQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3RCLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsd0NBQWdDO1NBQzlDLENBQUMsQ0FDTCxDQUFDO1FBbENOLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUdkLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBeU01QixvQkFBZSxHQUFRLEVBQUUsQ0FBQztJQTFLMUIsQ0FBQztJQUVELEtBQUs7O1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztnQkFDZCxLQUFLLEVBQUUsSUFBQSxpQkFBUSxHQUFFO2FBQ3BCLENBQUM7U0FDTDtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNyQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUMvQixFQUFFO1lBQ0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDakMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQzFCO3FCQUFNO29CQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUMxQjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsWUFBWTs7UUFDUixLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekQsTUFBQSxNQUFNLENBQUMsWUFBWSxzREFBSSxDQUFDO1NBQzNCO1FBRUQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBYztRQUMzQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQWM7UUFDM0IsTUFBTSxPQUFPLEdBQUcsSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLENBQUEsRUFBRTtZQUNoQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQ2hELENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDdkIsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pELElBQUksVUFBVSxFQUFFO2dCQUNaLE1BQU07YUFDVDtZQUNELElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQzVCLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDckI7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDNUIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pELElBQUksU0FBUyxFQUFFO2dCQUNYLE1BQU07YUFDVDtZQUNELElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUMvQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO1NBQ0o7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsWUFBWSxDQUNSLElBQXVCLEVBQ3ZCLFFBQWlEO1FBRWpELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsTUFBTSxhQUFhLG1CQUNmLEtBQUssRUFBRSxTQUFTLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksV0FBVyxHQUFHLEVBQUUsRUFDaEIsa0JBQWtCLEdBQUcsRUFBRSxFQUN2QixjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ2xCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QjtZQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRS9ELElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDakMsYUFBYTtnQkFDYixjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLHVDQUF1QztnQkFDdkMsQ0FBQyxFQUFFLENBQUM7YUFDUDtZQUVELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsRUFBRTtnQkFDckIsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFO29CQUNyQixjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUM7YUFDSjtTQUNKO1FBRUQsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUM7UUFDckUsY0FBYyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUMzQixPQUFPLGtCQUFrQixDQUFDO1NBQzdCO1FBRUQsT0FBTyxjQUFjLGFBQWQsY0FBYyxjQUFkLGNBQWMsR0FBSSxrQkFBa0IsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQWM7UUFDdEIsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFFBQVEsQ0FDSixJQUFjLEVBQ2QsUUFBaUQ7UUFFakQsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxTQUFTLEVBQ2xCLEtBQUssRUFBRSxTQUFTLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksS0FBSyxDQUFDO1FBRVYsOENBQThDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyRCxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDdkQsS0FBSyxHQUFHLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFdkMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsS0FBSyxHQUFHLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRTtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFHRCxTQUFTLENBQ0wsSUFBWSxFQUNaLGNBQW1DLEVBQ25DLE9BQVksRUFDWixRQUFzQzs7UUFFdEMsSUFBSSxJQUFjLEVBQ2QsUUFBa0IsRUFDbEIsTUFBVyxFQUNYLFNBQW1CLENBQUM7UUFFeEIsSUFBSSxPQUFPLGNBQWMsS0FBSyxVQUFVLEVBQUU7WUFDdEMsUUFBUSxHQUFHLGNBQWMsQ0FBQztTQUM3QjthQUFNO1lBQ0gsSUFBSSxHQUFHLGNBQWMsQ0FBQztTQUN6QjtRQUVELG1DQUFtQztRQUNuQyxJQUFJLElBQUksRUFBRTtZQUNOLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUM7WUFDOUMsTUFBTSxHQUFHLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQUcsSUFBQSxjQUFLLEVBQ1YsSUFBSSxDQUFDLE9BQU8sRUFDWixTQUFTLEVBQ1QsRUFBRSxFQUNGO29CQUNJLFlBQVksRUFBRSxJQUFJO2lCQUNyQixDQUNKLENBQUM7YUFDTDtpQkFBTSxJQUFJLENBQUMsSUFBQSxvQkFBZSxFQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsS0FBSyxDQUNULHNFQUFzRSxTQUFTLENBQUMsSUFBSSxDQUNoRixHQUFHLENBQ04seUJBQXlCLE9BQU8sTUFBTSxpRkFBaUYsQ0FDM0gsQ0FBQztnQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDOUIsT0FBTzthQUNWO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3pDO1lBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNoQyxLQUFLLEVBQUUsSUFBQSxpQkFBUSxHQUFFO2dCQUNqQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxVQUFVLEVBQUUsS0FBSzthQUNwQixDQUFDLENBQUM7WUFDSCxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUN4QjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hDLE9BQU87U0FDVjtRQUVELE1BQU0sWUFBWSxHQUNkLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFBLE1BQUEsT0FBTyxDQUFDLElBQUksMENBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFLLElBQUksQ0FBQztRQUVqRSxNQUFNLGFBQWEsbUJBQ2YsS0FBSyxFQUFFLFlBQVksSUFDaEIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEUsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNO1lBQ04sTUFBTSxFQUFFLElBQUEsY0FBSyxFQUFDLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sMENBQUUsTUFBTSxtQ0FBSSxFQUFFLEVBQUUsU0FBUyxDQUFDO1lBQ3pELE9BQU87WUFDUCxjQUFjO1lBQ2QsU0FBUztZQUNULFFBQVEsRUFBRSxhQUFhO1NBQzFCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBTUQsS0FBSztRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtnQkFDL0IsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ3BCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDOUIsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksQ0FBQyxRQUFpQixLQUFLO1FBQ3ZCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRW5DLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQy9CO1FBRUQsMkJBQTJCO1FBQzNCLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6RCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUNyQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNyQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ3BCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWMsQ0FBQyxRQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7UUFDM0MsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFVO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNqQzthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxTQUFTLENBQUMsRUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUk7UUFDekIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRTtZQUNsQyxLQUFLLEVBQUUsSUFBQSxpQkFBUSxHQUFFO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSztRQUMxQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVksQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUV6QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDcEMsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFvQixDQUFDLElBQWM7O1FBQy9CLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxNQUFNLE1BQU0sR0FDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvRCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztrQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FDVCxpQkFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQ3pEO2FBQ0ksT0FBTyxFQUFFO2FBQ1QsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWCxPQUFPLElBQUEsVUFBSSxFQUFBOzt5Q0FFTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsYUFBYSxDQUNoQixJQUFJLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLGlCQUFpQixDQUFDLEtBQUssQ0FBQztnQkFDakMsQ0FBQyxDQUFDLFFBQVE7Z0JBQ1YsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLO2dCQUNsQyxDQUFDLENBQUMsU0FBUztnQkFDWCxDQUFDLENBQUMsRUFBRTs7O2lEQUdTLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2YsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLENBQUM7O3NDQUVDLElBQUEsMkJBQVUsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O3VDQUdsQyxJQUFBLHFCQUFZLEVBQUMsS0FBSyxDQUFDOzs7eUJBR2pDLENBQUM7UUFDTixDQUFDLENBQUM7O1NBRWIsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxPQUFZLEVBQUUsSUFBYyxFQUFFLE9BQWU7UUFDckQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztzQ0FDWixPQUFPOztTQUVwQyxDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYSxDQUFDLE9BQVksRUFBRSxJQUFjLEVBQUUsT0FBZTtRQUN2RCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO3NDQUNkLE9BQU87O1NBRXBDLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLE1BQU07UUFDbkMsT0FBTyxJQUFBLFVBQUksRUFBQTs7OzZCQUdVLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixXQUFXO1lBQ1gsSUFBQSxrQkFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2IsSUFBQSx1QkFBaUIsRUFBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDOzs7dUJBR00sSUFBQSwyQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7O3VCQUdqQyxJQUFBLDJCQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOztrQkFFekMsT0FBTztZQUNMLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQSwyQkFBMkIsT0FBTyxTQUFTO1lBQ2pELENBQUMsQ0FBQyxFQUFFOztTQUVmLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQ1AsT0FBWSxFQUNaLElBQWMsRUFDZCxRQUFvRDs7UUFFcEQsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxNQUFNLElBQ1osQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLE9BQU8sSUFBQSxVQUFJLEVBQUE7OztzQkFHRyxJQUFBLDJCQUFVLEVBQ1IsTUFBQSxNQUFBLGFBQWEsQ0FBQyxLQUFLLG1DQUFJLE9BQU8sQ0FBQyxLQUFLLG1DQUFJLE9BQU8sQ0FBQyxFQUFFLENBQ3JEO3NCQUNDLGFBQWEsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVE7WUFDeEMsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBLG9DQUFvQztZQUMxQyxDQUFDLENBQUMsRUFBRTs7a0JBRVYsQ0FBQSxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLDBDQUFFLEtBQUssMENBQUUsT0FBTyxLQUFJLE9BQU8sQ0FBQyxVQUFVO1lBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFO2tCQUNOLENBQUEsTUFBQSxhQUFhLENBQUMsV0FBVyxtQ0FBSSxPQUFPLENBQUMsV0FBVztZQUM5QyxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7Ozs7Z0VBSXNDLGFBQWEsQ0FBQyxPQUFPOztvQ0FFakQsTUFBQSxhQUFhLENBQUMsV0FBVyxtQ0FDM0IsT0FBTyxDQUFDLFdBQVc7Ozt1QkFHOUI7WUFDSCxDQUFDLENBQUMsRUFBRTs7U0FFZixDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FBQyxpQkFBdUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO2dCQUM5QixNQUFNLEVBQUUsRUFBRTthQUNiLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtnQkFDOUIsTUFBTSxFQUFFLEVBQUU7YUFDYixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hDLE1BQU0sRUFBRSxFQUFFO2FBQ2IsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtnQkFDaEMsTUFBTSxFQUFFLEVBQUU7YUFDYixDQUFDLENBQUM7U0FDTjtRQUVELElBQUksaUJBQWlCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQ1IsT0FBTyxFQUNQLGNBQW1DLEVBQ25DLFFBQXNDOztRQUV0QyxNQUFNLElBQUksR0FDRixNQUFBLE1BQUEsTUFBQSxPQUFPLENBQUMsTUFBTSwwQ0FBRSxXQUFXLGtEQUFJLG1DQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQ2pFLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELE9BQU8sSUFBQSxVQUFJLEVBQUE7Y0FDTCxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxNQUFNO1lBQ1osQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBLGdCQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7d0JBQ3ZDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7d0JBQ2YsTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs7OztxREFLcUIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDZixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7d0JBQzNCLE9BQU87cUJBQ1Y7b0JBQ0QsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7OzBDQUVDLElBQUEsZUFBTSxFQUFDLFVBQVUsRUFBRTtvQkFDakIsRUFBRSxFQUFFLGdDQUFnQztvQkFDcEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFBLHFCQUFZLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztxQkFDakM7aUJBQ0osQ0FBQzs7OzZCQUdiO2dCQUNILENBQUMsQ0FBQyxFQUFFO3lCQUNMO1lBQ1QsQ0FBQyxDQUFDLEVBQUU7Y0FDTixDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQ1osT0FBTyxFQUNQLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2dCQUN6QixDQUFDLENBQUMsY0FBYztnQkFDaEIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUNsQixNQUFNLENBQUMsU0FBUyxDQUNuQjtZQUNILENBQUMsQ0FBQyxFQUFFO2NBQ04sQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVyxFQUFFO1lBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUNkLE9BQU8sRUFDUCxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLGNBQWM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFDbEIsTUFBTSxDQUFDLFdBQVcsQ0FDckI7WUFDSCxDQUFDLENBQUMsRUFBRTtTQUNYLENBQUM7SUFDTixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBOEM7UUFDcEUsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU3QywwQkFBMEI7UUFDMUIsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyRDtRQUVELElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsT0FBTyxJQUFBLFVBQUksRUFBQTs7eUJBRU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlDLFNBQVMsU0FBUyxFQUFFLENBQ3ZCOztrQkFFQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDOztTQUVuRCxDQUFDO0lBQ04sQ0FBQztJQUVELHNCQUFzQixDQUFDLE9BQU8sRUFBRSxJQUFJO1FBQ2hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxTQUFTLENBQUM7UUFFZCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUyxFQUFFLEVBQUU7WUFDckMsSUFBQSxrQkFBVSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxFQUFJLENBQUM7WUFDakIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDO1FBRUYsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7OzZCQUUxQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs2QkFDUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRTs7c0JBRWhDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2tCQUduQyxNQUFNLENBQUMsTUFBTTtZQUNYLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs0QkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDbEIsT0FBTyxJQUFBLFVBQUksRUFBQTs7K0NBRU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLGtCQUFrQixDQUNyQjs0Q0FDSyxNQUFBLENBQUMsQ0FBQyxFQUFFLG1DQUFJLENBQUM7O21EQUVGLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7d0JBQ3JCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUNwQixPQUFPO3FCQUNWO29CQUNELENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQzdCLE1BQU0sQ0FDVCxDQUFDO29CQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztpREFDVSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztvQkFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO3dCQUNyQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDcEIsT0FBTztxQkFDVjtvQkFDRCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUNoQyxNQUFNLENBQ1QsQ0FBQztvQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTt3QkFDeEIsSUFBQSx1QkFBaUIsRUFDYixRQUFRLEVBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FDZCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDYixFQUNELEdBQUcsQ0FDTixDQUFDO29CQUNOLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Ozs7dURBSWdCLENBQUMsQ0FBQyxFQUFFLEVBQUU7O29CQUNmLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUNiLE1BQUEsQ0FBQyxDQUFDLEVBQUUsbUNBQUksQ0FDWixFQUFFLENBQ0wsQ0FBQztnQkFDTixDQUFDO21EQUNRLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixtQkFBbUIsQ0FDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUNmLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFBLENBQUMsQ0FBQyxFQUFFLG1DQUFJLENBQUMsRUFBRSxDQUNuQztvQkFDRyxDQUFDLENBQUMsUUFBUTtvQkFDVixDQUFDLENBQUMsRUFBRTs7NENBRU4sSUFBSSxDQUFDLFNBQVMsQ0FDWixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksTUFBQSxDQUFDLENBQUMsRUFBRSxtQ0FBSSxDQUFDLEVBQUUsQ0FDbkM7b0JBQ0csQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO3NEQUNFLElBQUEsMkJBQVUsRUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ3hCO2lEQUNKO29CQUNILENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTtzREFDRSxJQUFBLDJCQUFVLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUN6QjtpREFDSjs7O2dEQUdELE1BQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxDQUFDLENBQUMsS0FBSywwQ0FBRSxLQUFLLG1DQUNoQixNQUFBLENBQUMsQ0FBQyxJQUFJLDBDQUFFLEtBQUssbUNBQ2IsQ0FBQyxDQUFDLEVBQUUsbUNBQ0osQ0FBQyxDQUFDLEtBQUssbUNBQ1AsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTs7Ozs7MkRBS1gsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDZixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDcEIsSUFDSSxDQUFDLENBQUMsYUFBYTt5QkFDVixnQkFBZ0I7d0JBRXJCLE9BQU87b0JBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FDWixNQUFNLEVBQ04sQ0FBQyxFQUNELE9BQU8sQ0FDVixDQUFDO2dCQUNOLENBQUM7Ozs7Ozs7Ozs2REFTYyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNqQixNQUFNLFNBQVMsR0FDWCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVU7eUJBQ2QsVUFBVSxDQUFDO29CQUNwQixJQUFJLFNBQVMsQ0FBQyxVQUFVO3dCQUNwQixPQUFPO29CQUNYLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixDQUFDOzREQUNhLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2hCLE1BQU0sU0FBUyxHQUNYLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVTt5QkFDZCxVQUFVLENBQUM7b0JBQ3BCLElBQUksU0FBUyxDQUFDLFVBQVU7d0JBQ3BCLE9BQU87b0JBQ1gsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ2hDLENBQUM7O2dEQUVDLElBQUEsMkJBQVUsRUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzNCOzs7OzttREFLSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsa0JBQWtCLENBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FDZixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksTUFBQSxDQUFDLENBQUMsRUFBRSxtQ0FBSSxDQUFDLEVBQUUsQ0FDbkM7b0JBQ0csQ0FBQyxDQUFDLFFBQVE7b0JBQ1YsQ0FBQyxDQUFDLEVBQUU7Ozt1REFHSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsd0JBQXdCLENBQzNCOztnREFFQyxJQUFJLENBQUMsV0FBVyxpQ0FFUCxPQUFPLEtBQ1YsVUFBVSxFQUFFLElBQUksRUFDaEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUN0QixPQUFPLEVBQ1AsRUFBRSxDQUNMLEtBRUwsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsRUFDWjtvQkFDSSxVQUFVLEVBQUUsS0FBSztpQkFDcEIsQ0FDSjs7Ozs7bURBS0ksQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDZixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUNoQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdEMsdUJBQXVCO29CQUN2QiwrQkFBK0I7b0JBQy9CLGNBQWM7Z0JBQ2xCLENBQUM7a0RBQ1csQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDZCxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUNoQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDbkMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsQ0FBQzsrQ0FDUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsa0JBQWtCLENBQ3JCOzsrQkFFUixDQUFDO1lBQ04sQ0FBQyxDQUFDO3VCQUNMO1lBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO3dDQUNjLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2dDQUMzQyxJQUFBLDJCQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDOztvQ0FFeEMsSUFBQSxlQUFNLEVBQ0osaUVBQWlFLEVBQ2pFO2dCQUNJLEVBQUUsRUFBRSxpQ0FBaUM7YUFDeEMsQ0FDSjs7O3VCQUdaOzs4QkFFTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzs7cUNBRTlCLEdBQUcsRUFBRSxDQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRTtZQUMzQixHQUFHLElBQUk7WUFDUCxNQUFNLENBQUMsTUFBTTtTQUNoQixDQUFDOzs7Z0NBR0UsSUFBQSxxQkFBWSxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQzswQkFDbkQsSUFBQSwyQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7OztTQUlqRCxDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFVLEVBQUUsT0FBaUIsRUFBRSxFQUFFLFFBQWM7UUFDdkQsTUFBTSxhQUFhLG1CQUNmLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLE9BQU8sRUFBRSxJQUFJLElBQ1YsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksYUFBYSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4RCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3REO1lBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7Z0JBQ3RELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3REO1lBRUQsT0FBTyxJQUFBLFVBQUksRUFBQTtrQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7Z0JBQ3BDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQzdCLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7cUJBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQztxQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVuQixJQUNJLE9BQU8sQ0FBQyxLQUFLO29CQUNiLENBQUEsTUFBQSxPQUFPLENBQUMsSUFBSSwwQ0FBRSxXQUFXLEVBQUUsTUFBSyxRQUFRLEVBQzFDO29CQUNFLE9BQU8sSUFBQSxVQUFJLEVBQUE7MENBQ08sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzhDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7O2lEQUUzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsZUFBZSxDQUNsQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzt3QkFDbkMsQ0FBQyxDQUFDLFFBQVE7d0JBQ1YsQ0FBQyxDQUFDLEVBQUU7cURBQ0ssQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDZixJQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUN0QixNQUFNLENBQ1QsRUFDSDs0QkFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ3JCLE1BQU0sQ0FDVCxFQUNELENBQUMsQ0FDSixDQUFDO3lCQUNMOzZCQUFNOzRCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUNsQzt3QkFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3pCLENBQUM7OztxREFHWSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsZ0JBQWdCLENBQ25COzs4Q0FFQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQ2hDLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTt3REFDRSxJQUFBLDJCQUFVLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUN4QjttREFDSjt3QkFDSCxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7d0RBQ0UsSUFBQSwyQkFBVSxFQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzs2QkFDWCxLQUFLLENBQ2I7bURBQ0o7O3lEQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixjQUFjLENBQ2pCOztrREFFQyxPQUFPLENBQUMsS0FBSzs7O3lEQUdOLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixjQUFjLENBQ2pCOztrREFFQyxPQUFPLENBQUMsVUFBVTt3QkFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FDckI7NEJBQ0ksR0FBRyxJQUFJOzRCQUNQLE9BQU87NEJBQ1AsSUFBSTt5QkFDUCxDQUNKO3dCQUNILENBQUMsQ0FBQyxFQUFFOzs7Ozs7NkNBTVgsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLGFBQWEsQ0FDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQ25DLENBQUMsQ0FBQyxRQUFRO3dCQUNWLENBQUMsQ0FBQyxFQUFFOzRDQUNBLE1BQU07K0NBQ0gsTUFBTTs7c0NBRWYsSUFBSSxDQUFDLFVBQVUsQ0FDYixPQUFPLEVBQ1AsQ0FBQyxHQUFHLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQ3hCLGFBQWEsQ0FDaEI7Ozt5QkFHWixDQUFDO2lCQUNMO3FCQUFNO29CQUNILE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FDbEIsT0FBTyxFQUNQLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUN4QixhQUFhLENBQ2hCLENBQUM7aUJBQ0w7WUFDTCxDQUFDLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBO2NBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ2QsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO29DQUNjLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzt3Q0FDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzRDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzs7d0NBRXBDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUs7OztpREFHYixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDekIsb0JBQW9CLEVBQ3BCLFdBQVcsQ0FDZDs7MENBRU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVzs7O3dDQUc5QixDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLDBDQUFFLE1BQU07Z0JBQ3pCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs2REFJYSxHQUFHLEVBQUU7b0JBQ1YsUUFBUSxDQUFDLEdBQUcsQ0FDUiw0QkFBNEIsQ0FDL0IsQ0FBQztnQkFDTixDQUFDOztzREFFQyxJQUFBLDJCQUFVLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUMxQjs7NkNBRVI7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUU7d0NBQ04sQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSwwQ0FBRSxJQUFJO2dCQUN2QixDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7O2tGQUVrQyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUMxQyxDQUFDLENBQUMsT0FBTztvQkFDVCxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLO3FCQUNqQixNQUFNLENBQUMsTUFBTTtvQkFDbEIsU0FBUztvQkFDTCxDQUFDLENBQUMsU0FBUztvQkFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO3lCQUNaLE1BQU07d0JBQ2IsQ0FBQyxDQUFDLFNBQVM7d0JBQ1gsQ0FBQyxDQUFDLEVBQUU7NkRBQ0MsR0FBRyxFQUFFO29CQUNWLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnRUFDVyxDQUFDLElBQUk7cUJBQ1osUUFBUTtvQkFDYixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTs7c0RBRXZCLElBQUEsMkJBQVUsRUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ3hCO3NEQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtxQkFDWixVQUFVOzs2Q0FFdEI7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUU7OztnQ0FHZCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07Z0JBQ3pDLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7cURBRWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLGVBQWUsQ0FDbEI7OzhDQUVDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUc7b0JBQ25CLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7a0VBRVksSUFBSSxDQUFDLEtBQUs7eUJBQ2IsTUFBTSxDQUFDLEdBQUc7O21FQUVOLElBQUksQ0FBQyxLQUFLO3lCQUNkLE1BQU0sQ0FBQyxLQUFLOzs7bURBR3hCO29CQUNILENBQUMsQ0FBQyxFQUFFOztrREFFRixJQUFBLDJCQUFVLEVBQ1IsSUFBQSxlQUFNLEVBQ0YseUNBQXlDLEVBQ3pDO29CQUNJLEVBQUUsRUFBRSw0QkFBNEI7b0JBQ2hDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsMEJBQTBCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcscUJBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTTtxQkFDdkc7aUJBQ0osQ0FDSixDQUNKOzs7cUNBR1o7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUU7OzRCQUVWLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzttQkFFL0M7WUFDSCxDQUFDLENBQUMsRUFBRTtTQUNYLENBQUM7SUFDTixDQUFDOztBQWxxQ0wsd0NBbXFDQztBQTNwQ1UsK0JBQVMsR0FBRztJQUNmLFFBQVEsRUFBRSx3QkFBZ0I7SUFDMUIsSUFBSSxFQUFFLG9CQUFZO0lBQ2xCLE9BQU8sRUFBRSxzQkFBYztJQUN2QixLQUFLLEVBQUUscUJBQWE7SUFDcEIsT0FBTyxFQUFFLHVCQUFlO0lBQ3hCLE1BQU0sRUFBRSxzQkFBYztJQUN0QixNQUFNLEVBQUUsc0JBQWM7SUFDdEIsTUFBTSxFQUFFLHNCQUFjO0lBQ3RCLEtBQUssRUFBRSwyQkFBbUI7SUFDMUIsSUFBSSxFQUFFLDhCQUFzQjtJQUM1QixRQUFRLEVBQUUsOEJBQXNCO0lBQ2hDLElBQUksRUFBRSw4QkFBc0I7SUFDNUIsTUFBTSxFQUFFLHNCQUFjO0lBQ3RCLElBQUksRUFBRSxvQkFBWTtJQUNsQixJQUFJLEVBQUUsb0JBQVk7SUFDbEIsTUFBTSxFQUFFLHNCQUFjO0lBQ3RCLE9BQU8sRUFBRSx1QkFBZTtJQUN4QixLQUFLLEVBQUUscUJBQWE7SUFDcEIsTUFBTSxFQUFFLHNCQUFjO0NBQ3pCLENBQUMifQ==