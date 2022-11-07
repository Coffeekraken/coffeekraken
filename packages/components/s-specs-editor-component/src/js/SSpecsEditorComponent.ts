import __SLitComponent from '@coffeekraken/s-lit-component';

import { __delete, __get, __set } from '@coffeekraken/sugar/object';

import { define as __SAssetPickerComponentDefine } from '@coffeekraken/s-asset-picker-component';
import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';

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

export interface ISSpecsEditorComponentProps {
    from: string;
    successTimeout: number;
    errorTimeout: number;
}

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
    mount() {
        console.log(this.props.specs);
    }

    getValueFromPath(path: string): any {
        const valuePath = path.filter((p) => p !== 'props').join('.');
        return __get(this.props.specs.values, valuePath);
    }

    setValueFromPath(path: string, value: any): any {
        const valuePath = path.filter((p) => p !== 'props').join('.');
        return __set(this.props.specs.values, valuePath, value);
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
                            this.componentUtils.className('__child'),
                        );
                    });
                    this._widgets[type].events[event](e);
                });
            }
            this._widgets[type]._eventsInited = true;
        }

        return this._widgets[type];
    }

    _update(e, path: string[], propSpecs: any) {
        // value path
        const valuePath = path.filter((v) => v !== 'props').join('.');

        switch (e.target.tagName.toLowerCase()) {
            default:
                if (e.target.value === propSpecs.default) {
                    __delete(this.props.specs.values, valuePath);
                } else {
                    this.setValueFromPath(path, e.target.value);
                }
                break;
        }

        this.componentUtils.dispatchEvent('update', {
            detail: {
                propSpecs: Object.assign({}, propSpecs),
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

    _renderSelectElement(propObj, path) {
        const value =
            this.getValueFromPath(path) ?? propObj.value ?? propObj.default;
        return html`
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className(
                        '__label',
                        's-label s-label--block',
                    )}"
                >
                    <select
                        @change=${(e) => this._update(e, path, propObj)}
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className(
                            '__select',
                            's-select',
                        )}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
                        path="${path.join('.')}"
                        value="${value}"
                    >
                        ${propObj.options.map(
                            (option) => html`
                                <option
                                    value="${option.value}"
                                    ?selected=${option.value === value}
                                >
                                    ${option.name}
                                </option>
                            `,
                        )}
                    </select>
                    <span>
                        ${propObj.title ?? propObj.id}
                        ${propObj.description
                            ? html`
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div
                                          class="s-tooltip s-tooltip--left s-color s-color--accent"
                                      >
                                          ${propObj.description}
                                      </div>
                                  </span>
                              `
                            : ''}
                    </span>
                </label>
            </div>
        `;
    }

    _renderCheckboxElement(propObj, path) {
        const value =
            this.getValueFromPath(path) ?? propObj.value ?? propObj.default;
        return html`
            <div class="${this.componentUtils.className('__prop--checkbox')}">
                <label
                    class="${this.componentUtils.className(
                        '__label',
                        's-label',
                    )}"
                >
                    <input
                        @change=${(e) => this._update(e, path, propObj)}
                        type="checkbox"
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className(
                            '__checkbox',
                            's-switch',
                        )}"
                        path="${path.join('.')}"
                        checked?=${value}
                    />
                    <span>
                        ${propObj.title ?? propObj.id}
                        ${propObj.description
                            ? html`
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div
                                          class="s-tooltip s-tooltip--left s-color s-color--accent"
                                      >
                                          ${propObj.description}
                                      </div>
                                  </span>
                              `
                            : ''}
                    </span>
                </label>
            </div>
        `;
    }

    _renderTextElement(propObj, path) {
        const value =
            this.getValueFromPath(path) ?? propObj.value ?? propObj.default;

        return html`
            <div class="${this.componentUtils.className('__prop--text')}">
                <label
                    class="${this.componentUtils.className(
                        '__label',
                        's-label s-label--block',
                    )}"
                >
                    <input
                        @change=${(e) => this._update(e, path, propObj)}
                        type="text"
                        name="${path.at(-1)}"
                        class="${this.componentUtils.className(
                            '__input',
                            's-input',
                        )}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
                        path="${path.join('.')}"
                        value="${value}"
                    />
                    <span>
                        ${propObj.title ?? propObj.id}
                        ${propObj.description
                            ? html`
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div
                                          class="s-tooltip s-tooltip--left s-color s-color--accent"
                                      >
                                          ${propObj.description}
                                      </div>
                                  </span>
                              `
                            : ''}
                    </span>
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
                <div class="${this.componentUtils.className('__repeatable')}">
                    ${loopOn.map(
                        (v, i) => html`
                            <div
                                tabindex="0"
                                @pointerup=${() =>
                                    this._toggle(`${path.join('.')}-${i}`)}
                                class="${this.componentUtils.className(
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
                                class="${this.componentUtils.className(
                                    '__repeatable-item',
                                )} ${this._isActive(`${path.join('.')}-${i}`)
                                    ? 'active'
                                    : ''}"
                            >
                                <div
                                    class="${this.componentUtils.className(
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
                                        class="${this.componentUtils.className(
                                            '__repeatable-remove',
                                            's-badge s-color s-color--error',
                                        )}"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div
                                    class="${this.componentUtils.className(
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

                    <div
                        class="${this.componentUtils.className(
                            '__repeatable-actions',
                        )}"
                    >
                        <button
                            @pointerup=${() => this._addItem(loopOn, _specs)}
                            class="${this.componentUtils.className(
                                '__btn',
                                's-btn',
                            )}"
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
                            <div
                                class="${this.componentUtils.className(
                                    '__child',
                                )}"
                            >
                                <h3
                                    class="${this.componentUtils.className(
                                        '__child-title',
                                        's-typo--h5',
                                    )}"
                                >
                                    ${propObj.title}
                                </h3>
                                <p
                                    class="${this.componentUtils.className(
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
                                class="${this.componentUtils.className(
                                    '__prop',
                                )}"
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
                class="${this.componentUtils?.className('', null, 's-bare')}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs
                    ? html`
                          <div
                              class="${this.componentUtils.className('__root')}"
                          >
                              <div
                                  class="${this.componentUtils.className(
                                      '__metas',
                                  )}"
                              >
                                  <h3
                                      class="${this.componentUtils.className(
                                          '__child-title',
                                          's-typo--h3',
                                      )}"
                                  >
                                      ${this.props.specs.title}
                                  </h3>
                                  <p
                                      class="${this.componentUtils.className(
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
