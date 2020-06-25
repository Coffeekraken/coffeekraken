module.exports = (__whenProperty) => {
  describe('sugar.js.object.whenProperty', () => {
    it('Should detect when the "welcome" property is added to the object', (done) => {
      const obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: {
          array: [0, 1, 2]
        }
      };

      let watch1 = false,
        watch2 = false,
        watch3 = false;

      const promise = __whenProperty(obj1, 'hello.welcome').then((value) => {
        watch1 = true;
      });
      const promise2 = __whenProperty(obj1, 'hello.welcome').then((value) => {
        watch3 = true;
      });
      __whenProperty(obj1, 'plop.coco', (value, oldVal) => {
        return typeof value === 'string';
      }).then((value) => {
        watch2 = true;
      });

      promise2.cancel();

      obj1.hello.welcome = 'yyy';
      obj1.hello.welcome = 'iuwehf iuhw efuihwe ';

      obj1.plop.coco = {};
      obj1.plop.coco = 'www';

      setTimeout(() => {
        expect(watch1).toBe(true);
        expect(watch2).toBe(true);
        expect(watch3).toBe(false);

        done();
      });
    });
  });
};
