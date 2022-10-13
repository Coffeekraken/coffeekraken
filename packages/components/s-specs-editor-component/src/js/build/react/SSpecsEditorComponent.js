var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
    key in obj
        ? __defProp(obj, key, {
              enumerable: true,
              configurable: true,
              writable: true,
              value,
          })
        : (obj[key] = value);
var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
            if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
        }
    return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import __css from '../../../../src/css/s-specs-editor-component.css';
import __SSpecsEditorComponentInterface from '../../../../src/js/interface/SSpecsEditorComponentInterface';
import __SComponent from '@coffeekraken/s-component';
import { __uniqid } from '@coffeekraken/sugar/string';
const DEFAULT_PROPS = __SSpecsEditorComponentInterface.defaults();
const metas = {
    interface: __SSpecsEditorComponentInterface,
    preview: `No preview`,
};
function SSpecsEditor(props) {
    var _a;
    const $container = useRef(null);
    const [_status, set_status] = useState(() => 'idle');
    const [_id, set_id] = useState(() => null);
    const [_specs, set_specs] = useState(() => ({}));
    const [_specArray, set_specArray] = useState(() => []);
    const [_propsValues, set_propsValues] = useState(() => ({}));
    const [_component, set_component] = useState(() => null);
    function mount() {
        var _a2, _b;
        try {
            _component.injectStyleInShadowRoot(
                [__css, ...((_a2 = props.cssDeps) != null ? _a2 : [])],
                $container.current,
            );
        } catch (e) {}
        set_propsValues((_b = _component.restoreState()) != null ? _b : {});
        console.log('ss', _propsValues);
        set_specs(JSON.parse(props.specs));
        Object.keys(_specs.props).forEach((key) => {
            _specArray.push(
                __spreadValues(
                    {
                        id: key,
                    },
                    _specs.props[key],
                ),
            );
        });
    }
    function update(event, prop) {
        if (event.target.type === 'checkbox') {
            prop.value = event.target.checked;
        } else {
            prop.value = event.target.value;
        }
        if (prop.value !== prop.default) {
            _propsValues[prop.id] = prop.value;
        } else {
            delete _propsValues[prop.id];
        }
        $container.current.dispatchEvent(
            new CustomEvent('s-specs-editor.change', {
                bubbles: true,
                composed: true,
                detail: __spreadValues({}, prop),
            }),
        );
        _component.saveState(_propsValues);
    }
    useEffect(() => {
        var _a2;
        __SSpecsEditorComponentInterface;
        set_component(
            new __SComponent('s-specs-editor', {
                id: props.id,
                bare: false,
            }),
        );
        set_id((_a2 = props.id) != null ? _a2 : `s-specs-editor-${__uniqid()}`);
        mount();
        set_status('mounted');
    }, []);
    useEffect(() => {
        Array.from($container.current.querySelectorAll('select')).forEach(
            ($select) => {
                if ($select._inited) {
                    return;
                }
                $select._inited = true;
                const _p = JSON.parse($select.getAttribute('prop'));
                _p.options.forEach((opt) => {
                    var _a2, _b;
                    const $option = document.createElement('option');
                    $option.setAttribute('value', opt.value);
                    console.log(
                        'SSSS',
                        opt.id,
                        (_a2 = _propsValues[_p.id]) != null ? _a2 : _p.default,
                        opt.value,
                    );
                    if (
                        ((_b = _propsValues[_p.id]) != null
                            ? _b
                            : _p.default) === opt.value
                    ) {
                        $option.setAttribute('selected', true);
                    }
                    $option.innerHTML = opt.name;
                    $select.appendChild($option);
                });
            },
        );
    });
    return /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        _specArray.length
            ? /* @__PURE__ */ React.createElement(
                  React.Fragment,
                  null,
                  /* @__PURE__ */ React.createElement(
                      'div',
                      __spreadProps(__spreadValues({}, {}), {
                          id: _id,
                          ref: $container,
                          className:
                              _component == null
                                  ? void 0
                                  : _component.className('', null, 's-bare'),
                          status: _status,
                          lnf: (_a = props.lnf) != null ? _a : 'default',
                      }),
                      _specArray == null
                          ? void 0
                          : _specArray.map((v, index) => {
                                var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
                                return /* @__PURE__ */ React.createElement(
                                    'div',
                                    {
                                        prop: v.id,
                                        className:
                                            _component.className('__prop'),
                                    },
                                    v.type.toLowerCase() === 'text'
                                        ? /* @__PURE__ */ React.createElement(
                                              React.Fragment,
                                              null,
                                              /* @__PURE__ */ React.createElement(
                                                  'div',
                                                  {
                                                      className:
                                                          _component.className(
                                                              '__prop--text',
                                                          ),
                                                  },
                                                  /* @__PURE__ */ React.createElement(
                                                      'label',
                                                      {
                                                          className:
                                                              _component.className(
                                                                  '__label',
                                                                  's-label s-label--block',
                                                              ),
                                                      },
                                                      /* @__PURE__ */ React.createElement(
                                                          'input',
                                                          {
                                                              type: 'text',
                                                              onChange: (e) =>
                                                                  update(e, v),
                                                              name: v.id,
                                                              className:
                                                                  _component.className(
                                                                      '__input',
                                                                      's-input',
                                                                  ),
                                                              placeholder:
                                                                  (_b =
                                                                      (_a2 =
                                                                          v.default) !=
                                                                      null
                                                                          ? _a2
                                                                          : v.title) !=
                                                                  null
                                                                      ? _b
                                                                      : v.id,
                                                              value:
                                                                  (_c =
                                                                      _propsValues[
                                                                          v.id
                                                                      ]) != null
                                                                      ? _c
                                                                      : v.default,
                                                          },
                                                      ),
                                                      /* @__PURE__ */ React.createElement(
                                                          'span',
                                                          null,
                                                          v.description
                                                              ? /* @__PURE__ */ React.createElement(
                                                                    React.Fragment,
                                                                    null,
                                                                    /* @__PURE__ */ React.createElement(
                                                                        'span',
                                                                        {
                                                                            className:
                                                                                's-tooltip-container',
                                                                        },
                                                                        /* @__PURE__ */ React.createElement(
                                                                            'i',
                                                                            {
                                                                                className:
                                                                                    'fa-solid fa-circle-question',
                                                                            },
                                                                        ),
                                                                        /* @__PURE__ */ React.createElement(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    's-tooltip s-tooltip--right',
                                                                            },
                                                                            v.description,
                                                                        ),
                                                                    ),
                                                                )
                                                              : null,
                                                          (_d = v.title) != null
                                                              ? _d
                                                              : v.id,
                                                      ),
                                                  ),
                                              ),
                                          )
                                        : null,
                                    v.type.toLowerCase() === 'select'
                                        ? /* @__PURE__ */ React.createElement(
                                              React.Fragment,
                                              null,
                                              /* @__PURE__ */ React.createElement(
                                                  'div',
                                                  {
                                                      className:
                                                          _component.className(
                                                              '__prop--select',
                                                          ),
                                                  },
                                                  /* @__PURE__ */ React.createElement(
                                                      'label',
                                                      {
                                                          className:
                                                              _component.className(
                                                                  '__label',
                                                                  's-label s-label--block',
                                                              ),
                                                      },
                                                      /* @__PURE__ */ React.createElement(
                                                          'select',
                                                          {
                                                              onChange: (e) =>
                                                                  update(e, v),
                                                              name: v.id,
                                                              className:
                                                                  _component.className(
                                                                      '__select',
                                                                      's-select',
                                                                  ),
                                                              placeholder:
                                                                  (_f =
                                                                      (_e =
                                                                          v.default) !=
                                                                      null
                                                                          ? _e
                                                                          : v.title) !=
                                                                  null
                                                                      ? _f
                                                                      : v.id,
                                                              prop: JSON.stringify(
                                                                  v,
                                                              ),
                                                          },
                                                      ),
                                                      /* @__PURE__ */ React.createElement(
                                                          'span',
                                                          null,
                                                          v.description
                                                              ? /* @__PURE__ */ React.createElement(
                                                                    React.Fragment,
                                                                    null,
                                                                    /* @__PURE__ */ React.createElement(
                                                                        'span',
                                                                        {
                                                                            className:
                                                                                's-tooltip-container',
                                                                        },
                                                                        /* @__PURE__ */ React.createElement(
                                                                            'i',
                                                                            {
                                                                                className:
                                                                                    'fa-solid fa-circle-question',
                                                                            },
                                                                        ),
                                                                        /* @__PURE__ */ React.createElement(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    's-tooltip s-tooltip--right',
                                                                            },
                                                                            v.description,
                                                                        ),
                                                                    ),
                                                                )
                                                              : null,
                                                          (_g = v.title) != null
                                                              ? _g
                                                              : v.id,
                                                      ),
                                                  ),
                                              ),
                                          )
                                        : null,
                                    v.type.toLowerCase() === 'checkbox'
                                        ? /* @__PURE__ */ React.createElement(
                                              React.Fragment,
                                              null,
                                              /* @__PURE__ */ React.createElement(
                                                  'div',
                                                  {
                                                      className: `${_component.className(
                                                          '__prop--checkbox',
                                                      )}`,
                                                  },
                                                  /* @__PURE__ */ React.createElement(
                                                      'label',
                                                      {
                                                          className:
                                                              _component.className(
                                                                  '__label',
                                                                  's-label',
                                                              ),
                                                      },
                                                      /* @__PURE__ */ React.createElement(
                                                          'input',
                                                          __spreadProps(
                                                              __spreadValues(
                                                                  {},
                                                                  {
                                                                      checked:
                                                                          (_h =
                                                                              _propsValues[
                                                                                  v
                                                                                      .id
                                                                              ]) !=
                                                                          null
                                                                              ? _h
                                                                              : v.default,
                                                                  },
                                                              ),
                                                              {
                                                                  type: 'checkbox',
                                                                  onChange: (
                                                                      e,
                                                                  ) =>
                                                                      update(
                                                                          e,
                                                                          v,
                                                                      ),
                                                                  name: v.id,
                                                                  className:
                                                                      _component.className(
                                                                          '__checkbox',
                                                                          's-switch',
                                                                      ),
                                                              },
                                                          ),
                                                      ),
                                                      /* @__PURE__ */ React.createElement(
                                                          'span',
                                                          null,
                                                          v.description
                                                              ? /* @__PURE__ */ React.createElement(
                                                                    React.Fragment,
                                                                    null,
                                                                    /* @__PURE__ */ React.createElement(
                                                                        'span',
                                                                        {
                                                                            className:
                                                                                's-tooltip-container',
                                                                        },
                                                                        /* @__PURE__ */ React.createElement(
                                                                            'i',
                                                                            {
                                                                                className:
                                                                                    'fa-solid fa-circle-question',
                                                                            },
                                                                        ),
                                                                        /* @__PURE__ */ React.createElement(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    's-tooltip s-tooltip--right',
                                                                            },
                                                                            v.description,
                                                                        ),
                                                                    ),
                                                                )
                                                              : null,
                                                          (_i = v.title) != null
                                                              ? _i
                                                              : v.id,
                                                      ),
                                                  ),
                                              ),
                                          )
                                        : null,
                                );
                            }),
                  ),
              )
            : null,
    );
}
export { DEFAULT_PROPS, SSpecsEditor as default, metas };
