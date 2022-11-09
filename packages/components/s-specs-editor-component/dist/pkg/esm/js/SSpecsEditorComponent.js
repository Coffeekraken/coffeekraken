import __SLitComponent from '@coffeekraken/s-lit-component';
import { __delete, __get, __set } from '@coffeekraken/sugar/object';
import { define as __SAssetPickerComponentDefine } from '@coffeekraken/s-asset-picker-component';
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
// components
__SAssetPickerComponentDefine();
__SDropzoneComponentDefine();
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
export default class SSpecsEditorComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-specs-editor',
            interface: __SSpecsEditorComponentInterface,
        }));
        this._widgets = {};
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SSpecsEditorComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
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
            console.log('re', valuePath);
            __delete((_a = this.props.specs.values) !== null && _a !== void 0 ? _a : {}, valuePath.join('.'));
            console.log(this.props.specs.values);
        }
        else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __delete(this.props.specs.values, valuePath);
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
            switch (e.target.tagName.toLowerCase()) {
                default:
                    if (e.target.value === propSpecs.default) {
                        __delete(this.props.specs.values, valuePath);
                    }
                    else {
                        this.setValueFromPath(path, e.target.value);
                    }
                    break;
            }
        }
        this.componentUtils.dispatchEvent('update', {
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
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
        return html `
            <span>
                ${propObj.description
            ? html `
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
            ? html `
                          <div
                              class="${this.componentUtils.className('__media-icons')}"
                          >
                              ${Object.keys(__STheme.sortMedia(this.props.frontspec.media)
                .queries)
                .reverse()
                .map((media) => {
                const mediaValue = this.getValueFromPath(path, {
                    media,
                });
                return html `
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
                                                  ${unsafeHTML(this.props.icons[media])}
                                              </span>
                                              ${mediaValue !== undefined
                    ? html `
                                                        <div
                                                            class="s-tooltip s-tooltip--interactive s-color s-color--accent ${this.componentUtils.className('__actions')}"
                                                        >
                                                            <button
                                                                class="${this.componentUtils.className('__action')}"
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
                        checked?=${value}
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
                <div class="${this.componentUtils.className('__repeatable')}">
                    ${loopOn.map((v, i) => {
                var _a, _b, _c;
                return html `
                            <div
                                tabindex="0"
                                @pointerup=${() => this._toggle(`${path.join('.')}-${i}`)}
                                class="${this.componentUtils.className('__repeatable-title')} ${this._isActive(`${path.join('.')}-${i}`)
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
                    return html `
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
                    return html `
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
        return html `
            <div
                class="${(_a = this.componentUtils) === null || _a === void 0 ? void 0 : _a.className('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
            ? html `
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
SSpecsEditorComponent.widgetMap = {
    image: __imageWidget,
};
SSpecsEditorComponent.state = {
    actives: {},
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBFLE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFMUYsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLGtEQUFrRCxDQUFDLENBQUMsK0JBQStCO0FBRXJHLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQyxPQUFPLGFBQWEsTUFBTSx1QkFBdUIsQ0FBQztBQUVsRCxhQUFhO0FBQ2IsNkJBQTZCLEVBQUUsQ0FBQztBQUNoQywwQkFBMEIsRUFBRSxDQUFDO0FBaUI3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxxQkFBc0IsU0FBUSxlQUFlO0lBd0I5RDtRQUNJ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