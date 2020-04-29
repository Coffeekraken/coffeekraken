module.exports = (__resolveTokens) => {
  describe('sugar.js.object.resolveTokens', () => {
    it('Should apply the property proxy correctly and detect the updated', (done) => {
      const obj1 = __resolveTokens({
        hello: {
          world: 'hello world'
        },
        plop: {
          array: [0, 1, 2],
          nelson: '{this.hello.world}'
        }
      });

      // expect(obj1.plop.array).toEqual([0, 1, 2]);
      expect(obj1.plop.nelson).toBe('hello world');

      done();
    });
  });
};
