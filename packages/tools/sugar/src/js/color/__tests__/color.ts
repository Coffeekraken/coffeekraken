module.exports = (__color, __SColor) => {
  // TODO Create more tests for the SColor class

  const color = __color('#ff00ff');

  describe('sugar.js.color.color', () => {
    // it('Should return an instance of the SColor class', () => {
    //   expect(color instanceof __SColor).toBe(true);
    // });

    it('Should return rgba(255,0,255,1) string when using the toString method', () => {
      expect(color.toString()).toBe('#ff00ff');
    });
  });
};
