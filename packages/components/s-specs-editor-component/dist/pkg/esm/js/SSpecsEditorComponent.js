import __SLitComponent from '@coffeekraken/s-lit-component';
import { __i18n } from '@coffeekraken/s-i18n';
import { __moveItem } from '@coffeekraken/sugar/array';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __delete, __get, __set } from '@coffeekraken/sugar/object';
import { __copy } from '@coffeekraken/sugar/clipboard';
import { __addClassTimeout } from '@coffeekraken/sugar/dom';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
import { define as __SWysiwygComponentDefine } from '@coffeekraken/s-wysiwyg-component';
import __STheme from '@coffeekraken/s-theme';
import { __uniqid } from '@coffeekraken/sugar/string';
import { __deepClean, __deepMerge } from '@coffeekraken/sugar/object';
import { __lowerFirst, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SSpecsEditorComponentInterface from './interface/SSpecsEditorComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-specs-editor-component.css'; // relative to /dist/pkg/esm/js
import __define from './define';
import __checkboxWidget from './widgets/checkboxWidget';
import __colorPickerWidget from './widgets/colorPickerWidget';
import __datetimePickerWidget from './widgets/datetimePickerWidget';
import __htmlWidget from './widgets/htmlWidget';
import __imageWidget from './widgets/imageWidget';
import __integerWidget from './widgets/integerWidget';
import __layoutWidget from './widgets/layoutWidget';
import __linkWidget from './widgets/linkWidget';
import __numberWidget from './widgets/numberWidget';
import __selectWidget from './widgets/selectWidget';
import __spacesWidget from './widgets/spacesWidget';
import __stringWidget from './widgets/stringWidget';
import __switchWidget from './widgets/switchWidget';
import __textWidget from './widgets/textWidget';
import __videoWidget from './widgets/videoWidget';
import __wysiwygWidget from './widgets/wysiwygWidget';
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
    constructor() {
        super(__deepMerge({
            name: 's-specs-editor',
            interface: __SSpecsEditorComponentInterface,
        }));
        this.status = {
            pristine: true,
            valid: true,
        };
        this._isValid = true;
        this._isPristine = true;
        this._widgets = {};
        this._toggleStack = [];
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
    hasErrors() {
        if (this.status.pristine) {
            return false;
        }
        let hasErrors = false;
        for (let [dotpath, widget] of Object.entries(this._widgets)) {
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
        if (finalSettings.noneResponsive) {
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
    getWidget(type, path, propObj, settings) {
        var _a, _b, _c;
        const valuePath = path.filter((l) => l !== 'props');
        let values = __get(this._values, valuePath);
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
            path,
            valuePath,
            settings: finalSettings,
        });
        return this._widgets[widgetId];
    }
    apply() {
        clearTimeout(this._applyTimeout);
        this._applyTimeout = setTimeout(() => {
            const data = {
                values: __deepClean(this._values, {
                    clone: true,
                }),
            };
            this.utils.dispatchEvent('change', {
                bubbles: true,
                detail: {
                    uid: this.props.uid,
                    values: data.values,
                },
            });
            this.requestUpdate();
        });
    }
    /**
     * Notify through an event that the editor is ready
     */
    _ready() {
        const data = {
            values: __deepClean(this._values, {
                clone: true,
            }),
        };
        this.utils.dispatchEvent('ready', {
            bubbles: true,
            detail: {
                uid: this.props.uid,
                values: data.values,
            },
        });
    }
    /**
     * Save the data.
     * This will dispatch en event "s-specs-editor.save" with as detail the current values object
     */
    save(force = false) {
        // no more pristine....
        this.status.pristine = false;
        const data = {
            values: __deepClean(this._values, {
                clone: true,
            }),
        };
        // if (!force && this.hasErrors()) {
        //     return this.requestUpdate();
        // }
        this.requestUpdate();
        this.utils.dispatchEvent('save', {
            bubbles: true,
            detail: {
                uid: this.props.uid,
                values: data.values,
            },
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
                    ${(_b = (_a = finalSettings.title) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}
                    ${propObj.required
            ? html ` <span class="_required">*</span> `
            : ''}
                </h3>
                ${((_d = (_c = this.props.frontspec) === null || _c === void 0 ? void 0 : _c.media) === null || _d === void 0 ? void 0 : _d.queries) &&
            this.isPathResponsive(path)
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
        if (changedProperties.has('media')) {
            this.requestUpdate();
        }
    }
    renderWidget(propObj, path, settings) {
        var _a, _b, _c;
        const type = (_c = (_b = (_a = propObj.widget) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : propObj.type.toLowerCase(), widget = this.getWidget(type, path, propObj, {});
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
            noneResponsive: true,
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
            return html `
                ${Object.keys(specs.props).map((prop) => {
                const propObj = specs.props[prop], propId = [...path, 'props', prop]
                    .filter((l) => l !== 'props')
                    .join('-');
                if (propObj.props) {
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
        return html `
            ${this.props.specs
            ? html `
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
                ? html `
                                                <button
                                                    class="_action _action-delete"
                                                    confirm="Confirm?"
                                                    @click=${() => {
                    this.save();
                }}
                                                >
                                                    ${unsafeHTML(this.props.icons.delete)}
                                                </button>
                                            `
                : ''}
                                      ${((_b = this.props.features) === null || _b === void 0 ? void 0 : _b.save)
                ? html `
                                                <button
                                                    class="_action _action-save ${this.hasErrors()
                    ? 'error'
                    : ''}"
                                                    @click=${() => {
                    this.save();
                }}
                                                    ?disabled=${!this._isValid}
                                                >
                                                    ${__i18n('Save', {
                    id: 's-specs-editor.actions.save',
                })}
                                                </button>
                                            `
                : ''}
                                  </nav>
                              </div>
                              ${Object.keys((_c = this.props.source) !== null && _c !== void 0 ? _c : {}).length
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
SSpecsEditorComponent.state = {
    actives: {},
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEYsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFN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