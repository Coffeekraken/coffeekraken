"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      let MyClass = function MyClass(value) {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "classParam1", 'hello');

        _defineProperty(this, "classParam2", false);

        this.value = value;
      };

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
    it("Should leave the class instances and don's touch them", done => {
      let MyClass = function MyClass(value) {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "classParam1", 'hello');

        _defineProperty(this, "classParam2", false);

        this.value = value;
      };

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
    it('Should merge the passed objects with some array correctly', done => {
      const obj1 = {
        plop: ['a', 'b', 'c'],
        hello: 'world'
      };
      const obj2 = {
        plop: ['a', 'b', 'd', 'e'],
        hello: 'world'
      };
      expect(__deepMerge(obj1, obj2)).toEqual(obj2);
      expect(__deepMerge(obj1, obj2, {
        array: true
      })).toEqual({
        plop: ['a', 'b', 'c', 'd', 'e'],
        hello: 'world'
      });
      done();
    });
  });
};