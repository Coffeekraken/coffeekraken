var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { fileURLToPath } from "url";
import path from "path";
var getFilename, getDirname, __dirname, __filename;
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
    getFilename = () => fileURLToPath(import.meta.url);
    getDirname = () => path.dirname(getFilename());
    __dirname = /* @__PURE__ */ getDirname();
    __filename = /* @__PURE__ */ getFilename();
  }
});
var require_SInterface = __commonJS({
  "packages/tools/sugar/src/shared/class/__tests__.wip/SInterface.ts"(exports, module) {
    init_esm_shims();
    const __stripAnsi = require("strip-ansi");
    module.exports = (__SInterface) => {
      describe("sugar.js.class.SInterface", () => {
        it("Should pass the interface test correctly", () => {
          class MyInterface extends __SInterface {
            static get _definition() {
              return {
                title: {
                  type: "String",
                  required: true
                },
                doSomething: {
                  type: "Function",
                  required: true
                }
              };
            }
          }
          let myClassInterfaceResult;
          class MyClass {
            constructor() {
              this.title = true;
              myClassInterfaceResult = MyInterface.apply(this, {
                return: "Object",
                throw: false
              });
            }
          }
          new MyClass();
          expect(myClassInterfaceResult).toEqual({
            name: "MyClass",
            doSomething: {
              name: "doSomething",
              expected: { type: "Function", required: true },
              issues: ["type", "required"],
              received: { type: "Undefined", value: void 0 }
            },
            issues: ["title", "doSomething"],
            title: {
              name: "title",
              expected: { type: "String", required: true },
              issues: ["type"],
              received: { type: "Boolean", value: true }
            }
          });
        });
        it("Should pass the interface test correctly", () => {
          class MyInterface extends __SInterface {
            static get _definition() {
              return {
                title: {
                  type: "String",
                  required: true
                },
                doSomething: {
                  type: "Function",
                  required: true
                }
              };
            }
          }
          let myClassInterfaceResult;
          class MyClass {
            constructor() {
              this.title = "Hello world";
              myClassInterfaceResult = MyInterface.apply(this);
            }
            doSomething() {
            }
          }
          new MyClass();
          expect(myClassInterfaceResult).toBe(true);
        });
        it("Should pass the interface test correctly when checking for an undefined static function", () => {
          class MyInterface extends __SInterface {
            static get _definition() {
              return {
                title: {
                  type: "String",
                  required: true
                },
                doSomething: {
                  type: "Function",
                  required: true,
                  static: true
                }
              };
            }
          }
          let myClassInterfaceResult;
          class MyClass {
            constructor() {
              this.title = "Hello world";
              myClassInterfaceResult = MyInterface.apply(this, {
                throw: false,
                return: "Object"
              });
            }
            doSomething() {
            }
          }
          new MyClass();
          expect(myClassInterfaceResult).toEqual({
            name: "MyClass",
            doSomething: {
              name: "doSomething",
              expected: {
                type: "Function",
                required: true,
                static: true
              },
              issues: ["type", "required", "static"],
              received: { type: "Null", value: null }
            },
            issues: ["doSomething"]
          });
        });
        it("Should pass the interface test correctly when checking for an existing static function", () => {
          class MyInterface extends __SInterface {
            static get _definition() {
              return {
                title: {
                  type: "String",
                  required: true
                },
                doSomething: {
                  type: "Function",
                  required: true,
                  static: true
                }
              };
            }
          }
          let myClassInterfaceResult;
          class MyClass {
            constructor() {
              this.title = "Hello world";
              myClassInterfaceResult = MyInterface.apply(this);
            }
            static doSomething() {
            }
          }
          new MyClass();
          expect(myClassInterfaceResult).toBe(true);
        });
        it("Should pass the interface test correctly passing a value that is not in the allowed once", () => {
          class MyInterface extends __SInterface {
            static get _definition() {
              return {
                title: {
                  type: "String",
                  values: ["Hello", "World"],
                  required: true
                }
              };
            }
          }
          let myClassInterfaceResult;
          class MyClass {
            constructor() {
              this.title = "Hello world";
              myClassInterfaceResult = MyInterface.apply(this, {
                return: "Object",
                throw: false
              });
            }
          }
          new MyClass();
          expect(myClassInterfaceResult).toEqual({
            name: "MyClass",
            issues: ["title"],
            title: {
              name: "title",
              expected: {
                required: true,
                type: "String",
                values: ["Hello", "World"]
              },
              issues: ["values"],
              received: { type: "String", value: "Hello world" }
            }
          });
        });
        it("Should pass the interface test correctly passing a value that is in the allowed once", () => {
          class MyInterface extends __SInterface {
            static get _definition() {
              return {
                title: {
                  type: "String",
                  values: ["Hello", "World"],
                  required: true
                }
              };
            }
          }
          let myClassInterfaceResult;
          class MyClass {
            constructor() {
              this.title = "Hello";
              myClassInterfaceResult = MyInterface.apply(this);
            }
          }
          new MyClass();
          expect(myClassInterfaceResult).toBe(true);
        });
        it("Should pass the interface test correctly passing a complexe one that need to return a correct error string", () => {
          class MyInterface extends __SInterface {
            static get _definition() {
              return {
                title: {
                  type: "String",
                  values: ["Hello", "World"],
                  required: true
                },
                body: {
                  type: "Boolean",
                  required: true
                },
                header: {
                  type: "Array<String>",
                  required: true
                },
                footer: {
                  type: "Object<Boolean|Number>",
                  required: true
                },
                medhod1: {
                  type: "Function",
                  required: true
                },
                method2: {
                  type: "Function",
                  required: true
                },
                staticMethod: {
                  type: "Function",
                  required: true,
                  static: true
                },
                staticMethod2: {
                  type: "Function",
                  required: true,
                  static: true
                }
              };
            }
          }
          let myClassInterfaceResult;
          class MyClass {
            constructor() {
              this.title = "Hello World";
              this.body = 10;
              this.header = [true, "hello"];
              this.footer = {
                coco: 10,
                plop: () => {
                }
              };
              this.method1 = "Youhou";
              this.staticMethod2 = "Youhou";
              myClassInterfaceResult = MyInterface.apply(this, {
                throw: false
              });
            }
            method2() {
            }
            static staticMethod() {
            }
          }
          new MyClass();
          expect(__stripAnsi(myClassInterfaceResult.replace(/\s/g, ""))).toBe('Objectvalidation-Name:MyClass-Errors:6-Properties:title,body,header,footer,medhod1,staticMethod2\u2502title\u2502\u2502-Receivedvalue:HelloWorld\u2502-Theallowedvaluesare["Hello","World"]\u2502body\u2502\u2502-Receivedvalue:10\u2502-ThevaluetypehastobeBooleanbutyoupassedInteger\u2502header\u2502\u2502-Receivedvalue:[true,"hello"]\u2502-ThevaluetypehastobeArray<String>butyoupassedArray<Boolean|String>\u2502footer\u2502\u2502-Receivedvalue:{"coco":10}\u2502-ThevaluetypehastobeObject<Boolean|Number>butyoupassedObject<Integer|Function>\u2502medhod1\u2502\u2502-Receivedvalue:undefined\u2502-ThevaluetypehastobeFunctionbutyoupassedUndefined\u2502-Thisvalueisrequired\u2502staticMethod2\u2502\u2502-Receivedvalue:null\u2502-ThevaluetypehastobeFunctionbutyoupassedNull\u2502-Thisvalueisrequired\u2502-Thisvaluehastobeastaticone');
        });
      });
    };
  }
});
export default require_SInterface();
