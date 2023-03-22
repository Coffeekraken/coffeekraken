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

export interface ISSpecsEditorComponentIconsProp {
    clear: string;
    add: string;
    expand: string;
    remove: string;
    collapse: string;
}

export interface ISSpecsEditorComponentFeatures {
    save: boolean;
    upload: boolean;
    media: boolean;
}

export interface ISSpecsEditorComponentProps {
    id: string;
    specs: any;
    frontspec: any;
    media: string;
    features: ISSpecsEditorComponentFeatures;
    ghostSpecs: boolean;
    icons: ISSpecsEditorComponentIconsProp;
}

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
        return __SLitComponent.propertiesFromInterface(
            {},
            __SSpecsEditorComponentInterface,
        );
    }

    static widgetMap = {
        image: __imageWidget,
        spaces: __spacesWidget,
    };

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static state = {
        actives: {},
    };

    _widgets = {};

    constructor() {
        super(
            __deepMerge({
                name: 's-specs-editor',
                interface: __SSpecsEditorComponentInterface,
            }),
        );
    }

    updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('media')) {
            this.requestUpdate();
        }
    }

    isPathResponsive(path: string[]): any {
        const currentPath = [];

        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            currentPath.push(part);
            const propObj = __get(this.props.specs, currentPath.join('.'));
            if (propObj?.responsive) {
                return true;
            }
        }

        return false;
    }

    getValuePath(path: string | string[], settings?: any): string[] {
        if (!Array.isArray(path)) {
            path = path.split('.');
        }

        const finalSettings = {
            media: null,
            force: false,
            ...(settings ?? {}),
        };

        const currentPath = [],
            noneMediaValuePath = [],
            mediaValuePath = [],
            defaultMediaValuePath = [];
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            if (part !== 'props') {
                noneMediaValuePath.push(part);
                mediaValuePath.push(part);
                defaultMediaValuePath.push(part);
            }
            currentPath.push(part);
            const propObj = __get(this.props.specs, currentPath.join('.'));
            if (propObj?.responsive) {
                if (finalSettings.media) {
                    mediaValuePath.push('media');
                    mediaValuePath.push(finalSettings.media);
                }
                defaultMediaValuePath.push('media');
                defaultMediaValuePath.push(
                    this.props.frontspec?.media?.defaultMedia ?? 'desktop',
                );
            }
        }

        // current media value
        if (finalSettings.media) {
            const mediaScopedValue = __get(
                this.props.specs.values,
                mediaValuePath.join('.'),
            );
            if (finalSettings.force || mediaScopedValue !== undefined) {
                return mediaValuePath;
            }
        } else {
            // non media "responsive"
            const noneMediaValue = __get(
                this.props.specs.values,
                noneMediaValuePath.join('.'),
            );
            if (finalSettings.force || noneMediaValue !== undefined) {
                return noneMediaValuePath;
            }
        }
    }

    getValue(path: string[], settings?: any): any {
        const finalSettings = {
            default: undefined,
            ...(settings ?? {}),
        };
        if (this.isPathResponsive(path)) {
            finalSettings.media = this.props.media;
        }
        let valuePath = this.getValuePath(path, finalSettings);
        if (!valuePath) {
            valuePath = path.filter((p) => p !== 'props');
        }

        let value = __get(this.props.specs.values, valuePath.join('.'));
        if (value === undefined && finalSettings.default !== undefined) {
            value = __set(
                this.props.specs.values,
                valuePath.join('.'),
                finalSettings.default,
            );
        }
        return value;
    }

    clearValue(path: string[], settings?: any): any {
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePath(path, {
                media: this.props.media,
                ...(settings ?? {}),
            });
            __deleteProperty(
                this.props.specs.values ?? {},
                valuePath.join('.'),
            );
        } else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __deleteProperty(this.props.specs.values, valuePath);
        }

        this._update(path);

        this.requestUpdate();
    }

    setValue(path: string | string[], value: any, settings?: any): any {
        if (!Array.isArray(path)) {
            path = path.split('.');
        }

        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePath(path, {
                media: this.props.media,
                force: true,
                ...(settings ?? {}),
            });
            __set(this.props.specs.values ?? {}, valuePath.join('.'), value);
        } else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __set(this.props.specs.values, valuePath, value);
        }

        this.requestUpdate();
    }

    getWidget(type: string): any {
        if (!SSpecsEditorComponent.widgetMap[type]) {
            return;
        }
        if (!this._widgets[type]) {
            this._widgets[type] = SSpecsEditorComponent.widgetMap[type](this);
        }

        if (!this._widgets[type]._eventsInited && this._widgets[type].events) {
            for (let [event, cb] of Object.entries(
                this._widgets[type].events,
            )) {
                this.addEventListener(event, (e) => {
                    e.$scope = __querySelectorUp(e.target, ($elm) => {
                        return $elm.classList.contains(
                            this.utils.cls('_child'),
                        );
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
        this.requestUpdate();
    }

    /**
     * Save the data.
     * This will dispatch en event "s-specs-editor.save" with as detail the current values object
     */
    save(): void {
        this.utils.dispatchEvent('save', {
            bubbles: true,
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
    }

    _update(path: string[], propSpecs: any = null, e: any = null) {
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

    _toggle(id: string): void {
        if (!this.state.actives[id]) {
            this.state.actives[id] = true;
        } else {
            this.state.actives[id] = false;
        }
        this.requestUpdate();
    }
    _isActive(id: string): boolean {
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
    _changeMedia(media: string): void {
        this.props.media = media;
        this.utils.dispatchEvent('changeMedia', {
            detail: media,
        });
        this.requestUpdate();
    }

    /**
     * Render the media selector
     */
    _renderMediaSelector(path: string[]) {
        if (!this.props.frontspec?.media) {
            return '';
        }
        return html`
            <div class="${this.utils.cls('_media-icons')}">
                ${Object.keys(
                    __STheme.sortMedia(this.props.frontspec.media).queries,
                )
                    .reverse()
                    .map((media) => {
                        const mediaValue = this.getValue(path, {
                            media,
                        });
                        return html`
                            <span
                                class="${this.utils.cls(
                                    '_media-icon',
                                )} ${mediaValue !== undefined &&
                                mediaValue !== null
                                    ? 'active'
                                    : ''} ${this.props.media === media
                                    ? 'current'
                                    : ''}"
                            >
                                <span
                                    @pointerup=${() => this._changeMedia(media)}
                                >
                                    ${unsafeHTML(this.props.icons[media])}
                                </span>
                            </span>
                        `;
                    })}
            </div>
        `;
    }

    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    _renderLabel(propObj: any, path: string[]) {
        return html`
            <span>
                <h3 class="_title">${propObj.title ?? propObj.id}</h3>
                ${this.props.frontspec?.media?.queries &&
                this.isPathResponsive(path)
                    ? this._renderMediaSelector(path)
                    : ''}
                ${propObj.description
                    ? html`
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
        const value = this.getValue(path) ?? propObj.default;
        return html`
            <div class="${this.utils.cls('_prop--select')}">
                <label
                    class="${this.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <select
                        @change=${(e) => this._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_select', 's-select')}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
                        path="${path.join('.')}"
                        .value="${value}"
                        value="${value}"
                    >
                        ${propObj.options.map(
                            (option) => html`
                                <option
                                    .value="${option.value}"
                                    value="${option.value}"
                                    ?selected=${(!value &&
                                        option.value === null) ||
                                    option.value === String(value)}
                                >
                                    ${option.name}
                                </option>
                            `,
                        )}
                    </select>

                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }

    _renderCheckboxElement(propObj, path) {
        const value = this.getValue(path) ?? propObj.default;
        return html`
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
        const value = this.getValue(path) ?? propObj.default;
        return html`
            <div class="${this.utils.cls('_prop--text')}">
                <label
                    class="${this.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
                        type="text"
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_input', 's-input')}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
                        path="${path.join('.')}"
                        value="${value}"
                    />
                    ${this._renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }

    _renderHtmlElement(propObj, path) {
        const value = this.getValue(path) ?? propObj.default;
        return html`
            <div class="${this.utils.cls('_prop--html')}">
                <label
                    class="${this.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <textarea
                        rows="5"
                        @change=${(e) => this._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this.utils.cls('_input', 's-input')}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
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
        const type =
                propObj.widget?.toLowerCase?.() ?? propObj.type.toLowerCase(),
            widget = this.getWidget(type);
        if (!widget) {
            return;
        }

        const values = this.getValue(path);

        // check if the widget is active
        if (
            widget.isActive &&
            !widget.isActive({
                values,
                path,
                propObj,
            })
        ) {
            return;
        }

        return {
            hideOriginals: widget.hideOriginals,
            html: widget.html({
                values,
                path,
                propObj,
            }),
        };
    }

    _renderElement(propObj, path) {
        const typeLower = propObj.type.toLowerCase();

        if (typeLower.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableElements(propObj, path);
        }

        return html`
            ${typeLower === 'text'
                ? this._renderTextElement(propObj, path)
                : typeLower === 'select'
                ? this._renderSelectElement(propObj, path)
                : typeLower === 'checkbox'
                ? this._renderCheckboxElement(propObj, path)
                : typeLower === 'html'
                ? this._renderHtmlElement(propObj, path)
                : ''}
        `;
    }

    _renderRepeatableElements(propObj, path) {
        const loopOn = this.getValue(path, {
            default: [],
        });

        return html` <div class="${this.utils.cls('_repeatable')}">
            ${loopOn.map(
                (v, i) => html`
                    <div
                        tabindex="0"
                        @pointerup=${(e) => {
                            this._toggle(`${path.join('.')}-${i}`);
                        }}
                        class="${this.utils.cls(
                            '_repeatable-title',
                        )} ${this._isActive(`${path.join('.')}-${i}`)
                            ? 'active'
                            : ''}"
                    >
                        <span>
                            ${v.title ??
                            v.name ??
                            v.id ??
                            `${propObj.title} #${i}`}
                        </span>

                        <button
                            confirm="Confirm!"
                            @pointerup=${(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (e.currentTarget.needConfirmation) return;
                                this._removeItem(loopOn, v, propObj);
                            }}
                            class="_remove"
                        >
                            <i class="fa-regular fa-trash-can"></i>
                        </button>

                        ${this._isActive(`${path.join('.')}-${i}`)
                            ? html` ${unsafeHTML(this.props.icons.collapse)} `
                            : html` ${unsafeHTML(this.props.icons.expand)} `}
                    </div>
                    <div
                        tabindex="0"
                        class="${this.utils.cls(
                            '_repeatable-item',
                        )} ${this._isActive(`${path.join('.')}-${i}`)
                            ? 'active'
                            : ''}"
                    >
                        <div
                            class="${this.utils.cls('_repeatable-item-props')}"
                        >
                            ${this._renderElements(
                                {
                                    ...propObj,
                                },
                                [...path, i],
                                true,
                            )}
                        </div>
                    </div>
                `,
            )}

            <div class="${this.utils.cls('_repeatable-actions')}">
                <button
                    @pointerup=${() => this._addItem(loopOn, propObj)}
                    class="_add"
                >
                    Add a ${__lowerFirst(propObj.title).replace(/s$/, '')}
                    ${unsafeHTML(this.props.icons.add)}
                </button>
            </div>
        </div>`;
    }

    _renderPropObj(propObj, path) {
        if (propObj.ghost && !this.props.ghostSpecs) {
            return '';
        }

        return html`
            <div prop="${propObj.id}" class="${this.utils.cls('_prop')}">
                ${this._renderElement(propObj, path)}
            </div>
        `;
    }

    _renderElements(specs: any, path: string[] = [], forceNoRepeat = false) {
        if (!forceNoRepeat && specs.type.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableElements(specs, path);
        } else {
            if (!specs.props) {
                return this._renderPropObj(specs, path);
            }

            return html`
                ${Object.keys(specs.props).map((prop) => {
                    const propObj = specs.props[prop];
                    if (propObj.props) {
                        const renderedWidget = this._getRenderedWidget(
                            propObj,
                            [...path, 'props', prop],
                        );

                        return html`
                            <div class="${this.utils.cls('_child')}">
                                <div class="${this.utils.cls('_child-metas')}">
                                    <div
                                        class="${this.utils.cls(
                                            '_child-heading',
                                        )}"
                                    >
                                        <h3
                                            class="${this.utils.cls(
                                                '_child-title',
                                            )}"
                                        >
                                            ${propObj.title}
                                        </h3>
                                        <div
                                            class="${this.utils.cls(
                                                '_child-media',
                                            )}"
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
                                    <p
                                        class="${this.utils.cls(
                                            '_child-description',
                                        )}"
                                    >
                                        ${propObj.description}
                                    </p>
                                </div>

                                ${renderedWidget
                                    ? html` <div
                                          class="${this.utils.cls(
                                              '_child-widget',
                                          )}"
                                      >
                                          ${renderedWidget.html}
                                      </div>`
                                    : ''}
                                <div
                                    class="${this.utils.cls(
                                        '_child-widget-originals',
                                    )}"
                                    style="display: ${renderedWidget?.hideOriginals
                                        ? 'none'
                                        : 'block'}"
                                >
                                    ${this._renderElements(
                                        propObj,
                                        [...path, 'props', prop],
                                        // false,
                                    )}
                                </div>
                            </div>
                        `;
                    } else {
                        return this._renderPropObj(propObj, [
                            ...path,
                            'props',
                            prop,
                        ]);
                    }
                })}
            `;
        }
    }

    render() {
        return html`
            <div
                class="${this.cu?.cls('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
                    ? html`
                          <div class="${this.utils.cls('_root')}">
                              <div class="${this.utils.cls('_metas')}">
                                  <h3 class="_title s-typo--h3">
                                      ${this.props.specs.title}
                                  </h3>
                                  <!-- <p
                                      class="${this.utils.cls(
                                      '_child-description',
                                      's-typo--p',
                                  )}"
                                  >
                                      ${this.props.specs.description}
                                  </p> -->

                                  <nav class="_actions">
                                      ${this.props.features?.delete
                                          ? html`
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
                                      ${this.props.features?.save
                                          ? html`
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

export { __define as define };
