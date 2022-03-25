module.exports = (__env) => {
  describe("sugar.js.dev.env", () => {
    it("Should get the environment variable correctly", () => {
      expect(__env("node_env")).toBe("test");
    });
    it('Should set the environment variable "youhou" correctly', () => {
      expect(__env("youhou", "Hello world")).toBe("Hello world");
    });
    it('Should delete the environment variable "youhou" correctly', () => {
      expect(__env("youhou", null)).toBe(void 0);
    });
  });
};
