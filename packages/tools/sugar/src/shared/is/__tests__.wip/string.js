module.exports = (__testFn) => {
  describe("sugar.js.is.string", () => {
    it("Should detect the passed variable type correctly", () => {
      expect(__testFn(false)).toBe(false);
      expect(__testFn("hello world")).toBe(true);
    });
  });
};
