module.exports = (__extractSame) => {
  describe('sugar.js.string.extractSame', () => {
    it('Should process the passed string correctly', (done) => {
      const res = __extractSame(
        `Hello world how are you?`,
        `Hello world it's me`,
        false
      );
      expect(res).toBe('Hello world ');

      done();
    });
  });
};
