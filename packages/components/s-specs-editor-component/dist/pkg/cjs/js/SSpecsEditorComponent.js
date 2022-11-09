"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const s_asset_picker_component_1 = require("@coffeekraken/s-asset-picker-component");
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
const imageWidget_1 = __importDefault(require("./widgets/imageWidget"));
// components
(0, s_asset_picker_component_1.define)();
(0, s_dropzone_component_1.define)();
/**
 * @name                SSpecsEditorComponent
 * @as                  Clipboard copy
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSpecsEditorComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-clipboard-copy
 * @platform            html
 * @status              beta
 *
 * This component represent a simple "copy to clipboard" component that will copy a "from" target when clicked.
 *
 * @feature           Copy to clipboard
 * @feature           Specify a "from" target to copy using a simple css selector
 * @feature           Default icons for "copy", "copied" and "error"
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           s-specs-editor.update               Dispatched when the user has updated some properties
 * @event           s-specs-editor.changeMedia         Dispatched when the user has changed the media from the UI
 * @event           s-specs-editor                      Dispatched at any events. Check the "eventType" property for the event name
 *
 * @install           shell
 * npm i @coffeekraken/s-clipboard-copy-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-clipboard-copy-component';
 * define();
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
    constructor() {
        super((0, object_2.__deepMerge)({
            name: 's-specs-editor',
            interface: SSpecsEditorComponentInterface_1.default,
        }));
        this._widgets = {};
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SSpecsEditorComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_specs_editor_component_css_1.default)}
        `;
    }
    updated(changedProperties) {
        if (changedProperties.has('media')) {
            this.requestUpdate();
        }
    }
    mount() { }
    isPathResponsive(path) {
        const currentPath = [];
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            currentPath.push(part);
            const propObj = (0, object_1.__get)(this.props.specs, currentPath.join('.'));
            if (propObj.responsive) {
                return true;
            }
        }
        return false;
    }
    getValuePathFromPath(path, settings) {
        var _a, _b, _c;
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
            if (propObj.responsive) {
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
    getValueFromPath(path, settings) {
        if (this.isPathResponsive(path)) {
            const finalSettings = Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {}));
            const valuePath = this.getValuePathFromPath(path, finalSettings);
            if (valuePath !== undefined) {
                return (0, object_1.__get)(this.props.specs.values, valuePath.join('.'));
            }
        }
        else {
            const valuePath = this.getValuePathFromPath(path, settings);
            if (valuePath !== undefined) {
                return (0, object_1.__get)(this.props.specs.values, valuePath.join('.'));
            }
        }
    }
    clearValueFromPath(path, settings) {
        var _a;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {})));
            (0, object_1.__delete)((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath.join('.'));
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            (0, object_1.__delete)(this.props.specs.values, valuePath);
        }
        this._update(path);
        this.requestUpdate();
    }
    setValueFromPath(path, value, settings) {
        var _a;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, Object.assign({ media: this.props.media, force: true }, (settings !== null && settings !== void 0 ? settings : {})));
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
                        return $elm.classList.contains(this.componentUtils.className('__child'));
                    });
                    this._widgets[type].events[event](e);
                });
            }
            this._widgets[type]._eventsInited = true;
        }
        return this._widgets[type];
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
                    //     __delete(this.props.specs.values, valuePath);
                    // } else {
                    this.setValueFromPath(path, finalValue);
                    // }
                    break;
            }
        }
        this.componentUtils.dispatchEvent('update', {
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
        this.requestUpdate();
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
    _addItem(stack, specs) {
        switch (specs.type.toLowerCase()) {
            case 'object{}':
            default:
                stack.push({});
                break;
        }
        // @ts-ignore
        this.requestUpdate();
    }
    /**
     * Remove an item in a repeatable one
     */
    _removeItem(stack, item, specs) {
        if (Array.isArray(stack)) {
            stack.splice(stack.indexOf(item), 1);
        }
        // @ts-ignore
        this.requestUpdate();
    }
    /**
     * Changing media
     */
    _changeMedia(media) {
        this.props.media = media;
        this.componentUtils.dispatchEvent('changeMedia', {
            detail: media,
        });
    }
    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    _renderLabel(propObj, path) {
        var _a, _b, _c;
        return (0, lit_1.html) `
            <span>
                ${propObj.description
            ? (0, lit_1.html) `
                          <span
                              class="${this.componentUtils.className('__help-icon')} s-tooltip-container"
                          >
                              <i class="fa-solid fa-circle-question"></i>
                              <div class="s-tooltip s-tooltip--left">
                                  ${propObj.description}
                              </div>
                          </span>
                      `
            : ''}
                ${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}
                ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) &&
            this.isPathResponsive(path)
            ? (0, lit_1.html) `
                          <div
                              class="${this.componentUtils.className('__media-icons')}"
                          >
                              ${Object.keys(s_theme_1.default.sortMedia(this.props.frontspec.media)
                .queries)
                .reverse()
                .map((media) => {
                const mediaValue = this.getValueFromPath(path, {
                    media,
                });
                return (0, lit_1.html) `
                                          <span
                                              class="${this.componentUtils.className('__media-icon')} ${mediaValue !== undefined &&
                    mediaValue !== null
                    ? 'active'
                    : ''} ${this.props.media ===
                    media
                    ? 'current'
                    : ''} s-tooltip-container"
                                          >
                                              <span
                                                  @pointerup=${() => this._changeMedia(media)}
                                              >
                                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[media])}
                                              </span>
                                              ${mediaValue !== undefined
                    ? (0, lit_1.html) `
                                                        <div
                                                            class="s-tooltip s-tooltip--interactive s-color s-color--accent ${this.componentUtils.className('__actions')}"
                                                        >
                                                            <button
                                                                class="${this.componentUtils.className('__action')}"
                                                                @pointerup=${() => this.clearValueFromPath(path, {
                        media,
                    })}
                                                            >
                                                                ${(0, unsafe_html_js_1.unsafeHTML)(this.props
                        .icons
                        .clear)}
                                                            </button>
                                                        </div>
                                                    `
                    : ''}
                                          </span>
                                      `;
            })}
                          </div>
                      `
            : ''}
            </span>
        `;
    }
    _renderSelectElement(propObj, path) {
        var _a, _b, _c;
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => this._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className('__select', 's-select')}"
                        placeholder="${(_c = (_b = propObj.default) !== null && _b !== void 0 ? _b : propObj.title) !== null && _c !== void 0 ? _c : propObj.id}"
                        path="${path.join('.')}"
                        .value="${value}"
                        value="${value}"
                    >
                        ${propObj.options.map((option) => (0, lit_1.html) `
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
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--checkbox')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label')}"
                >
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
                        type="checkbox"
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className('__checkbox', 's-switch')}"
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
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('__prop--text')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
                        type="text"
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className('__input', 's-input')}"
                        placeholder="${(_c = (_b = propObj.default) !== null && _b !== void 0 ? _b : propObj.title) !== null && _c !== void 0 ? _c : propObj.id}"
                        path="${path.join('.')}"
                        value="${value}"
                    />
                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
    /**
     * Render the proper widget depending on the "type" propObj property
     */
    _renderEditWidget(propObj, path) {
        var _a;
        const type = propObj.type.toLowerCase(), widget = this.getWidget(type);
        if (!widget) {
            return '';
        }
        return widget.html(propObj, (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : {});
    }
    _renderElement(propObj, path) {
        return (0, lit_1.html) `
            ${propObj.type.toLowerCase() === 'text'
            ? this._renderTextElement(propObj, path)
            : propObj.type.toLowerCase() === 'select'
                ? this._renderSelectElement(propObj, path)
                : propObj.type.toLowerCase() === 'checkbox'
                    ? this._renderCheckboxElement(propObj, path)
                    : ''}
        `;
    }
    _renderElements(specs, path = [], forceNoRepeat = false) {
        var _a;
        // const _specs = __get(specs, path.join('.'));
        const _specs = specs;
        if (!forceNoRepeat && _specs.type.match(/(\{\}|\[\])/)) {
            const loopOn = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : [];
            return (0, lit_1.html) `
                <div class="${this.componentUtils.className('__repeatable')}">
                    ${loopOn.map((v, i) => {
                var _a, _b, _c;
                return (0, lit_1.html) `
                            <div
                                tabindex="0"
                                @pointerup=${() => this._toggle(`${path.join('.')}-${i}`)}
                                class="${this.componentUtils.className('__repeatable-title')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                            >
                                ${(_c = (_b = (_a = v.title) !== null && _a !== void 0 ? _a : v.name) !== null && _b !== void 0 ? _b : v.id) !== null && _c !== void 0 ? _c : `${_specs.title} #${i}`}
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
                                class="${this.componentUtils.className('__repeatable-item')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                            >
                                <div
                                    class="${this.componentUtils.className('__repeatable-item-actions')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                                >
                                    <button
                                        @pointerup=${() => this._removeItem(loopOn, v, _specs)}
                                        class="${this.componentUtils.className('__repeatable-remove', 's-badge s-color s-color--error')}"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div
                                    class="${this.componentUtils.className('__repeatable-item-props')}"
                                >
                                    ${this._renderElements(specs, [...path, i], true)}
                                </div>
                            </div>
                        `;
            })}

                    <div
                        class="${this.componentUtils.className('__repeatable-actions')}"
                    >
                        <button
                            @pointerup=${() => this._addItem(loopOn, _specs)}
                            class="${this.componentUtils.className('__btn', 's-btn')}"
                        >
                            Add a
                            ${(0, string_1.__lowerFirst)(_specs.title).replace(/s$/, '')}
                            ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.add)}
                        </button>
                    </div>
                </div>
            `;
        }
        else {
            return (0, lit_1.html) `
                ${Object.keys(_specs.props).map((prop) => {
                const propObj = _specs.props[prop];
                if (propObj.props) {
                    return (0, lit_1.html) `
                            <div
                                class="${this.componentUtils.className('__child')}"
                            >
                                <h3
                                    class="${this.componentUtils.className('__child-title', 's-typo--h5')}"
                                >
                                    ${propObj.title}
                                </h3>
                                <p
                                    class="${this.componentUtils.className('__child-description', 's-typo--p')}"
                                >
                                    ${propObj.description}
                                </p>

                                ${this._renderEditWidget(propObj, !forceNoRepeat
                        ? [...path, 'props', prop]
                        : path)}
                                ${this._renderElements(propObj, [...path, 'props', prop], forceNoRepeat)}
                            </div>
                        `;
                }
                else {
                    return (0, lit_1.html) `
                            <div
                                prop="${propObj.id}"
                                class="${this.componentUtils.className('__prop')}"
                            >
                                ${this._renderElement(propObj, [
                        ...path,
                        'props',
                        prop,
                    ])}
                            </div>
                        `;
                }
            })}
            `;
        }
    }
    render() {
        var _a;
        return (0, lit_1.html) `
            <div
                class="${(_a = this.componentUtils) === null || _a === void 0 ? void 0 : _a.className('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
            ? (0, lit_1.html) `
                          <div
                              class="${this.componentUtils.className('__root')}"
                          >
                              <div
                                  class="${this.componentUtils.className('__metas')}"
                              >
                                  <h3
                                      class="${this.componentUtils.className('__child-title', 's-typo--h3')}"
                                  >
                                      ${this.props.specs.title}
                                  </h3>
                                  <p
                                      class="${this.componentUtils.className('__child-description', 's-typo--p')}"
                                  >
                                      ${this.props.specs.description}
                                  </p>
                              </div>
                              ${this._renderElements(this.props.specs, [])}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponent;
SSpecsEditorComponent.widgetMap = {
    image: imageWidget_1.default,
};
SSpecsEditorComponent.state = {
    actives: {},
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBb0U7QUFFcEUscUZBQWlHO0FBQ2pHLDZFQUEwRjtBQUUxRixvRUFBNkM7QUFFN0MsaURBQTREO0FBQzVELHVEQUF5RDtBQUN6RCx1REFBMEQ7QUFDMUQsNkJBQTJDO0FBQzNDLGtFQUEyRDtBQUMzRCxnSEFBMEY7QUFFMUYsYUFBYTtBQUNiLG9IQUFxRSxDQUFDLCtCQUErQjtBQUVyRyxzREFBZ0M7QUE4d0JYLGlCQTl3QmQsZ0JBQVEsQ0E4d0JZO0FBNXdCM0Isd0VBQWtEO0FBRWxELGFBQWE7QUFDYixJQUFBLGlDQUE2QixHQUFFLENBQUM7QUFDaEMsSUFBQSw2QkFBMEIsR0FBRSxDQUFDO0FBaUI3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURHO0FBRUgsTUFBcUIscUJBQXNCLFNBQVEseUJBQWU7SUF3QjlEO1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsU0FBUyxFQUFFLHdDQUFnQztTQUM5QyxDQUFDLENBQ0wsQ0FBQztRQVJOLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFTZCxDQUFDO0lBOUJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQU1ELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLHNDQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFpQkQsT0FBTyxDQUFDLGlCQUF1QztRQUMzQyxJQUFJLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZ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