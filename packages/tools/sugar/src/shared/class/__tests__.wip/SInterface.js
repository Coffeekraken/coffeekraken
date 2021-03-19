"use strict";
const __stripAnsi = require('strip-ansi');
module.exports = (__SInterface) => {
    describe('sugar.js.class.SInterface', () => {
        it('Should pass the interface test correctly', () => {
            class MyInterface extends __SInterface {
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
            let myClassInterfaceResult;
            class MyClass {
                constructor() {
                    this.title = true;
                    myClassInterfaceResult = MyInterface.apply(this, {
                        return: 'Object',
                        throw: false
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
                    received: { type: 'Undefined', value: undefined }
                },
                issues: ['title', 'doSomething'],
                title: {
                    name: 'title',
                    expected: { type: 'String', required: true },
                    issues: ['type'],
                    received: { type: 'Boolean', value: true }
                }
            });
        });
        it('Should pass the interface test correctly', () => {
            class MyInterface extends __SInterface {
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
            let myClassInterfaceResult;
            class MyClass {
                constructor() {
                    this.title = 'Hello world';
                    myClassInterfaceResult = MyInterface.apply(this);
                }
                doSomething() { }
            }
            new MyClass();
            expect(myClassInterfaceResult).toBe(true);
        });
        it('Should pass the interface test correctly when checking for an undefined static function', () => {
            class MyInterface extends __SInterface {
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
            let myClassInterfaceResult;
            class MyClass {
                constructor() {
                    this.title = 'Hello world';
                    myClassInterfaceResult = MyInterface.apply(this, {
                        throw: false,
                        return: 'Object'
                    });
                }
                doSomething() { }
            }
            new MyClass();
            expect(myClassInterfaceResult).toEqual({
                name: 'MyClass',
                doSomething: {
                    name: 'doSomething',
                    expected: { type: 'Function', required: true, static: true },
                    issues: ['type', 'required', 'static'],
                    received: { type: 'Null', value: null }
                },
                issues: ['doSomething']
            });
        });
        it('Should pass the interface test correctly when checking for an existing static function', () => {
            class MyInterface extends __SInterface {
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
            let myClassInterfaceResult;
            class MyClass {
                constructor() {
                    this.title = 'Hello world';
                    myClassInterfaceResult = MyInterface.apply(this);
                }
                static doSomething() { }
            }
            new MyClass();
            expect(myClassInterfaceResult).toBe(true);
        });
        it('Should pass the interface test correctly passing a value that is not in the allowed once', () => {
            class MyInterface extends __SInterface {
            }
            MyInterface.definition = {
                title: {
                    type: 'String',
                    values: ['Hello', 'World'],
                    required: true
                }
            };
            let myClassInterfaceResult;
            class MyClass {
                constructor() {
                    this.title = 'Hello world';
                    myClassInterfaceResult = MyInterface.apply(this, {
                        return: 'Object',
                        throw: false
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
                        values: ['Hello', 'World']
                    },
                    issues: ['values'],
                    received: { type: 'String', value: 'Hello world' }
                }
            });
        });
        it('Should pass the interface test correctly passing a value that is in the allowed once', () => {
            class MyInterface extends __SInterface {
            }
            MyInterface.definition = {
                title: {
                    type: 'String',
                    values: ['Hello', 'World'],
                    required: true
                }
            };
            let myClassInterfaceResult;
            class MyClass {
                constructor() {
                    this.title = 'Hello';
                    myClassInterfaceResult = MyInterface.apply(this);
                }
            }
            new MyClass();
            expect(myClassInterfaceResult).toBe(true);
        });
        it('Should pass the interface test correctly passing a complexe one that need to return a correct error string', () => {
            class MyInterface extends __SInterface {
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
            let myClassInterfaceResult;
            class MyClass {
                constructor() {
                    this.title = 'Hello World';
                    this.body = 10;
                    this.header = [true, 'hello'];
                    this.footer = {
                        coco: 10,
                        plop: () => { }
                    };
                    this.method1 = 'Youhou';
                    this.staticMethod2 = 'Youhou';
                    myClassInterfaceResult = MyInterface.apply(this, {
                        throw: false
                    });
                }
                method2() { }
                static staticMethod() { }
            }
            new MyClass();
            expect(__stripAnsi(myClassInterfaceResult.replace(/\s/g, ''))).toBe('Objectvalidation-Name:MyClass-Errors:6-Properties:title,body,header,footer,medhod1,staticMethod2│title││-Receivedvalue:HelloWorld│-Theallowedvaluesare["Hello","World"]│body││-Receivedvalue:10│-ThevaluetypehastobeBooleanbutyoupassedInteger│header││-Receivedvalue:[true,"hello"]│-ThevaluetypehastobeArray<String>butyoupassedArray<Boolean|String>│footer││-Receivedvalue:{"coco":10}│-ThevaluetypehastobeObject<Boolean|Number>butyoupassedObject<Integer|Function>│medhod1││-Receivedvalue:undefined│-ThevaluetypehastobeFunctionbutyoupassedUndefined│-Thisvalueisrequired│staticMethod2││-Receivedvalue:null│-ThevaluetypehastobeFunctionbutyoupassedNull│-Thisvalueisrequired│-Thisvaluehastobeastaticone');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUUxQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUU7SUFDaEMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO1lBQ2xELE1BQU0sV0FBWSxTQUFRLFlBQVk7O1lBQzdCLHNCQUFVLEdBQUc7Z0JBQ2xCLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2FBQ0YsQ0FBQztZQUdKLElBQUksc0JBQXNCLENBQUM7WUFDM0IsTUFBTSxPQUFPO2dCQUVYO29CQURBLFVBQUssR0FBRyxJQUFJLENBQUM7b0JBRVgsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7d0JBQy9DLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixLQUFLLEVBQUUsS0FBSztxQkFDYixDQUFDLENBQUM7Z0JBQ0wsQ0FBQzthQUNGO1lBQ0QsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUVkLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDckMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxhQUFhO29CQUNuQixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7b0JBQzlDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7b0JBQzVCLFFBQVEsRUFBRSxFQUFF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