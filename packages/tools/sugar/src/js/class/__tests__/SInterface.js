var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __stripAnsi = require('strip-ansi');
    module.exports = function (__SInterface) {
        describe('sugar.js.class.SInterface', function () {
            it('Should pass the interface test correctly', function () {
                var MyInterface = /** @class */ (function (_super) {
                    __extends(MyInterface, _super);
                    function MyInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    MyInterface.definition = {
                        title: {
                            type: 'String',
                            required: true
                        },
                        doSomething: {
                            type: 'Function',
                            required: true
                        }
                    };
                    return MyInterface;
                }(__SInterface));
                var myClassInterfaceResult;
                var MyClass = /** @class */ (function () {
                    function MyClass() {
                        this.title = true;
                        myClassInterfaceResult = MyInterface.apply(this, {
                            return: 'Object',
                            throw: false
                        });
                    }
                    return MyClass;
                }());
                new MyClass();
                expect(myClassInterfaceResult).toEqual({
                    $name: 'MyClass',
                    doSomething: {
                        $name: 'doSomething',
                        $expected: { type: 'Function', required: true },
                        $issues: ['type', 'required'],
                        $received: { type: 'Undefined', value: undefined }
                    },
                    $issues: ['title', 'doSomething'],
                    title: {
                        $name: 'title',
                        $expected: { type: 'String', required: true },
                        $issues: ['type'],
                        $received: { type: 'Boolean', value: true }
                    }
                });
            });
            it('Should pass the interface test correctly', function () {
                var MyInterface = /** @class */ (function (_super) {
                    __extends(MyInterface, _super);
                    function MyInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    MyInterface.definition = {
                        title: {
                            type: 'String',
                            required: true
                        },
                        doSomething: {
                            type: 'Function',
                            required: true
                        }
                    };
                    return MyInterface;
                }(__SInterface));
                var myClassInterfaceResult;
                var MyClass = /** @class */ (function () {
                    function MyClass() {
                        this.title = 'Hello world';
                        myClassInterfaceResult = MyInterface.apply(this);
                    }
                    MyClass.prototype.doSomething = function () { };
                    return MyClass;
                }());
                new MyClass();
                expect(myClassInterfaceResult).toBe(true);
            });
            it('Should pass the interface test correctly when checking for an undefined static function', function () {
                var MyInterface = /** @class */ (function (_super) {
                    __extends(MyInterface, _super);
                    function MyInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    MyInterface.definition = {
                        title: {
                            type: 'String',
                            required: true
                        },
                        doSomething: {
                            type: 'Function',
                            required: true,
                            static: true
                        }
                    };
                    return MyInterface;
                }(__SInterface));
                var myClassInterfaceResult;
                var MyClass = /** @class */ (function () {
                    function MyClass() {
                        this.title = 'Hello world';
                        myClassInterfaceResult = MyInterface.apply(this, {
                            throw: false,
                            return: 'Object'
                        });
                    }
                    MyClass.prototype.doSomething = function () { };
                    return MyClass;
                }());
                new MyClass();
                expect(myClassInterfaceResult).toEqual({
                    $name: 'MyClass',
                    doSomething: {
                        $name: 'doSomething',
                        $expected: { type: 'Function', required: true, static: true },
                        $issues: ['type', 'required', 'static'],
                        $received: { type: 'Null', value: null }
                    },
                    $issues: ['doSomething']
                });
            });
            it('Should pass the interface test correctly when checking for an existing static function', function () {
                var MyInterface = /** @class */ (function (_super) {
                    __extends(MyInterface, _super);
                    function MyInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    MyInterface.definition = {
                        title: {
                            type: 'String',
                            required: true
                        },
                        doSomething: {
                            type: 'Function',
                            required: true,
                            static: true
                        }
                    };
                    return MyInterface;
                }(__SInterface));
                var myClassInterfaceResult;
                var MyClass = /** @class */ (function () {
                    function MyClass() {
                        this.title = 'Hello world';
                        myClassInterfaceResult = MyInterface.apply(this);
                    }
                    MyClass.doSomething = function () { };
                    return MyClass;
                }());
                new MyClass();
                expect(myClassInterfaceResult).toBe(true);
            });
            it('Should pass the interface test correctly passing a value that is not in the allowed once', function () {
                var MyInterface = /** @class */ (function (_super) {
                    __extends(MyInterface, _super);
                    function MyInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    MyInterface.definition = {
                        title: {
                            type: 'String',
                            values: ['Hello', 'World'],
                            required: true
                        }
                    };
                    return MyInterface;
                }(__SInterface));
                var myClassInterfaceResult;
                var MyClass = /** @class */ (function () {
                    function MyClass() {
                        this.title = 'Hello world';
                        myClassInterfaceResult = MyInterface.apply(this, {
                            return: 'Object',
                            throw: false
                        });
                    }
                    return MyClass;
                }());
                new MyClass();
                expect(myClassInterfaceResult).toEqual({
                    $name: 'MyClass',
                    $issues: ['title'],
                    title: {
                        $name: 'title',
                        $expected: {
                            required: true,
                            type: 'String',
                            values: ['Hello', 'World']
                        },
                        $issues: ['values'],
                        $received: { type: 'String', value: 'Hello world' }
                    }
                });
            });
            it('Should pass the interface test correctly passing a value that is in the allowed once', function () {
                var MyInterface = /** @class */ (function (_super) {
                    __extends(MyInterface, _super);
                    function MyInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    MyInterface.definition = {
                        title: {
                            type: 'String',
                            values: ['Hello', 'World'],
                            required: true
                        }
                    };
                    return MyInterface;
                }(__SInterface));
                var myClassInterfaceResult;
                var MyClass = /** @class */ (function () {
                    function MyClass() {
                        this.title = 'Hello';
                        myClassInterfaceResult = MyInterface.apply(this);
                    }
                    return MyClass;
                }());
                new MyClass();
                expect(myClassInterfaceResult).toBe(true);
            });
            it('Should pass the interface test correctly passing a complexe one that need to return a correct error string', function () {
                var MyInterface = /** @class */ (function (_super) {
                    __extends(MyInterface, _super);
                    function MyInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    MyInterface.definition = {
                        title: {
                            type: 'String',
                            values: ['Hello', 'World'],
                            required: true
                        },
                        body: {
                            type: 'Boolean',
                            required: true
                        },
                        header: {
                            type: 'Array<String>',
                            required: true
                        },
                        footer: {
                            type: 'Object<Boolean|Number>',
                            required: true
                        },
                        medhod1: {
                            type: 'Function',
                            required: true
                        },
                        method2: {
                            type: 'Function',
                            required: true
                        },
                        staticMethod: {
                            type: 'Function',
                            required: true,
                            static: true
                        },
                        staticMethod2: {
                            type: 'Function',
                            required: true,
                            static: true
                        }
                    };
                    return MyInterface;
                }(__SInterface));
                var myClassInterfaceResult;
                var MyClass = /** @class */ (function () {
                    function MyClass() {
                        this.title = 'Hello World';
                        this.body = 10;
                        this.header = [true, 'hello'];
                        this.footer = {
                            coco: 10,
                            plop: function () { }
                        };
                        this.method1 = 'Youhou';
                        this.staticMethod2 = 'Youhou';
                        myClassInterfaceResult = MyInterface.apply(this, {
                            throw: false
                        });
                    }
                    MyClass.prototype.method2 = function () { };
                    MyClass.staticMethod = function () { };
                    return MyClass;
                }());
                new MyClass();
                expect(__stripAnsi(myClassInterfaceResult.replace(/\s/g, ''))).toBe('Objectvalidation-Name:MyClass-Errors:6-Properties:title,body,header,footer,medhod1,staticMethod2│title││-Receivedvalue:HelloWorld│-Theallowedvaluesare["Hello","World"]│body││-Receivedvalue:10│-ThevaluetypehastobeBooleanbutyoupassedInteger│header││-Receivedvalue:[true,"hello"]│-ThevaluetypehastobeArray<String>butyoupassedArray<Boolean|String>│footer││-Receivedvalue:{"coco":10}│-ThevaluetypehastobeObject<Boolean|Number>butyoupassedObject<Integer|Function>│medhod1││-Receivedvalue:undefined│-ThevaluetypehastobeFunctionbutyoupassedUndefined│-Thisvalueisrequired│staticMethod2││-Receivedvalue:null│-ThevaluetypehastobeFunctionbutyoupassedNull│-Thisvalueisrequired│-Thisvaluehastobeastaticone');
            });
        });
    };
});
//# sourceMappingURL=module.js.map