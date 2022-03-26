module.exports = (__ltrim) => {
  describe("sugar.js.string.ltrim", () => {
    it("Should process the passed string correctly", (done) => {
      expect(__ltrim("HELLO WORLD", "HELLO")).toBe("WORLD");
      done();
    });
  });
};
