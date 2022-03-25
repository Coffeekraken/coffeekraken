module.exports = (__replaceTokens) => {
  describe("sugar.js.string.replaceTokens", () => {
    it("Should replace tokens correctly", (done) => {
      const string = __replaceTokens("hello [world] how [are] you?", {
        world: "coco",
        are: "plop"
      });
      expect(string).toBe("hello coco how plop you?");
      done();
    });
  });
};
