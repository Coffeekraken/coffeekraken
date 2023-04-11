import __SLitComponent from '@coffeekraken/s-lit-component';
import { __i18n } from '@coffeekraken/s-i18n';
import { __get, __set } from '@coffeekraken/sugar/object';
import { __copy } from '@coffeekraken/sugar/clipboard';
import { __addClassTimeout } from '@coffeekraken/sugar/dom';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
import { define as __SWysiwygComponentDefine } from '@coffeekraken/s-wysiwyg-component';
import __STheme from '@coffeekraken/s-theme';
import { __deepMerge } from '@coffeekraken/sugar/object';
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
    }
    mount() {
        var _a, _b;
        if (!this._values) {
            this._values = Object.assign({}, (_a = this.props.values) !== null && _a !== void 0 ? _a : {});
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
            value = __get(this._values, valuePath);
            if (value === undefined && finalSettings.default) {
                value = __set(this._values, valuePath, finalSettings.default);
            }
            return value;
        }
        // if (path.includes('images')) {
        //     _console.log('value path', path, valuePath);
        // }
        value = __get(this._values, valuePath);
        if (value === undefined && finalSettings.default) {
            value = __set(this._values, valuePath, finalSettings.default);
        }
        return value;
    }
    getWidget(type, path, propObj, settings) {
        var _a, _b, _c;
        const dotPath = path.filter((l) => l !== 'props').join('.');
        if (this._widgets[dotPath]) {
            return this._widgets[dotPath];
        }
        if (!SSpecsEditorComponent.widgetMap[type]) {
            return;
        }
        const finalSettings = Object.assign({ label: !propObj.repeatable || ((_a = propObj.type) === null || _a === void 0 ? void 0 : _a.match(/\[\]$/)) !== null }, (settings !== null && settings !== void 0 ? settings : {}));
        const values = __get(this._values, dotPath);
        this._widgets[dotPath] = new SSpecsEditorComponent.widgetMap[type]({
            editor: this,
            values,
            source: __get((_c = (_b = this.props.source) === null || _b === void 0 ? void 0 : _b.values) !== null && _c !== void 0 ? _c : {}, dotPath),
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
                                    @pointerup=${() => this._changeMedia(media)}
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
                                        ${__i18n('Override %s', {
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
        return html `
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
        return html `
            <div class="${this.utils.cls('_repeatable')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.renderLabel(propObj, path)}
                </label>

                ${loopOn.map((v, i) => {
            var _a, _b, _c;
            return html `
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
                ? html `
                                      ${unsafeHTML(this.props.icons.collapse)}
                                  `
                : html `
                                      ${unsafeHTML(this.props.icons.expand)}
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
                const propObj = specs.props[prop];
                if (propObj.props) {
                    return html `
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
                              ${this.props.source
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEYsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFJN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxrREFBa0QsQ0FBQyxDQUFDLCtCQUErQjtBQUVyRyxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsT0FBTyxnQkFB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