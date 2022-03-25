module.exports = (__testFn) => {
  describe("sugar.js.is.object", () => {
    it("Should detect the passed variable type correctly", () => {
      class myClass {
      }
      expect(__testFn({ hello: "world" })).toBe(true);
      expect(__testFn(12)).toBe(false);
      expect(__testFn(function() {
      })).toBe(false);
      expect(__testFn(new myClass())).toBe(false);
    });
  });
};
