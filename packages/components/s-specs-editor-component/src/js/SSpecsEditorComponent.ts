import __SLitComponent from '@coffeekraken/s-lit-component';

import { __i18n } from '@coffeekraken/s-i18n';

import { __moveItem } from '@coffeekraken/sugar/array';
import { __delete, __get, __set } from '@coffeekraken/sugar/object';

import { __copy } from '@coffeekraken/sugar/clipboard';
import { __addClassTimeout } from '@coffeekraken/sugar/dom';

import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
import { define as __SWysiwygComponentDefine } from '@coffeekraken/s-wysiwyg-component';

import __STheme from '@coffeekraken/s-theme';

import { __uniqid } from '@coffeekraken/sugar/string';

import type { ISSpeceEditorWidgetSettings } from './SSpecsEditorWidget';

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

export interface ISSpecsEditorRenderSettings {
    label: boolean;
    repeatable: boolean;
    widgets: boolean;
}

export interface ISSpecsEditorComponentSource {
    title: string;
    description: string;
    url: string;
    values: any;
}

export interface ISSpecsEditorComponentRenderLabelSettings {
    tooltip?: 'top' | 'left' | 'right' | 'bottom';
}

export interface ISSpecsEditorComponentGetValueSettings {
    default?: any;
    media?: string;
    noneResponsive?: boolean;
}

export interface ISSpecsEditorComponentSetValueSettings {
    media?: string;
    noneResponsive?: boolean;
    merge?: boolean;
}

