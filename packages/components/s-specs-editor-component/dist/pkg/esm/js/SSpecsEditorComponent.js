import __SLitComponent from '@coffeekraken/s-lit-component';
import { __i18n } from '@coffeekraken/s-i18n';
import { __moveItem } from '@coffeekraken/sugar/array';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepClean, __delete, __flatten, __get, __set, } from '@coffeekraken/sugar/object';
import { __copy } from '@coffeekraken/sugar/clipboard';
import { __addClassTimeout } from '@coffeekraken/sugar/dom';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
import { define as __SWysiwygComponentDefine } from '@coffeekraken/s-wysiwyg-component';
import __STheme from '@coffeekraken/s-theme';
import { __uniqid } from '@coffeekraken/sugar/string';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __lowerFirst, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SSpecsEditorComponentInterface from './interface/SSpecsEditorComponentInterface.js';
// @ts-ignore
import __css from '../../../../src/css/s-specs-editor-component.css'; // relative to /dist/pkg/esm/js
import __checkboxWidget from './widgets/checkboxWidget.js';
import __colorPickerWidget from './widgets/colorPickerWidget.js';
import __datetimePickerWidget from './widgets/datetimePickerWidget.js';
import __htmlWidget from './widgets/htmlWidget.js';
import __imageWidget from './widgets/imageWidget.js';
import __integerWidget from './widgets/integerWidget.js';
import __layoutWidget from './widgets/layoutWidget.js';
import __linkWidget from './widgets/linkWidget.js';
import __numberWidget from './widgets/numberWidget.js';
import __selectWidget from './widgets/selectWidget.js';
import __spacesWidget from './widgets/spacesWidget.js';
import __stringWidget from './widgets/stringWidget.js';
import __switchWidget from './widgets/switchWidget.js';
import __textWidget from './widgets/textWidget.js';
import __videoWidget from './widgets/videoWidget.js';
import __wysiwygWidget from './widgets/wysiwygWidget.js';
// components
__SDropzoneComponentDefine();
__SColorPickerComponentDefine();
__SDatetimePickerComponentDefine();
__SWysiwygComponentDefine();
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
export default class SSpecsEditorComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SSpecsEditorComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
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
            values: __deepClean(this._values, {
                clone: true,
            }),
        };
        // unwrap the object that have only the "value" property
        const flat = __flatten(data.values);
        const parentPathesCounts = {}, valuesByPath = {};
        for (let [path, value] of Object.entries(flat)) {
            const p = path.split('.').slice(0, -1).join('.');
            if (!parentPathesCounts[p]) {
                parentPathesCounts[p] = 0;
            }
            parentPathesCounts[p]++;
            if (path.endsWith('.value')) {
                valuesByPath[p] = value;
            }
        }
        for (let [path, count] of Object.entries(parentPathesCounts)) {
            if (count === 1 && valuesByPath[path] !== undefined) {
                __set(data.values, path, valuesByPath[path]);
            }
        }
        return {
            uid: this.props.uid,
            values: data.values,
        };
    }
    constructor() {
        super(__deepMerge({
            name: 's-specs-editor',
            interface: __SSpecsEditorComponentInterface,
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
        if (!this._values['#id']) {
            const id = __uniqid();
            this._values.id = {
                value: id,
            };
            Object.defineProperty(this._values.id, '#id', {
                value: id,
                enumerable: false,
                writable: true,
            });
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
            const propObj = __get(this.props.specs, currentPath.join('.'));
            if (propObj === null || propObj === void 0 ? void 0 : propObj.responsive) {
                return true;
            }
        }
        return false;
    }
    isPathRepeatable(path) {
        const propObj = __get(this.props.specs, path.join('.'));
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
            const propObj = __get(this.props.specs, currentPath.join('.'));
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
        __delete(this._values, path);
    }
    getValue(path, settings) {
        const finalSettings = Object.assign({ default: undefined, media: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        let value;
        // specify the media if the path is responsive
        if (!finalSettings.media && this.isPathResponsive(path)) {
            finalSettings.media = this.props.media;
        }
        let valuePath = this.getValuePath(path, finalSettings);
        value = __get(this._values, valuePath);
        if (value === undefined && finalSettings.default) {
            value = __set(this._values, valuePath, finalSettings.default);
        }
        return value;
    }
    getWidget(type, pathOrCallback, propObj, settings) {
        var _a, _b, _c, _d;
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
            values = __get(this._values, valuePath);
            if (!values) {
                values = __set(this._values, valuePath, {}, {
                    preferAssign: true,
                });
            }
            else if (!__isPlainObject(values)) {
                values = __set(this._values, valuePath, {
                    value: undefined,
                }, {
                    preferAssign: true,
                });
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
            Object.defineProperty(values, '#id', {
                value: __uniqid(),
                writable: true,
                enumerable: false,
            });
            widgetId = values['#id'];
        }
        if (this._widgets[widgetId]) {
            return this._widgets[widgetId];
        }
        if (!SSpecsEditorComponent.widgetMap[type]) {
            return;
        }
        const isRepeatable = !propObj.repeatable || ((_a = propObj.type) === null || _a === void 0 ? void 0 : _a.match(/\[\]$/)) !== null;
        const finalSettings = Object.assign({ label: isRepeatable }, (settings !== null && settings !== void 0 ? settings : {}));
        // "unwrapValue" flag
        if ((_b = SSpecsEditorComponent.widgetMap[type]) === null || _b === void 0 ? void 0 : _b.unwrapValue) {
            Object.defineProperty(values, '#unwrap', {
                value: true,
                writable: true,
                enumerable: false,
            });
        }
        this._widgets[widgetId] = new SSpecsEditorComponent.widgetMap[type]({
            editor: this,
            values,
            source: __get((_d = (_c = this.props.source) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : {}, valuePath),
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
            value: __uniqid(),
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
        return html `
            <div class="${this.utils.cls('_media-icons')}">
                ${Object.keys(__STheme.sortMedia(this.props.frontspec.media).queries)
            .reverse()
            .map((media) => {
            return html `
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
                                    ${unsafeHTML(this.props.icons[media])}
                                </span>
                                <span class="s-tooltip"
                                    >${__upperFirst(media)}</span
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
        return html `
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
        return html `
            <div class="${this.utils.cls('_warning')}">
                <p class="_message">${message}</p>
            </div>
        `;
    }
    /**
     * Render a copy button
     */
    renderCopyButton(text, tooltip = 'Copy') {
        return html `
            <button
                class="copy-btn s-tooltip-container"
                @pointerup=${(e) => {
            // copy url
            __copy(text);
            __addClassTimeout('success', e.currentTarget, 1000);
        }}
            >
                <span class="_pending"
                    >${unsafeHTML(this.props.icons.copy)}</span
                >
                <span class="_success"
                    >${unsafeHTML(this.props.icons.success)}</span
                >
                ${tooltip
            ? html ` <div class="s-tooltip">${tooltip}</div> `
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
        return html `
            <span>
                <h3 class="_title">
                    ${unsafeHTML((_b = (_a = finalSettings.title) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id)}
                    ${finalSettings.required || propObj.required
            ? html ` <span class="_required">*</span> `
            : ''}
                </h3>
                ${((_d = (_c = this.props.frontspec) === null || _c === void 0 ? void 0 : _c.media) === null || _d === void 0 ? void 0 : _d.queries) && propObj.responsive
            ? this._renderMediaSelector(path)
            : ''}
                ${((_e = finalSettings.description) !== null && _e !== void 0 ? _e : propObj.description)
            ? html `
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
        var _a, _b, _c, _d;
        const type = (_c = (_b = (_a = propObj.widget) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : propObj.type.toLowerCase(), widget = this.getWidget(type, pathOrCallback, propObj, (_d = propObj.widgetSettings) !== null && _d !== void 0 ? _d : {});
        return html `
            ${(widget === null || widget === void 0 ? void 0 : widget.render)
            ? html ` <div class="${this.utils.cls('_widget')}">
                      ${widget.render()}
                      ${widget.canBeOverride()
                ? html `
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
                                        ${__i18n('Override', {
                    id: 's-specs-editor.override.button',
                    tokens: {
                        s: __lowerFirst(propObj.title),
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
        return html `
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
            __moveItem(loopOn, item, to);
            this.requestUpdate();
            setTimeout(() => {
                callback === null || callback === void 0 ? void 0 : callback();
            }, 100);
        };
        return html `
            <div class="${this.utils.cls('_repeatable')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.renderLabel(propObj, path)}
                </label>

                ${loopOn.length
            ? html `
                          ${loopOn.map((v, i) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                return html `
                                  <div
                                      class="${this.utils.cls('_repeatable-item')}"
                                      id="${(_a = v['#id']) !== null && _a !== void 0 ? _a : i}"
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
                        __addClassTimeout('sorted', this.querySelector(`#${v['#id']}`), 300);
                    });
                }}
                                  >
                                      <div
                                          tabindex="0"
                                          @pointerup=${(e) => {
                    var _a;
                    this._toggle(`${path.join('.')}-${(_a = v['#id']) !== null && _a !== void 0 ? _a : i}`);
                }}
                                          class="${this.utils.cls('_repeatable-title')} ${this._isActive(`${path.join('.')}-${(_b = v['#id']) !== null && _b !== void 0 ? _b : i}`)
                    ? 'active'
                    : ''}"
                                      >
                                          ${this._isActive(`${path.join('.')}-${(_c = v['#id']) !== null && _c !== void 0 ? _c : i}`)
                    ? html `
                                                    ${unsafeHTML(this.props.icons.down)}
                                                `
                    : html `
                                                    ${unsafeHTML(this.props.icons.right)}
                                                `}

                                          <span>
                                              ${(_j = (_h = (_g = (_e = (_d = v.title) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : (_f = v.name) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : v['#id']) !== null && _h !== void 0 ? _h : v.value) !== null && _j !== void 0 ? _j : `${propObj.title} #${i}`}
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
                                              ${unsafeHTML(this.props.icons.reorder)}
                                          </button>
                                      </div>
                                      <div
                                          tabindex="0"
                                          class="${this.utils.cls('_repeatable-body')} ${this._isActive(`${path.join('.')}-${(_k = v['#id']) !== null && _k !== void 0 ? _k : i}`)
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
            : html `
                          <div class="${this.utils.cls('_repeatable-empty')}">
                              ${unsafeHTML(this.props.icons.repeatableEmpty)}
                              <p class="_text">
                                  ${__i18n('No item currently. Add some by clicking on the button bellow...', {
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
                        Add a ${__lowerFirst(propObj.title).replace(/s$/, '')}
                        ${unsafeHTML(this.props.icons.add)}
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
            return html `
                ${Object.keys(specs.props).map((prop) => {
                var _a;
                const propObj = specs.props[prop], propId = [...path, 'props', prop]
                    .filter((l) => l !== 'props')
                    .join('-');
                if (propObj.props &&
                    ((_a = propObj.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'object') {
                    return html `
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
                        ? html `
                                                      ${unsafeHTML(this.props.icons.down)}
                                                  `
                        : html `
                                                      ${unsafeHTML(this.props.icons
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
    _renderActions() {
        var _a, _b;
        return html `
            <nav class="_actions">
                ${((_a = this.props.features) === null || _a === void 0 ? void 0 : _a.delete)
            ? html `
                          <button
                              class="_action _action-delete"
                              confirm="Confirm?"
                              @click=${() => {
                _console.log('delete action to integrate');
            }}
                          >
                              ${unsafeHTML(this.props.icons.delete)}
                          </button>
                      `
            : ''}
                ${((_b = this.props.features) === null || _b === void 0 ? void 0 : _b.save)
            ? html `
                          <button
                              class="_action _action-save ${this.utils.cls('', 's-btn')} ${this.hasErrors() ? 'error' : ''} ${this.state
                .status.saving === 'success'
                ? 'success'
                : this.state.status.saving
                    ? 'loading'
                    : ''}"
                              @click=${() => {
                this.save();
            }}
                              ?disabled=${!this._isValid}
                          >
                              ${unsafeHTML(this.props.icons.save)}
                              ${this.props.i18n.saveButton}
                          </button>
                      `
            : ''}
            </nav>
        `;
    }
    render() {
        var _a;
        return html `
            ${this.props.specs
            ? html `
                      <div class="${this.utils.cls('_root')}">
                          <div class="${this.utils.cls('_metas')}">
                              <div class="${this.utils.cls('_metas-heading')}">
                                  <h3 class="_title s-typo--h3">
                                      ${this.props.specs.title}
                                  </h3>

                                  ${this.props.actionsPosition === 'top'
                ? this._renderActions()
                : ''}
                              </div>
                              ${Object.keys((_a = this.props.source) !== null && _a !== void 0 ? _a : {}).length
                ? html `
                                        <div
                                            class="${this.utils.cls('_metas-source')}"
                                        >
                                            ${this.props.source.url
                    ? html `
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
                                                ${unsafeHTML(__i18n('This content is linked to the %s one...', {
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
                          ${this.props.actionsPosition === 'bottom'
                ? this._renderActions()
                : ''}
                      </div>
                  `
            : ''}
        `;
    }
}
SSpecsEditorComponent.widgetMap = {
    checkbox: __checkboxWidget,
    html: __htmlWidget,
    boolean: __switchWidget,
    image: __imageWidget,
    integer: __integerWidget,
    number: __numberWidget,
    spaces: __spacesWidget,
    switch: __switchWidget,
    color: __colorPickerWidget,
    date: __datetimePickerWidget,
    datetime: __datetimePickerWidget,
    time: __datetimePickerWidget,
    string: __stringWidget,
    link: __linkWidget,
    text: __textWidget,
    select: __selectWidget,
    wysiwyg: __wysiwygWidget,
    video: __videoWidget,
    layout: __layoutWidget,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxXQUFXLEVBQ1gsUUFBUSxFQUNSLFNBQVMsRUFDVCxLQUFLLEVBQ0wsS0FBSyxHQUNSLE1BQU0sNEJBQTRCLENBQUM7QUFFcEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLGdDQUFnQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkcsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV4RixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFV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