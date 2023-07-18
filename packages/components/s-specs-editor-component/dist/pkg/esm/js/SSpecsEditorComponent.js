import __SLitComponent from '@coffeekraken/s-lit-component';
import { __i18n } from '@coffeekraken/s-i18n';
import { __moveItem } from '@coffeekraken/sugar/array';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepClean, __delete, __get, __set, } from '@coffeekraken/sugar/object';
import { __copy } from '@coffeekraken/sugar/clipboard';
import { __addClassTimeout } from '@coffeekraken/sugar/dom';
import { __define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import { __define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { __define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
import { __define as __SWysiwygComponentDefine } from '@coffeekraken/s-wysiwyg-component';
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
 * import { __define as __SSpecsEditorComponentDefine } from '@coffeekraken/s-clipboard-copy-component';
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
        if (!this._values.id) {
            this._values.id = {
                value: __uniqid(),
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
            values = __get(this._values, valuePath);
            if (!values) {
                values = __set(this._values, valuePath, {}, {
                    preferAssign: true,
                });
            }
            else if (!__isPlainObject(values)) {
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
                value: __uniqid(),
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
            source: __get((_c = (_b = this.props.source) === null || _b === void 0 ? void 0 : _b.values) !== null && _c !== void 0 ? _c : {}, valuePath),
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
                        __addClassTimeout('sorted', this.querySelector(`#${v.id}`), 300);
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
                    ? html `
                                                    ${unsafeHTML(this.props.icons.down)}
                                                `
                    : html `
                                                    ${unsafeHTML(this.props.icons.right)}
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
                                              ${unsafeHTML(this.props.icons.reorder)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxXQUFXLEVBQ1gsUUFBUSxFQUNSLEtBQUssRUFDTCxLQUFLLEdBQ1IsTUFBTSw0QkFBNEIsQ0FBQztBQUVwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFFBQVEsSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxRQUFRLElBQUksZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RyxPQUFPLEVBQUUsUUFBUSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUYsT0FBTyxFQUFFLFFBQVEsSUFBSSx5QkFBeUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTFGLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUl0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFN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