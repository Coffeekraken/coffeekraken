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
                    (_b = self.state._component.restoreState()) !== null && _b !== void 0 ? _b : {};
                self.update();
                console.log('ss', self.state._propsValues); // cast specs
                self.state._specs = JSON.parse(self.props.specs);
                self.update();
                Object.keys(self.state._specs.props).forEach((key) => {
                    self.state._specArray.push(Object.assign({ id: key }, self.state._specs.props[key]));
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
                    detail: Object.assign({}, prop),
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
        Array.from(self._$container.querySelectorAll('select')).forEach(($select) => {
            if ($select._inited) {
                return;
            }
            $select._inited = true;
            const _p = JSON.parse($select.getAttribute('prop'));
            _p.options.forEach((opt) => {
                var _a, _b;
                const $option = document.createElement('option');
                $option.setAttribute('value', opt.value);
                console.log('SSSS', opt.id, (_a = self.state._propsValues[_p.id]) !== null && _a !== void 0 ? _a : _p.default, opt.value);
                if (((_b = self.state._propsValues[_p.id]) !== null && _b !== void 0 ? _b : _p.default) ===
                    opt.value) {
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
            var _a, _b, _c;
            el.removeEventListener('input', this.onInputSSpecsEditor1Input);
            el.addEventListener('input', this.onInputSSpecsEditor1Input);
            const v = this.getScope(el, 'v');
            el.setAttribute('name', v.id);
            el.className = this.state._component.className('__input', 's-input');
            el.setAttribute('placeholder', (_b = (_a = v.default) !== null && _a !== void 0 ? _a : v.title) !== null && _b !== void 0 ? _b : v.id);
            el.value = (_c = this.state._propsValues[v.id]) !== null && _c !== void 0 ? _c : v.default;
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