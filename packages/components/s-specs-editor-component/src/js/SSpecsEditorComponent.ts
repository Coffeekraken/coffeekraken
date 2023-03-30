import __SLitComponent from '@coffeekraken/s-lit-component';

import { __i18n } from '@coffeekraken/s-i18n';

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

// components
__SDropzoneComponentDefine();
__SColorPickerComponentDefine();
__SDatetimePickerComponentDefine();

export interface ISSpecsEditorRenderSettings {
    repeatable: boolean;
    widgets: boolean;
}

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
        return __SLitComponent.propertiesFromInterface(
            {},
            __SSpecsEditorComponentInterface,
        );
    }

    static widgetMap = {
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
    };

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static state = {
        actives: {},
    };

    _isValid = true;
    _errors = [];
    _widgets = {};

    constructor() {
        super(
            __deepMerge({
                name: 's-specs-editor',
                interface: __SSpecsEditorComponentInterface,
            }),
        );
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
            __set(this.props.specs.values ?? {}, valuePath, null);
        } else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __set(this.props.specs.values ?? {}, valuePath, null);
        }

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
        if (!this._isValid) {
            return;
        }
        this.utils.dispatchEvent('save', {
            bubbles: true,
            detail: {
                propsSpecs: Object.assign({}, this.props.specs),
                values: Object.assign({}, this.props.specs.values),
            },
        });
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
     * Render an error inside the specs editor
     */
    renderError(propObj: any, path: string[], message: string) {
        if (!message) {
            return '';
        }
        return html`
            <div class="${this.utils.cls('_error')}">
                <p class="_message">${message}</p>
            </div>
        `;
    }

    /**
     * Render a warning inside the specs editor
     */
    renderWarning(propObj: any, path: string[], message: string) {
        if (!message) {
            return '';
        }
        return html`
            <div class="${this.utils.cls('_warning')}">
                <p class="_message">${message}</p>
            </div>
        `;
    }

    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    renderLabel(propObj: any, path: string[]) {
        return html`
            <span>
                <h3 class="_title">
                    ${propObj.title ?? propObj.id}
                    ${propObj.required
                        ? html` <span class="_required">*</span> `
                        : ''}
                </h3>
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

    updated(changedProperties: Map<string, unknown>) {
        // handle errors events, etc...
        if (this._errors.length) {
            this.utils.dispatchEvent('error', {
                detail: {
                    errors: this._errors,
                },
            });
            if (this._isValid) {
                this._isValid = false;
                this.requestUpdate();
            }
        } else {
            this.utils.dispatchEvent('valid', {
                detail: {},
            });
            if (!this._isValid) {
                this._isValid = true;
                this.requestUpdate();
            }
        }

        // reset errors
        this._errors = [];

        if (changedProperties.has('media')) {
            this.requestUpdate();
        }
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

        const widgetResult = widget.render({
            values,
            path,
            propObj,
        });

        if (widgetResult.error) {
            this._errors.push(widgetResult.error);
        }
        if (widgetResult.warning) {
            this.utils.dispatchEvent('warning', {
                detail: {
                    warning: widgetResult.warning,
                    widget,
                },
            });
        }

        return {
            error: widgetResult.error,
            warning: widgetResult.warning,
            html: html` ${widgetResult.html} `,
        };
    }

    renderWidget(propObj, path) {
        let widget = this._getRenderedWidget(propObj, path);

        if (!widget) {
            widget = {
                error: __i18n(
                    'Sorry but no widget is registered to handle the "%s" type...',
                    {
                        id: 's-specs-editor.widget.no',
                        tokens: {
                            '%s': propObj.type,
                        },
                    },
                ),
            };
        }

        return html`
            ${widget?.html
                ? html` <div class="${this.utils.cls('_widget')}">
                      ${widget.html}
                  </div>`
                : ''}
            ${widget?.error
                ? this.renderError(propObj, path, widget.error)
                : ''}
            ${widget?.warning
                ? this.renderWarning(propObj, path, widget.warning)
                : ''}
        `;
    }

    renderProp(propObj, path, settings: Partial<ISSpecsEditorRenderSettings>) {
        const typeLower = propObj.type.toLowerCase();

        // handle repeatable props
        if (typeLower.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableProps(propObj, path);
        }

        return html`
            <div
                prop="${propObj.id}"
                class="${this.utils.cls('_prop')} ${this.utils.cls(
                    `_prop-${typeLower}`,
                )}"
            >
                ${this.renderWidget(propObj, path)}
            </div>
        `;
    }

    _renderRepeatableProps(propObj, path) {
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
                            ${this.renderProps(
                                {
                                    ...propObj,
                                },
                                [...path, i],
                                {
                                    repeatable: false,
                                },
                            )}
                        </div>
                    </div>
                `,
            )}

            <div class="${this.utils.cls('_repeatable-actions')}">
                <button
                    @pointerup=${() =>
                        this._addItem(loopOn, propObj, [
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

    renderProps(specs: any, path: string[] = [], settings?: any) {
        const finalSettings = {
            repeatable: true,
            widgets: true,
            ...(settings ?? {}),
        };

        if (finalSettings.repeatable && specs.type.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableProps(specs, path);
        } else {
            if (!specs.props) {
                return this.renderProp(specs, path, finalSettings);
            }

            return html`
                ${Object.keys(specs.props).map((prop) => {
                    const propObj = specs.props[prop];

                    if (propObj.props) {
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
                                    <!-- <p
                                        class="${this.utils.cls(
                                        '_child-description',
                                    )}"
                                    >
                                        ${propObj.description}
                                    </p> -->
                                </div>
                                <div
                                    prop="${propObj.id}"
                                    class="${this.utils.cls('_prop')}"
                                >
                                    ${this.renderProp(
                                        propObj,
                                        [...path, 'props', prop],
                                        finalSettings,
                                    )}
                                </div>
                            </div>
                        `;
                    } else {
                        return this.renderProp(
                            propObj,
                            [...path, 'props', prop],
                            finalSettings,
                        );
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
                                                        _console.log('^SAVE');
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
                              ${this.renderProps(this.props.specs, [])}
                          </div>
                      `
                    : ''}
            </div>
        `;
    }
}

export { __define as define };
