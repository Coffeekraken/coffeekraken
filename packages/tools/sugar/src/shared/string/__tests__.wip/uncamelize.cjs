module.exports = (__uncamelize) => {
  describe("sugar.js.string.uncamelize", () => {
    it("Should process the passed string correctly", (done) => {
      expect(__uncamelize("helloWorldAndUniverse")).toBe("hello-world-and-universe");
      expect(__uncamelize("helloWorldAndUniverse", ".")).toBe("hello.world.and.universe");
      done();
    });
  });
};
