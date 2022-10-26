import __SLitComponent from '@coffeekraken/s-lit-component';
import { __get } from '@coffeekraken/sugar/object';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SSpecsEditorComponentInterface from './interface/SSpecsEditorComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-specs-editor-component.css'; // relative to /dist/pkg/esm/js
import __define from './define';
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
    constructor() {
        super(__deepMerge({
            name: 's-specs-editor',
            interface: __SSpecsEditorComponentInterface,
        }));
        this.state = {};
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SSpecsEditorComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    mount() { }
    _update(e, propSpecs) {
        switch (e.target.tagName.toLowerCase()) {
            default:
                if (e.target.value === propSpecs.default) {
                    delete propSpecs.value;
                }
                else {
                    propSpecs.value = e.target.value;
                }
                break;
        }
        this.componentUtils.dispatchEvent('update', {
            detail: {
                propSpecs: Object.assign({}, propSpecs),
                propsSpecs: Object.assign({}, this.props.specs),
                values: this._specsToValues(Object.assign({}, this.props.specs)),
            },
        });
    }
    _specsToValues(specs) {
        const values = {};
        function treatProps(props, targetObj) {
            for (let [prop, value] of Object.entries(props)) {
                if (value.value !== undefined) {
                    targetObj[prop] = value.value;
                }
                else if (value.default !== undefined) {
                    targetObj[prop] = value.default;
                }
                else if (value.props) {
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
        var _a, _b, _c;
        return html `
            <div class="${this.componentUtils.className('__prop--select')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => this._update(e, propObj)}
                        name="${propObj.id}"
                        class="${this.componentUtils.className('__select', 's-select')}"
                        placeholder="${(_b = (_a = propObj.default) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}"
                        prop="${JSON.stringify(propObj)}"
                    >
                        ${propObj.options.map((option) => html `
                                <option value="${option.value}">
                                    ${option.name}
                                </option>
                            `)}
                    </select>
                    <span>
                        ${(_c = propObj.title) !== null && _c !== void 0 ? _c : propObj.id}
                        ${propObj.description
            ? html `
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
    _renderCheckboxElement(propObj) {
        var _a;
        return html `
            <div class="${this.componentUtils.className('__prop--checkbox')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label')}"
                >
                    <input
                        @change=${(e) => this._update(e, propObj)}
                        type="checkbox"
                        name="${propObj.id}"
                        class="${this.componentUtils.className('__checkbox', 's-switch')}"
                        checked?=${propObj.value}
                    />
                    <span>
                        ${(_a = propObj.title) !== null && _a !== void 0 ? _a : propObj.id}
                        ${propObj.description
            ? html `
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
    _renderTextElement(propObj) {
        var _a, _b, _c;
        return html `
            <div class="${this.componentUtils.className('__prop--text')}">
                <label
                    class="${this.componentUtils.className('__label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => this._update(e, propObj)}
                        type="text"
                        name="${propObj.id}"
                        class="${this.componentUtils.className('__input', 's-input')}"
                        placeholder="${(_b = (_a = propObj.default) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}"
                        value="${propObj.value}"
                    />
                    <span>
                        ${(_c = propObj.title) !== null && _c !== void 0 ? _c : propObj.id}
                        ${propObj.description
            ? html `
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
    _renderElements(specs, path = []) {
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
        const _props = __get(specs, path.join('.'));
        if (_props.type.match(/(\{\}|\[\])/)) {
            console.log('p', `values.${path.filter((p) => p !== 'props').join('.')}`);
            const loopOn = __get(specs, `values`);
            console.log(loopOn);
        }
        else {
            return html `
                ${Object.keys(specs.props).map((prop) => {
                const propObj = specs.props[prop];
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
                                ${this._renderElements(specs, [
                        ...path,
                        'props',
                        prop,
                    ])}
                            </div>
                        `;
                }
                else {
                    return html `
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
                              ${this._renderElements(this.props.specs)}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLGtEQUFrRCxDQUFDLENBQUMsK0JBQStCO0FBRXJHLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQVFoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHFCQUFzQixTQUFRLGVBQWU7SUFnQjlEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsU0FBUyxFQUFFLGdDQUFnQztTQUM5QyxDQUFDLENBQ0wsQ0FBQztRQVJOLFVBQUssR0FBRyxFQUFFLENBQUM7SUFTWCxDQUFDO0lBdEJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsZ0NBQWdDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFZRCxLQUFLLEtBQUksQ0FBQztJQUVWLE9BQU8sQ0FBQyxDQUFDLEVBQUUsU0FBUztRQUNoQixRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxD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