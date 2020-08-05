module.exports = (__Interface) => {
  describe('sugar.js.class.Interface', () => {
    it('Should pass the interface test correctly', () => {
      class MyInterface extends __Interface {
        static interface = {
          title: {
            type: 'String',
            required: true
          },
          doSomething: {
            type: 'Function',
            required: true
          }
        };
      }

      let myClassInterfaceResult;
      class MyClass {
        title = true;
        constructor() {
          myClassInterfaceResult = MyInterface.apply(this);
        }
      }
      new MyClass();

      expect(myClassInterfaceResult).toEqual({
        doSomething: {
          expected: { type: 'Function' },
          issues: ['type', 'required'],
          received: { type: 'Undefined', value: undefined }
        },
        issues: ['title', 'doSomething'],
        title: {
          expected: { type: 'String' },
          issues: ['type'],
          received: { type: 'Boolean', value: true }
        }
      });
    });

    it('Should pass the interface test correctly', () => {
      class MyInterface extends __Interface {
        static interface = {
          title: {
            type: 'String',
            required: true
          },
          doSomething: {
            type: 'Function',
            required: true
          }
        };
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
      class MyInterface extends __Interface {
        static interface = {
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

      expect(myClassInterfaceResult).toEqual({
        doSomething: {
          expected: { type: 'Function' },
          issues: ['type', 'required', 'static'],
          received: { type: 'Null', value: null }
        },
        issues: ['doSomething']
      });
    });

    it('Should pass the interface test correctly when checking for an existing static function', () => {
      class MyInterface extends __Interface {
        static interface = {
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
      class MyInterface extends __Interface {
        static interface = {
          title: {
            type: 'String',
            values: ['Hello', 'World'],
            required: true
          }
        };
      }

      let myClassInterfaceResult;
      class MyClass {
        title = 'Hello world';
        constructor() {
          myClassInterfaceResult = MyInterface.apply(this);
        }
      }
      new MyClass();

      expect(myClassInterfaceResult).toEqual({
        issues: ['title'],
        title: {
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
      class MyInterface extends __Interface {
        static interface = {
          title: {
            type: 'String',
            values: ['Hello', 'World'],
            required: true
          }
        };
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
  });
};
