module.exports = (__color, __SColor) => {
  const color = __color("#ff00ff");
  describe("sugar.js.color.color", () => {
    it("Should return rgba(255,0,255,1) string when using the toString method", () => {
      expect(color.toString()).toBe("#ff00ff");
    });
  });
};
