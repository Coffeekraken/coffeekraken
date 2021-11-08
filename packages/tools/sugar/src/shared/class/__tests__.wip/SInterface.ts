const __stripAnsi = require('strip-ansi');

module.exports = (__SInterface) => {
    describe('sugar.js.class.SInterface', () => {
        it('Should pass the interface test correctly', () => {
            class MyInterface extends __SInterface {
                static get _definition() {
                    return {
                        title: {
                            type: 'String',
                            required: true,
                        },
                        doSomething: {
                            type: 'Function',
                            required: true,
                        },
                    };
                }
            }

            let myClassInterfaceResult;
            class MyClass {
                title = true;
                constructor() {
                    myClassInterfaceResult = MyInterface.apply(this, {
                        return: 'Object',
                        throw: false,
                    });
                }
            }
            new MyClass();

            expect(myClassInterfaceResult).toEqual({
                name: 'MyClass',
                doSomething: {
                    name: 'doSomething',
                    expected: { type: 'Function', required: true },
                    issues: ['type', 'required'],
                    received: { type: 'Undefined', value: undefined },
                },
                issues: ['title', 'doSomething'],
                title: {
                    name: 'title',
                    expected: { type: 'String', required: true },
                    issues: ['type'],
                    received: { type: 'Boolean', value: true },
                },
            });
        });

        it('Should pass the interface test correctly', () => {
            class MyInterface extends __SInterface {
                static get _definition() {
                    return {
                        title: {
                            type: 'String',
                            required: true,
                        },
                        doSomething: {
                            type: 'Function',
                            required: true,
                        },
                    };
                }
            }

            let myClassInterfaceResult;
            class MyClass {
                title = 'Hello world';
                constructor() {
                    myClassInterfaceResult = MyInterface.apply(this);
                }
                doSomething() {}
            }
            new MyClass();

            expect(myClassInterfaceResult).toBe(true);
        });

        it('Should pass the interface test correctly when checking for an undefined static function', () => {
            class MyInterface extends __SInterface {
                static get _definition() {
                    return {
                        title: {
                            type: 'String',
                            required: true,
                        },
                        doSomething: {
                            type: 'Function',
                            required: true,
                            static: true,
                        },
                    };
                }
            }

            let myClassInterfaceResult;
            class MyClass {
                title = 'Hello world';
                constructor() {
                    myClassInterfaceResult = MyInterface.apply(this, {
                        throw: false,
                        return: 'Object',
                    });
                }
                doSomething() {}
            }
            new MyClass();

            expect(myClassInterfaceResult).toEqual({
                name: 'MyClass',
                doSomething: {
                    name: 'doSomething',
                    expected: {
                        type: 'Function',
                        required: true,
                        static: true,
                    },
                    issues: ['type', 'required', 'static'],
                    received: { type: 'Null', value: null },
                },
                issues: ['doSomething'],
            });
        });

        it('Should pass the interface test correctly when checking for an existing static function', () => {
            class MyInterface extends __SInterface {
                static get _definition() {
                    return {
                        title: {
                            type: 'String',
                            required: true,
                        },
                        doSomething: {
                            type: 'Function',
                            required: true,
                            static: true,
                        },
                    };
                }
            }

            let myClassInterfaceResult;
            class MyClass {
                title = 'Hello world';
                constructor() {
                    myClassInterfaceResult = MyInterface.apply(this);
                }
                static doSomething() {}
            }
            new MyClass();

            expect(myClassInterfaceResult).toBe(true);
        });

        it('Should pass the interface test correctly passing a value that is not in the allowed once', () => {
            class MyInterface extends __SInterface {
                static get _definition() {
                    return {
                        title: {
                            type: 'String',
                            values: ['Hello', 'World'],
                            required: true,
                        },
                    };
                }
            }

            let myClassInterfaceResult;
            class MyClass {
                title = 'Hello world';
                constructor() {
                    myClassInterfaceResult = MyInterface.apply(this, {
                        return: 'Object',
                        throw: false,
                    });
                }
            }
            new MyClass();

            expect(myClassInterfaceResult).toEqual({
                name: 'MyClass',
                issues: ['title'],
                title: {
                    name: 'title',
                    expected: {
                        required: true,
                        type: 'String',
                        values: ['Hello', 'World'],
                    },
                    issues: ['values'],
                    received: { type: 'String', value: 'Hello world' },
                },
            });
        });

        it('Should pass the interface test correctly passing a value that is in the allowed once', () => {
            class MyInterface extends __SInterface {
                static get _definition() {
                    return {
                        title: {
                            type: 'String',
                            values: ['Hello', 'World'],
                            required: true,
                        },
                    };
                }
            }

            let myClassInterfaceResult;
            class MyClass {
                title = 'Hello';
                constructor() {
                    myClassInterfaceResult = MyInterface.apply(this);
                }
            }
            new MyClass();

            expect(myClassInterfaceResult).toBe(true);
        });

        it('Should pass the interface test correctly passing a complexe one that need to return a correct error string', () => {
            class MyInterface extends __SInterface {
                static get _definition() {
                    return {
                        title: {
                            type: 'String',
                            values: ['Hello', 'World'],
                            required: true,
                        },
                        body: {
                            type: 'Boolean',
                            required: true,
                        },
                        header: {
                            type: 'Array<String>',
                            required: true,
                        },
                        footer: {
                            type: 'Object<Boolean|Number>',
                            required: true,
                        },
                        medhod1: {
                            type: 'Function',
                            required: true,
                        },
                        method2: {
                            type: 'Function',
                            required: true,
                        },
                        staticMethod: {
                            type: 'Function',
                            required: true,
                            static: true,
                        },
                        staticMethod2: {
                            type: 'Function',
                            required: true,
                            static: true,
                        },
                    };
                }
            }

            let myClassInterfaceResult;
            class MyClass {
                title = 'Hello World';
                body = 10;
                header = [true, 'hello'];
                footer = {
                    coco: 10,
                    plop: () => {},
                };
                method1 = 'Youhou';
                constructor() {
                    myClassInterfaceResult = MyInterface.apply(this, {
                        throw: false,
                    });
                }
                method2() {}

                static staticMethod() {}
                staticMethod2 = 'Youhou';
            }
            new MyClass();

            expect(__stripAnsi(myClassInterfaceResult.replace(/\s/g, ''))).toBe(
                'Objectvalidation-Name:MyClass-Errors:6-Properties:title,body,header,footer,medhod1,staticMethod2│title││-Receivedvalue:HelloWorld│-Theallowedvaluesare["Hello","World"]│body││-Receivedvalue:10│-ThevaluetypehastobeBooleanbutyoupassedInteger│header││-Receivedvalue:[true,"hello"]│-ThevaluetypehastobeArray<String>butyoupassedArray<Boolean|String>│footer││-Receivedvalue:{"coco":10}│-ThevaluetypehastobeObject<Boolean|Number>butyoupassedObject<Integer|Function>│medhod1││-Receivedvalue:undefined│-ThevaluetypehastobeFunctionbutyoupassedUndefined│-Thisvalueisrequired│staticMethod2││-Receivedvalue:null│-ThevaluetypehastobeFunctionbutyoupassedNull│-Thisvalueisrequired│-Thisvaluehastobeastaticone',
            );
        });
    });
};
