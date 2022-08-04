"use strict";
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
                constructor() {
                    this.title = true;
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
                constructor() {
                    this.title = 'Hello world';
                    myClassInterfaceResult = MyInterface.apply(this, {
                        throw: false,
                        return: 'Object',
                    });
                }
                doSomething() { }
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
                constructor() {
                    this.title = 'Hello world';
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
                constructor() {
                    this.title = 'Hello World';
                    this.body = 10;
                    this.header = [true, 'hello'];
                    this.footer = {
                        coco: 10,
                        plop: () => { },
                    };
                    this.method1 = 'Youhou';
                    this.staticMethod2 = 'Youhou';
                    myClassInterfaceResult = MyInterface.apply(this, {
                        throw: false,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFMUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFO0lBQzlCLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7UUFDdkMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLEdBQUcsRUFBRTtZQUNoRCxNQUFNLFdBQVksU0FBUSxZQUFZO2dCQUNsQyxNQUFNLEtBQUssV0FBVztvQkFDbEIsT0FBTzt3QkFDSCxLQUFLLEVBQUU7NEJBQ0gsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsUUFBUSxFQUFFLElBQUk7eUJBQ2pCO3dCQUNELFdBQVcsRUFBRTs0QkFDVCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsUUFBUSxFQUFFLElBQUk7eUJBQ2pCO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQzthQUNKO1lBRUQsSUFBSSxzQkFBc0IsQ0FBQztZQUMzQixNQUFNLE9BQU87Z0JBRVQ7b0JBREEsVUFBSyxHQUFHLElBQUksQ0FBQztvQkFFVCxzQkFBc0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDN0MsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLEtBQUssRUFBRSxLQUFLO3FCQUNmLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0o7WUFDRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBRWQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNuQyxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtvQkFDOUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztvQkFDNUIsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2lCQUNwRDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO2dCQUNoQyxLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLE9BQU87b0JBQ2IsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO29CQUM1QyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2hCLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtpQkFDN0M7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7WUFDaEQsTUFBTSxXQUFZLFNBQVEsWUFBWTtnQkFDbEMsTUFBTSxLQUFLLFdBQVc7b0JBQ2xCLE9BQU87d0JBQ0gsS0FBSyxFQUFFOzRCQUNILElBQUksRUFBRSxRQUFROzRCQUNkLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjt3QkFDRCxXQUFXLEVBQUU7NEJBQ1QsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjtxQkFDSixDQUFDO2dCQUNOLENBQUM7YUFDSjtZQUVELElBQUksc0JBQXNCLENBQUM7WUFDM0IsTUFBTSxPQUFPO2dCQUVUO29CQURBLFVBQUssR0FBRyxhQUFhLENBQUM7b0JBRWxCLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBQ0QsV0FBVyxLQUFJLENBQUM7YUFDbkI7WUFDRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBRWQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlGQUF5RixFQUFFLEdBQUcsRUFBRTtZQUMvRixNQUFNLFdBQVksU0FBUSxZQUFZO2dCQUNsQyxNQUFNLEtBQUssV0FBVztvQkFDbEIsT0FBTzt3QkFDSCxLQUFLLEVBQUU7NEJBQ0gsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsUUFBUSxFQUFFLElBQUk7eUJBQ2pCO3dCQUNELFdBQVcsRUFBRTs0QkFDVCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsTUFBTSxFQUFFLElBQUk7eUJBQ2Y7cUJBQ0osQ0FBQztnQkFDTixDQUFDO2FBQ0o7WUFFRCxJQUFJLHNCQUFzQixDQUFDO1lBQzNCLE1BQU0sT0FBTztnQkFFVDtvQkFEQSxVQUFLLEdBQUcsYUFBYSxDQUFDO29CQUVsQixzQkFBc0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDN0MsS0FBSyxFQUFFLEtBQUs7d0JBQ1osTUFBTSxFQUFFLFFBQVE7cUJBQ25CLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELFdBQVcsS0FBSSxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUVkLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFO29CQUNULElBQUksRUFBRSxhQUFhO29CQUNuQixRQUFRLEVBQUU7d0JBQ04sSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE1BQU0sRUFBRSxJQUFJO3FCQUNmO29CQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDO29CQUN0QyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7aUJBQzFDO2dCQUNELE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQzthQUMxQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx3RkFBd0YsRUFBRSxHQUFHLEVBQUU7WUFDOUYsTUFBTSxXQUFZLFNBQVEsWUFBWTtnQkFDbEMsTUFBTSxLQUFLLFdBQVc7b0JBQ2xCLE9BQU87d0JBQ0gsS0FBSyxFQUFFOzRCQUNILElBQUksRUFBRSxRQUFROzRCQUNkLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjt3QkFDRCxXQUFXLEVBQUU7NEJBQ1QsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE1BQU0sRUFBRSxJQUFJO3lCQUNmO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQzthQUNKO1lBRUQsSUFBSSxzQkFBc0IsQ0FBQztZQUMzQixNQUFNLE9BQU87Z0JBRVQ7b0JBREEsVUFBSyxHQUFHLGFBQWEsQ0FBQztvQkFFbEIsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFDRCxNQUFNLENBQUMsV0FBVyxLQUFJLENBQUM7YUFDMUI7WUFDRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBRWQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDBGQUEwRixFQUFFLEdBQUcsRUFBRTtZQUNoRyxNQUFNLFdBQVksU0FBUSxZQUFZO2dCQUNsQyxNQUFNLEtBQUssV0FBVztvQkFDbEIsT0FBTzt3QkFDSCxLQUFLLEVBQUU7NEJBQ0gsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzs0QkFDMUIsUUFBUSxFQUFFLElBQUk7eUJBQ2pCO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQzthQUNKO1lBRUQsSUFBSSxzQkFBc0IsQ0FBQztZQUMzQixNQUFNLE9BQU87Z0JBRVQ7b0JBREEsVUFBSyxHQUFHLGFBQWEsQ0FBQztvQkFFbEIsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7d0JBQzdDLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixLQUFLLEVBQUUsS0FBSztxQkFDZixDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKO1lBQ0QsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUVkLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLE9BQU87b0JBQ2IsUUFBUSxFQUFFO3dCQUNOLFFBQVEsRUFBRSxJQUFJO3dCQUNkLElBQUksRUFBRSxRQUFRO3dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7cUJBQzdCO29CQUNELE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztvQkFDbEIsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2lCQUNyRDthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHNGQUFzRixFQUFFLEdBQUcsRUFBRTtZQUM1RixNQUFNLFdBQVksU0FBUSxZQUFZO2dCQUNsQyxNQUFNLEtBQUssV0FBVztvQkFDbEIsT0FBTzt3QkFDSCxLQUFLLEVBQUU7NEJBQ0gsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzs0QkFDMUIsUUFBUSxFQUFFLElBQUk7eUJBQ2pCO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQzthQUNKO1lBRUQsSUFBSSxzQkFBc0IsQ0FBQztZQUMzQixNQUFNLE9BQU87Z0JBRVQ7b0JBREEsVUFBSyxHQUFHLE9BQU8sQ0FBQztvQkFFWixzQkFBc0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2FBQ0o7WUFDRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBRWQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDRHQUE0RyxFQUFFLEdBQUcsRUFBRTtZQUNsSCxNQUFNLFdBQVksU0FBUSxZQUFZO2dCQUNsQyxNQUFNLEtBQUssV0FBVztvQkFDbEIsT0FBTzt3QkFDSCxLQUFLLEVBQUU7NEJBQ0gsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzs0QkFDMUIsUUFBUSxFQUFFLElBQUk7eUJBQ2pCO3dCQUNELElBQUksRUFBRTs0QkFDRixJQUFJLEVBQUUsU0FBUzs0QkFDZixRQUFRLEVBQUUsSUFBSTt5QkFDakI7d0JBQ0QsTUFBTSxFQUFFOzRCQUNKLElBQUksRUFBRSxlQUFlOzRCQUNyQixRQUFRLEVBQUUsSUFBSTt5QkFDakI7d0JBQ0QsTUFBTSxFQUFFOzRCQUNKLElBQUksRUFBRSx3QkFBd0I7NEJBQzlCLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjt3QkFDRCxZQUFZLEVBQUU7NEJBQ1YsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE1BQU0sRUFBRSxJQUFJO3lCQUNmO3dCQUNELGFBQWEsRUFBRTs0QkFDWCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsTUFBTSxFQUFFLElBQUk7eUJBQ2Y7cUJBQ0osQ0FBQztnQkFDTixDQUFDO2FBQ0o7WUFFRCxJQUFJLHNCQUFzQixDQUFDO1lBQzNCLE1BQU0sT0FBTztnQkFTVDtvQkFSQSxVQUFLLEdBQUcsYUFBYSxDQUFDO29CQUN0QixTQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNWLFdBQU0sR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDekIsV0FBTSxHQUFHO3dCQUNMLElBQUksRUFBRSxFQUFFO3dCQUNSLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO3FCQUNqQixDQUFDO29CQUNGLFlBQU8sR0FBRyxRQUFRLENBQUM7b0JBU25CLGtCQUFhLEdBQUcsUUFBUSxDQUFDO29CQVByQixzQkFBc0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDN0MsS0FBSyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0QsT0FBTyxLQUFJLENBQUM7Z0JBRVosTUFBTSxDQUFDLFlBQVksS0FBSSxDQUFDO2FBRTNCO1lBQ0QsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUVkLE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMvRCxxckJBQXFyQixDQUN4ckIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==