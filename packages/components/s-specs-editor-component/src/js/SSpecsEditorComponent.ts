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

export interface ISSpecsEditorComponentIconsProp {
    clear: string;
    add: string;
    expand: string;
    remove: string;
    collapse: string;
}

export interface ISSpecsEditorComponentProps {
    id: string;
    specs: any;
    icons: ISSpecsEditorComponentIconsProp;
    media: string;
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
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SSpecsEditorComponentInterface,
        );
    }

    static widgetMap = {
        image: __imageWidget,
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

    mount() {}

    isPathResponsive(path: string): any {
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

    getValuePathFromPath(path: string, settings?: any): string[] {
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
            if (propObj.responsive) {
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

    getValueFromPath(path: string, settings?: any): any {
        if (this.isPathResponsive(path)) {
            const finalSettings = {
                media: this.props.media,
                ...(settings ?? {}),
            };
            const valuePath = this.getValuePathFromPath(path, finalSettings);
            if (valuePath !== undefined) {
                return __get(this.props.specs.values, valuePath.join('.'));
            }
        } else {
            const valuePath = this.getValuePathFromPath(path, settings);
            if (valuePath !== undefined) {
                return __get(this.props.specs.values, valuePath.join('.'));
            }
        }
    }

    clearValueFromPath(path: string, settings?: any): any {
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, {
                media: this.props.media,
                ...(settings ?? {}),
            });
            __delete(this.props.specs.values ?? {}, valuePath.join('.'));
        } else {
            const valuePath = path.filter((p) => p !== 'props').join('.');
            __delete(this.props.specs.values, valuePath);
        }

        this._update(path);

        this.requestUpdate();
    }

    setValueFromPath(path: string, value: any, settings?: any): any {
        // handle responsive values
        if (this.isPathResponsive(path)) {
            const valuePath = this.getValuePathFromPath(path, {
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
                            this.utils.cls('__child'),
                        );
                    });
                    this._widgets[type].events[event](e);
                });
            }
            this._widgets[type]._eventsInited = true;
        }

        return this._widgets[type];
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
                    //     __delete(this.props.specs.values, valuePath);
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
    _changeMedia(media: string): void {
        this.props.media = media;
        this.utils.dispatchEvent('changeMedia', {
            detail: media,
        });
    }

    /**
     * Render the field label with the responsive icons if needed, etc...
     */
    _renderLabel(propObj: any, path: string[]) {
        return html`
            <span>
                ${propObj.description
                    ? html`
                          <span
                              class="${this.utils.cls(
                                  '__help-icon',
                              )} s-tooltip-container"
                          >
                              <i class="fa-solid fa-circle-question"></i>
                              <div class="s-tooltip s-tooltip--left">
                                  ${propObj.description}
                              </div>
                          </span>
                      `
                    : ''}
                ${propObj.title ?? propObj.id}
                ${this.props.frontspec?.media?.queries &&
                this.isPathResponsive(path)
                    ? html`
                          <div class="${this.utils.cls('__media-icons')}">
                              ${Object.keys(
                                  __STheme.sortMedia(this.props.frontspec.media)
                                      .queries,
                              )
                                  .reverse()
                                  .map((media) => {
                                      const mediaValue = this.getValueFromPath(
                                          path,
                                          {
                                              media,
                                          },
                                      );
                                      return html`
                                          <span
                                              class="${this.utils.cls(
                                                  '__media-icon',
                                              )} ${mediaValue !== undefined &&
                                              mediaValue !== null
                                                  ? 'active'
                                                  : ''} ${this.props.media ===
                                              media
                                                  ? 'current'
                                                  : ''} s-tooltip-container"
                                          >
                                              <span
                                                  @pointerup=${() =>
                                                      this._changeMedia(media)}
                                              >
                                                  ${unsafeHTML(
                                                      this.props.icons[media],
                                                  )}
                                              </span>
                                              ${mediaValue !== undefined
                                                  ? html`
                                                        <div
                                                            class="s-tooltip s-tooltip--interactive s-color s-color--accent ${this.utils.cls(
                                                                '__actions',
                                                            )}"
                                                        >
                                                            <button
                                                                class="${this.utils.cls(
                                                                    '__action',
                                                                )}"
                                                                @pointerup=${() =>
                                                                    this.clearValueFromPath(
                                                                        path,
                                                                        {
                                                                            media,
                                                                        },
                                                                    )}
                                                            >
                                                                ${unsafeHTML(
                                                                    this.props
                                                                        .icons
                                                                        .clear,
                                                                )}
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
        const value = this.getValueFromPath(path) ?? propObj.default;
        return html`
            <div class="${this.utils.cls('__prop--select')}">
                <label
                    class="${this.utils.cls(
                        '__label',
                        's-label s-label--block',
                    )}"
                >
                    <select
                        @change=${(e) => this._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this.utils.cls('__select', 's-select')}"
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
        const value = this.getValueFromPath(path) ?? propObj.default;
        return html`
            <div class="${this.utils.cls('__prop--checkbox')}">
                <label class="${this.utils.cls('__label', 's-label')}">
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
                        type="checkbox"
                        name="${path.at(-1)}"
                        class="${this.utils.cls('__checkbox', 's-switch')}"
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
        const value = this.getValueFromPath(path) ?? propObj.default;
        return html`
            <div class="${this.utils.cls('__prop--text')}">
                <label
                    class="${this.utils.cls(
                        '__label',
                        's-label s-label--block',
                    )}"
                >
                    <input
                        @change=${(e) => this._update(path, propObj, e)}
                        type="text"
                        name="${path.at(-1)}"
                        class="${this.utils.cls('__input', 's-input')}"
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

    /**
     * Render the proper widget depending on the "type" propObj property
     */
    _renderEditWidget(propObj, path) {
        const type = propObj.type.toLowerCase(),
            widget = this.getWidget(type);
        if (!widget) {
            return '';
        }
        return widget.html(propObj, this.getValueFromPath(path) ?? {});
    }

    _renderElement(propObj, path) {
        return html`
            ${propObj.type.toLowerCase() === 'text'
                ? this._renderTextElement(propObj, path)
                : propObj.type.toLowerCase() === 'select'
                ? this._renderSelectElement(propObj, path)
                : propObj.type.toLowerCase() === 'checkbox'
                ? this._renderCheckboxElement(propObj, path)
                : ''}
        `;
    }

    _renderElements(specs: any, path: string[] = [], forceNoRepeat = false) {
        // const _specs = __get(specs, path.join('.'));
        const _specs = specs;
        if (!forceNoRepeat && _specs.type.match(/(\{\}|\[\])/)) {
            const loopOn = this.getValueFromPath(path) ?? [];

            return html`
                <div class="${this.utils.cls('__repeatable')}">
                    ${loopOn.map(
                        (v, i) => html`
                            <div
                                tabindex="0"
                                @pointerup=${() =>
                                    this._toggle(`${path.join('.')}-${i}`)}
                                class="${this.utils.cls(
                                    '__repeatable-title',
                                )} ${this._isActive(`${path.join('.')}-${i}`)
                                    ? 'active'
                                    : ''}"
                            >
                                ${v.title ??
                                v.name ??
                                v.id ??
                                `${_specs.title} #${i}`}
                                ${this._isActive(`${path.join('.')}-${i}`)
                                    ? html`
                                          ${unsafeHTML(
                                              this.props.icons.collapse,
                                          )}
                                      `
                                    : html`
                                          ${unsafeHTML(this.props.icons.expand)}
                                      `}
                            </div>
                            <div
                                tabindex="0"
                                class="${this.utils.cls(
                                    '__repeatable-item',
                                )} ${this._isActive(`${path.join('.')}-${i}`)
                                    ? 'active'
                                    : ''}"
                            >
                                <div
                                    class="${this.utils.cls(
                                        '__repeatable-item-actions',
                                    )} ${this._isActive(
                                        `${path.join('.')}-${i}`,
                                    )
                                        ? 'active'
                                        : ''}"
                                >
                                    <button
                                        @pointerup=${() =>
                                            this._removeItem(loopOn, v, _specs)}
                                        class="${this.utils.cls(
                                            '__repeatable-remove',
                                            's-badge s-color s-color--error',
                                        )}"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div
                                    class="${this.utils.cls(
                                        '__repeatable-item-props',
                                    )}"
                                >
                                    ${this._renderElements(
                                        specs,
                                        [...path, i],
                                        true,
                                    )}
                                </div>
                            </div>
                        `,
                    )}

                    <div class="${this.utils.cls('__repeatable-actions')}">
                        <button
                            @pointerup=${() => this._addItem(loopOn, _specs)}
                            class="${this.utils.cls('__btn', 's-btn')}"
                        >
                            Add a
                            ${__lowerFirst(_specs.title).replace(/s$/, '')}
                            ${unsafeHTML(this.props.icons.add)}
                        </button>
                    </div>
                </div>
            `;
        } else {
            return html`
                ${Object.keys(_specs.props).map((prop) => {
                    const propObj = _specs.props[prop];
                    if (propObj.props) {
                        return html`
                            <div class="${this.utils.cls('__child')}">
                                <h3
                                    class="${this.utils.cls(
                                        '__child-title',
                                        's-typo--h5',
                                    )}"
                                >
                                    ${propObj.title}
                                </h3>
                                <p
                                    class="${this.utils.cls(
                                        '__child-description',
                                        's-typo--p',
                                    )}"
                                >
                                    ${propObj.description}
                                </p>

                                ${this._renderEditWidget(
                                    propObj,
                                    !forceNoRepeat
                                        ? [...path, 'props', prop]
                                        : path,
                                )}
                                ${this._renderElements(
                                    propObj,
                                    [...path, 'props', prop],
                                    forceNoRepeat,
                                )}
                            </div>
                        `;
                    } else {
                        return html`
                            <div
                                prop="${propObj.id}"
                                class="${this.utils.cls('__prop')}"
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
        return html`
            <div
                class="${this.cu?.cls('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
                    ? html`
                          <div class="${this.utils.cls('__root')}">
                              <div class="${this.utils.cls('__metas')}">
                                  <h3
                                      class="${this.utils.cls(
                                          '__child-title',
                                          's-typo--h3',
                                      )}"
                                  >
                                      ${this.props.specs.title}
                                  </h3>
                                  <p
                                      class="${this.utils.cls(
                                          '__child-description',
                                          's-typo--p',
                                      )}"
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

export { __define as define };
