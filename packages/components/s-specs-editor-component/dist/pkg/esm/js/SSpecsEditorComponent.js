import __SLitComponent from '@coffeekraken/s-lit-component';
import { __get, __set } from '@coffeekraken/sugar/object';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
import __STheme from '@coffeekraken/s-theme';
import { __querySelectorUp } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __lowerFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SSpecsEditorComponentInterface from './interface/SSpecsEditorComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-specs-editor-component.css'; // relative to /dist/pkg/esm/js
import __define from './define';
import __colorPickerWidget from './widgets/colorPickerWidget';
import __datetimePickerWidget from './widgets/datetimePickerWidget';
import __imageWidget from './widgets/imageWidget';
import __spacesWidget from './widgets/spacesWidget';
// components
__SDropzoneComponentDefine();
__SColorPickerComponentDefine();
__SDatetimePickerComponentDefine();
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
        this._widgets = {};
    }
    updated(changedProperties) {
        if (changedProperties.has('media')) {
            this.requestUpdate();
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
    getValuePath(path, settings) {
        var _a, _b, _c;
        if (!Array.isArray(path)) {
            path = path.split('.');
        }
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
            const propObj = __get(this.props.specs, currentPath.join('.'));
            if (propObj === null || propObj === void 0 ? void 0 : propObj.responsive) {
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
            const mediaScopedValue = __get(this.props.specs.values, mediaValuePath.join('.'));
            if (finalSettings.force || mediaScopedValue !== undefined) {
                return mediaValuePath;
            }
        }
        else {
            // non media "responsive"
            const noneMediaValue = __get(this.props.specs.values, noneMediaValuePath.join('.'));
            if (finalSettings.force || noneMediaValue !== undefined) {
                return noneMediaValuePath;
            }
        }
    }
    getValue(path, settings) {
        const finalSettings = Object.assign({ default: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        if (this.isPathResponsive(path)) {
            finalSettings.media = this.props.media;
        }
        let valuePath = this.getValuePath(path, finalSettings);
        if (!valuePath) {
            valuePath = path.filter((p) => p !== 'props');
        }
        let value = __get(this.props.specs.values, valuePath.join('.'));
        if (value === undefined && finalSettings.default !== undefined) {
            value = __set(this.props.specs.values, valuePath.join('.'), finalSettings.default);
        }
        return value;
    }
    clearValue(path, settings) {
        var _a, _b;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePath(path, Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {})));
            __set((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath, null);
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __set((_b = this.props.specs.values) !== null && _b !== void 0 ? _b : {}, valuePath, null);
        }
        this.requestUpdate();
    }
    setValue(path, value, settings) {
        var _a;
        if (!Array.isArray(path)) {
            path = path.split('.');
        }
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePath(path, Object.assign({ media: this.props.media, force: true }, (settings !== null && settings !== void 0 ? settings : {})));
            __set((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath.join('.'), value);
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __set(this.props.specs.values, valuePath, value);
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
                    e.$scope = __querySelectorUp(e.target, ($elm) => {
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
     * Apply changes
     */
    apply() {
        setTimeout(() => {
            this.utils.dispatchEvent('change', {
                bubbles: true,
                detail: {
                    propsSpecs: Object.assign({}, this.props.specs),
                    values: Object.assign({}, this.props.specs.values),
                },
            });
            this.requestUpdate();
        });
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
                    this.setValue(path, finalValue);
                    // }
                    break;
            }
        }
        this.apply();
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
        switch (specs.type.toLowerCase()) {
            case 'object{}':
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
        return html `
            <div class="${this.utils.cls('_media-icons')}">
                ${Object.keys(__STheme.sortMedia(this.props.frontspec.media).queries)
            .reverse()
            .map((media) => {
            const mediaValue = this.getValue(path, {
                media,
            });
            return html `
                            <span
                                class="${this.utils.cls('_media-icon')} ${mediaValue !== undefined &&
                mediaValue !== null
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
                                <span class="s-tooltip">${media}</span>
                            </span>
                        `;
        })}
            </div>
        `;
    }
    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    _renderLabel(propObj, path) {
        var _a, _b, _c;
        return html `
            <span>
                <h3 class="_title">${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}</h3>
                ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) &&
            this.isPathResponsive(path)
            ? this._renderMediaSelector(path)
            : ''}
                ${propObj.description
            ? html `
                          <span class="_help-icon s-tooltip-container">
                              <i class="fa-solid fa-circle-question"></i>
                              <div class="s-tooltip s-tooltip--left">
                                  ${propObj.description}
                              </div>
                          </span>
                      `
            : ''}
            </span>
        `;
    }
    _renderSelectElement(propObj, path) {
        var _a, _b, _c;
        const value = (_a = this.getValue(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return html `
            <div class="${this.utils.cls('_prop-select')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => {
            this._update(path, propObj, e);
            this.apply();
        }}
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_select', 's-select')}"
                        placeholder="${(_c = (_b = propObj.default) !== null && _b !== void 0 ? _b : propObj.title) !== null && _c !== void 0 ? _c : propObj.id}"
                        path="${path.join('.')}"
                        .value="${value}"
                        value="${value}"
                    >
                        ${propObj.options.map((option) => html `
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
        const value = (_a = this.getValue(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return html `
            <div class="${this.utils.cls('_prop-checkbox')}">
                <label class="${this.utils.cls('_label', 's-label')}">
                    <input
                        @change=${(e) => {
            this._update(path, propObj, e);
            this.apply();
        }}
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
        const value = (_a = this.getValue(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return html `
            <div class="${this.utils.cls('_prop-text')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => {
            this._update(path, propObj, e);
            this.apply();
        }}
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
    _renderHtmlElement(propObj, path) {
        var _a, _b, _c;
        const value = (_a = this.getValue(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return html `
            <div class="${this.utils.cls('_prop-html')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                >
                    <textarea
                        rows="5"
                        @change=${(e) => this._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_input', 's-input')}"
                        placeholder="${(_c = (_b = propObj.default) !== null && _b !== void 0 ? _b : propObj.title) !== null && _c !== void 0 ? _c : propObj.id}"
                        path="${path.join('.')}"
                    >
${value}</textarea
                    >
                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
    /**
     * Render the proper widget depending on the "type" propObj property
     */
    _getRenderedWidget(propObj, path) {
        var _a, _b, _c;
        const type = (_c = (_b = (_a = propObj.widget) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : propObj.type.toLowerCase(), widget = this.getWidget(type);
        if (!widget) {
            return;
        }
        const values = this.getValue(path);
        // check if the widget is active
        if (widget.isActive &&
            !widget.isActive({
                values,
                path,
                propObj,
            })) {
            return;
        }
        return {
            keepOriginals: widget.keepOriginals,
            html: widget.html({
                values,
                path,
                propObj,
            }),
        };
    }
    _renderWidget(propObj, path) {
        const widget = this._getRenderedWidget(propObj, path);
        return html `
            ${widget
            ? html ` <div class="${this.utils.cls('_widget')}">
                      ${widget.html}
                  </div>`
            : ''}
        `;
    }
    _renderElement(propObj, path, settings) {
        const typeLower = propObj.type.toLowerCase();
        if (typeLower.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableElements(propObj, path);
        }
        let widget;
        if (settings.widgets) {
            widget = this._getRenderedWidget(propObj, path);
        }
        return html `
            <div
                prop="${propObj.id}"
                class="${this.utils.cls('_prop')} ${this.utils.cls('_prop-${typeLower}')}"
            >
                ${widget ? html ` ${this._renderWidget(propObj, path)} ` : ''}
                ${!widget || widget.keepOriginals
            ? html `
                          ${typeLower === 'text'
                ? this._renderTextElement(propObj, path)
                : typeLower === 'select'
                    ? this._renderSelectElement(propObj, path)
                    : typeLower === 'checkbox' ||
                        typeLower === 'boolean'
                        ? this._renderCheckboxElement(propObj, path)
                        : typeLower === 'html'
                            ? this._renderHtmlElement(propObj, path)
                            : ''}
                      `
            : ''}
            </div>
        `;
    }
    _renderRepeatableElements(propObj, path) {
        const loopOn = this.getValue(path, {
            default: [],
        });
        return html ` <div class="${this.utils.cls('_repeatable')}">
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
                ? html ` ${unsafeHTML(this.props.icons.collapse)} `
                : html ` ${unsafeHTML(this.props.icons.expand)} `}
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
                            ${this._renderElements(Object.assign({}, propObj), [...path, i], {
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
        </div>`;
    }
    _renderPropObj(propObj, path, settings) {
        if (propObj.ghost && !this.props.ghostSpecs) {
            return '';
        }
        return html ` ${this._renderElement(propObj, path, settings)} `;
    }
    _renderElements(specs, path = [], settings) {
        const finalSettings = Object.assign({ repeatable: true, widgets: true }, (settings !== null && settings !== void 0 ? settings : {}));
        if (finalSettings.repeatable && specs.type.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableElements(specs, path);
        }
        else {
            if (!specs.props) {
                return this._renderPropObj(specs, path, finalSettings);
            }
            return html `
                ${Object.keys(specs.props).map((prop) => {
                const propObj = specs.props[prop];
                let widget;
                if (finalSettings.widgets) {
                    widget = this._getRenderedWidget(propObj, [
                        ...path,
                        'props',
                        prop,
                    ]);
                }
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
                                ${widget
                        ? html `
                                          <div
                                              prop="${propObj.id}"
                                              class="${this.utils.cls('_prop')}"
                                          >
                                              ${this._renderWidget(propObj, [
                            ...path,
                            'props',
                            prop,
                        ])}
                                          </div>
                                      `
                        : ''}
                                ${!widget || widget.keepOriginals
                        ? html `
                                          ${this._renderElements(propObj, [...path, 'props', prop], finalSettings)}
                                      `
                        : ''}
                            </div>
                        `;
                }
                else {
                    return this._renderPropObj(propObj, [...path, 'props', prop], finalSettings);
                }
            })}
            `;
        }
    }
    render() {
        var _a, _b, _c;
        return html `
            <div
                class="${(_a = this.cu) === null || _a === void 0 ? void 0 : _a.cls('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
            ? html `
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
                                      ${((_b = this.props.features) === null || _b === void 0 ? void 0 : _b.delete)
                ? html `
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
                                            `
                : ''}
                                      ${((_c = this.props.features) === null || _c === void 0 ? void 0 : _c.save)
                ? html `
                                                <button
                                                    class="_action _action-save"
                                                    @click=${() => {
                    this.save();
                }}
                                                >
                                                    Save
                                                </button>
                                            `
                : ''}
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
SSpecsEditorComponent.widgetMap = {
    image: __imageWidget,
    spaces: __spacesWidget,
    color: __colorPickerWidget,
    date: __datetimePickerWidget,
    datetime: __datetimePickerWidget,
    time: __datetimePickerWidget,
};
SSpecsEditorComponent.state = {
    actives: {},
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUksZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RyxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFMUYsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLGtEQUFrRCxDQUFDLENBQUMsK0JBQStCO0FBRXJHLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQyxPQUFPLG1CQUFtQixNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sc0JBQXNCLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxhQUFhLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxjQUFjLE1BQU0sd0JBQXdCLENBQUM7QUFFcEQsYUFBYTtBQUNiLDBCQUEwQixFQUFFLENB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