export interface ISSpecsEditorStatus {
    pristine: boolean;
    valid: boolean;
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
        wysiwyg: __wysiwygWidget,
        video: __videoWidget,
    };

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static state = {
        actives: {},
    };

    status: ISSpecsEditorStatus = {
        pristine: true,
        valid: true,
    };

    _isValid = true;
    _isPristine = true;
    _widgets = {};
    _values;

    _toggleStack: string[] = [];

    constructor() {
        super(
            __deepMerge({
                name: 's-specs-editor',
                interface: __SSpecsEditorComponentInterface,
            }),
        );
    }

    mount() {
        if (!this._values) {
            this._values = Object.assign({}, this.props.values ?? {});
        }
        for (let [key, propObj] of Object.entries(this.props.specs.props)) {
            if (this._values[key] === undefined) {
                if (propObj.type?.match(/\[\]$/)) {
                    this._values[key] = [];
                } else {
                    this._values[key] = {};
                }
            }
        }
    }

    firstUpdated() {
        for (let [dotPath, widget] of Object.entries(this._widgets)) {
            widget.firstUpdated?.();
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

    isPathRepeatable(path: string[]): any {
        const propObj = __get(this.props.specs, path.join('.'));
        if (!propObj?.type) {
            return false;
        }
        return propObj.type.match(/\[\]$/) !== null;
    }

    hasErrors(): boolean {
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

    getValuePath(
        path: string | string[],
        settings?: ISSpecsEditorComponentGetValueSettings,
    ): string[] {
        if (!Array.isArray(path)) {
            path = path.split('.');
        }

        const finalSettings = {
            media: undefined,
            ...(settings ?? {}),
        };

        let currentPath = [],
            noneMediaValuePath = [],
            mediaValuePath = [];
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

            if (propObj?.responsive) {
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

        return mediaValuePath ?? noneMediaValuePath;
    }

    deleteValue(path: string[]): void {
        __delete(this._values, path);
    }

    getValue(
        path: string[],
        settings?: ISSpecsEditorComponentGetValueSettings,
    ): any {
        const finalSettings = {
            default: undefined,
            media: undefined,
            ...(settings ?? {}),
        };

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

    getWidget(
        type: string,
        path: string[],
        propObj: any,
        settings?: ISSpeceEditorWidgetSettings,
    ): any {
        const valuePath = path.filter((l) => l !== 'props');

        let values = __get(this._values, valuePath);
        if (!values) {
            values = __set(
                this._values,
                valuePath,
                {},
                {
                    preferAssign: true,
                },
            );
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

        const isRepeatable =
            !propObj.repeatable || propObj.type?.match(/\[\]$/) !== null;

        const finalSettings = {
            label: isRepeatable,
            ...(settings ?? {}),
        };

        this._widgets[widgetId] = new SSpecsEditorComponent.widgetMap[type]({
            editor: this,
            values,
            source: __get(this.props.source?.values ?? {}, valuePath),
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
    save(): void {
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
    isDefaultMedia(media: string = this.props.media): boolean {
        return media === this.props.defaultMedia;
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

        const widget =
            this._widgets[path.filter((l) => l !== 'props').join('.')];
        return html`
            <div class="${this.utils.cls('_media-icons')}">
                ${Object.keys(
                    __STheme.sortMedia(this.props.frontspec.media).queries,
                )
                    .reverse()
                    .map((media) => {
                        return html`
                            <span
                                class="${this.utils.cls(
                                    '_media-icon',
                                )} ${widget?.hasValuesForMedia(media)
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
     * Render a copy button
     */
    renderCopyButton(text, tooltip = 'Copy'): any {
        return html`
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
                    ? html` <div class="s-tooltip">${tooltip}</div> `
                    : ''}
            </button>
        `;
    }

    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    renderLabel(
        propObj: any,
        path: string[],
        settings?: ISSpecsEditorComponentRenderLabelSettings,
    ) {
        const finalSettings: ISSpecsEditorComponentRenderLabelSettings = {
            tooltip: 'left',
            ...(settings ?? {}),
        };
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

    updated(changedProperties: Map<string, unknown>) {
        if (this.hasErrors()) {
            this.classList.add('error');
            this.utils.dispatchEvent('error', {
                detail: {},
            });
            if (this._isValid) {
                this._isValid = false;
                this.requestUpdate();
            }
        } else {
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

    renderWidget(propObj, path, settings?: ISSpecsEditorRenderSettings) {
        const type =
                propObj.widget?.toLowerCase?.() ?? propObj.type.toLowerCase(),
            widget = this.getWidget(type, path, propObj, {});

        return html`
            ${widget?.render
                ? html` <div class="${this.utils.cls('_widget')}">
                      ${widget.render()}
                      ${widget.canBeOverride()
                          ? html`
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
            ${widget?.hasErrors() && !widget.canBeOverride()
                ? this.renderError(propObj, path, widget.lastError)
                : ''}
            ${widget?.hasWarnings()
                ? this.renderWarning(propObj, path, widget.lastWarning)
                : ''}
        `;
    }

    renderProp(propObj, path, settings: Partial<ISSpecsEditorRenderSettings>) {
        const typeLower = propObj.type.toLowerCase();

        // handle repeatable props
        if (typeLower.match(/(\{\}|\[\])/)) {
            return this._renderRepeatableProps(propObj, path);
        }

        if (typeLower === 'object' && propObj.props) {
            return this.renderProps(propObj, path, settings);
        }

        return html`
            <div
                class="${this.utils.cls('_prop')} ${this.utils.cls(
                    `_prop-${typeLower}`,
                )}"
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

        const _reorder = (item, to, callback?) => {
            __moveItem(loopOn, item, to);
            this.requestUpdate();
            setTimeout(() => {
                callback?.();
            }, 100);
        };

        return html`
            <div class="${this.utils.cls('_repeatable')}">
                <label
                    class="${this.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.renderLabel(propObj, path)}
                </label>

                ${loopOn.length
                    ? html`
                          ${loopOn.map((v, i) => {
                              return html`
                                  <div
                                      class="${this.utils.cls(
                                          '_repeatable-item',
                                      )}"
                                      id="${v._id ?? i}"
                                      draggable="true"
                                      @dragstart=${(e) => {
                                          e.target._isSorting = true;
                                          if (!e.target._sortable) {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              return;
                                          }
                                          e.target.parentNode.classList.add(
                                              'sort',
                                          );
                                          e.target.classList.add('sorting');
                                      }}
                                      @dragend=${(e) => {
                                          e.target._isSorting = false;
                                          if (!e.target._sortable) {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              return;
                                          }
                                          e.target.parentNode.classList.remove(
                                              'sort',
                                          );
                                          e.target.classList.remove('sorting');
                                          _reorder(v, dropIndex, () => {
                                              __addClassTimeout(
                                                  'sorted',
                                                  this.querySelector(
                                                      `#${v._id}`,
                                                  ),
                                                  300,
                                              );
                                          });
                                      }}
                                  >
                                      <div
                                          tabindex="0"
                                          @pointerup=${(e) => {
                                              this._toggle(
                                                  `${path.join('.')}-${
                                                      v._id ?? i
                                                  }`,
                                              );
                                          }}
                                          class="${this.utils.cls(
                                              '_repeatable-title',
                                          )} ${this._isActive(
                                              `${path.join('.')}-${v._id ?? i}`,
                                          )
                                              ? 'active'
                                              : ''}"
                                      >
                                          ${this._isActive(
                                              `${path.join('.')}-${v._id ?? i}`,
                                          )
                                              ? html`
                                                    ${unsafeHTML(
                                                        this.props.icons.down,
                                                    )}
                                                `
                                              : html`
                                                    ${unsafeHTML(
                                                        this.props.icons.right,
                                                    )}
                                                `}

                                          <span>
                                              ${v.title ??
                                              v.name ??
                                              v.id ??
                                              v.value ??
                                              `${propObj.title} #${i}`}
                                          </span>

                                          <button
                                              confirm="Confirm!"
                                              @pointerup=${(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  if (
                                                      e.currentTarget
                                                          .needConfirmation
                                                  )
                                                      return;
                                                  this._removeItem(
                                                      loopOn,
                                                      v,
                                                      propObj,
                                                  );
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
                                                  const $sortable =
                                                      e.target.parentNode
                                                          .parentNode;
                                                  if ($sortable._isSorting)
                                                      return;
                                                  $sortable._sortable = true;
                                              }}
                                              @pointerout=${(e) => {
                                                  const $sortable =
                                                      e.target.parentNode
                                                          .parentNode;
                                                  if ($sortable._isSorting)
                                                      return;
                                                  $sortable._sortable = false;
                                              }}
                                          >
                                              ${unsafeHTML(
                                                  this.props.icons.reorder,
                                              )}
                                          </button>
                                      </div>
                                      <div
                                          tabindex="0"
                                          class="${this.utils.cls(
                                              '_repeatable-body',
                                          )} ${this._isActive(
                                              `${path.join('.')}-${v._id ?? i}`,
                                          )
                                              ? 'active'
                                              : ''}"
                                      >
                                          <div
                                              class="${this.utils.cls(
                                                  '_repeatable-item-props',
                                              )}"
                                          >
                                              ${this.renderProps(
                                                  {
                                                      ...propObj,
                                                      repeatable: true,
                                                      type: propObj.type.replace(
                                                          /\[\]$/,
                                                          '',
                                                      ),
                                                  },
                                                  [...path, i],
                                                  {
                                                      repeatable: false,
                                                  },
                                              )}
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
                                      class="${this.utils.cls(
                                          '_repeatable-drop',
                                      )}"
                                  ></div>
                              `;
                          })}
                      `
                    : html`
                          <div class="${this.utils.cls('_repeatable-empty')}">
                              ${unsafeHTML(this.props.icons.repeatableEmpty)}
                              <p class="_text">
                                  ${__i18n(
                                      'No item currently. Add some by clicking on the button bellow...',
                                      {
                                          id: 's-specs-editor.repeatable.empty',
                                      },
                                  )}
                              </p>
                          </div>
                      `}

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
            </div>
        `;
    }

    renderProps(specs: any, path: string[] = [], settings?: any) {
        const finalSettings = {
            repeatable: true,
            widgets: true,
            ...(settings ?? {}),
        };

        if (finalSettings.repeatable && specs.type.match(/(\[\])/)) {
            return this._renderRepeatableProps(specs, path);
        } else {
            if (!specs.props) {
                return this.renderProp(specs, path, finalSettings);
            }

            return html`
                ${Object.keys(specs.props).map((prop) => {
                    const propObj = specs.props[prop],
                        propId = [...path, 'props', prop]
                            .filter((l) => l !== 'props')
                            .join('-');

                    if (propObj.props) {
                        return html`
                            <div class="${this.utils.cls('_child')}">
                                <div class="${this.utils.cls('_child-metas')}">
                                    <a
                                        class="${this.utils.cls(
                                            '_child-toggle',
                                        )} ${this._toggleStack.includes(propId)
                                            ? 'active'
                                            : ''}"
                                        @pointerup=${(e) => {
                                            if (
                                                this._toggleStack.includes(
                                                    propId,
                                                )
                                            ) {
                                                this._toggleStack.splice(
                                                    this._toggleStack.indexOf(
                                                        propId,
                                                    ),
                                                    1,
                                                );
                                            } else {
                                                this._toggleStack.push(propId);
                                            }
                                            this.requestUpdate();
                                        }}
                                    >
                                        <div
                                            class="${this.utils.cls(
                                                '_child-heading',
                                            )}"
                                        >
                                            ${this._toggleStack.includes(propId)
                                                ? html`
                                                      ${unsafeHTML(
                                                          this.props.icons.down,
                                                      )}
                                                  `
                                                : html`
                                                      ${unsafeHTML(
                                                          this.props.icons
                                                              .right,
                                                      )}
                                                  `}
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
                                                    ? this._renderMediaSelector(
                                                          [
                                                              ...path,
                                                              'props',
                                                              prop,
                                                          ],
                                                      )
                                                    : ''}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div
                                    class="${this.utils.cls(
                                        '_child-prop',
                                    )} ${this._toggleStack.includes(propId)
                                        ? 'active'
                                        : ''}"
                                    prop="${propId}"
                                    id="prop-${propId}"
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
            ${this.props.specs
                ? html`
                      <div class="${this.utils.cls('_root')}">
                          <div class="${this.utils.cls('_metas')}">
                              <div class="${this.utils.cls('_metas-heading')}">
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
                                                    ${unsafeHTML(
                                                        this.props.icons.delete,
                                                    )}
                                                </button>
                                            `
                                          : ''}
                                      ${this.props.features?.save
                                          ? html`
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
                                  ? html`
                                        <div
                                            class="${this.utils.cls(
                                                '_metas-source',
                                            )}"
                                        >
                                            ${this.props.source.url
                                                ? html`
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
                                                ${unsafeHTML(
                                                    __i18n(
                                                        'This content is linked to the %s one...',
                                                        {
                                                            id: 's-specs-editor.source.link',
                                                            tokens: {
                                                                s: `<a class="_link" href="${this.props.source.url}" target="_blank">${this.props.source.title}</a>`,
                                                            },
                                                        },
                                                    ),
                                                )}
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

export { __define as define };
