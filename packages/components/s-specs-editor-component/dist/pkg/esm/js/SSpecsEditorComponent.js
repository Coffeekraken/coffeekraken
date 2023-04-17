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
import __numberWidget from './widgets/numberWidget';
import __selectWidget from './widgets/selectWidget';
import __spacesWidget from './widgets/spacesWidget';
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
        var _a, _b;
        if (!this._values) {
            this._values = Object.assign({}, (_a = this.props.values) !== null && _a !== void 0 ? _a : {});
        }
        for (let [key, propObj] of Object.entries(this.props.specs.props)) {
            if (this._values[key] === undefined) {
                _console.log('set', key, propObj.type);
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
            _console.log('SS', values);
            console.error(`<red>[SSpecsEditorComponent]</red> It seems that your value "<cyan>${valuePath.join('.')}</cyan>" is a <yellow>${typeof values}</yellow> but it MUST be an object according to the following specs:`);
            console.warn(propObj);
            return;
        }
        let widgetId = values._id;
        if (!widgetId) {
            Object.defineProperty(values, '_id', {
                value: __uniqid(),
                writable: true,
                enumerable: false,
            });
            widgetId = values._id;
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
        const data = {
            specs: Object.assign({}, this.props.specs),
            values: __deepClean(this._values, {
                clone: true,
            }),
        };
        _console.log('SAVE', data);
        this.requestUpdate();
        if (this.hasErrors()) {
            return this.requestUpdate();
        }
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
    _addItem(stack, propObj, path) {
        const newValue = {};
        Object.defineProperty(newValue, '_id', {
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
        var _a, _b, _c;
        const finalSettings = Object.assign({ tooltip: 'left' }, (settings !== null && settings !== void 0 ? settings : {}));
        return html `
            <span>
                <h3 class="_title">
                    ${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}
                    ${propObj.required
            ? html ` <span class="_required">*</span> `
            : ''}
                </h3>
                ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) &&
            this.isPathResponsive(path)
            ? this._renderMediaSelector(path)
            : ''}
                ${propObj.description
            ? html `
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
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return html `
                                  <div
                                      class="${this.utils.cls('_repeatable-item')}"
                                      id="${(_a = v._id) !== null && _a !== void 0 ? _a : i}"
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
                        __addClassTimeout('sorted', this.querySelector(`#${v._id}`), 300);
                    });
                }}
                                  >
                                      <div
                                          tabindex="0"
                                          @pointerup=${(e) => {
                    var _a;
                    this._toggle(`${path.join('.')}-${(_a = v._id) !== null && _a !== void 0 ? _a : i}`);
                }}
                                          class="${this.utils.cls('_repeatable-title')} ${this._isActive(`${path.join('.')}-${(_b = v._id) !== null && _b !== void 0 ? _b : i}`)
                    ? 'active'
                    : ''}"
                                      >
                                          ${this._isActive(`${path.join('.')}-${(_c = v._id) !== null && _c !== void 0 ? _c : i}`)
                    ? html `
                                                    ${unsafeHTML(this.props.icons.down)}
                                                `
                    : html `
                                                    ${unsafeHTML(this.props.icons.right)}
                                                `}

                                          <span>
                                              ${(_g = (_f = (_e = (_d = v.title) !== null && _d !== void 0 ? _d : v.name) !== null && _e !== void 0 ? _e : v.id) !== null && _f !== void 0 ? _f : v.value) !== null && _g !== void 0 ? _g : `${propObj.title} #${i}`}
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
                                          class="${this.utils.cls('_repeatable-body')} ${this._isActive(`${path.join('.')}-${(_h = v._id) !== null && _h !== void 0 ? _h : i}`)
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
    string: __textWidget,
    text: __textWidget,
    select: __selectWidget,
    wysiwyg: __wysiwygWidget,
    video: __videoWidget,
};
SSpecsEditorComponent.state = {
    actives: {},
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEYsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFN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