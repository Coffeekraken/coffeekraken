"use strict";

module.exports = __diff => {
  describe('sugar.js.object.diff', () => {
    it('Should merge the passed objects correctly', done => {
      var obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: {
          yop: 'coco'
        },
        param: {
          three: 'nelson'
        },
        yes: true
      };
      var obj2 = {
        hello: {
          coco: 'coco'
        },
        param: {
          three: 'nelson',
          nelson: {
            coco: 'eating'
          }
        },
        added: 'value',
        yes: false
      };

      var result = __diff(obj1, obj2);

      expect(result).toEqual({
        hello: {
          coco: 'coco'
        },
        param: {
          nelson: {
            coco: 'eating'
          }
        },
        added: 'value',
        yes: false
      });

      var result2 = __diff(obj1, obj2, {
        added: false
      });

      expect(result2).toEqual({
        yes: false
      });

      var result3 = __diff(obj1, obj2, {
        deleted: true
      });

      expect(result3).toEqual({
        hello: {
          world: 'hello world',
          coco: 'coco'
        },
        plop: {
          yop: 'coco'
        },
        param: {
          nelson: {
            coco: 'eating'
          }
        },
        added: 'value',
        yes: false
      });

      var result4 = __diff(obj1, obj2, {
        equals: true
      });

      expect(result4).toEqual({
        hello: {
          coco: 'coco'
        },
        param: {
          three: 'nelson',
          nelson: {
            coco: 'eating'
          }
        },
        added: 'value',
        yes: false
      });

      var result5 = __diff(obj1, obj2, {
        updated: false
      });

      expect(result5).toEqual({
        hello: {
          coco: 'coco'
        },
        param: {
          nelson: {
            coco: 'eating'
          }
        },
        added: 'value'
      });
      done();
    });
  });
};