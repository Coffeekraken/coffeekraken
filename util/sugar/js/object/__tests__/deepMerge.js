"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = __deepMerge => {
  describe('sugar.js.object.deepMerge', () => {
    it('Should merge the passed objects correctly', done => {
      const obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: {}
      };
      const obj2 = {
        hello: {
          coco: 'coco'
        },
        yes: true
      };

      const result = __deepMerge(obj1, obj2);

      expect(result).toEqual({
        hello: {
          world: 'hello world',
          coco: 'coco'
        },
        plop: {},
        yes: true
      });
      done();
    });
    it('Should merge the passed objects with some classes instances correctly', done => {
      class MyClass {
        constructor(value) {
          _defineProperty(this, "classParam1", 'hello');

          _defineProperty(this, "classParam2", false);

          this.value = value;
        }

      }

      const myObj = new MyClass('MyClass');
      const obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: myObj
      };
      const obj2 = {
        hello: {
          coco: 'coco'
        },
        plop: {
          param1: true
        },
        yes: true
      };

      const result = __deepMerge(obj1, obj2);

      expect(result).toEqual({
        hello: {
          world: 'hello world',
          coco: 'coco'
        },
        plop: {
          param1: true
        },
        yes: true
      });
      done();
    });
    it('Should leave the class instances and don\'s touch them', done => {
      class MyClass {
        constructor(value) {
          _defineProperty(this, "classParam1", 'hello');

          _defineProperty(this, "classParam2", false);

          this.value = value;
        }

      }

      const myObj = new MyClass('MyClass');
      const obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: myObj
      };
      const obj2 = {
        hello: {
          coco: 'coco'
        },
        yes: true
      };

      const result = __deepMerge(obj1, obj2);

      expect(result.plop instanceof MyClass).toBe(true);
      done();
    });
  });
};