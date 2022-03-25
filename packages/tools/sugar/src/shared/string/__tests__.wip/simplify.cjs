module.exports = (__simplify) => {
  describe("sugar.js.string.simplify", () => {
    it("Should process the passed string correctly", (done) => {
      expect(__simplify("-\xE9\xE0dd\xF6_")).toBe("eaddo");
      done();
    });
  });
};
