module.exports = (__diff) => {

  describe('sugar.js.object.diff', () => {

    it('Should merge the passed objects correctly', done => {

      const obj1 = {
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
      const obj2 = {
        hello: {
          coco: 'coco'
        },
        param: {
          three: 'nelson',
          nelson: {
            coco: 'eating'
          }
        },
        yes: false
      };
      const result = __diff(obj1, obj2);

      expect(result).toEqual({
        hello: {
          // coco: 'coco'
        },
        coco: {}
      })

      done();

    });

  });


}