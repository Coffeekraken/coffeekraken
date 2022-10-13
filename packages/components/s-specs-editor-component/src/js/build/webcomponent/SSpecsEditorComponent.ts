/**
 * @name                SSpecsEditor
 * @as                  SSpecsEditor
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSpecsEditorInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-specs-editor
 * @platform            html
 * @status              beta
 *
 * This component allows you to display an editor interface for an SSpecs resulting json
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install          bash
 * npm i @coffeekraken/s-specs-editor-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-specs-editor-component/webcomponent';
 * define();
 *
 * @example         html            Simple example
 * <s-specs-editor></s-specs-editor>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
type Props = {
    id: string;
    specs: Any;
    lnf: string;
    cssDeps: string[];
}; // useMetadata({
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
                try {
                    self.state._component.injectStyleInShadowRoot(
                        [__css, ...(self.props.cssDeps ?? [])],
                        self._$container,
                    );
                } catch (e) {} // restore the props values

                self.state._propsValues =
                    self.state._component.restoreState() ?? {};
                self.update();
                console.log('ss', self.state._propsValues); // cast specs

                self.state._specs = JSON.parse(self.props.specs);
                self.update();
                Object.keys(self.state._specs.props).forEach((key) => {
                    self.state._specArray.push({
                        id: key,
                        ...self.state._specs.props[key],
                    });
                });
            },
            update(event, prop) {
                // update the property value
                if (event.target.type === 'checkbox') {
                    prop.value = event.target.checked;
                } else {
                    prop.value = event.target.value;
                } // update the prop value if different than the default

                if (prop.value !== prop.default) {
                    self.state._propsValues[prop.id] = prop.value;
                } else {
                    delete self.state._propsValues[prop.id];
                } // dispatch an event

                self._$container.dispatchEvent(
                    new CustomEvent('s-specs-editor.change', {
                        bubbles: true,
                        composed: true,
                        detail: { ...prop },
                    }),
                ); // save the props values

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
        const defaultProps = __SComponent.getDefaultProps(
            this.tagName.toLowerCase(),
        );
        this.props.id = this.props.id ?? defaultProps.id ?? DEFAULT_PROPS.id;
        this.props.specs =
            this.props.specs ?? defaultProps.specs ?? DEFAULT_PROPS.specs;
        this.props.lnf =
            this.props.lnf ?? defaultProps.lnf ?? DEFAULT_PROPS.lnf;
        this.props.cssDeps =
            this.props.cssDeps ?? defaultProps.cssDeps ?? DEFAULT_PROPS.cssDeps;

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
            if (el?.scope) {
                child.scope = el.scope;
            }
            if (el?.context) {
                child.context = el.context;
            }
            this.nodesToDestroy.push(child);
        });
        el.after(elementFragment);
    }

    onMount() {
        // onMount
        __SSpecsEditorComponentInterface;
        this.state._component = new __SComponent('s-specs-editor', {
            id: this.props.id,
            bare: false,
        });
        this.update();
        this.state._id = this.props.id ?? `s-specs-editor-${__uniqid()}`;
        this.update();
        this.state.mount();
        this.state._status = 'mounted';
        this.update();
    }

    onUpdate() {
        const self = this;

        Array.from(self._$container.querySelectorAll('select')).forEach(
            ($select) => {
                if ($select._inited) {
                    return;
                }

                $select._inited = true;

                const _p = JSON.parse($select.getAttribute('prop'));

                _p.options.forEach((opt) => {
                    const $option = document.createElement('option');
                    $option.setAttribute('value', opt.value);
                    console.log(
                        'SSSS',
                        opt.id,
                        self.state._propsValues[_p.id] ?? _p.default,
                        opt.value,
                    );

                    if (
                        (self.state._propsValues[_p.id] ?? _p.default) ===
                        opt.value
                    ) {
                        $option.setAttribute('selected', true);
                    }

                    $option.innerHTML = opt.name;
                    $select.appendChild($option);
                });
            },
        );
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
            const prev = preValues.find(
                (prev) => el.dataset.domState === prev.id,
            );
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
                el.setAttribute('id', this.state._id);

                el.className = this.state._component?.className(
                    '',
                    null,
                    's-bare',
                );

                el.setAttribute('status', this.state._status);

                el.setAttribute('lnf', this.props.lnf ?? 'default');
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
                el.className = this.state._component.className(
                    '__label',
                    's-label s-label--block',
                );
            });

        this._root
            .querySelectorAll("[data-el='input-s-specs-editor-1']")
            .forEach((el) => {
                el.removeEventListener('input', this.onInputSSpecsEditor1Input);
                el.addEventListener('input', this.onInputSSpecsEditor1Input);

                const v = this.getScope(el, 'v');

                el.setAttribute('name', v.id);

                el.className = this.state._component.className(
                    '__input',
                    's-input',
                );

                el.setAttribute('placeholder', v.default ?? v.title ?? v.id);

                el.value = this.state._propsValues[v.id] ?? v.default;
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
                const v = this.getScope(el, 'v');
                this.renderTextNode(el, v.title ?? v.id);
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
                el.className = this.state._component.className(
                    '__label',
                    's-label s-label--block',
                );
            });

        this._root
            .querySelectorAll("[data-el='select-s-specs-editor-1']")
            .forEach((el) => {
                el.removeEventListener(
                    'input',
                    this.onSelectSSpecsEditor1Input,
                );
                el.addEventListener('input', this.onSelectSSpecsEditor1Input);

                const v = this.getScope(el, 'v');

                el.setAttribute('name', v.id);

                el.className = this.state._component.className(
                    '__select',
                    's-select',
                );

                el.setAttribute('placeholder', v.default ?? v.title ?? v.id);

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
                const v = this.getScope(el, 'v');
                this.renderTextNode(el, v.title ?? v.id);
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
                el.className = `${this.state._component.className(
                    '__prop--checkbox',
                )}`;
            });

        this._root
            .querySelectorAll("[data-el='label-s-specs-editor-3']")
            .forEach((el) => {
                el.className = this.state._component.className(
                    '__label',
                    's-label',
                );
            });

        this._root
            .querySelectorAll("[data-el='input-s-specs-editor-2']")
            .forEach((el) => {
                el.removeEventListener('input', this.onInputSSpecsEditor2Input);
                el.addEventListener('input', this.onInputSSpecsEditor2Input);

                const v = this.getScope(el, 'v');

                el.setAttribute('name', v.id);

                el.className = this.state._component.className(
                    '__checkbox',
                    's-switch',
                );
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
                const v = this.getScope(el, 'v');
                this.renderTextNode(el, v.title ?? v.id);
            });
    }

    // Helper to render content
    renderTextNode(el, text) {
        const textNode = document.createTextNode(text);
        if (el?.scope) {
            textNode.scope = el.scope;
        }
        if (el?.context) {
            textNode.context = el.context;
        }
        el.after(textNode);
        this.nodesToDestroy.push(el.nextSibling);
    }

    // scope helper
    getScope(el, name) {
        do {
            let value = el?.scope?.[name];
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
            if (template?.scope) {
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
    customElements.define(
        tagName,
        class SSpecsEditorComponent extends SSpecsEditor {},
    );
}
