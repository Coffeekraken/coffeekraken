"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = exports.metas = exports.DEFAULT_PROPS = void 0;
//     isAttachedToShadowDom: true,
// });
const s_specs_editor_component_css_1 = __importDefault(require("../../../../src/css/s-specs-editor-component.css"));
const SSpecsEditorComponentInterface_1 = __importDefault(require("../../../../src/js/interface/SSpecsEditorComponentInterface"));
const s_component_1 = __importDefault(require("@coffeekraken/s-component"));
const string_1 = require("@coffeekraken/sugar/string");
// useMetadata({
//     isAttachedToShadowDom: true,
// });
exports.DEFAULT_PROPS = SSpecsEditorComponentInterface_1.default.defaults();
exports.metas = {
    interface: SSpecsEditorComponentInterface_1.default,
    preview: `No preview`,
};
/**
 * Usage:
 *
 *  <s-specs-editor></s-specs-editor>
 *
 */
class SSpecsEditor extends HTMLElement {
    get _$container() {
        return this._root.querySelector("[data-ref='SSpecsEditor-$container']");
    }
    get _root() {
        return this.shadowRoot || this;
    }
    constructor() {
        super();
        const self = this;
        this.state = {
            _status: 'idle',
            _id: null,
            _specs: {},
            _specArray: [],
            _propsValues: {},
            _component: null,
            mount() {
                var _a, _b;
                try {
                    self.state._component.injectStyleInShadowRoot([s_specs_editor_component_css_1.default, ...((_a = self.props.cssDeps) !== null && _a !== void 0 ? _a : [])], self._$container);
                }
                catch (e) { } // restore the props values
                self.state._propsValues =
                    (_b = self.state._component.restoreState()) !== null && _b !== void 0 ? _b : {}; // cast specs
                self.update();
                self.state._specs = JSON.parse(self.props.specs);
                self.update();
                Object.keys(self.state._specs.props).forEach((key) => {
                    var _a, _b;
                    self.state._specArray.push(Object.assign(Object.assign({ id: key }, self.state._specs.props[key]), { value: (_b = (_a = self.state._propsValues[key]) !== null && _a !== void 0 ? _a : self.state._specs.props[key].value) !== null && _b !== void 0 ? _b : self.state._specs.props[key].default }));
                });
                setTimeout(() => {
                    const initialSpecsJson = {};
                    self.state._specArray.forEach((prop) => {
                        initialSpecsJson[prop.id] = prop.value;
                    });
                    self._$container.dispatchEvent(new CustomEvent('s-specs-editor.change', {
                        bubbles: true,
                        composed: true,
                        detail: initialSpecsJson,
                    }));
                });
            },
            update(event, prop) {
                // update the property value
                if (event.target.type === 'checkbox') {
                    prop.value = event.target.checked;
                }
                else {
                    prop.value = event.target.value;
                } // update the prop value if different than the default
                if (prop.value !== prop.default) {
                    self.state._propsValues[prop.id] = prop.value;
                }
                else {
                    delete self.state._propsValues[prop.id];
                } // dispatch an event
                self._$container.dispatchEvent(new CustomEvent('s-specs-editor.change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        [prop.id]: prop.value,
                    },
                })); // save the props values
                self.state._component.saveState(self.state._propsValues);
            },
        };
        if (!this.props) {
            this.props = {};
        }
        this.componentProps = ['cssDeps', 'specs', 'lnf', 'id'];
        this.updateDeps = [[]];
        // used to keep track of all nodes created by show/for
        this.nodesToDestroy = [];
        // batch updates
        this.pendingUpdate = false;
        // Event handler for 'input' event on input-s-specs-editor-1
        this.onInputSSpecsEditor1Input = (e) => {
            const v = this.getScope(event.currentTarget, 'v');
            this.state.update(e, v);
        };
        // Event handler for 'input' event on select-s-specs-editor-1
        this.onSelectSSpecsEditor1Input = (e) => {
            const v = this.getScope(event.currentTarget, 'v');
            this.state.update(e, v);
        };
        // Event handler for 'input' event on input-s-specs-editor-2
        this.onInputSSpecsEditor2Input = (e) => {
            const v = this.getScope(event.currentTarget, 'v');
            this.state.update(e, v);
        };
        if (undefined) {
            this.attachShadow({ mode: 'open' });
        }
    }
    destroyAnyNodes() {
        // destroy current view template refs before rendering again
        this.nodesToDestroy.forEach((el) => el.remove());
        this.nodesToDestroy = [];
    }
    connectedCallback() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAttributeNames().forEach((attr) => {
            const jsVar = attr.replace(/-/g, '');
            const regexp = new RegExp(jsVar, 'i');
            this.componentProps.forEach((prop) => {
                if (regexp.test(prop)) {
                    const attrValue = this.getAttribute(attr);
                    if (this.props[prop] !== attrValue) {
                        this.props[prop] = attrValue;
                    }
                }
            });
        });
        // default props
        const defaultProps = s_component_1.default.getDefaultProps(this.tagName.toLowerCase());
        this.props.id = (_b = (_a = this.props.id) !== null && _a !== void 0 ? _a : defaultProps.id) !== null && _b !== void 0 ? _b : exports.DEFAULT_PROPS.id;
        this.props.specs =
            (_d = (_c = this.props.specs) !== null && _c !== void 0 ? _c : defaultProps.specs) !== null && _d !== void 0 ? _d : exports.DEFAULT_PROPS.specs;
        this.props.lnf =
            (_f = (_e = this.props.lnf) !== null && _e !== void 0 ? _e : defaultProps.lnf) !== null && _f !== void 0 ? _f : exports.DEFAULT_PROPS.lnf;
        this.props.cssDeps =
            (_h = (_g = this.props.cssDeps) !== null && _g !== void 0 ? _g : defaultProps.cssDeps) !== null && _h !== void 0 ? _h : exports.DEFAULT_PROPS.cssDeps;
        this._root.innerHTML = `
                        
      <template data-el="show-s-specs-editor">
        <div data-el="div-s-specs-editor-1" data-ref="SSpecsEditor-$container">
          <template data-el="for-s-specs-editor">
            <div data-el="div-s-specs-editor-2">
              <template data-el="show-s-specs-editor-2">
                <div data-el="div-s-specs-editor-3">
                  <label data-el="label-s-specs-editor-1">
                    <input
                      type="text"
                      data-el="input-s-specs-editor-1"
                      data-dom-state="SSpecsEditor-input-s-specs-editor-1"
                    />
      
                    <span>
                      <template data-el="show-s-specs-editor-3">
                        <span class="s-tooltip-container">
                          <i class="fa-solid fa-circle-question"></i>
      
                          <div class="s-tooltip s-tooltip--right">
                            <template data-el="div-s-specs-editor-4">
                              <!-- v.description -->
                            </template>
                          </div>
                        </span>
                      </template>
      
                      <template data-el="div-s-specs-editor-5">
                        <!-- v.title ?? v.id -->
                      </template>
                    </span>
                  </label>
                </div>
              </template>
      
              <template data-el="show-s-specs-editor-4">
                <div data-el="div-s-specs-editor-6">
                  <label data-el="label-s-specs-editor-2">
                    <select
                      data-el="select-s-specs-editor-1"
                      data-dom-state="SSpecsEditor-select-s-specs-editor-1"
                    ></select>
      
                    <span>
                      <template data-el="show-s-specs-editor-5">
                        <span class="s-tooltip-container">
                          <i class="fa-solid fa-circle-question"></i>
      
                          <div class="s-tooltip s-tooltip--right">
                            <template data-el="div-s-specs-editor-7">
                              <!-- v.description -->
                            </template>
                          </div>
                        </span>
                      </template>
      
                      <template data-el="div-s-specs-editor-8">
                        <!-- v.title ?? v.id -->
                      </template>
                    </span>
                  </label>
                </div>
              </template>
      
              <template data-el="show-s-specs-editor-6">
                <div data-el="div-s-specs-editor-9">
                  <label data-el="label-s-specs-editor-3">
                    <input
                      type="checkbox"
                      data-el="input-s-specs-editor-2"
                      data-dom-state="SSpecsEditor-input-s-specs-editor-2"
                    />
      
                    <span>
                      <template data-el="show-s-specs-editor-7">
                        <span class="s-tooltip-container">
                          <i class="fa-solid fa-circle-question"></i>
      
                          <div class="s-tooltip s-tooltip--right">
                            <template data-el="div-s-specs-editor-10">
                              <!-- v.description -->
                            </template>
                          </div>
                        </span>
                      </template>
      
                      <template data-el="div-s-specs-editor-11">
                        <!-- v.title ?? v.id -->
                      </template>
                    </span>
                  </label>
                </div>
              </template>
            </div>
          </template>
        </div>
      </template>`;
        this.pendingUpdate = true;
        this.render();
        this.onMount();
        this.pendingUpdate = false;
        this.update();
    }
    showContent(el) {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
        // grabs the content of a node that is between <template> tags
        // iterates through child nodes to register all content including text elements
        // attaches the content after the template
        const elementFragment = el.content.cloneNode(true);
        const children = Array.from(elementFragment.childNodes);
        children.forEach((child) => {
            if (el === null || el === void 0 ? void 0 : el.scope) {
                child.scope = el.scope;
            }
            if (el === null || el === void 0 ? void 0 : el.context) {
                child.context = el.context;
            }
            this.nodesToDestroy.push(child);
        });
        el.after(elementFragment);
    }
    onMount() {
        var _a;
        // onMount
        SSpecsEditorComponentInterface_1.default;
        this.state._component = new s_component_1.default('s-specs-editor', {
            id: this.props.id,
            bare: false,
        });
        this.update();
        this.state._id = (_a = this.props.id) !== null && _a !== void 0 ? _a : `s-specs-editor-${(0, string_1.__uniqid)()}`;
        this.update();
        this.state.mount();
        this.state._status = 'mounted';
        this.update();
    }
    onUpdate() {
        const self = this;
        // checkbox
        Array.from(self._$container.querySelectorAll('input[type="checkbox"')).forEach(($checkbox) => {
            if ($checkbox._inited) {
                return;
            }
            $checkbox._inited = true;
            const _p = JSON.parse($checkbox.getAttribute('prop'));
            if (_p.value) {
                $checkbox.setAttribute('checked', 'true');
            }
            else {
                $checkbox.removeAttribute('checked');
            }
        }); // select
        Array.from(self._$container.querySelectorAll('select')).forEach(($select) => {
            if ($select._inited) {
                return;
            }
            $select._inited = true;
            const _p = JSON.parse($select.getAttribute('prop'));
            _p.options.forEach((opt) => {
                const $option = document.createElement('option');
                $option.setAttribute('value', opt.value);
                if (_p.value === opt.value) {
                    $option.setAttribute('selected', true);
                }
                $option.innerHTML = opt.name;
                $select.appendChild($option);
            });
        });
    }
    update() {
        if (this.pendingUpdate === true) {
            return;
        }
        this.pendingUpdate = true;
        this.render();
        this.onUpdate();
        this.pendingUpdate = false;
    }
    render() {
        // grab previous input state
        const preStateful = this.getStateful(this._root);
        const preValues = this.prepareHydrate(preStateful);
        // re-rendering needs to ensure that all nodes generated by for/show are refreshed
        this.destroyAnyNodes();
        this.updateBindings();
        // hydrate input state
        if (preValues.length) {
            const nextStateful = this.getStateful(this._root);
            this.hydrateDom(preValues, nextStateful);
        }
    }
    getStateful(el) {
        const stateful = el.querySelectorAll('[data-dom-state]');
        return stateful ? Array.from(stateful) : [];
    }
    prepareHydrate(stateful) {
        return stateful.map((el) => {
            return {
                id: el.dataset.domState,
                value: el.value,
                active: document.activeElement === el,
                selectionStart: el.selectionStart,
            };
        });
    }
    hydrateDom(preValues, stateful) {
        return stateful.map((el, index) => {
            const prev = preValues.find((prev) => el.dataset.domState === prev.id);
            if (prev) {
                el.value = prev.value;
                if (prev.active) {
                    el.focus();
                    el.selectionStart = prev.selectionStart;
                }
            }
        });
    }
    updateBindings() {
        this._root
            .querySelectorAll("[data-el='show-s-specs-editor']")
            .forEach((el) => {
            const whenCondition = this.state._specArray.length;
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-1']")
            .forEach((el) => {
            var _a, _b;
            el.setAttribute('id', this.state._id);
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('', null, 's-bare');
            el.setAttribute('status', this.state._status);
            el.setAttribute('lnf', (_b = this.props.lnf) !== null && _b !== void 0 ? _b : 'default');
        });
        this._root
            .querySelectorAll("[data-el='for-s-specs-editor']")
            .forEach((el) => {
            let array = this.state._specArray;
            this.renderLoop(el, array, 'v', 'index');
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-2']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            el.setAttribute('prop', v.id);
            el.className = this.state._component.className('__prop');
        });
        this._root
            .querySelectorAll("[data-el='show-s-specs-editor-2']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            const whenCondition = v.type.toLowerCase() === 'text';
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-3']")
            .forEach((el) => {
            el.className = this.state._component.className('__prop--text');
        });
        this._root
            .querySelectorAll("[data-el='label-s-specs-editor-1']")
            .forEach((el) => {
            el.className = this.state._component.className('__label', 's-label s-label--block');
        });
        this._root
            .querySelectorAll("[data-el='input-s-specs-editor-1']")
            .forEach((el) => {
            var _a, _b;
            el.removeEventListener('input', this.onInputSSpecsEditor1Input);
            el.addEventListener('input', this.onInputSSpecsEditor1Input);
            const v = this.getScope(el, 'v');
            el.setAttribute('name', v.id);
            el.className = this.state._component.className('__input', 's-input');
            el.setAttribute('placeholder', (_b = (_a = v.default) !== null && _a !== void 0 ? _a : v.title) !== null && _b !== void 0 ? _b : v.id);
            el.value = v.value;
        });
        this._root
            .querySelectorAll("[data-el='show-s-specs-editor-3']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            const whenCondition = v.description;
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-4']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            this.renderTextNode(el, v.description);
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-5']")
            .forEach((el) => {
            var _a;
            const v = this.getScope(el, 'v');
            this.renderTextNode(el, (_a = v.title) !== null && _a !== void 0 ? _a : v.id);
        });
        this._root
            .querySelectorAll("[data-el='show-s-specs-editor-4']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            const whenCondition = v.type.toLowerCase() === 'select';
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-6']")
            .forEach((el) => {
            el.className =
                this.state._component.className('__prop--select');
        });
        this._root
            .querySelectorAll("[data-el='label-s-specs-editor-2']")
            .forEach((el) => {
            el.className = this.state._component.className('__label', 's-label s-label--block');
        });
        this._root
            .querySelectorAll("[data-el='select-s-specs-editor-1']")
            .forEach((el) => {
            var _a, _b;
            el.removeEventListener('input', this.onSelectSSpecsEditor1Input);
            el.addEventListener('input', this.onSelectSSpecsEditor1Input);
            const v = this.getScope(el, 'v');
            el.setAttribute('name', v.id);
            el.className = this.state._component.className('__select', 's-select');
            el.setAttribute('placeholder', (_b = (_a = v.default) !== null && _a !== void 0 ? _a : v.title) !== null && _b !== void 0 ? _b : v.id);
            el.setAttribute('prop', JSON.stringify(v));
        });
        this._root
            .querySelectorAll("[data-el='show-s-specs-editor-5']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            const whenCondition = v.description;
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-7']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            this.renderTextNode(el, v.description);
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-8']")
            .forEach((el) => {
            var _a;
            const v = this.getScope(el, 'v');
            this.renderTextNode(el, (_a = v.title) !== null && _a !== void 0 ? _a : v.id);
        });
        this._root
            .querySelectorAll("[data-el='show-s-specs-editor-6']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            const whenCondition = v.type.toLowerCase() === 'checkbox';
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-9']")
            .forEach((el) => {
            el.className = `${this.state._component.className('__prop--checkbox')}`;
        });
        this._root
            .querySelectorAll("[data-el='label-s-specs-editor-3']")
            .forEach((el) => {
            el.className = this.state._component.className('__label', 's-label');
        });
        this._root
            .querySelectorAll("[data-el='input-s-specs-editor-2']")
            .forEach((el) => {
            el.removeEventListener('input', this.onInputSSpecsEditor2Input);
            el.addEventListener('input', this.onInputSSpecsEditor2Input);
            const v = this.getScope(el, 'v');
            el.setAttribute('name', v.id);
            el.className = this.state._component.className('__checkbox', 's-switch');
            el.setAttribute('prop', JSON.stringify(v));
        });
        this._root
            .querySelectorAll("[data-el='show-s-specs-editor-7']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            const whenCondition = v.description;
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-10']")
            .forEach((el) => {
            const v = this.getScope(el, 'v');
            this.renderTextNode(el, v.description);
        });
        this._root
            .querySelectorAll("[data-el='div-s-specs-editor-11']")
            .forEach((el) => {
            var _a;
            const v = this.getScope(el, 'v');
            this.renderTextNode(el, (_a = v.title) !== null && _a !== void 0 ? _a : v.id);
        });
    }
    // Helper to render content
    renderTextNode(el, text) {
        const textNode = document.createTextNode(text);
        if (el === null || el === void 0 ? void 0 : el.scope) {
            textNode.scope = el.scope;
        }
        if (el === null || el === void 0 ? void 0 : el.context) {
            textNode.context = el.context;
        }
        el.after(textNode);
        this.nodesToDestroy.push(el.nextSibling);
    }
    // scope helper
    getScope(el, name) {
        var _a;
        do {
            let value = (_a = el === null || el === void 0 ? void 0 : el.scope) === null || _a === void 0 ? void 0 : _a[name];
            if (value !== undefined) {
                return value;
            }
        } while ((el = el.parentNode));
    }
    // Helper to render loops
    renderLoop(template, array, itemName, itemIndex, collectionName) {
        const collection = [];
        for (let [index, value] of array.entries()) {
            const elementFragment = template.content.cloneNode(true);
            const children = Array.from(elementFragment.childNodes);
            const localScope = {};
            let scope = localScope;
            if (template === null || template === void 0 ? void 0 : template.scope) {
                const getParent = {
                    get(target, prop, receiver) {
                        if (prop in target) {
                            return target[prop];
                        }
                        if (prop in template.scope) {
                            return template.scope[prop];
                        }
                        return target[prop];
                    },
                };
                scope = new Proxy(localScope, getParent);
            }
            children.forEach((child) => {
                if (itemName !== undefined) {
                    scope[itemName] = value;
                }
                if (itemIndex !== undefined) {
                    scope[itemIndex] = index;
                }
                if (collectionName !== undefined) {
                    scope[collectionName] = array;
                }
                child.scope = scope;
                if (template.context) {
                    child.context = context;
                }
                this.nodesToDestroy.push(child);
                collection.unshift(child);
            });
        }
        collection.forEach((child) => template.after(child));
    }
}
exports.default = SSpecsEditor;
function define(props = {}, tagName = 's-specs-editor') {
    s_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, class SSpecsEditorComponent extends SSpecsEditor {
    });
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQW9DQSxtQ0FBbUM7QUFDbkMsTUFBTTtBQUVOLG9IQUFxRTtBQUNyRSxpSUFBMkc7QUFDM0csNEVBQXFEO0FBQ3JELHVEQUFzRDtBQUN0RCxnQkFBZ0I7QUFDaEIsbUNBQW1DO0FBQ25DLE1BQU07QUFDTyxRQUFBLGFBQWEsR0FBRyx3Q0FBZ0MsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM1RCxRQUFBLEtBQUssR0FBRztJQUNqQixTQUFTLEVBQUUsd0NBQWdDO0lBQzNDLE9BQU8sRUFBRSxZQUFZO0NBQ3hCLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILE1BQXFCLFlBQWEsU0FBUSxXQUFXO0lBQ2pELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsSUFBSTtZQUNULE1BQU0sRUFBRSxFQUFFO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLOztnQkFDRCxJQUFJO29CQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUN6QyxDQUFDLHNDQUFLLEVBQUUsR0FBRyxDQUFDLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ3RDLElBQUksQ0FBQyxXQUFXLENB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