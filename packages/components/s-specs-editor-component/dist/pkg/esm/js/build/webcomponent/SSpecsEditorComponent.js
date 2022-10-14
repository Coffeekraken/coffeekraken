//     isAttachedToShadowDom: true,
// });
import __css from '../../../../src/css/s-specs-editor-component.css';
import __SSpecsEditorComponentInterface from '../../../../src/js/interface/SSpecsEditorComponentInterface';
import __SComponent from '@coffeekraken/s-component';
import { __uniqid } from '@coffeekraken/sugar/string';
// useMetadata({
//     isAttachedToShadowDom: true,
// });
export const DEFAULT_PROPS = __SSpecsEditorComponentInterface.defaults();
export const metas = {
    interface: __SSpecsEditorComponentInterface,
    preview: `No preview`,
};
/**
 * Usage:
 *
 *  <s-specs-editor></s-specs-editor>
 *
 */
export default class SSpecsEditor extends HTMLElement {
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
                    self.state._component.injectStyleInShadowRoot([__css, ...((_a = self.props.cssDeps) !== null && _a !== void 0 ? _a : [])], self._$container);
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
        const defaultProps = __SComponent.getDefaultProps(this.tagName.toLowerCase());
        this.props.id = (_b = (_a = this.props.id) !== null && _a !== void 0 ? _a : defaultProps.id) !== null && _b !== void 0 ? _b : DEFAULT_PROPS.id;
        this.props.specs =
            (_d = (_c = this.props.specs) !== null && _c !== void 0 ? _c : defaultProps.specs) !== null && _d !== void 0 ? _d : DEFAULT_PROPS.specs;
        this.props.lnf =
            (_f = (_e = this.props.lnf) !== null && _e !== void 0 ? _e : defaultProps.lnf) !== null && _f !== void 0 ? _f : DEFAULT_PROPS.lnf;
        this.props.cssDeps =
            (_h = (_g = this.props.cssDeps) !== null && _g !== void 0 ? _g : defaultProps.cssDeps) !== null && _h !== void 0 ? _h : DEFAULT_PROPS.cssDeps;
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
        __SSpecsEditorComponentInterface;
        this.state._component = new __SComponent('s-specs-editor', {
            id: this.props.id,
            bare: false,
        });
        this.update();
        this.state._id = (_a = this.props.id) !== null && _a !== void 0 ? _a : `s-specs-editor-${__uniqid()}`;
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
export function define(props = {}, tagName = 's-specs-editor') {
    __SComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, class SSpecsEditorComponent extends SSpecsEditor {
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9DQSxtQ0FBbUM7QUFDbkMsTUFBTTtBQUVOLE9BQU8sS0FBSyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JFLE9BQU8sZ0NBQWdDLE1BQU0sNkRBQTZELENBQUM7QUFDM0csT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELGdCQUFnQjtBQUNoQixtQ0FBbUM7QUFDbkMsTUFBTTtBQUNOLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN6RSxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUc7SUFDakIsU0FBUyxFQUFFLGdDQUFnQztJQUMzQyxPQUFPLEVBQUUsWUFBWTtDQUN4QixDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxXQUFXO0lBQ2pELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsSUFBSTtZQUNULE1BQU0sRUFBRSxFQUFFO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLOztnQkFDRCxJQUFJO29CQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFB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