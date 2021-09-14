import __SLitComponent from "@coffeekraken/s-lit-component";
import {css, unsafeCSS, html} from "lit";
import __SInterface from "@coffeekraken/s-interface";
import __SRequest from "@coffeekraken/s-request";
import __minimatch from "minimatch";
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const standardProperty = (options, element) => {
  if (element.kind === "method" && element.descriptor && !("value" in element.descriptor)) {
    return {
      ...element,
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  } else {
    return {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      originalKey: element.key,
      initializer() {
        if (typeof element.initializer === "function") {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
function property(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const decorateProperty = ({finisher, descriptor}) => (protoOrDescriptor, name) => {
  var _a;
  if (name !== void 0) {
    const ctor = protoOrDescriptor.constructor;
    if (descriptor !== void 0) {
      Object.defineProperty(protoOrDescriptor, name, descriptor(name));
    }
    finisher === null || finisher === void 0 ? void 0 : finisher(ctor, name);
  } else {
    const key = (_a = protoOrDescriptor.originalKey) !== null && _a !== void 0 ? _a : protoOrDescriptor.key;
    const info = descriptor != void 0 ? {
      kind: "method",
      placement: "prototype",
      key,
      descriptor: descriptor(protoOrDescriptor.key)
    } : {...protoOrDescriptor, key};
    if (finisher != void 0) {
      info.finisher = function(ctor) {
        finisher(ctor, key);
      };
    }
    return info;
  }
};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function query(selector, cache) {
  return decorateProperty({
    descriptor: (name) => {
      const descriptor = {
        get() {
          var _a;
          return (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selector);
        },
        enumerable: true,
        configurable: true
      };
      if (cache) {
        const key = typeof name === "symbol" ? Symbol() : `__${name}`;
        descriptor.get = function() {
          var _a;
          if (this[key] === void 0) {
            this[key] = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selector);
          }
          return this[key];
        };
      }
      return descriptor;
    }
  });
}
class SConfigExplorerComponentInterface extends __SInterface {
}
SConfigExplorerComponentInterface.definition = {
  apiUrl: {
    type: "String",
    default: "api/config"
  },
  maxItems: {
    type: "Number",
    default: 30
  }
};
function plainObject(object) {
  if (!object)
    return false;
  if (typeof object !== "object")
    return false;
  if (object.constructor && object.constructor.name !== "Object")
    return false;
  if (Object.prototype.toString.call(object) !== "[object Object]")
    return false;
  if (object !== Object(object))
    return false;
  return true;
}
function __deepMerge(...args) {
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
      return secondObj;
    if (!secondObj && firstObj)
      return firstObj;
    if (!firstObj && !secondObj)
      return {};
    const firstProps = Object.getOwnPropertyNames(firstObj);
    firstProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(firstObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = firstObj[key];
      }
    });
    const secondProps = Object.getOwnPropertyNames(secondObj);
    secondProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else if (plainObject(newObj[key]) && plainObject(secondObj[key])) {
        newObj[key] = merge(newObj[key], secondObj[key]);
      } else {
        newObj[key] = secondObj[key];
      }
    });
    return newObj;
  }
  let currentObj = {};
  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i];
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SConfigExplorer extends __SLitComponent {
  constructor() {
    super(__deepMerge({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: SConfigExplorerComponentInterface
      }
    }));
    this._displayedConfig = [];
    (() => __awaiter(this, void 0, void 0, function* () {
      const request = new __SRequest({});
      const response = yield request.send({
        type: "GET",
        url: `/${this._component.props.apiUrl}?flat=1`
      });
      this._config = response.data;
    }))();
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
            :host {
                display: block;
            }
        `)}
        `;
  }
  firstUpdated() {
    let timeout;
    this._$dotpath.addEventListener("keyup", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this._displayedConfig = [];
        this.requestUpdate();
      }, 100);
    });
  }
  _filter(dotpath) {
    this._$dotpath.value = dotpath;
    this._displayedConfig = [];
    this.requestUpdate();
  }
  render() {
    return html`
            <div class="${this.componentUtils.className()}">
                <table class="${this.componentUtils.className("__table", "s-table")}">
                    <tr>
                        <th>
                            <input
                                class="${this.componentUtils.className("__search", "s-input s-width:100")}"
                                type="text"
                                name="dotpath"
                                placeholder="Filter by dotpath"
                            />
                        </th>
                        <th>Value</th>
                    </tr>
                    ${this._config ? html`
                              ${Object.keys(this._config).filter((dotpath, i) => {
      if (!this._$dotpath.value) {
        const splits = dotpath.split(".");
        if (this._displayedConfig.indexOf(splits[0]) === -1) {
          this._displayedConfig.push(splits[0]);
          return true;
        }
        return false;
      }
      if (dotpath.startsWith(this._$dotpath.value))
        return true;
      return __minimatch(dotpath, this._$dotpath.value, {
        matchBase: true
      });
    }).map((dotpath) => {
      return html`
                                          <tr>
                                              <td>
                                                  ${dotpath.split(".").map((part, i) => {
        if (i < dotpath.split(".").length - 1) {
          return html`
                                                              <a
                                                                  @click="${() => {
            this._filter(dotpath.split(".").slice(0, i + 1).join("."));
          }}"
                                                                  >${part}</a
                                                              >${i < dotpath.split(".").length - 1 ? "." : ""}
                                                          `;
        } else {
          return part;
        }
      })}
                                              </td>
                                              <td>${this._config[dotpath]}</td>
                                          </tr>
                                      `;
    })}
                          ` : html`
                              <tr>
                                  <td colspan="2">Loading configurations please wait...</td>
                              </tr>
                          `}
                </table>
            </div>
        `;
  }
}
__decorate([
  property()
], SConfigExplorer.prototype, "_config", void 0);
__decorate([
  query('input[name="dotpath"]')
], SConfigExplorer.prototype, "_$dotpath", void 0);
function define(props = {}, tagName = "s-config-explorer") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SConfigExplorer);
}
export default SConfigExplorer;
export {define};
