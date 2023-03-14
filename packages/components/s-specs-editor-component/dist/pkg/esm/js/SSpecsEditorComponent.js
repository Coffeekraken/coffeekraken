import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deleteProperty, __get, __set } from '@coffeekraken/sugar/object';
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
import __imageWidget from './widgets/imageWidget';
import __spacesWidget from './widgets/spacesWidget';
// components
__SDropzoneComponentDefine();
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
 * @event           s-specs-editor.update               Dispatched when the user has updated some properties
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
    mount() { }
    isPathResponsive(path) {
        const currentPath = [];
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            currentPath.push(part);
            const propObj = __get(this.props.specs, currentPath.join('.'));
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
            const propObj = __get(this.props.specs, currentPath.join('.'));
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
    getValueFromPath(path, settings) {
        if (this.isPathResponsive(path)) {
            const finalSettings = Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {}));
            const valuePath = this.getValuePathFromPath(path, finalSettings);
            if (valuePath !== undefined) {
                return __get(this.props.specs.values, valuePath.join('.'));
            }
        }
        else {
            const valuePath = this.getValuePathFromPath(path, settings);
            if (valuePath !== undefined) {
                return __get(this.props.specs.values, valuePath.join('.'));
            }
        }
    }
    clearValueFromPath(path, settings) {
        var _a;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, Object.assign({ media: this.props.media }, (settings !== null && settings !== void 0 ? settings : {})));
            __deleteProperty((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath.join('.'));
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __deleteProperty(this.props.specs.values, valuePath);
        }
        this._update(path);
        this.requestUpdate();
    }
    setValueFromPath(path, value, settings) {
        var _a;
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, Object.assign({ media: this.props.media, force: true }, (settings !== null && settings !== void 0 ? settings : {})));
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
                    this.setValueFromPath(path, finalValue);
                    // }
                    break;
            }
        }
        this.utils.dispatchEvent('update', {
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
        this.utils.dispatchEvent('changeMedia', {
            detail: media,
        });
    }
    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    _renderLabel(propObj, path) {
        var _a, _b, _c;
        return html `
            <span>
                ${propObj.description
            ? html `
                          <span
                              class="${this.utils.cls('_help-icon')} s-tooltip-container"
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
            ? html `
                          <div class="${this.utils.cls('_media-icons')}">
                              ${Object.keys(__STheme.sortMedia(this.props.frontspec.media)
                .queries)
                .reverse()
                .map((media) => {
                const mediaValue = this.getValueFromPath(path, {
                    media,
                });
                return html `
                                          <span
                                              class="${this.utils.cls('_media-icon')} ${mediaValue !== undefined &&
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
                                                  ${unsafeHTML(this.props.icons[media])}
                                              </span>
                                              ${mediaValue !== undefined
                    ? html `
                                                        <div
                                                            class="s-tooltip s-tooltip--interactive s-color s-color--accent ${this.utils.cls('_actions')}"
                                                        >
                                                            <button
                                                                class="_action"
                                                                @pointerup=${() => this.clearValueFromPath(path, {
                        media,
                    })}
                                                            >
                                                                ${unsafeHTML(this.props
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
        return html `
            <div class="${this.utils.cls('_prop--select')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => this._update(path, propObj, e)}
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
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return html `
            <div class="${this.utils.cls('_prop--checkbox')}">
                <label class="${this.utils.cls('_label', 's-label')}">
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
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
        const value = (_a = this.getValueFromPath(path)) !== null && _a !== void 0 ? _a : propObj.default;
        return html `
            <div class="${this.utils.cls('_prop--text')}">
                <label
                    class="${this.utils.cls('_label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
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
    /**
     * Render the proper widget depending on the "type" propObj property
     */
    _getRenderedWidget(propObj, path) {
        var _a, _b, _c, _d;
        const type = (_c = (_b = (_a = propObj.widget) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : propObj.type.toLowerCase(), widget = this.getWidget(type);
        if (!widget) {
            return;
        }
        return {
            hideOriginals: widget.hideOriginals,
            html: widget.html(propObj, (_d = this.getValueFromPath(path)) !== null && _d !== void 0 ? _d : {}),
        };
    }
    _renderElement(propObj, path) {
        return html `
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
            return html `
                <div class="${this.utils.cls('_repeatable')}">
                    ${loopOn.map((v, i) => {
                var _a, _b, _c;
                return html `
                            <div
                                tabindex="0"
                                @pointerup=${() => this._toggle(`${path.join('.')}-${i}`)}
                                class="${this.utils.cls('_repeatable-title')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                            >
                                ${(_c = (_b = (_a = v.title) !== null && _a !== void 0 ? _a : v.name) !== null && _b !== void 0 ? _b : v.id) !== null && _c !== void 0 ? _c : `${_specs.title} #${i}`}
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
                                    class="${this.utils.cls('_repeatable-item-actions')} ${this._isActive(`${path.join('.')}-${i}`)
                    ? 'active'
                    : ''}"
                                >
                                    <button
                                        @pointerup=${() => this._removeItem(loopOn, v, _specs)}
                                        class="${this.utils.cls('_repeatable-remove', 's-badge s-color s-color--error')}"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div
                                    class="${this.utils.cls('_repeatable-item-props')}"
                                >
                                    ${this._renderElements(specs, [...path, i], true)}
                                </div>
                            </div>
                        `;
            })}

                    <div class="${this.utils.cls('_repeatable-actions')}">
                        <button
                            @pointerup=${() => this._addItem(loopOn, _specs)}
                            class="${this.utils.cls('_btn', 's-btn')}"
                        >
                            Add a
                            ${__lowerFirst(_specs.title).replace(/s$/, '')}
                            ${unsafeHTML(this.props.icons.add)}
                        </button>
                    </div>
                </div>
            `;
        }
        else {
            return html `
                ${Object.keys(_specs.props).map((prop) => {
                const propObj = _specs.props[prop];
                if (propObj.props) {
                    const renderedWidget = this._getRenderedWidget(propObj, !forceNoRepeat ? [...path, 'props', prop] : path);
                    return html `
                            <div class="${this.utils.cls('_child')}">
                                <h3
                                    class="${this.utils.cls('_child-title', 's-typo--h5')}"
                                >
                                    ${propObj.title}
                                </h3>
                                <p
                                    class="${this.utils.cls('_child-description', 's-typo--p')}"
                                >
                                    ${propObj.description}
                                </p>

                                ${renderedWidget
                        ? html ` ${renderedWidget.html} `
                        : ''}

                                <div
                                    style="display: ${(renderedWidget === null || renderedWidget === void 0 ? void 0 : renderedWidget.hideOriginals)
                        ? 'none'
                        : 'block'}"
                                >
                                    ${this._renderElements(propObj, [...path, 'props', prop], forceNoRepeat)}
                                </div>
                            </div>
                        `;
                }
                else {
                    return html `
                            <div
                                prop="${propObj.id}"
                                class="${this.utils.cls('_prop')}"
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
                                      <button
                                          class="_action _action-save"
                                          @click=${() => {
                this.save();
            }}
                                      >
                                          Save
                                      </button>
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
};
SSpecsEditorComponent.state = {
    actives: {},
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFNUUsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFGLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxrREFBa0QsQ0FBQyxDQUFDLCtCQUErQjtBQUVyRyxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsT0FBTyxhQUFhLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxjQUFjLE1BQU0sd0JBQXdCLENBQUM7QUFFcEQsYUFBYTtBQUNiLDBCQUEwQixFQUFFLENBQUM7QUFpQjdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlFRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8scUJBQXNCLFNBQVEsZUFBZTtJQUM5RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFB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