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
            console.log('PA', path);
            const p = path.split('.').slice(0, -1).join('.');
            console.log('_P', p);
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
        Object.defineProperty(data.values, 'toJson', {
            enumerable: false,
            value: () => {
                return JSON.parse(JSON.stringify(data.values));
            },
        });
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
        this._hasErrors = undefined;
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
        // "caching" to avoid doing same work
        // multiple times in the same event loop
        if (this._hasErrors !== undefined) {
            return this._hasErrors;
        }
        clearTimeout(this._hasErrorTimeout);
        this._hasErrorTimeout = setTimeout(() => {
            this._hasErrors = undefined;
        });
        let hasErrors = false;
        for (let [dotpath, widget] of Object.entries(this._widgets)) {
            if (widget.hasErrors() && !widget.canBeOverride()) {
                hasErrors = true;
                break;
            }
        }
        this._hasErrors = hasErrors;
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
            if (values !== undefined && !__isPlainObject(values)) {
                values = __set(this._values, valuePath, {
                    value: values,
                }, {
                    preferAssign: true,
                });
            }
            else if (!values) {
                values = __set(this._values, valuePath, {}, {
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
        let widgetId = values['#id'];
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
        console.log('chan', this.data);
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
            ${!this.state.status.pristine &&
            (widget === null || widget === void 0 ? void 0 : widget.hasErrors()) &&
            !widget.canBeOverride()
            ? this.renderError(propObj, Array.isArray(pathOrCallback)
                ? pathOrCallback
                : [propObj.id], widget.lastError)
            : ''}
            ${!this.state.status.pristine && (widget === null || widget === void 0 ? void 0 : widget.hasWarnings())
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