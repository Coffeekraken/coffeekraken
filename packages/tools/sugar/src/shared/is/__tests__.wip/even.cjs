module.exports = (__testFn) => {
  describe("sugar.js.is.even", () => {
    it("Should detect the passed variable type correctly", () => {
      expect(__testFn(2)).toBe(true);
    });
  });
};
