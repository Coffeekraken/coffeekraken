module.exports = (__testFn) => {

  describe('sugar.js.is.node', () => {

    it('Should detect the passed variable type correctly', () => {
      expect(__testFn()).toBe(true);
    });

  });

}