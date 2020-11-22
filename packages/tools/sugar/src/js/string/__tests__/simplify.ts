module.exports = (__simplify) => {
  describe('sugar.js.string.simplify', () => {
    it('Should process the passed string correctly', (done) => {
      expect(__simplify('-éàddö_')).toBe('eaddo');

      done();
    });
  });
};
