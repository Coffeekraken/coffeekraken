import __SLitComponent from '@coffeekraken/s-lit-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SSpecsEditorComponentInterface from './interface/SSpecsEditorComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-specs-editor-component.css'; // relative to /dist/pkg/esm/js

import __define from './define';

export interface ISClipboardCopyComponentProps {
    from: string;
    successTimeout: number;
    errorTimeout: number;
}

/**
 * @name                SClipboardCopyComponent
 * @as                  Clipboard copy
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SClipboardCopyComponentInterface.ts
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

export default class SClipboardCopyComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SSpecsEditorComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    state = {};

    constructor() {
        super(
            __deepMerge({
                name: 's-specs-editor',
                interface: __SSpecsEditorComponentInterface,
            }),
        );
    }
    mount() {}

    _update(e, propSpecs) {
        switch (e.target.tagName.toLowerCase()) {
            default:
                if (e.target.value === propSpecs.default) {
                    delete propSpecs.value;
                } else {
                    propSpecs.value = e.target.value;
                }
                break;
        }

        this.componentUtils.dispatchEvent('update', {
            detail: {
                propSpecs: Object.assign({}, propSpecs),
                propsSpecs: Object.assign({}, this.props.specs),
                values: this._specsToValues(
                    Object.assign({}, this.props.specs),
                ),
            },
        });
    }

    _specsToValues(specs) {
        const values = {};

        function treatProps(props, targetObj) {
            for (let [prop, value] of Object.entries(props)) {
                if (value.value !== undefined) {
                    targetObj[prop] = value.value;
                } else if (value.default !== undefined) {
                    targetObj[prop] = value.default;
                } else if (value.props) {
                    targetObj[prop] = {};
                    treatProps(value.props, targetObj[prop]);
                }
            }
        }

        treatProps(specs.props, values);

        console.log(values);

        return values;
    }

    _renderSelectElement(propObj) {
        return html`
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className(
                        '__label',
                        's-label s-label--block',
                    )}"
                >
                    <select
                        @change=${(e) => this._update(e, propObj)}
                        name="${propObj.id}"
                        class="${this.componentUtils.className(
                            '__select',
                            's-select',
                        )}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
                        prop="${JSON.stringify(propObj)}"
                    >
                        ${propObj.options.map(
                            (option) => html`
                                <option value="${option.value}">
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
                                      <div class="s-tooltip s-tooltip--left">
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

    _renderCheckboxElement(propObj) {
        return html`
            <div class="${this.componentUtils.className('__prop--checkbox')}">
                <label
                    class="${this.componentUtils.className(
                        '__label',
                        's-label',
                    )}"
                >
                    <input
                        @change=${(e) => this._update(e, propObj)}
                        type="checkbox"
                        name="${propObj.id}"
                        class="${this.componentUtils.className(
                            '__checkbox',
                            's-switch',
                        )}"
                        checked?=${propObj.value}
                    />
                    <span>
                        ${propObj.title ?? propObj.id}
                        ${propObj.description
                            ? html`
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div class="s-tooltip s-tooltip--left">
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

    _renderTextElement(propObj) {
        return html`
            <div class="${this.componentUtils.className('__prop--text')}">
                <label
                    class="${this.componentUtils.className(
                        '__label',
                        's-label s-label--block',
                    )}"
                >
                    <input
                        @change=${(e) => this._update(e, propObj)}
                        type="text"
                        name="${propObj.id}"
                        class="${this.componentUtils.className(
                            '__input',
                            's-input',
                        )}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
                        value="${propObj.value}"
                    />
                    <span>
                        ${propObj.title ?? propObj.id}
                        ${propObj.description
                            ? html`
                                  <span class="s-tooltip-container">
                                      <i
                                          class="fa-solid fa-circle-question"
                                      ></i>
                                      <div class="s-tooltip s-tooltip--left">
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

    _renderElements(specs) {
        // console.log('props', specs.props);
        // console.log('keys', Object.keys(specs.props));

        // const sortedKeys = Object.keys(specs.props).sort((a, b) => {
        //     if (specs.props[a].props) {
        //         console.log('a', a, b);
        //         return 1;
        //     }
        //     return -1;
        // });
        // console.log('sorte', sortedKeys);

        return html`
            ${Object.keys(specs.props).map((prop) => {
                const propObj = specs.props[prop];

                if (propObj.props) {
                    return html`
                        <div
                            class="${this.componentUtils.className('__child')}"
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
                            ${this._renderElements(propObj)}
                        </div>
                    `;
                } else {
                    return html`
                        <div
                            prop="${propObj.id}"
                            class="${this.componentUtils.className('__prop')}"
                        >
                            ${propObj.type.toLowerCase() === 'text'
                                ? this._renderTextElement(propObj)
                                : propObj.type.toLowerCase() === 'select'
                                ? this._renderSelectElement(propObj)
                                : propObj.type.toLowerCase() === 'checkbox'
                                ? this._renderCheckboxElement(propObj)
                                : ''}
                        </div>
                    `;
                }
            })}
        `;
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
                              ${this._renderElements(this.props.specs)}
                          </div>
                      `
                    : ''}
            </div>
        `;
    }
}

export { __define as define };
