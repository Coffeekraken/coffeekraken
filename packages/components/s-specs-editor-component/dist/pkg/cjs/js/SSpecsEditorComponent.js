"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
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
const colorPickerWidget_1 = __importDefault(require("./widgets/colorPickerWidget"));
const datetimePickerWidget_1 = __importDefault(require("./widgets/datetimePickerWidget"));
const htmlWidget_1 = __importDefault(require("./widgets/htmlWidget"));
const imageWidget_1 = __importDefault(require("./widgets/imageWidget"));
const selectWidget_1 = __importDefault(require("./widgets/selectWidget"));
const spacesWidget_1 = __importDefault(require("./widgets/spacesWidget"));
const switchWidget_1 = __importDefault(require("./widgets/switchWidget"));
const textWidget_1 = __importDefault(require("./widgets/textWidget"));
// components
(0, s_dropzone_component_1.define)();
(0, s_color_picker_component_1.define)();
(0, s_datetime_picker_component_1.define)();
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
            const propObj = (0, object_1.__get)(this.props.specs, currentPath.join('.'));
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
    getValue(path, settings) {
        const finalSettings = Object.assign({ default: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        if (this.isPathResponsive(path)) {
            finalSettings.media = this.props.media;
        }
        let valuePath = this.getValuePath(path, finalSettings);
        if (!valuePath) {
            valuePath = path.filter((p) => p !== 'props');
        }
        let value = (0, object_1.__get)(this.props.specs.values, valuePath.join('.'));
        if (value === undefined && finalSettings.default !== undefined) {
            value = (0, object_1.__set)(this.props.specs.values, valuePath.join('.'), finalSettings.default);
        }
        return value;
    }
    clearValue(path, settings) {
        var _a, _b;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePath(path, Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {})));
            (0, object_1.__set)((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath, null);
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            (0, object_1.__set)((_b = this.props.specs.values) !== null && _b !== void 0 ? _b : {}, valuePath, null);
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
     * Apply changes
     */
    apply() {
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
        _console.log('Apply', Object.assign({}, this.props.specs.values));
        this.requestUpdate();
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
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_media-icons')}">
                ${Object.keys(s_theme_1.default.sortMedia(this.props.frontspec.media).queries)
            .reverse()
            .map((media) => {
            const mediaValue = this.getValue(path, {
                media,
            });
            return (0, lit_1.html) `
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
                                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[media])}
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
    renderLabel(propObj, path) {
        var _a, _b, _c;
        return (0, lit_1.html) `
            <span>
                <h3 class="_title">${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}</h3>
                ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) &&
            this.isPathResponsive(path)
            ? this._renderMediaSelector(path)
            : ''}
                ${propObj.description
            ? (0, lit_1.html) `
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
    renderWidget(propObj, path) {
        const widget = this._getRenderedWidget(propObj, path);
        return (0, lit_1.html) `
            ${widget
            ? (0, lit_1.html) ` <div class="${this.utils.cls('_widget')}">
                      ${widget.html}
                  </div>`
            : ''}
        `;
    }
    renderProp(propObj, path, settings) {
        const typeLower = propObj.type.toLowerCase();
        // handle repeatable props
        if (typeLower.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableProps(propObj, path);
        }
        const widget = this._getRenderedWidget(propObj, path);
        if (!widget) {
            return (0, lit_1.html) `
                <p class="s-typo:p">
                    Sorry but no widget is registered to handle the
                    "${propObj.type}" type...
                </p>
            `;
        }
        return (0, lit_1.html) `
            <div
                prop="${propObj.id}"
                class="${this.utils.cls('_prop')} ${this.utils.cls('_prop-${typeLower}')}"
            >
                ${this.renderWidget(propObj, path)}
            </div>
        `;
    }
    _renderRepeatableProps(propObj, path) {
        const loopOn = this.getValue(path, {
            default: [],
        });
        return (0, lit_1.html) ` <div class="${this.utils.cls('_repeatable')}">
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
                ? (0, lit_1.html) ` ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.collapse)} `
                : (0, lit_1.html) ` ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.expand)} `}
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
                            ${this.renderProps(Object.assign({}, propObj), [...path, i], {
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
        </div>`;
    }
    _renderPropObj(propObj, path, settings) {
        if (propObj.ghost && !this.props.ghostSpecs) {
            return '';
        }
        return (0, lit_1.html) ` ${this.renderProp(propObj, path, settings)} `;
    }
    renderProps(specs, path = [], settings) {
        const finalSettings = Object.assign({ repeatable: true, widgets: true }, (settings !== null && settings !== void 0 ? settings : {}));
        if (finalSettings.repeatable && specs.type.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableProps(specs, path);
        }
        else {
            if (!specs.props) {
                return this._renderPropObj(specs, path, finalSettings);
            }
            return (0, lit_1.html) `
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
                                ${widget
                        ? (0, lit_1.html) `
                                          <div
                                              prop="${propObj.id}"
                                              class="${this.utils.cls('_prop')}"
                                          >
                                              ${this.renderWidget(propObj, [
                            ...path,
                            'props',
                            prop,
                        ])}
                                          </div>
                                      `
                        : ''}
                                ${!widget || widget.keepOriginals
                        ? (0, lit_1.html) `
                                          ${this.renderProps(propObj, [...path, 'props', prop], finalSettings)}
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
                                      ${((_b = this.props.features) === null || _b === void 0 ? void 0 : _b.delete)
                ? (0, lit_1.html) `
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
                ? (0, lit_1.html) `
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
                              ${this.renderProps(this.props.specs, [])}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponent;
SSpecsEditorComponent.widgetMap = {
    html: htmlWidget_1.default,
    boolean: switchWidget_1.default,
    image: imageWidget_1.default,
    spaces: spacesWidget_1.default,
    switch: switchWidget_1.default,
    color: colorPickerWidget_1.default,
    date: datetimePickerWidget_1.default,
    datetime: datetimePickerWidget_1.default,
    time: datetimePickerWidget_1.default,
    string: textWidget_1.default,
    text: textWidget_1.default,
    select: selectWidget_1.default,
};
SSpecsEditorComponent.state = {
    actives: {},
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBMEQ7QUFFMUQscUZBQWlHO0FBQ2pHLDJGQUF1RztBQUN2Ryw2RUFBMEY7QUFFMUYsb0VBQTZDO0FBRTdDLGlEQUE0RDtBQUM1RCx1REFBeUQ7QUFDekQsdURBQTBEO0FBQzFELDZCQUEyQztBQUMzQyxrRUFBMkQ7QUFDM0QsZ0hBQTBGO0FBRTFGLGFBQWE7QUFDYixvSEFBcUUsQ0FBQywrQkFBK0I7QUFFckcsc0RBQWdDO0FBaTBCWCxpQkFqMEJkLGdCQUFRLENBaTBCWTtBQS96QjNCLG9GQUE4RDtBQUM5RCwwRkFBb0U7QUFDcEUsc0VBQWdEO0FBQ2hELHdFQUFrRDtBQUNsRCwwRUFBb0Q7QUFDcEQsMEVBQW9EO0FBQ3BELDBFQUFvRDtBQUNwRCxzRUFBZ0Q7QUFFaEQsYUFBYTtBQUNiLElBQUEsNkJBQTBCLEdBQUUsQ0FBQztBQUM3QixJQUFBLGlDQUE2QixHQUFFLENBQUM7QUFDaEMsSUFBQSxvQ0FBZ0MsR0FBRSxDQUFDO0FBK0JuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpRUc7QUFFSCxNQUFxQixxQkFBc0IsU0FBUSx5QkFBZTtJQUM5RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3Q0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFpQkQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsc0NBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQVFEO1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsU0FBUyxF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